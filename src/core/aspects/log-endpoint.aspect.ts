import { Aspect, AspectContext } from '@arekushii/ts-aspect';


export class LogEndpointAspect implements Aspect {

    execute(ctx: AspectContext): void {
        const route = ctx.params.route;
        const method = ctx.methodName;
        ctx.target.logger.log(`Request: ${route} | Method: ${method}`);
    }
}
