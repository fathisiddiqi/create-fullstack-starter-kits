export class BadRequestError extends Error {
	constructor(message: string) {
		super(message);

		this.name = "BadRequestError";
		this.message = message;
	}
}

export class NotFoundError extends Error {
	constructor(message: string) {
		super(message);

		this.name = "NotFoundError";
		this.message = message;
	}
}

export class ValidationError extends Error {
	constructor(message: string) {
		super(message);

		this.name = "ValidationError";
		this.message = message;
	}
}

export class UnauthorizedError extends Error {
	constructor(message: string) {
		super(message);

		this.name = "UnauthorizedError";
		this.message = message;
	}
}
