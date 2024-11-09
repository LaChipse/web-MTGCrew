export class ApiException extends Error {
    constructor(private readonly _data: { status: number, body: string, path: string, isDefaultErrorHandlerIgnored: boolean }) {
        super('API Error');
    }

    get status() {
        return this._data.status;
    }

    get body() {
        return this._data.body;
    }

    get path() {
            return this._data.path;
    }

    get isDefaultErrorHandlerIgnored() {
        return this._data.isDefaultErrorHandlerIgnored;
    }
}