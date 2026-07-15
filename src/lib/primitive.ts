"use client";

import { composeRenderProps } from "react-aria-components";
import { type ClassNameValue, twMerge } from "tailwind-merge";

type Render<T> = string | ((v: T) => string) | undefined;

type CxArgs<T> = [...ClassNameValue[], Render<T>] | [[...ClassNameValue[], Render<T>]];

export const cx = <T = unknown>(...args: CxArgs<T>): string | ((v: T) => string) => {
  const resolvedArgs = args.length === 1 && Array.isArray(args[0]) ? args[0] : args;

  const className = resolvedArgs.pop() as Render<T>;
  const tailwinds = resolvedArgs as ClassNameValue[];

  const fixed = twMerge(...tailwinds);

  return composeRenderProps(className, (cn) => twMerge(fixed, cn));
};
