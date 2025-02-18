import {ZodError} from "zod";

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export default function customError(err: Error | ZodError): Response {
  let message = err.message;
  let statusCode = 500;

  if (err instanceof NotFoundError) {
    statusCode = 404;
  }

  return Response.json({
    message,
    code: statusCode
  }, {status: statusCode})
}