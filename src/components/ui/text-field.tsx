"use client";

import { type TextFieldProps, TextField as TextFieldPrimitive } from "react-aria-components";

import { cx } from "#/lib/primitive";

import { fieldStyles } from "./field";

export const TextField = ({ className, ...props }: TextFieldProps) => (
  <TextFieldPrimitive data-slot="control" className={cx(fieldStyles(), className)} {...props} />
);
