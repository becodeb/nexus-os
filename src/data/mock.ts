import type {
  Client,
  Project,
  Employee,
  Invoice,
  DocumentItem,
  ActivityEvent,
  Automation,
} from "@/types";

const companies = [
  "Vantage Industries", "Loop Systems", "Meridian Labs", "Northwind Capital", "Orbital Freight",
  "Cascade Robotics", "Fathom Analytics", "Ridgeline Health", "Prism Studio", "Anchor Logistics",
  "Beacon Retail", "Halcyon Energy", "Solstice Media", "Vertex Manufacturing", "Cobalt Financial",
];

const people = [
  "Elena Marsh", "Diego Alvarez", "Priya Nair", "Tom Whitfield", "Sasha Kim", "Marcus Owusu",
  "Lena Voss", "James Okafor", "Naomi Chen", "Carlos Reyes", "Ingrid Solberg", "Yusuf Demir",
  "Ava Bergström", "Ravi Shankar", "Chloe Martin", "Noah Fitzgerald", "Mei Tanaka", "Leo Petrov",
];

function avatar(seed: string) {
  return `https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(seed)}&backgroundColor=18181b`;
}

function pick<T>(arr: T[], i: number) {
  return arr[i % arr.length];
}

export const clients: Client[] = companies.map((company, i) => {
  const statuses: Client["status"][] = ["active", "lead", "negotiation", "active", "churned"];
  const owner = pick(people, i);
  return {
    id: `client-${i + 1}`,
    company,
    logo: company[0],
    industry: pick(["SaaS", "Manufacturing", "Healthcare", "Finance", "Retail", "Logistics", "Media"], i),
    contact: pick(people, i + 3),
    contactEmail: `${pick(people, i + 3).split(" ")[0].toLowerCase()}@${company.toLowerCase().replace(/\s+/g, "")}.com`,
    status: pick(statuses, i),
    lastInteraction: `2026-${String(((i * 3) % 6) + 1).padStart(2, "0")}-${String(((i * 7) % 27) + 1).padStart(2, "0")}`,
    owner,
    ownerAvatar: avatar(owner),
    value: 8000 + ((i * 4231) % 92000),
    tags: [pick(["Enterprise", "Mid-market", "SMB"], i), pick(["Priority", "Renewal", "New", "Upsell"], i + 1)],
    contacts: [
      { id: `${i}-c1`, name: pick(people, i + 3), role: "VP Operations", email: `contact@${company.toLowerCase().replace(/\s+/g, "")}.com`, phone: "+1 (555) 010-0192" },
      { id: `${i}-c2`, name: pick(people, i + 6), role: "Finance Lead", email: `finance@${company.toLowerCase().replace(/\s+/g, "")}.com`, phone: "+1 (555) 010-0231" },
    ],
    notes: [
      { id: `${i}-n1`, author: owner, date: `2026-0${((i % 5) + 1)}-1${i % 9}`, text: "Quarterly review went well, expansion likely next cycle." },
      { id: `${i}-n2`, author: pick(people, i + 2), date: `2026-0${((i % 4) + 2)}-0${(i % 8) + 1}`, text: "Requested updated SLA docs and onboarding checklist." },
    ],
  };
});

export const projects: Project[] = Array.from({ length: 24 }).map((_, i) => {
  const statuses: Project["status"][] = ["pending", "in-progress", "review", "done"];
  const owner = pick(people, i + 1);
  return {
    id: `project-${i + 1}`,
    name: pick(
      ["Platform Migration", "Q3 Growth Campaign", "API Revamp", "Brand Refresh", "Onboarding Redesign",
       "Data Warehouse", "Mobile App v2", "Checkout Optimization", "Vendor Integration", "Security Audit",
       "Support Portal", "Analytics Suite"],
      i,
    ) + (i > 11 ? ` ${Math.floor(i / 12) + 1}` : ""),
    client: pick(companies, i + 2),
    owner,
    ownerAvatar: avatar(owner),
    priority: pick(["low", "medium", "high", "urgent"], i * 3 + 2),
    status: pick(statuses, i),
    dueDate: `2026-0${((i % 6) + 5) > 9 ? 9 : ((i % 6) + 5)}-${String(((i * 5) % 27) + 1).padStart(2, "0")}`,
    progress: (i * 13) % 100,
    budget: 12000 + ((i * 3721) % 58000),
    tags: [pick(["Design", "Engineering", "Marketing", "Ops"], i)],
  };
});

export const employees: Employee[] = people.map((name, i) => ({
  id: `emp-${i + 1}`,
  name,
  avatar: avatar(name),
  role: pick(
    ["Product Designer", "Senior Engineer", "Account Executive", "Engineering Manager", "Marketing Lead",
     "Customer Success", "Data Analyst", "Operations Manager", "Finance Analyst", "HR Partner"],
    i,
  ),
  department: pick(
    ["Product", "Engineering", "Sales", "Engineering", "Marketing", "Sales", "Finance", "Operations", "Finance", "Operations"],
    i,
  ),
  status: pick(["active", "active", "active", "away", "offline"], i),
  performance: 62 + ((i * 7) % 38),
  projects: 1 + (i % 5),
  email: `${name.split(" ")[0].toLowerCase()}@nexusos.io`,
  location: pick(["New York", "London", "Berlin", "Singapore", "Remote", "Austin"], i),
  startDate: `202${3 + (i % 3)}-0${(i % 9) + 1}-1${i % 9}`,
}));

export const invoices: Invoice[] = Array.from({ length: 18 }).map((_, i) => ({
  id: `INV-${2026}${String(1000 + i)}`,
  client: pick(companies, i),
  amount: 3200 + ((i * 2137) % 24000),
  status: pick(["paid", "paid", "pending", "overdue"], i),
  issueDate: `2026-0${(i % 6) + 1}-0${(i % 8) + 1}`,
  dueDate: `2026-0${(i % 6) + 2}-1${i % 9}`,
}));

export const documents: DocumentItem[] = [
  { id: "d1", name: "Client Contracts", type: "folder", size: "—", modified: "2026-07-08", modifiedBy: "Elena Marsh", permission: "team" },
  { id: "d2", name: "Financial Reports", type: "folder", size: "—", modified: "2026-07-07", modifiedBy: "Tom Whitfield", permission: "private" },
  { id: "d3", name: "Brand Assets", type: "folder", size: "—", modified: "2026-07-05", modifiedBy: "Naomi Chen", permission: "company" },
  { id: "d4", name: "Q3 Board Deck.slides", type: "slide", size: "18.2 MB", modified: "2026-07-06", modifiedBy: "Diego Alvarez", permission: "private" },
  { id: "d5", name: "Vendor Agreement - Cascade.pdf", type: "pdf", size: "1.4 MB", modified: "2026-07-04", modifiedBy: "Priya Nair", permission: "team" },
  { id: "d6", name: "Revenue Model 2026.sheet", type: "sheet", size: "882 KB", modified: "2026-07-03", modifiedBy: "Sasha Kim", permission: "private" },
  { id: "d7", name: "Onboarding Guide.doc", type: "doc", size: "412 KB", modified: "2026-07-02", modifiedBy: "Marcus Owusu", permission: "company" },
  { id: "d8", name: "Product Roadmap.doc", type: "doc", size: "290 KB", modified: "2026-06-30", modifiedBy: "Lena Voss", permission: "team" },
  { id: "d9", name: "Logo Kit — Final.image", type: "image", size: "6.1 MB", modified: "2026-06-28", modifiedBy: "James Okafor", permission: "company" },
  { id: "d10", name: "Security Audit Findings.pdf", type: "pdf", size: "2.3 MB", modified: "2026-06-25", modifiedBy: "Naomi Chen", permission: "private" },
];

export const activity: ActivityEvent[] = [
  { id: "a1", type: "client", actor: "Elena Marsh", actorAvatar: avatar("Elena Marsh"), action: "added a new client", target: "Vantage Industries", timestamp: new Date(Date.now() - 6 * 60000) },
  { id: "a2", type: "project", actor: "Diego Alvarez", actorAvatar: avatar("Diego Alvarez"), action: "moved to Review", target: "API Revamp", timestamp: new Date(Date.now() - 34 * 60000) },
  { id: "a3", type: "invoice", actor: "Tom Whitfield", actorAvatar: avatar("Tom Whitfield"), action: "generated invoice for", target: "Meridian Labs", timestamp: new Date(Date.now() - 62 * 60000) },
  { id: "a4", type: "task", actor: "Priya Nair", actorAvatar: avatar("Priya Nair"), action: "completed task on", target: "Mobile App v2", timestamp: new Date(Date.now() - 95 * 60000) },
  { id: "a5", type: "team", actor: "Sasha Kim", actorAvatar: avatar("Sasha Kim"), action: "joined the workspace as", target: "Data Analyst", timestamp: new Date(Date.now() - 3 * 3600000) },
  { id: "a6", type: "client", actor: "Marcus Owusu", actorAvatar: avatar("Marcus Owusu"), action: "updated status for", target: "Orbital Freight", timestamp: new Date(Date.now() - 5 * 3600000) },
  { id: "a7", type: "project", actor: "Naomi Chen", actorAvatar: avatar("Naomi Chen"), action: "created new project", target: "Security Audit", timestamp: new Date(Date.now() - 8 * 3600000) },
  { id: "a8", type: "invoice", actor: "Lena Voss", actorAvatar: avatar("Lena Voss"), action: "marked invoice as paid for", target: "Cascade Robotics", timestamp: new Date(Date.now() - 26 * 3600000) },
];

export const automations: Automation[] = [
  {
    id: "auto-1",
    name: "New client onboarding",
    active: true,
    trigger: { id: "t1", kind: "trigger", label: "New client created", description: "Fires when a client is added to CRM", icon: "UserPlus" },
    actions: [
      { id: "a1", kind: "action", label: "Create project", description: "Auto-create onboarding project", icon: "FolderPlus" },
      { id: "a2", kind: "action", label: "Assign team", description: "Assign account team based on industry", icon: "Users" },
      { id: "a3", kind: "action", label: "Send welcome email", description: "Trigger onboarding sequence", icon: "Mail" },
    ],
    runs: 128,
    lastRun: "2 hours ago",
  },
  {
    id: "auto-2",
    name: "Overdue invoice reminder",
    active: true,
    trigger: { id: "t2", kind: "trigger", label: "Invoice overdue 3+ days", description: "Fires on billing schedule check", icon: "AlertTriangle" },
    actions: [
      { id: "a4", kind: "action", label: "Notify finance lead", description: "Slack + email alert", icon: "Bell" },
      { id: "a5", kind: "action", label: "Send client reminder", description: "Automated payment reminder", icon: "Mail" },
    ],
    runs: 342,
    lastRun: "45 minutes ago",
  },
  {
    id: "auto-3",
    name: "Project deadline risk",
    active: false,
    trigger: { id: "t3", kind: "trigger", label: "Progress < 50% at 80% timeline", description: "Checks project health daily", icon: "TrendingDown" },
    actions: [
      { id: "a6", kind: "action", label: "Flag project as at-risk", description: "Update status badge", icon: "Flag" },
      { id: "a7", kind: "action", label: "Notify project owner", description: "Direct message alert", icon: "Bell" },
    ],
    runs: 56,
    lastRun: "1 day ago",
  },
];

export const revenueData = [
  { month: "Jan", revenue: 168000, target: 160000 },
  { month: "Feb", revenue: 179000, target: 170000 },
  { month: "Mar", revenue: 172000, target: 175000 },
  { month: "Apr", revenue: 191000, target: 180000 },
  { month: "May", revenue: 205000, target: 190000 },
  { month: "Jun", revenue: 214000, target: 200000 },
  { month: "Jul", revenue: 248500, target: 215000 },
];

export const productivityData = [
  { day: "Mon", score: 78 }, { day: "Tue", score: 84 }, { day: "Wed", score: 81 },
  { day: "Thu", score: 89 }, { day: "Fri", score: 86 }, { day: "Sat", score: 62 }, { day: "Sun", score: 58 },
];

export const clientGrowthData = [
  { month: "Jan", clients: 890 }, { month: "Feb", clients: 932 }, { month: "Mar", clients: 968 },
  { month: "Apr", clients: 1024 }, { month: "May", clients: 1091 }, { month: "Jun", clients: 1176 }, { month: "Jul", clients: 1248 },
];

export const projectStatusData = [
  { status: "Pending", count: projects.filter((p) => p.status === "pending").length, color: "#71717A" },
  { status: "In Progress", count: projects.filter((p) => p.status === "in-progress").length, color: "#3B82F6" },
  { status: "Review", count: projects.filter((p) => p.status === "review").length, color: "#F59E0B" },
  { status: "Done", count: projects.filter((p) => p.status === "done").length, color: "#22C55E" },
];

export const cashFlowData = [
  { month: "Jan", inflow: 210000, outflow: 142000 },
  { month: "Feb", inflow: 224000, outflow: 151000 },
  { month: "Mar", inflow: 198000, outflow: 148000 },
  { month: "Apr", inflow: 236000, outflow: 159000 },
  { month: "May", inflow: 251000, outflow: 163000 },
  { month: "Jun", inflow: 267000, outflow: 171000 },
  { month: "Jul", inflow: 289000, outflow: 178000 },
];

export const departmentBudget = [
  { department: "Engineering", value: 420000 },
  { department: "Sales", value: 268000 },
  { department: "Marketing", value: 195000 },
  { department: "Operations", value: 142000 },
  { department: "Support", value: 98000 },
];
