import { create } from "zustand";

interface AppState {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  commandOpen: boolean;
  setCommandOpen: (open: boolean) => void;
  aiPanelOpen: boolean;
  toggleAiPanel: () => void;
  activeCompany: string;
  setActiveCompany: (name: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  sidebarCollapsed: false,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  commandOpen: false,
  setCommandOpen: (open) => set({ commandOpen: open }),
  aiPanelOpen: false,
  toggleAiPanel: () => set((s) => ({ aiPanelOpen: !s.aiPanelOpen })),
  activeCompany: "Nexus Holdings",
  setActiveCompany: (name) => set({ activeCompany: name }),
}));
