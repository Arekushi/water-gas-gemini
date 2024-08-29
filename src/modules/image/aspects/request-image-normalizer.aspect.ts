
import { Aspect, AspectContext, IndexedKeyValuePair } from '@arekushii/ts-aspect';
import { SaveImageRequest } from '@image/domain/requests/image.request';
import { getImageMime } from 'base64-image-mime'
import * as uuid from 'uuid';


export class RequestImageNormalizerAspect implements Aspect  {

    async execute(ctx: AspectContext): Promise<IndexedKeyValuePair> {
        const request: SaveImageRequest = ctx.functionParams.request.value;

        if (!(typeof request.image === 'string')) {
            const buffer = request.image.buffer;
            const base64Image = buffer.toString('base64');
            const [name, type] = request.image.originalname.split('.')

            request.filename = `${request.filename || name}.${type}`;
            request.image = `data:${request.image.mimetype};base64,${base64Image}`;
        } else {
            const type = getImageMime(request.image).split('/').pop();
            const name = uuid.v4();
            request.filename = `${request.filename || name}.${type}`;
        }

        return {
            'request': {
                value: request
            }
        }
    }
}
