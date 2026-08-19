import { Suspense } from "react";

import { AppBar } from "#/components/layout/app-bar";
import { AppBarSkeleton } from "#/components/layout/app-bar-skeleton";

const ProtectedLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <>
    <header className="border-line-subtle bg-surface sticky top-0 z-30 border-b">
      <Suspense fallback={<AppBarSkeleton />}>
        <AppBar />
      </Suspense>
    </header>
    {children}
  </>
);

export default ProtectedLayout;
