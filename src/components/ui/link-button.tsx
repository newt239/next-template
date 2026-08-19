"use client";

import type { Route } from "next";

import Link from "next/link";

import { buttonStyles } from "./button";

import type { VariantProps } from "tailwind-variants";

type LinkButtonProps = VariantProps<typeof buttonStyles> & {
  href: Route;
  children: React.ReactNode;
  className?: string;
};

export const LinkButton = ({ href, children, className, ...variants }: LinkButtonProps) => (
  <Link href={href} className={buttonStyles({ ...variants, className })}>
    {children}
  </Link>
);
