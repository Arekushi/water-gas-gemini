import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { HTTPOptions } from '@core/interfaces/http-options.interface';
import { HttpService } from '@core/services/http.service';
import { Response } from '@core/interfaces/http-response.interface';
import { UseAspect, Advice } from '@arekushii/ts-aspect';
import { LogRequestAspect } from '@core/aspects/log-request.aspect';
import { Injectable } from '@nestjs/common';


@Injectable()
export class RequesterService {
    constructor(
        public http: HttpService
    ) {
        this.http = http;
    }

    @UseAspect(Advice.Before, LogRequestAspect, { method: 'GET' })
    get<T>(route: string, options?: HTTPOptions, returnOnlyData = true): Promise<Response<T> | T> {
        return firstValueFrom(
            this.http.get<T>(`${route}`, options).pipe(
                map(res => returnOnlyData ? res.data : res)
            )
        );
    }

    @UseAspect(Advice.Before, LogRequestAspect, { method: 'POST' })
    post<T>(route: string, body?: any, options?: HTTPOptions, returnOnlyData = true): Promise<Response<T> | T> {
        return firstValueFrom(
            this.http.post<T>(`${route}`, body, options).pipe(
                map(res => returnOnlyData ? res.data : res)
            )
        );
    }

    @UseAspect(Advice.Before, LogRequestAspect, { method: 'PUT' })
    put<T>(route: string, body: any, options?: HTTPOptions, returnOnlyData = true): Promise<Response<T> | T> {
        return firstValueFrom(
            this.http.put<T>(`${route}`, body, options).pipe(
                map(res => returnOnlyData ? res.data : res)
            )
        );
    }

    @UseAspect(Advice.Before, LogRequestAspect, { method: 'DELETE' })
    delete<T>(route: string, options?: HTTPOptions, returnOnlyData = true): Promise<Response<T> | T> {
        return firstValueFrom(
            this.http.delete<T>(`${route}`, options).pipe(
                map(res => returnOnlyData ? res.data : res)
            )
        );
    }

    @UseAspect(Advice.Before, LogRequestAspect, { method: 'PATCH' })
    patch<T>(route: string, body: any, options?: HTTPOptions, returnOnlyData = true): Promise<Response<T> | T> {
        return firstValueFrom(
            this.http.patch<T>(`${route}`, body, options).pipe(
                map(res => returnOnlyData ? res.data : res)
            )
        );
    }
}
