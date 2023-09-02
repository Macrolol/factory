namespace Pipeline {
    // https://dev.to/ecyrbe/how-to-use-advanced-typescript-to-define-a-pipe-function-381h
    type Environment = any;
    type Success = any;
    type Result = Error | Success;
    type ResultFuncWEnv = (env: Environment, ...arg: any) => Result;
    type ResultFunc =  ResultFuncWEnv | ((...arg: any) => Result);

    type LastFnReturnType<F extends Array<ResultFunc>, Else = never> = F extends [
    ...any[],
    (...arg: any) => infer R
    ]
    ? R
    : Else;

    type PipeArgs<F extends ResultFunc[], Acc extends ResultFunc[] = []> = 
    F extends [(...args: infer A) => infer B] ? [...Acc, (...args: A) => B]
                                              : F extends [(...args: infer A) => any, ...infer Tail] ? Tail extends [(arg: infer B) => any, ...any[]] ? PipeArgs<Tail, [...Acc, (...args: A) => B]>
                                                                                                                                                      : Acc
                                                                                                     : Acc;

    function pipe<FirstFn extends ResultFunc, F extends ResultFunc[]>(
    arg: Parameters<FirstFn>[0],
    firstFn: FirstFn,
    ...fns: PipeArgs<F> extends F ? F : PipeArgs<F>
    ): LastFnReturnType<F, ReturnType<FirstFn>> {
        let result = firstFn(arg);
        for (const fn of fns) {
            result = fn(result);
        }
        return result;
    }
};

export interface Input<T>{
    accept: (input: T) => void;
}
export interface Output<T>{
    send: () => T;
}



export class QueuePipe<T> implements Input<T>, Output<T> {
    accept: (input: T) => void;
    send: () => T;
    queue: T[] = [];
    constructor(){
        this.accept = (input: T) => {
            this.queue.push(input);
        }
        this.send = () => {
            return this.queue.shift() as T;
        }
    }
}
