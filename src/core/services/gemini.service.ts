import {
    Injectable
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';


@Injectable()
export class GeminiService {

    constructor(
        public config: ConfigService
    ) { }

    
}
