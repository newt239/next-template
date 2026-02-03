import { cx } from "#/lib/primitive";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

import { Link } from "./link";

export const Text = ({ className, ...props }: React.ComponentPropsWithoutRef<"p">) => (
  <p
    data-slot="text"
    {...props}
    className={twMerge("text-base/6 text-muted-fg sm:text-sm/6", className)}
  />
);

export const textLinkStyles = tv({
  base: "text-primary-subtle-fg decoration-primary-subtle-fg/50 hover:underline hover:decoration-primary-subtle-fg has-data-[slot=icon]:inline-flex has-data-[slot=icon]:items-center has-data-[slot=icon]:gap-x-1",
});

export const TextLink = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof Link>) => (
  <Link {...props} className={cx(textLinkStyles(), className)} />
);

export const Strong = ({ className, ...props }: React.ComponentPropsWithoutRef<"strong">) => (
  <strong {...props} className={twMerge("font-medium", className)} />
);

export const Code = ({ className, ...props }: React.ComponentPropsWithoutRef<"code">) => (
  <code
    {...props}
    className={twMerge(
      "rounded-sm border bg-muted px-0.5 font-medium text-sm sm:text-[0.8125rem]",
      className,
    )}
  />
);
