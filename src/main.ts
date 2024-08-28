import { Logger } from '@nestjs/common';
import { App } from '@src/app';

export const run = async (): Promise<void> => {
    const app = new App();

    await app.init();
    await app.listen();
};

run().catch(
    (err) => {
        Logger.log(err)
    }
);
