export class conflictError extends Error {
    details;
    statusCode = 409;

    constructor(message, details) {
        super(message);
        this.details = details;
    }
}
