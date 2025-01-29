// src/errors/registerError.ts
export class registerError extends Error {
    field: string;

    constructor(message: string, field: string) {
        super(message);
        this.field = field;
        this.name = 'registerError';
    }
}
