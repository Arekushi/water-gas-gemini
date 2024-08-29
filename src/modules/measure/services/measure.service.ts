import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@core/services/prisma.service';


@Injectable()
export class MeasureService {
    
    constructor(
        private readonly prisma: PrismaService
    ) { }

}
