"use client";

import { composeRenderProps } from "react-aria-components";
import { type ClassNameValue, twMerge } from "tailwind-merge";

type Render<T> = string | ((v: T) => string) | undefined;

export const cx = <T = unknown>(
  ...args: [...ClassNameValue[], Render<T>]
): string | ((v: T) => string) => {
  const className = args.at(-1);
  const tailwinds = args.slice(0, -1).filter((value) => typeof value !== "function");

  const fixed = twMerge(tailwinds);

  return composeRenderProps(className, (cn) => twMerge(fixed, cn));
};
