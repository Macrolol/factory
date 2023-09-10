import {
    type AnyActivity,
    type Activity,
    type ActivityRun,
    type ActivityConfig,
    type ActivityRunParams,
    type FinalActivityStatus,
    isStatusFinal,
    ActivityStatus,
} from "../activities";
         
// Dependency in this case is a dependency on the result an activity run.
// This is used when in a pipeline for the control flow.
export interface Dependency {
    activityRunId: string;
    requiredStatus: FinalActivityStatus;
}
export type DependencyStatus = "waiting" | "ready" | "failed";
export interface ResolvedDependency extends Dependency {
    status: DependencyStatus;
    activityRun: ActivityRun;
}
export function tryResolve(activityRun: ActivityRun, dependency: Dependency): ResolvedDependency | null {
    if (activityRun.id === dependency.activityRunId){
        let status: DependencyStatus;
        if (isStatusFinal(activityRun.status)) {
            status =   dependency.requiredStatus === activityRun.status ? "ready" :  "failed";
        } else {
            status = "waiting";
        }
        return {
            ...dependency,
            status: status,
            activityRun: activityRun
        };
    }
    return null;
}

interface PipelineStep {
    activity: AnyActivity;
    config: ActivityConfig;
    dependencies: Dependency[];
    resolvedDependencies: ResolvedDependency[];
}

export interface PipelineConfig extends ActivityConfig {};
export interface PipelineRun extends ActivityRun {
    activities:{
        completed: ActivityRun[];
        notRun: Activity[];
    }
};
export interface PipelineRunParams extends ActivityRunParams {
    config?: PipelineConfig;
};
export interface Pipeline extends Activity{
    type: "pipeline";
    run: (params: PipelineRunParams) => Promise<PipelineRun>;
}

namespace Pipeline {
    function resolveDependencies(activityRun: ActivityRun, step: PipelineStep): PipelineStep{
        const newlyResolved = step.dependencies.map(dependency => tryResolve(activityRun, dependency))
                                               .filter(resolvedDependency => resolvedDependency !== null) as ResolvedDependency[];
        return {
            ...step,
            resolvedDependencies: [...step.resolvedDependencies, ...newlyResolved]
        };
    }
    function checkDeps(step: PipelineStep): DependencyStatus {
        if (step.resolvedDependencies.find(resolvedDependency => resolvedDependency.status === "failed")) {
            return "failed";
        }
        if (step.resolvedDependencies.length !== step.dependencies.length
         || step.resolvedDependencies.find(resolvedDependency => resolvedDependency.status === "waiting"))
            return "waiting";
        return "ready";
    }
    /*
    export interface ActivityRunParams {
        data?: any,
        config?: ActivityConfig,
        onStatusUpdate?: (run: ActivityRun, lastStatus: ActivityStatus) => void,
        onStatus?: {
        status: ActivityStatus,
        callback: (run: ActivityRun) => void
        }[]
    } */
    
    class SimplePipeline implements Pipeline {
        id: string;
        type!: "pipeline";
        name: string;
        waitingSteps: PipelineStep[];
        notRunSteps: PipelineStep[];
        activeRuns: ActivityRun[];
        completedActivities: ActivityRun[];
        done: boolean;
        constructor(name: string, steps: PipelineStep[]){
            this.id = "TODO";
            this.name = name;
            this.waitingSteps = steps.filter(step => step.dependencies.length > 0);
            this.notRunSteps = [];
            this.activeRuns = [];
            this.completedActivities = [];
            this.done = false;
        }

        async run({
            config,
            onStatusUpdate,
            onStatus
        }: PipelineRunParams): Promise<PipelineRun> {
            const ready = this.waitingSteps.filter(step => checkDeps(step) === "ready" || step.dependencies.length === 0)
            let error: any = null;
            try{
                if (ready.length === 0) {
                    throw new Error("No steps ready to run");
                }
                ready.forEach(step => this.runStep(step));

                while (!this.done) {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            } catch (e) {
                error = e;
            }
            return {
                id: "TODO",
                activity: this,
                config: config || {},
                activities: {
                    completed: this.completedActivities,
                    notRun: this.notRunSteps.map(step => step.activity)
                },
                status: error ? ActivityStatus.Failed : ActivityStatus.Completed,
            }
        }

        resolveDependencies(activityRun: ActivityRun) {
            this.waitingSteps
            .map(step => resolveDependencies(activityRun, step))
            .forEach(step =>{
                switch(checkDeps(step)){
                    case "ready":
                        this.waitingSteps = this.waitingSteps.filter(s => s !== step);
                        this.runStep(step);
                        break;
                    case "failed":
                        this.waitingSteps = this.waitingSteps.filter(s => s !== step);
                        this.notRunSteps.push(step);
                        break;
                    case "waiting":
                        break;
                }
            });
        }
        
        async stepData(step: PipelineStep): Promise<any | null> {

        }

        async runStep(step: PipelineStep){
            const run = await step.activity.run({
                data: this.stepData(step),
                config: step.config,
                onStatusUpdate: (run: ActivityRun, lastStatus: ActivityStatus) => {
                    this.onActivityUpdate(run);
                }
            });
            this.activeRuns.push(run);
        }

        async onActivityUpdate(activityRun: ActivityRun) {
            this.resolveDependencies(activityRun);
            if (this.waitingSteps.length === 0 && this.activeRuns.length === 0) {
                this.done = true;
            }
        }
    }
}