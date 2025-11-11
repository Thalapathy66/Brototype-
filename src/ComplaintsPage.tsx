import { useState, useEffect } from "react";
import { Toolbar } from "@/components/ui/toolbar";
import { CreateComplaintModal } from "./CreateComplaintModal";
import { ComplaintDetailsModal } from "./ComplaintDetailsModal";
import { Complaint, STATUS_CONFIG, UserData } from "./types";
import { AlertCircle, CheckCircle, Clock, TrendingUp } from "lucide-react";

interface ComplaintsPageProps {
  userData: UserData;
}

export function ComplaintsPage({ userData }: ComplaintsPageProps) {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [filteredComplaints, setFilteredComplaints] = useState<Complaint[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Debug: Log user data to verify admin status
  useEffect(() => {
    console.log("ComplaintsPage - userData:", userData);
    console.log("ComplaintsPage - isAdmin:", userData.isAdmin);
  }, [userData]);

  // Load complaints from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("complaints");
    if (saved) {
      const parsed = JSON.parse(saved);
      // Convert date strings back to Date objects
      const complaintsWithDates = parsed.map((c: Complaint) => ({
        ...c,
        createdAt: new Date(c.createdAt),
        updatedAt: new Date(c.updatedAt),
      }));
      setComplaints(complaintsWithDates);
      setFilteredComplaints(complaintsWithDates);
    }
  }, []);

  // Save complaints to localStorage
  useEffect(() => {
    if (complaints.length > 0) {
      localStorage.setItem("complaints", JSON.stringify(complaints));
    }
  }, [complaints]);

  // Filter complaints based on search
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = complaints.filter(
        (c) =>
          c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredComplaints(filtered);
    } else {
      setFilteredComplaints(complaints);
    }
  }, [searchQuery, complaints]);

  const handleCreateComplaint = (data: {
    title: string;
    description: string;
    category: string;
    priority: "low" | "medium" | "high";
  }) => {
    const newComplaint: Complaint = {
      id: Date.now().toString(),
      ...data,
      status: "pending",
      createdBy: userData.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setComplaints((prev) => [newComplaint, ...prev]);
  };

  const handleStatusChange = (
    complaintId: string,
    newStatus: Complaint["status"],
    resolution?: string
  ) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === complaintId
          ? {
              ...c,
              status: newStatus,
              resolution: resolution || c.resolution,
              updatedAt: new Date(),
            }
          : c
      )
    );
  };

  // Statistics
  const stats = {
    total: complaints.length,
    pending: complaints.filter((c) => c.status === "pending").length,
    inProgress: complaints.filter((c) => c.status === "in-progress").length,
    resolved: complaints.filter((c) => c.status === "resolved").length,
  };

  return (
    <div className="flex flex-1">
      <div className="p-4 md:p-8 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-6 flex-1 w-full h-full overflow-y-auto">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">
            {userData.isAdmin ? "Complaints Management" : "My Complaints"}
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-2">
            {userData.isAdmin
              ? "Manage and resolve student complaints"
              : "Track and manage your submitted complaints"}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 dark:text-blue-400">Total</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  {stats.total}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 p-4 rounded-xl border border-red-200 dark:border-red-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600 dark:text-red-400">Pending</p>
                <p className="text-2xl font-bold text-red-900 dark:text-red-100">
                  {stats.pending}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 p-4 rounded-xl border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-600 dark:text-yellow-400">In Progress</p>
                <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">
                  {stats.inProgress}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-xl border border-green-200 dark:border-green-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 dark:text-green-400">Resolved</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                  {stats.resolved}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <Toolbar
          onSearch={setSearchQuery}
          onCreateClick={() => setIsCreateModalOpen(true)}
        />

        {/* Complaints List */}
        <div className="space-y-3">
          {filteredComplaints.length === 0 ? (
            <div className="text-center py-12 text-neutral-500 dark:text-neutral-400">
              {searchQuery ? "No complaints found matching your search" : "No complaints yet"}
            </div>
          ) : (
            filteredComplaints.map((complaint) => {
              const statusConfig = STATUS_CONFIG[complaint.status];
              return (
                <div
                  key={complaint.id}
                  onClick={() => setSelectedComplaint(complaint)}
                  className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-4 hover:shadow-md transition cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                          {complaint.title}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig.bgColor} ${statusConfig.textColor}`}
                        >
                          {statusConfig.label}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          complaint.priority === "high"
                            ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                            : complaint.priority === "medium"
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                            : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                        }`}>
                          {complaint.priority}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                        {complaint.description}
                      </p>
                      <div className="flex items-center gap-4 mt-3 text-xs text-neutral-500">
                        <span>{complaint.category}</span>
                        <span>•</span>
                        <span>{complaint.createdBy}</span>
                        <span>•</span>
                        <span>{new Date(complaint.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Modals */}
      <CreateComplaintModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateComplaint}
      />

      <ComplaintDetailsModal
        complaint={selectedComplaint}
        isOpen={!!selectedComplaint}
        onClose={() => setSelectedComplaint(null)}
        isAdmin={userData.isAdmin || false}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
