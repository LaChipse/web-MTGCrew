export class ApiParams {
    private _searchParams: URLSearchParams;

    constructor(params: Record<string, unknown>) {
        this._searchParams = new URLSearchParams();

        Object.keys(params).forEach((key) => {
            const value = this.getFormattedValue(key, params[key]);
            if (value !== undefined) this._searchParams.append(key, value);
        });
    }

    public addSort(sort: Record<string, unknown>, fieldName = 'sort') {
        return this._searchParams.append(fieldName, Object.keys(sort).map((key) => `${key}:${sort[key]}`).join());
    }

    public toString() {
        return this._searchParams.toString();
    }

    private getFormattedValue(key: string, value: unknown): string | undefined {
        if (value === null || value === undefined) return undefined;

        if (value instanceof Date) return value.toISOString();
        if (value instanceof Array) return value.join();
        if (typeof value === 'string') return value;
        if (typeof value === 'number') return value.toString();
        if (typeof value === 'boolean') return value ? 'true' : 'false';
        if (typeof value === 'object') return JSON.stringify(value);

        throw new Error(`Type de valeur inconnu pour le champ [${key}]`);
    }
}