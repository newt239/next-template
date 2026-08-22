import type { Instrumentation } from "next";

export const onRequestError: Instrumentation.onRequestError = (error, request, context) => {
  console.error("[onRequestError]", {
    context,
    error,
    request: { method: request.method, path: request.path },
  });
};
