import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";
import { TopBar } from "./topbar";
import { CommandPalette } from "./command-palette";
import { AiPanel } from "./ai-panel";

export function AppShell() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-base-bg">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[1400px] px-6 py-6">
            <Outlet />
          </div>
        </main>
      </div>
      <AiPanel />
      <CommandPalette />
    </div>
  );
}
