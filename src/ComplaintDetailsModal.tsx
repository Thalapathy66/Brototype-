import { useState } from "react";
import { Complaint, STATUS_CONFIG } from "./types";
import { X, Calendar, User, AlertCircle, CheckCircle, Clock } from "lucide-react";

interface ComplaintDetailsModalProps {
  complaint: Complaint | null;
  isOpen: boolean;
  onClose: () => void;
  isAdmin: boolean;
  onStatusChange?: (complaintId: string, newStatus: Complaint["status"], resolution?: string) => void;
}

export function ComplaintDetailsModal({
  complaint,
  isOpen,
  onClose,
  isAdmin,
  onStatusChange,
}: ComplaintDetailsModalProps) {
  const [newStatus, setNewStatus] = useState<Complaint["status"]>(complaint?.status || "pending");
  const [resolution, setResolution] = useState("");

  if (!isOpen || !complaint) return null;

  const handleStatusUpdate = () => {
    if (onStatusChange) {
      onStatusChange(complaint.id, newStatus, resolution);
      onClose();
    }
  };

  const statusConfig = STATUS_CONFIG[complaint.status];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Complaint Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status Badge */}
          <div className="flex items-center gap-3">
            <div
              className={`px-4 py-2 rounded-full ${statusConfig.bgColor} flex items-center gap-2`}
            >
              {complaint.status === "pending" && <AlertCircle className={`w-4 h-4 ${statusConfig.textColor}`} />}
              {complaint.status === "in-progress" && <Clock className={`w-4 h-4 ${statusConfig.textColor}`} />}
              {complaint.status === "resolved" && <CheckCircle className={`w-4 h-4 ${statusConfig.textColor}`} />}
              <span className={`text-sm font-medium ${statusConfig.textColor}`}>
                {statusConfig.label}
              </span>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              complaint.priority === "high"
                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                : complaint.priority === "medium"
                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            }`}>
              {complaint.priority.toUpperCase()} PRIORITY
            </span>
          </div>

          {/* Title */}
          <div>
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              {complaint.title}
            </h3>
            <p className="text-sm text-zinc-500 mt-1">{complaint.category}</p>
          </div>

          {/* Meta Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <User className="w-4 h-4" />
              <span>Reported by: <strong>{complaint.createdBy}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <Calendar className="w-4 h-4" />
              <span>{new Date(complaint.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
              Description
            </h4>
            <p className="text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap">
              {complaint.description}
            </p>
          </div>

          {/* Resolution (if exists) */}
          {complaint.resolution && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-green-900 dark:text-green-100 mb-2">
                Resolution
              </h4>
              <p className="text-green-800 dark:text-green-200">
                {complaint.resolution}
              </p>
            </div>
          )}

          {/* Admin Actions */}
          {isAdmin && (
            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6 space-y-4">
              <h4 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Admin Actions
              </h4>

              {/* Status Update */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Update Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as Complaint["status"])}
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-fuchsia-500 outline-none"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>

              {/* Resolution Text */}
              {newStatus === "resolved" && (
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Resolution Details
                  </label>
                  <textarea
                    value={resolution}
                    onChange={(e) => setResolution(e.target.value)}
                    rows={4}
                    placeholder="Describe how this complaint was resolved..."
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-fuchsia-500 outline-none resize-none"
                  />
                </div>
              )}

              <button
                onClick={handleStatusUpdate}
                className="w-full py-2 px-4 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-700 transition font-medium"
              >
                Update Status
              </button>
            </div>
          )}

          {/* Close Button for Non-Admin */}
          {!isAdmin && (
            <button
              onClick={onClose}
              className="w-full py-2 px-4 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
