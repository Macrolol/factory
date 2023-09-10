export enum ActivityStatus{
    Unknown,
    Waiting,
    Running, 
    Paused,
    // Stopped is the first final status
    Stopped,
    Completed,
    Failed,
}
export type FinalActivityStatus = ActivityStatus.Completed | ActivityStatus.Failed | ActivityStatus.Stopped;
export function isStatusFinal(status: ActivityStatus): status is FinalActivityStatus {
    return status >= ActivityStatus.Stopped;
}

export type ActivityResult = {
    status: FinalActivityStatus;
    data: any;
}

export interface ActivityConfig {
    parameters?: Parameter[];
}

export interface ActivityRunParams {
    data?: any,
    config?: ActivityConfig,
    onStatusUpdate?: (run: ActivityRun, lastStatus: ActivityStatus) => void,
    onStatus?: {
       status: ActivityStatus,
       callback: (run: ActivityRun) => void
    }[]
}
export interface Activity {
    id: string;
    name: string;
    type: string;
    run: (params: ActivityRunParams) => Promise<ActivityRun>;
}

export interface Parameter {
    name: string;
    value: any;
}

export interface ActivityRun {
    activity: Activity;
    config: ActivityConfig;
    id: string;
    get status(): ActivityStatus;
    result?: ActivityResult;
}


export type AnyActivity = any;

export namespace Activities {
    class DebugRun implements ActivityRun {
        activity: Activity;
        params: ActivityRunParams;
        config: ActivityConfig;
        id: string;
        _status: ActivityStatus = ActivityStatus.Unknown;
        constructor(activity: Activity, params: ActivityRunParams, id: string){
            this.activity = activity;
            this.params = params;
            this.config = params?.config || {};
            this.id = id;
        }
        statusChanged(lastStatus: ActivityStatus): void {
            this.params.onStatusUpdate?.(this, lastStatus);
            this.params.onStatus?.forEach(({status, callback}) => {
                if (this.status === status) {
                    callback(this);
                }
            });
        };
        changeStatus(status: ActivityStatus): void {
            this._status = status;
            this.statusChanged(this._status);
        };
        get status(): ActivityStatus {
            const status = this._status;
            this.changeStatus(status + 1);
            return status;
        }
    }
    
    class DebugActivity implements Activity {
        id: string;
        name: string;
        type: string;
        constructor(){
            this.id = "debug";
            this.name = "Debug";
            this.type = "debug";
        }
        async run(params: ActivityRunParams): Promise<ActivityRun> {
            return new DebugRun(this, params, "debug");
        }
    }

    export const debug = new DebugActivity();
}

