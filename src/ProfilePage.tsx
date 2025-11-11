import { useState, useEffect } from "react";
import { UserData } from "./types";
import { Mail, Phone, Check, AlertCircle } from "lucide-react";

interface ProfileProps {
  userData: UserData;
  onUpdateProfile: (updatedData: UserData) => void;
  onBack: () => void;
}

export function ProfilePage({ userData, onUpdateProfile, onBack }: ProfileProps) {
  const [formData, setFormData] = useState<UserData>(userData);
  const [isSaving, setIsSaving] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [emailVerificationCode, setEmailVerificationCode] = useState("");
  const [phoneVerificationCode, setPhoneVerificationCode] = useState("");
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [showPhoneVerification, setShowPhoneVerification] = useState(false);
  const [generatedEmailCode, setGeneratedEmailCode] = useState("");
  const [generatedPhoneCode, setGeneratedPhoneCode] = useState("");

  useEffect(() => {
    setFormData(userData);
  }, [userData]);

  // Check username availability
  const checkUsernameAvailability = (username: string) => {
    if (!username || username.trim() === "") {
      setUsernameError("");
      return;
    }

    // Get all user data from localStorage
    const allKeys = Object.keys(localStorage);
    const userDataKeys = allKeys.filter(key => key.startsWith("userData_"));
    
    for (const key of userDataKeys) {
      const storedData = localStorage.getItem(key);
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          if (parsedData.username === username && parsedData.email !== userData.email) {
            setUsernameError("This username is already taken");
            return;
          }
        } catch (e) {
          // Ignore parsing errors
        }
      }
    }
    
    setUsernameError("");
  };

  const handleUsernameChange = (value: string) => {
    setFormData((prev) => ({ ...prev, username: value }));
    checkUsernameAvailability(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (usernameError) {
      alert("Please fix the errors before saving");
      return;
    }

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

  // Email Verification
  const sendEmailVerification = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedEmailCode(code);
    setShowEmailVerification(true);
    // In a real app, send this code to the email
    console.log("Email verification code:", code);
    alert(`Verification code sent to ${formData.email}!\n\n(For demo: Code is ${code})\n\nIn production, this would be sent via email service.`);
  };

  const verifyEmail = () => {
    if (emailVerificationCode === generatedEmailCode) {
      setFormData((prev) => ({ ...prev, emailVerified: true }));
      onUpdateProfile({ ...formData, emailVerified: true });
      setShowEmailVerification(false);
      setEmailVerificationCode("");
      alert("Email verified successfully!");
    } else {
      alert("Invalid verification code");
    }
  };

  // Phone Verification
  const sendPhoneVerification = () => {
    if (!formData.phone || formData.phone.trim() === "") {
      alert("Please enter a phone number first");
      return;
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedPhoneCode(code);
    setShowPhoneVerification(true);
    // In a real app, send this via SMS/WhatsApp
    console.log("Phone verification code:", code);
    alert(`Verification code sent to ${formData.phone}!\n\n(For demo: Code is ${code})\n\nIn production, this would be sent via SMS/WhatsApp.`);
  };

  const verifyPhone = () => {
    if (phoneVerificationCode === generatedPhoneCode) {
      setFormData((prev) => ({ ...prev, phoneVerified: true }));
      onUpdateProfile({ ...formData, phoneVerified: true });
      setShowPhoneVerification(false);
      setPhoneVerificationCode("");
      alert("Phone verified successfully!");
    } else {
      alert("Invalid verification code");
    }
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

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Email Address
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                value={formData.email}
                disabled
                className="flex-1 px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 cursor-not-allowed"
              />
              {formData.emailVerified ? (
                <span className="flex items-center gap-1 px-3 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-sm">
                  <Check className="w-4 h-4" /> Verified
                </span>
              ) : (
                <button
                  type="button"
                  onClick={sendEmailVerification}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                >
                  Verify
                </button>
              )}
            </div>
          </div>

          {/* Email Verification Modal */}
          {showEmailVerification && !formData.emailVerified && (
            <div className="p-4 border-2 border-blue-500 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                    Verify Your Email
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                    Enter the 6-digit code sent to {formData.email}
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={emailVerificationCode}
                      onChange={(e) => setEmailVerificationCode(e.target.value)}
                      placeholder="Enter code"
                      maxLength={6}
                      className="flex-1 px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800"
                    />
                    <button
                      type="button"
                      onClick={verifyEmail}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Verify
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Username
            </label>
            <input
              type="text"
              value={formData.username || ""}
              onChange={(e) => handleUsernameChange(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none ${
                usernameError ? "border-red-500" : "border-neutral-300 dark:border-neutral-600"
              }`}
              placeholder="@username"
            />
            {usernameError && (
              <div className="flex items-center gap-1 mt-1 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{usernameError}</span>
              </div>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Phone Number
            </label>
            <div className="flex gap-2">
              <input
                type="tel"
                value={formData.phone || ""}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="flex-1 px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                placeholder="+1 (555) 123-4567"
              />
              {formData.phoneVerified ? (
                <span className="flex items-center gap-1 px-3 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-sm">
                  <Check className="w-4 h-4" /> Verified
                </span>
              ) : (
                <button
                  type="button"
                  onClick={sendPhoneVerification}
                  disabled={!formData.phone}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Verify
                </button>
              )}
            </div>
          </div>

          {/* Phone Verification Modal */}
          {showPhoneVerification && !formData.phoneVerified && (
            <div className="p-4 border-2 border-green-500 rounded-lg bg-green-50 dark:bg-green-900/20">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                    Verify Your Phone
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                    Enter the 6-digit code sent to {formData.phone}
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={phoneVerificationCode}
                      onChange={(e) => setPhoneVerificationCode(e.target.value)}
                      placeholder="Enter code"
                      maxLength={6}
                      className="flex-1 px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800"
                    />
                    <button
                      type="button"
                      onClick={verifyPhone}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Verify
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

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
