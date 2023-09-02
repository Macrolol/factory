export interface EventListenOptions {
    endPoint: string;
    name?: string;
    callback: Function;
}

export function listen(opts: EventListenOptions) {
    const eventSource = new EventSource(opts.endPoint);
    const name = opts.name || 'message';
    eventSource.addEventListener(name, (event: any) => {
        opts.callback(event.data);
    });
}
