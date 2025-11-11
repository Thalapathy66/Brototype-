import { useState } from "react";

interface UserData {
  name: string;
  username?: string;
  phone?: string;
  bio?: string;
}

interface ProfileProps {
  userData: UserData;
  onUpdateProfile: (updatedData: UserData) => void;
  onBack: () => void;
}

export function ProfilePage({ userData, onUpdateProfile, onBack }: ProfileProps) {
  const [formData, setFormData] = useState<UserData>(userData);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      onUpdateProfile(formData);
      setIsSaving(false);
      alert("Profile updated successfully!");
    }, 500);
  };

  const handleChange = (field: keyof UserData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex flex-1">
      <div className="p-4 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-6 flex-1 w-full h-full overflow-y-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">Profile Settings</h1>
          <button
            onClick={onBack}
            className="px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition"
          >
            Back to Dashboard
          </button>
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
          {/* Profile Picture */}
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-3xl font-bold">
              {formData.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">Profile Picture</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Currently showing first letter of your name. Custom image upload coming soon!
              </p>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
              className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              placeholder="Enter your full name"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Username
            </label>
            <input
              type="text"
              value={formData.username || ""}
              onChange={(e) => handleChange("username", e.target.value)}
              className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              placeholder="@username"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              placeholder="+1 (555) 123-4567"
            />
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Phone verification coming soon
            </p>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Bio
            </label>
            <textarea
              value={formData.bio || ""}
              onChange={(e) => handleChange("bio", e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
              placeholder="Tell us about yourself..."
            />
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Maximum 500 characters
            </p>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={isSaving}
            className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
