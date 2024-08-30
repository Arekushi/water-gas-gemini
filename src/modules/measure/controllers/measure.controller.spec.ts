// import * as uuid from 'uuid';
// import * as fs from 'fs';

// import { Test, TestingModule } from '@nestjs/testing';

// import { MeasureController } from '@measure/controllers/measure.controller';
// import { MeasureService } from '@measure/services/measure.service';
// import { UploadRequest } from '@measure/domain/requests/upload.request';
// import { UploadSuccessResponse } from '@measure/domain/responses/upload.response';
// import { ConfirmRequest } from '@measure/domain/requests/confirm.request';
// import { ConfirmResponse } from '@measure/domain/responses/confirm.response';
// import { MeasureType } from '@measure/enums/measure-type.enum';
// import { InvalidDataException } from '@src/core/exceptions/invalid-data.exception';

// const REGISTER_VALUE: UploadSuccessResponse = {
//     imageUrl: 'https:...',
//     measureValue: 123,
//     measureUuid: 'UUID'
// };

// describe('MeasureController', () => {
//     let controller: MeasureController;
//     let service: MeasureService;

//     const mockMeasureService = {
//         register: jest.fn(),
//         confirm: jest.fn(),
//         measure: jest.fn()
//     }

//     beforeEach(async () => {
//         const module: TestingModule = await Test.createTestingModule({
//             controllers: [
//                 MeasureController
//             ],
//             providers: [{
//                 provide: MeasureService,
//                 useValue: mockMeasureService
//             }],
//         }).compile();

//         controller = module.get<MeasureController>(MeasureController);
//         service = module.get<MeasureService>(MeasureService);
//     });

//     it('should be defined', () => {
//         expect(controller).toBeDefined();
//         expect(service).toBeDefined();
//     });

//     describe('upload', () => {
//         it ('should return upload success response', async () => {
//             // Arrange
//             jest.spyOn(service, 'register').mockResolvedValue(REGISTER_VALUE);

//             const request: UploadRequest = {
//                 customerCode: uuid.v4(),
//                 measureDatetime: new Date().toISOString(),
//                 measureType: MeasureType.WATER,
//                 image: 'base64...',
//             };

//             // Act
//             const result = await controller.upload(request);

//             // Assert
//             expect(result).toEqual(REGISTER_VALUE);
//             expect(service.register).toHaveBeenCalledTimes(1);
//         });

//         it ('should throw invalid data exception', () => {
//             // Arrange
//             const request: UploadRequest = {
//                 customerCode: uuid.v4(),
//                 measureDatetime: new Date().toISOString(),
//                 measureType: MeasureType.WATER,
//                 image: 'base64...',
//             };

//             jest.spyOn(service, 'register').mockRejectedValueOnce(
//                 new Error()
//             );

//             // Assert
//             expect(controller.upload(request)).rejects.toThrowError();
//         });
//     });

//     // describe('confirm', () => {
//     //     const request: ConfirmRequest = {
//     //         measureUuid: uuid.v4(),
//     //         confirmedValue: 10
//     //     };

//     //     it('should be called 1 time', async () => {
//     //         const response = await controller.confirm(request)
//     //         expect(mockMeasureService.confirm).toHaveBeenCalledTimes(1);
//     //     });
//     // });
// });
