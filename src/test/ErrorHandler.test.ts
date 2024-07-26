import { describe, it, expect } from "vitest";
import { ZodError } from "zod";
import ErrorHandler from "@/utils/ErrorHandler";

describe("ErrorHandler", () => {
  const { handleErrors } = new ErrorHandler();
  it("returns generic error response", () => {
    const error = new Error("This is a generic error");
    expect(handleErrors(error)).toBeInstanceOf(Response);
  });

  it("returns type error response", () => {
    const error = new TypeError("This is a type error");
    expect(handleErrors(error)).toBeInstanceOf(Response);
  });

  it("returns syntax error response", () => {
    const error = new SyntaxError("This is a syntax error");
    expect(handleErrors(error)).toBeInstanceOf(Response);
  });

  it("returns zod error response", () => {
    const error = new ZodError([
      { path: ["/"], code: "custom", message: "This is a zod error arry" },
    ]);
    expect(handleErrors(error)).toBeInstanceOf(Response);
  });

  it('returns the error as response', () => {
    const error = 'This is a string error';
    expect(handleErrors(error)).toBeInstanceOf(Response);
  })
});
