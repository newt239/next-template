import { twMerge } from "tailwind-merge";

const Skeleton = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    data-slot="skeleton"
    className={twMerge("bg-muted animate-pulse rounded-lg", className)}
    {...props}
  />
);

export { Skeleton };
