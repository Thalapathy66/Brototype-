import { useState, useEffect } from "react";
import { UserData } from "./types";
import { Download, Users, Check, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface UsersPageProps {
  userData: UserData;
}

export function UsersPage({ userData }: UsersPageProps) {
  const [allUsers, setAllUsers] = useState<UserData[]>([]);

  useEffect(() => {
    // Load all users from localStorage
    const users: UserData[] = [];
    const allKeys = Object.keys(localStorage);
    const userDataKeys = allKeys.filter(key => key.startsWith("userData_"));
    
    for (const key of userDataKeys) {
      const storedData = localStorage.getItem(key);
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          if (!parsedData.isAdmin) { // Exclude admin from user list
            users.push(parsedData);
          }
        } catch (e) {
          console.error("Error parsing user data:", e);
        }
      }
    }
    
    setAllUsers(users);
  }, []);

  const downloadUsersCSV = () => {
    if (allUsers.length === 0) {
      alert("No users to export");
      return;
    }

    // Create CSV content
    const headers = ["Name", "Email", "Username", "Phone", "Email Verified", "Phone Verified", "Bio"];
    const rows = allUsers.map(user => [
      user.name,
      user.email,
      user.username || "Not set",
      user.phone || "Not set",
      user.emailVerified ? "Yes" : "No",
      user.phoneVerified ? "Yes" : "No",
      user.bio || "No bio"
    ]);

    let csvContent = headers.join(",") + "\n";
    rows.forEach(row => {
      csvContent += row.map(cell => `"${cell}"`).join(",") + "\n";
    });

    // Download as CSV
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `brototype-users-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadUsersTXT = () => {
    if (allUsers.length === 0) {
      alert("No users to export");
      return;
    }

    const content = `
BROTOTYPE REGISTERED USERS
===========================
Generated: ${new Date().toLocaleString()}
Total Users: ${allUsers.length}

${allUsers.map((user, index) => `
USER #${index + 1}
${"=".repeat(50)}

Name: ${user.name}
Email: ${user.email}
Username: ${user.username || "Not set"}
Phone: ${user.phone || "Not set"}
Email Verified: ${user.emailVerified ? "Yes" : "No"}
Phone Verified: ${user.phoneVerified ? "Yes" : "No"}
Bio: ${user.bio || "No bio provided"}

`).join("\n" + "=".repeat(50) + "\n")}

END OF REPORT
---
Generated from Brototalk Complaint Management System
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `brototype-users-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!userData.isAdmin) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">
            Access Denied
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            Only administrators can access this page
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1">
      <div className="p-4 md:p-8 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-6 flex-1 w-full h-full overflow-y-auto">
        {/* Header with Theme Toggle */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">
              Registered Users
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 mt-2">
              View and export all registered users
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <button
                onClick={downloadUsersTXT}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Export TXT</span>
              </button>
              <button
                onClick={downloadUsersCSV}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
            </div>
            <ThemeToggle />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 dark:text-blue-400">Total Users</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  {allUsers.length}
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-xl border border-green-200 dark:border-green-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 dark:text-green-400">Email Verified</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                  {allUsers.filter(u => u.emailVerified).length}
                </p>
              </div>
              <Check className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-xl border border-purple-200 dark:border-purple-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 dark:text-purple-400">Phone Verified</p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                  {allUsers.filter(u => u.phoneVerified).length}
                </p>
              </div>
              <Check className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-100 dark:bg-neutral-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                    Verified
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                {allUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-neutral-500 dark:text-neutral-400">
                      No registered users yet
                    </td>
                  </tr>
                ) : (
                  allUsers.map((user, index) => (
                    <tr key={index} className="hover:bg-neutral-50 dark:hover:bg-neutral-700/50">
                      <td className="px-4 py-3 text-sm text-neutral-900 dark:text-neutral-100">
                        {user.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">
                        {user.email}
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">
                        {user.username || "-"}
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">
                        {user.phone || "-"}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <span title="Email verification">
                            {user.emailVerified ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <X className="w-4 h-4 text-red-500" />
                            )}
                          </span>
                          <span title="Phone verification">
                            {user.phoneVerified ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <X className="w-4 h-4 text-red-500" />
                            )}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
