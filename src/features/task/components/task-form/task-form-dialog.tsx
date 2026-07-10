"use client";

import { useState } from "react";

import { PlusIcon } from "@heroicons/react/24/solid";

import { Button } from "#/components/ui/button";
import { DialogBody, DialogHeader } from "#/components/ui/dialog";
import { Modal, ModalContent } from "#/components/ui/modal";

import { TaskForm } from "./task-form";

export const TaskFormDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button
        intent="primary"
        size="sq-lg"
        isCircle
        aria-label="新しいタスクを追加"
        className="fixed right-6 bottom-6 z-40 shadow-lg"
      >
        <PlusIcon data-slot="icon" />
      </Button>
      <ModalContent isDismissable>
        <DialogHeader title="新しいタスク" />
        <DialogBody className="pb-(--gutter)">
          <TaskForm
            onSuccess={() => {
              setIsOpen(false);
            }}
          />
        </DialogBody>
      </ModalContent>
    </Modal>
  );
};
