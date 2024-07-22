import { ZodError } from "zod";

/**
 * Class to organise error handler responses.
 */
class ErrorHandler {
  constructor() {}
  /**
   * Error response of ZodError
   * @param  {ZodError} error Instance of ZodError
   * @returns {Response}
   */
  zodErrorResponse = (error: ZodError): Response => {
    const response = error.issues.map(
      ({ path, message }: { path: (string | number)[]; message: string }) => ({
        [path.join("-")]: message,
      })
    );
    return new Response(JSON.stringify(response), {
      status: 400,
    });
  };
  /**
   * Error response for syntax errors.
   * @param {SyntaxError} error Instance of SyntaxError
   * @returns {Response}
   */
  syntaxErrorResponse = (error: SyntaxError): Response => {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
    });
  };
  /**
   * Error response for type errors.
   * @param {TypeError} error Instance of TypeError
   * @returns {Response}
   */
  typeErrorResponse = (error: TypeError): Response => {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
    });
  };
  /**
   * Error response for generic errors.
   * @param  {Error} error Instance of Error
   * @returns {Response}
   */
  genericErrorResponse = (error: Error): Response => {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
    });
  };
  /**
   * Error handler to return a response
   * by type checking the error instance.
   * @param  {unknown} error Unknown error type
   * @returns {Response}
   */
  public handleErrors = (error: unknown): Response => {
    if (error instanceof ZodError) return this.zodErrorResponse(error);
    if (error instanceof SyntaxError) return this.syntaxErrorResponse(error);
    if (error instanceof TypeError) return this.typeErrorResponse(error);
    if (error instanceof Error) return this.genericErrorResponse(error);
    console.warn(error);
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  };
}

export default ErrorHandler;
