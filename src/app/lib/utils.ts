import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Mock data utilities
export const generateMockCustomers = () => [
  {
    id: "1",
    name: "Sarah Johnson",
    phone: "+1 (555) 123-4567",
    email: "sarah.j@email.com",
    lastVisit: new Date("2026-05-14"),
    totalVisits: 12,
    status: "active",
  },
  {
    id: "2",
    name: "Michael Chen",
    phone: "+1 (555) 234-5678",
    email: "m.chen@email.com",
    lastVisit: new Date("2026-04-20"),
    totalVisits: 8,
    status: "needs_contact",
  },
  {
    id: "3",
    name: "Emma Williams",
    phone: "+1 (555) 345-6789",
    email: "emma.w@email.com",
    lastVisit: new Date("2026-05-12"),
    totalVisits: 24,
    status: "active",
  },
  {
    id: "4",
    name: "James Rodriguez",
    phone: "+1 (555) 456-7890",
    email: "j.rodriguez@email.com",
    lastVisit: new Date("2026-03-28"),
    totalVisits: 5,
    status: "needs_contact",
  },
  {
    id: "5",
    name: "Olivia Martinez",
    phone: "+1 (555) 567-8901",
    email: "olivia.m@email.com",
    lastVisit: new Date("2026-05-10"),
    totalVisits: 16,
    status: "active",
  },
  {
    id: "6",
    name: "David Kim",
    phone: "+1 (555) 678-9012",
    email: "d.kim@email.com",
    lastVisit: new Date("2026-04-15"),
    totalVisits: 3,
    status: "needs_contact",
  },
  {
    id: "7",
    name: "Sophia Anderson",
    phone: "+1 (555) 789-0123",
    email: "sophia.a@email.com",
    lastVisit: new Date("2026-05-13"),
    totalVisits: 19,
    status: "active",
  },
  {
    id: "8",
    name: "Daniel Lee",
    phone: "+1 (555) 890-1234",
    email: "daniel.lee@email.com",
    lastVisit: new Date("2026-04-01"),
    totalVisits: 7,
    status: "needs_contact",
  },
];

export const generateMockVisits = () => [
  {
    id: "v1",
    customerId: "1",
    customerName: "Sarah Johnson",
    date: new Date("2026-05-14"),
    duration: "45 min",
    notes: "Regular checkup",
  },
  {
    id: "v2",
    customerId: "3",
    customerName: "Emma Williams",
    date: new Date("2026-05-12"),
    duration: "30 min",
    notes: "Follow-up appointment",
  },
  {
    id: "v3",
    customerId: "7",
    customerName: "Sophia Anderson",
    date: new Date("2026-05-13"),
    duration: "60 min",
    notes: "Consultation",
  },
  {
    id: "v4",
    customerId: "5",
    customerName: "Olivia Martinez",
    date: new Date("2026-05-10"),
    duration: "40 min",
    notes: "Treatment session",
  },
  {
    id: "v5",
    customerId: "1",
    customerName: "Sarah Johnson",
    date: new Date("2026-05-08"),
    duration: "35 min",
    notes: "Quick visit",
  },
];

export const calculateDaysSinceVisit = (lastVisit: Date): number => {
  const today = new Date("2026-05-15");
  const diffTime = Math.abs(today.getTime() - lastVisit.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const isEligibleForContact = (lastVisit: Date): boolean => {
  return calculateDaysSinceVisit(lastVisit) >= 15;
};
