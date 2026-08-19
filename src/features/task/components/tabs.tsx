"use client";

import Link from "next/link";

import { Tab, TabList, TabPanel, Tabs } from "#/components/ui/tabs";

import type { TaskStatus } from "#/features/task/lib/type";

type TaskTabsProps = {
  status: TaskStatus;
  children: React.ReactNode;
};

export const TaskTabs = ({ status, children }: TaskTabsProps) => (
  <Tabs selectedKey={status} className="self-stretch">
    <TabList aria-label="タスクの絞り込み">
      <Tab
        id="incomplete"
        href="/"
        render={(props) => ("href" in props ? <Link {...props} href="/" /> : <div {...props} />)}
      >
        未着手
      </Tab>
      <Tab
        id="completed"
        href="/?status=completed"
        render={(props) =>
          "href" in props ? <Link {...props} href="/?status=completed" /> : <div {...props} />
        }
      >
        完了済み
      </Tab>
    </TabList>
    <TabPanel id={status}>{children}</TabPanel>
  </Tabs>
);
