"use client";

import { type TextAreaProps, TextArea } from "react-aria-components";

import { cx } from "#/lib/primitive";
import { twJoin } from "tailwind-merge";

export const Textarea = ({ className, ...props }: TextAreaProps) => (
  <span data-slot="control" className="relative block w-full">
    <TextArea
      {...props}
      className={cx(
        twJoin([
          "field-sizing-content relative block min-h-16 w-full appearance-none rounded-lg px-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)] sm:px-[calc(--spacing(3)-1px)] sm:py-[calc(--spacing(1.5)-1px)]",
          "text-base/6 text-fg placeholder:text-muted-fg sm:text-sm/6",
          "border border-input enabled:hover:border-muted-fg/30",
          "outline-hidden focus:border-ring/70 focus:ring-3 focus:ring-ring/20 focus:enabled:hover:border-ring/80",
          "invalid:border-danger-subtle-fg/70 focus:invalid:border-danger-subtle-fg/70 focus:invalid:ring-danger-subtle-fg/20 invalid:enabled:hover:border-danger-subtle-fg/80 invalid:focus:enabled:hover:border-danger-subtle-fg/80",
          "disabled:bg-muted forced-colors:in-disabled:text-[GrayText]",
          "in-disabled:bg-muted forced-colors:in-disabled:text-[GrayText]",
          "dark:scheme-dark",
        ]),
        className,
      )}
    />
  </span>
);
