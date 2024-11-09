import fetch from 'isomorphic-fetch';
import { ApiException } from './ApiException';
import { ApiParams } from './ApiParams';
import { config } from '../config/config';

type Params = Record<string, unknown> | ApiParams

export class Api<T = unknown> {
    private _baseUrl: string;
    private _authorization?: string;
    private _isDefaultErrorHandlerIgnored = false;

    constructor() {
        this._baseUrl = config.apis.url;
    }


    /**
     * Appelle l'API en GET.
     */
    public get(path: string, params?: Params, headers?: Record<string, string>) {
        return this.call('GET', path, undefined, params, headers);
    }

    /**
     * Appelle l'API en POST.
     */
    public post(path: string, body?: unknown, params?: Params, headers?: Record<string, string>) {
        console.debug('PATH', path)
        return this.call('POST', path, body, params, headers);
    }

    /**
     * Appelle l'API en PUT.
     */
    public put(path: string, body?: unknown, params?: Params, headers?: Record<string, string>) {
        return this.call('PUT', path, body, params, headers);
    }

    /**
     * Appelle l'API en PATCH.
     */
    public patch(path: string, body?: unknown, params?: Params, headers?: Record<string, string>) {
        return this.call('PATCH', path, body, params, headers);
    }

    /**
     * Appelle l'API en DELETE.
     */
    public delete(path: string, params?: Params, headers?: Record<string, string>) {
        return this.call('DELETE', path, undefined, params, headers);
    }

    /**
     * Définie le jeton d'authentification.
     */
    public setBearerToken(token?: string) {
        if (!token) token = localStorage.getItem('token') || undefined;
        this._authorization = `Bearer ${token}`;
        return this;
    }

    /**
     * Ignore la gestion des erreurs par défaut.
     */
    public ignoreDefaultErrorHandler() {
        this._isDefaultErrorHandlerIgnored = true;
        return this;
    }


    private async call(
        method: string,
        path: string,
        body?: unknown,
        params?: Params,
        headers?: Record<string, string>,
    ): Promise<T> {
        if (params) {
            const urlParams = params instanceof ApiParams ? params : new ApiParams(params);
            path += `?${urlParams.toString()}`;
        }

        let response: any;
        const apiUrl = this._baseUrl + path;

        const commonOptions = {
        method,
        headers: {
            Source: 'Web',
            Authorization: this._authorization || '',
            ...headers,
        },
        };

        if (body instanceof FormData) {
            response = await fetch(apiUrl, {
                ...commonOptions,
                body,
            });
        } else {
        response = await fetch(apiUrl, {
            ...commonOptions,
            headers: {
                'Content-Type': 'application/json',
                'Pragma': 'no-cache',
                'Accept': 'application/json',
                ...commonOptions.headers,
            },
            body: body ? JSON.stringify(body) : undefined,
        });
        }

        let res;
        if (headers?.responseType === 'blob') res = await response.blob();
        else if (response.headers.get('Content-Type')?.includes('application/pdf')) res = response;
        else res = await response.json().catch(() => null);

        if (response.ok) return res;

        throw new ApiException({
            status: response.status,
            body: res,
            path,
            isDefaultErrorHandlerIgnored: this._isDefaultErrorHandlerIgnored
        });
    }
}