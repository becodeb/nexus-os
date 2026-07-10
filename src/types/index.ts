export type ClientStatus = "lead" | "active" | "negotiation" | "churned";
export type Priority = "low" | "medium" | "high" | "urgent";
export type ProjectStatus = "pending" | "in-progress" | "review" | "done";
export type TaskStatus = ProjectStatus;

export interface Contact {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
}

export interface Client {
  id: string;
  company: string;
  logo: string;
  industry: string;
  contact: string;
  contactEmail: string;
  status: ClientStatus;
  lastInteraction: string;
  owner: string;
  ownerAvatar: string;
  value: number;
  tags: string[];
  contacts: Contact[];
  notes: { id: string; author: string; date: string; text: string }[];
}

export interface Project {
  id: string;
  name: string;
  client: string;
  owner: string;
  ownerAvatar: string;
  priority: Priority;
  status: ProjectStatus;
  dueDate: string;
  progress: number;
  budget: number;
  tags: string[];
}

export interface Employee {
  id: string;
  name: string;
  avatar: string;
  role: string;
  department: string;
  status: "active" | "away" | "offline";
  performance: number;
  projects: number;
  email: string;
  location: string;
  startDate: string;
}

export interface Invoice {
  id: string;
  client: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  issueDate: string;
  dueDate: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  type: "folder" | "pdf" | "doc" | "sheet" | "image" | "slide";
  size: string;
  modified: string;
  modifiedBy: string;
  permission: "private" | "team" | "company";
}

export interface ActivityEvent {
  id: string;
  type: "client" | "project" | "invoice" | "task" | "team";
  actor: string;
  actorAvatar: string;
  action: string;
  target: string;
  timestamp: Date;
}

export interface AutomationStep {
  id: string;
  kind: "trigger" | "action";
  label: string;
  description: string;
  icon: string;
}

export interface Automation {
  id: string;
  name: string;
  active: boolean;
  trigger: AutomationStep;
  actions: AutomationStep[];
  runs: number;
  lastRun: string;
}
