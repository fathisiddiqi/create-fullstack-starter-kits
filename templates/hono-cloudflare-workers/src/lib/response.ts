import { Context } from "hono";
import { HttpContext, Pagination } from "@/types";
import {
	BadRequestError,
	NotFoundError,
	UnauthorizedError,
	ValidationError,
} from "@/lib/error";
import z, { ZodError } from "zod";

const buildValidationError = (err: ZodError): object | undefined => {
	if (!err) return undefined;

	return z.flattenError(err);
};

export const errorResponse = (c: Context<HttpContext>, err: Error) => {
	let errName = "InternalServerError";
	let message = "internal server error";
	let code = 500;
	let items: object | undefined = undefined;

	if (err instanceof BadRequestError) {
		errName = err.name;
		message = err.message;
		code = 400;
	} else if (err instanceof ZodError) {
		errName = "ValidationError";
		message = "validation failed";
		items = buildValidationError(err);
		code = 400;
	} else if (err instanceof ValidationError) {
		errName = err.name;
		message = err.message;
		code = 400;
	} else if (err instanceof NotFoundError) {
		errName = err.name;
		message = err.message;
		code = 404;
	} else if (err instanceof UnauthorizedError) {
		errName = err.name;
		message = err.message;
		code = 401;
	}

	c.var.logger.error(err);

	return c.json(
		{
			err: errName,
			message: message,
			items: items,
		},
		code as any,
	);
};

export const successResponse = (
	c: Context<HttpContext>,
	data: any,
	pagination?: Pagination,
	code = 200,
) => {
	const response = {
		data: data,
		pangination: pagination,
	};

	if (![101, 204, 205, 304].includes(code))
		return c.json(response, code as any);

	return c.json(code);
};
