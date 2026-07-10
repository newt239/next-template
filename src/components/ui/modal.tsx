"use client";

import {
  type DialogTriggerProps,
  type ModalOverlayProps,
  DialogTrigger,
  ModalOverlay,
  Modal as ModalPrimitive,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

import { Dialog, DialogCloseIcon } from "./dialog";

const Modal = (props: DialogTriggerProps) => <DialogTrigger {...props} />;

type ModalContentProps = {
  children?: React.ReactNode;
  className?: string;
} & Omit<ModalOverlayProps, "className" | "children"> &
  Pick<React.ComponentProps<typeof Dialog>, "aria-label" | "aria-labelledby" | "role">;

const ModalContent = ({
  isDismissable = true,
  className,
  children,
  role,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  ...props
}: ModalContentProps) => (
  <ModalOverlay
    isDismissable={isDismissable}
    className="fixed inset-0 z-50 grid place-items-end bg-black/40 p-4 [--visual-viewport-vertical-padding:32px] sm:place-items-center"
    {...props}
  >
    <ModalPrimitive
      className={twMerge(
        "bg-overlay text-overlay-fg ring-line-subtle w-full max-w-lg rounded-xl shadow-lg ring",
        className,
      )}
    >
      <Dialog role={role} aria-label={ariaLabel} aria-labelledby={ariaLabelledby}>
        {children}
        <DialogCloseIcon isDismissable={isDismissable} />
      </Dialog>
    </ModalPrimitive>
  </ModalOverlay>
);

export type { ModalContentProps };
export { Modal, ModalContent };
