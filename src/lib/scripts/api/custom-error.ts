import {ZodError} from "zod";
import {JWSInvalid} from "jose/errors";

export class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BadRequestError';
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConflictError';
  }
}

export default function customError(err: Error | ZodError): Response {
  let message = err.message;
  let statusCode = 500;

  if (err instanceof BadRequestError) {
    statusCode = 400;
  } else if (err instanceof ZodError) {
    statusCode = 400;
    message = err.issues.map((issue) => issue.message).join(", ");
  } else if (err instanceof UnauthorizedError || err instanceof JWSInvalid) {
    statusCode = 401;
  } else if (err instanceof NotFoundError) {
    statusCode = 404;
  } else if (err instanceof ConflictError) {
    statusCode = 409;
  } else {
    console.error(err);
  }

  return Response.json({
    message,
    code: statusCode
  }, {status: statusCode})
}