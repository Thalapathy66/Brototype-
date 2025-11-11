import { useState, useEffect } from "react";
import { UserData } from "./types";
import { Mail, Phone, Check, AlertCircle } from "lucide-react";
import { auth } from "./firebase";
import { 
  sendEmailVerification, 
  reload,
  RecaptchaVerifier,
  PhoneAuthProvider,
  updatePhoneNumber,
  PhoneAuthCredential
} from "firebase/auth";

interface ProfileProps {
  userData: UserData;
  onUpdateProfile: (updatedData: UserData) => void;
  onBack: () => void;
}

export function ProfilePage({ userData, onUpdateProfile, onBack }: ProfileProps) {
  const [formData, setFormData] = useState<UserData>(userData);
  const [isSaving, setIsSaving] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [phoneVerificationCode, setPhoneVerificationCode] = useState("");
  const [showPhoneVerification, setShowPhoneVerification] = useState(false);
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState<RecaptchaVerifier | null>(null);

  useEffect(() => {
    setFormData(userData);
  }, [userData]);

  // Check username availability
  const checkUsernameAvailability = (username: string) => {
    if (!username || username.trim() === "" || username === "@") {
      setUsernameError("");
      return;
    }

    // Normalize username for comparison (lowercase, ensure @ prefix)
    const normalizedUsername = username.toLowerCase().startsWith("@") 
      ? username.toLowerCase() 
      : `@${username.toLowerCase()}`;

    // Get all user data from localStorage
    const allKeys = Object.keys(localStorage);
    const userDataKeys = allKeys.filter(key => key.startsWith("userData_"));
    
    for (const key of userDataKeys) {
      const storedData = localStorage.getItem(key);
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          const storedUsername = parsedData.username?.toLowerCase() || "";
          const normalizedStored = storedUsername.startsWith("@") 
            ? storedUsername 
            : storedUsername ? `@${storedUsername}` : "";
            
          if (normalizedStored === normalizedUsername && parsedData.email !== userData.email) {
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
    // Remove any existing @ symbols and spaces
    let cleanValue = value.replace(/[@\s]/g, "").toLowerCase();
    
    // Add @ prefix if not empty
    const formattedValue = cleanValue ? `@${cleanValue}` : "";
    
    setFormData((prev) => ({ ...prev, username: formattedValue }));
    checkUsernameAvailability(formattedValue);
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

  // Email Verification with Firebase
  const sendEmailVerificationCode = async () => {
    if (!auth.currentUser) {
      alert("You must be logged in to verify your email");
      return;
    }

    if (auth.currentUser.emailVerified) {
      alert("Your email is already verified!");
      return;
    }

    try {
      await sendEmailVerification(auth.currentUser);
      alert(`Verification email sent to ${formData.email}!\n\nPlease check your inbox and spam folder.\n\nClick the link in the email to verify your account.`);
    } catch (error: any) {
      console.error("Error sending verification email:", error);
      if (error.code === "auth/too-many-requests") {
        alert("Too many requests. Please wait a few minutes before trying again.");
      } else {
        alert(`Error sending verification email: ${error.message}`);
      }
    }
  };

  const checkEmailVerificationStatus = async () => {
    if (!auth.currentUser) {
      return;
    }

    try {
      // Reload the user to get the latest emailVerified status
      await reload(auth.currentUser);
      
      if (auth.currentUser.emailVerified) {
        setFormData((prev) => ({ ...prev, emailVerified: true }));
        onUpdateProfile({ ...formData, emailVerified: true });
        alert("Email verified successfully! ✓");
      } else {
        alert("Email not verified yet.\n\nPlease check your email and click the verification link, then click 'Check Status' again.");
      }
    } catch (error: any) {
      console.error("Error checking verification status:", error);
      alert(`Error checking status: ${error.message}`);
    }
  };

  // Initialize reCAPTCHA on component mount
  useEffect(() => {
    if (!recaptchaVerifier && typeof window !== 'undefined') {
      try {
        const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible',
          callback: () => {
            // reCAPTCHA solved
          }
        });
        setRecaptchaVerifier(verifier);
      } catch (error) {
        console.error("Error initializing reCAPTCHA:", error);
      }
    }
  }, [recaptchaVerifier]);

  // Phone Verification with Firebase (works with test phone numbers on free plan!)
  const sendPhoneVerification = async () => {
    if (!formData.phone || formData.phone.trim() === "") {
      alert("Please enter a phone number first");
      return;
    }

    if (!auth.currentUser) {
      alert("You must be logged in to verify your phone number");
      return;
    }

    // Validate phone format (must include country code)
    if (!formData.phone.startsWith("+")) {
      alert("Phone number must include country code\n\nExamples:\n+15555550100 (test number)\n+911234567890 (real number)");
      return;
    }

    try {
      if (!recaptchaVerifier) {
        alert("reCAPTCHA not initialized. Please refresh the page.");
        return;
      }

      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationIdResult = await phoneProvider.verifyPhoneNumber(
        formData.phone,
        recaptchaVerifier
      );
      
      setVerificationId(verificationIdResult);
      setShowPhoneVerification(true);
      
      // Check if it's a test number
      if (formData.phone.startsWith("+1555555")) {
        alert(`📱 Test Phone Number Detected!\n\nThis is a Firebase test number.\nEnter the verification code you set in Firebase Console.\n\nNo real SMS will be sent.`);
      } else {
        alert(`Verification code sent to ${formData.phone}!\n\nPlease enter the 6-digit code you received via SMS.`);
      }
    } catch (error: any) {
      console.error("Error sending phone verification:", error);
      
      if (error.code === "auth/invalid-phone-number") {
        alert("Invalid phone number format. Please use: +[country code][number]\nExample: +15555550100");
      } else if (error.code === "auth/too-many-requests") {
        alert("Too many requests. Please try again later.");
      } else if (error.code === "auth/quota-exceeded" || error.code === "auth/billing-not-enabled") {
        alert(
          "Phone Auth not enabled or quota exceeded.\n\n" +
          "To use Firebase Phone Auth:\n" +
          "1. Enable Phone provider in Firebase Console\n" +
          "2. Add test phone numbers for free testing\n" +
          "   OR\n" +
          "3. Upgrade to Blaze plan for real SMS"
        );
      } else {
        alert(`Error: ${error.message}\n\nMake sure:\n1. Phone provider is enabled in Firebase Console\n2. Test phone numbers are configured`);
      }
      
      // Reset reCAPTCHA on error
      if (recaptchaVerifier) {
        recaptchaVerifier.clear();
        setRecaptchaVerifier(null);
      }
    }
  };

  const verifyPhone = async () => {
    if (!verificationId || !phoneVerificationCode) {
      alert("Please enter the verification code");
      return;
    }

    if (!auth.currentUser) {
      alert("You must be logged in to verify your phone number");
      return;
    }

    try {
      const credential = PhoneAuthProvider.credential(verificationId, phoneVerificationCode) as PhoneAuthCredential;
      await updatePhoneNumber(auth.currentUser, credential);
      
      setFormData((prev) => ({ ...prev, phoneVerified: true }));
      onUpdateProfile({ ...formData, phoneVerified: true });
      setShowPhoneVerification(false);
      setPhoneVerificationCode("");
      setVerificationId(null);
      alert("Phone verified successfully! ✓");
    } catch (error: any) {
      console.error("Error verifying phone:", error);
      if (error.code === "auth/invalid-verification-code") {
        alert("Invalid verification code. Please try again.");
      } else if (error.code === "auth/code-expired") {
        alert("Verification code expired. Please request a new code.");
        setShowPhoneVerification(false);
      } else {
        alert(`Error verifying phone: ${error.message}`);
      }
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
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={sendEmailVerificationCode}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                  >
                    Send Verification Email
                  </button>
                  <button
                    type="button"
                    onClick={checkEmailVerificationStatus}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm"
                  >
                    Check Status
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Email Verification Info */}
          {!formData.emailVerified && (
            <div className="p-4 border-2 border-blue-500 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                    Email Verification Required
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                    Click "Send Verification Email" to receive a verification link at {formData.email}
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    After clicking the link in your email, click "Check Status" to update your verification status.
                  </p>
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
              placeholder="Enter username (e.g., tacenta)"
            />
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Will be formatted as @username automatically
            </p>
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
                placeholder="+1234567890 (include country code)"
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
                  Send SMS Code
                </button>
              )}
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Must include country code (e.g., +1 for US, +91 for India)
            </p>
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

        {/* Hidden reCAPTCHA container for phone verification */}
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
}
