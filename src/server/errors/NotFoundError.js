export class NotFoundError extends Error {
    errors;
    statusCode = 404;

    constructor(message, errors) {
        super(message);
        this.errors = errors;
    }
}
