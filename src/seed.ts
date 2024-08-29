import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient()

const main = async () => {
    await prisma.measureType.upsert({
        where: {
            name: 'WATER'
        },
        update: {},
        create: {
            name: 'WATER'
        }
    });

    await prisma.measureType.upsert({
        where: {
            name: 'GAS'
        },
        update: {},
        create: {
            name: 'GAS'
        }
    });
};

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        Logger.log(e)
        await prisma.$disconnect()
        process.exit(1)
    })
