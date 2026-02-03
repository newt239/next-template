"use client";

import { Keyboard as KeyboardPrimitive } from "react-aria-components";

import { twMerge } from "tailwind-merge";

export const Keyboard = ({
  className,
  ...props
}: React.ComponentProps<typeof KeyboardPrimitive>) => (
  <KeyboardPrimitive
    data-slot="keyboard"
    className={twMerge(
      "hidden font-mono text-[0.80rem] text-current/60 group-hover:text-fg group-focus:text-fg group-focus:opacity-90 group-disabled:opacity-50 lg:inline forced-colors:group-focus:text-[HighlightText]",
      className,
    )}
    {...props}
  />
);
