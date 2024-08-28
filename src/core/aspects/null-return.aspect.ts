import { Aspect, AspectContext } from '@arekushii/ts-aspect';


export class NullReturnAspect implements Aspect {

    execute(ctx: AspectContext): any {
        const exception = ctx.params;
        const methodReturn = ctx.returnValue;

        if (!methodReturn) {
            throw exception;
        }

        if (Array.isArray(methodReturn)) {
            return [...methodReturn];
        }
        
        return [methodReturn];
    }
}
