import { Suspense } from "react";

import { AppBarSkeleton } from "#/components/layout/app-bar-skeleton.tsx";
import { AppBar } from "#/components/layout/app-bar.tsx";

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
