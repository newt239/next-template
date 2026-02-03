"use client";

import {
  type FieldErrorProps,
  type LabelProps,
  type TextProps,
  FieldError as FieldErrorPrimitive,
  Label as LabelPrimitive,
  Text,
} from "react-aria-components";

import { cx } from "#/lib/primitive";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

export const labelStyles = tv({
  base: "select-none text-base/6 text-fg in-disabled:opacity-50 group-disabled:opacity-50 sm:text-sm/6",
});

export const descriptionStyles = tv({
  base: "block text-muted-fg text-sm/6 in-disabled:opacity-50 group-disabled:opacity-50",
});

export const fieldErrorStyles = tv({
  base: "block text-danger-subtle-fg text-sm/6 in-disabled:opacity-50 group-disabled:opacity-50 forced-colors:text-[Mark]",
});

export const fieldStyles = tv({
  base: [
    "w-full",
    "[&>[data-slot=label]+[data-slot=control]]:mt-2",
    "[&>[data-slot=label]+[data-slot=control]]:mt-2",
    "[&>[data-slot=label]+[slot='description']]:mt-1",
    "[&>[slot=description]+[data-slot=control]]:mt-2",
    "[&>[data-slot=control]+[slot=description]]:mt-2",
    "[&>[data-slot=control]+[slot=errorMessage]]:mt-2",
    "*:data-[slot=label]:font-medium",
    "in-disabled:opacity-50 disabled:opacity-50",
  ],
});

export const Label = ({ className, ...props }: LabelProps) => (
  <LabelPrimitive data-slot="label" {...props} className={labelStyles({ className })} />
);

export const Description = ({ className, ...props }: TextProps) => (
  <Text {...props} slot="description" className={descriptionStyles({ className })} />
);

export const Fieldset = ({ className, ...props }: React.ComponentProps<"fieldset">) => (
  <fieldset
    className={twMerge("*:data-[slot=text]:mt-1 [&>*+[data-slot=control]]:mt-6", className)}
    {...props}
  />
);

export const FieldGroup = ({ className, ...props }: React.ComponentPropsWithoutRef<"div">) => (
  <div data-slot="control" className={twMerge("space-y-6", className)} {...props} />
);

export const FieldError = ({ className, ...props }: FieldErrorProps) => (
  <FieldErrorPrimitive {...props} className={cx(fieldErrorStyles(), className)} />
);

export const Legend = ({ className, ...props }: React.ComponentProps<"legend">) => (
  <legend
    data-slot="legend"
    {...props}
    className={twMerge("font-semibold text-base/6 data-disabled:opacity-50", className)}
  />
);
