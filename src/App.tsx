import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppShell } from "@/components/navigation/app-shell";
import Dashboard from "@/pages/dashboard";
import Crm from "@/pages/crm";
import ClientDetail from "@/pages/client-detail";
import Projects from "@/pages/projects";
import Team from "@/pages/team";
import Finance from "@/pages/finance";
import Documents from "@/pages/documents";
import Automations from "@/pages/automations";
import Reports from "@/pages/reports";
import Settings from "@/pages/settings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/clients" element={<Crm />} />
          <Route path="/clients/:id" element={<ClientDetail />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/team" element={<Team />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/automations" element={<Automations />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
