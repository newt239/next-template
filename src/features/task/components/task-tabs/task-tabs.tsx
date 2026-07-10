"use client";

import { useRouter } from "next/navigation";

import { Tab, TabList, TabPanel, Tabs } from "#/components/ui/tabs";

import type { TaskStatus } from "#/features/task/types/task";

type TaskTabsProps = {
  status: TaskStatus;
  children: React.ReactNode;
};

export const TaskTabs = ({ status, children }: TaskTabsProps) => {
  const router = useRouter();

  return (
    <Tabs
      selectedKey={status}
      onSelectionChange={(key) => {
        router.push(key === "completed" ? "/?status=completed" : "/");
      }}
      className="self-stretch"
    >
      <TabList aria-label="タスクの絞り込み">
        <Tab id="incomplete">未着手</Tab>
        <Tab id="completed">完了済み</Tab>
      </TabList>
      <TabPanel id={status}>{children}</TabPanel>
    </Tabs>
  );
};
