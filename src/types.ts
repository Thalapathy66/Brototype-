export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: string;
  status: "pending" | "in-progress" | "resolved";
  priority: "low" | "medium" | "high";
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  assignedTo?: string;
  resolution?: string;
}

export interface UserData {
  name: string;
  username?: string;
  phone?: string;
  bio?: string;
  isAdmin?: boolean;
}

export const ADMIN_CREDENTIALS = {
  email: "admin@brototype.com",
  password: "admin123",
};

export const COMPLAINT_CATEGORIES = [
  "Technical Issue",
  "Infrastructure",
  "Course Content",
  "Mentor Support",
  "Administrative",
  "Other",
];

export const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    color: "bg-red-500",
    textColor: "text-red-500",
    bgColor: "bg-red-50 dark:bg-red-900/20",
  },
  "in-progress": {
    label: "In Progress",
    color: "bg-yellow-500",
    textColor: "text-yellow-600",
    bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
  },
  resolved: {
    label: "Resolved",
    color: "bg-green-500",
    textColor: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-900/20",
  },
};
