import { useState, useEffect } from "react";
import AuthSwitch from "../components/ui/demo";
import Dashboard from "./Dashboard";
import { ADMIN_CREDENTIALS, UserData } from "./types";
import { auth } from "./firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from "firebase/auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentUserEmail, setCurrentUserEmail] = useState<string>("");
  const [loading, setLoading] = useState(true);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // User is signed in
        setCurrentUserEmail(firebaseUser.email || "");
        
        // Check if this is the admin
        if (firebaseUser.email === ADMIN_CREDENTIALS.email) {
          const adminData: UserData = {
            name: "Admin",
            email: ADMIN_CREDENTIALS.email,
            isAdmin: true,
            emailVerified: true,
            phoneVerified: true,
          };
          setUserData(adminData);
          localStorage.setItem("userData", JSON.stringify(adminData));
          setIsLoggedIn(true);
          setLoading(false);
          return;
        }
        
        // Load regular user data from localStorage
        const savedUserData = localStorage.getItem(`userData_${firebaseUser.email}`);
        if (savedUserData) {
          try {
            const parsed = JSON.parse(savedUserData);
            setUserData(parsed);
            setIsLoggedIn(true);
          } catch (error) {
            console.error("Error loading user data:", error);
            setShowNamePrompt(true);
          }
        } else {
          // First time login - show name prompt
          setShowNamePrompt(true);
        }
      } else {
        // User is signed out
        setUserData(null);
        setIsLoggedIn(false);
        setShowNamePrompt(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Handle authentication after form submission
  useEffect(() => {
    const handleFormSubmit = async (e: Event) => {
      const target = e.target as HTMLFormElement;
      // Only handle auth forms, not the name prompt form
      if (target.tagName === "FORM" && !showNamePrompt && !isLoggedIn && !loading) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(target);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const username = formData.get("username") as string; // Only present in sign-up form
        
        // Determine if this is sign-up or sign-in
        const isSignUp = !!username;
        
        try {
          if (isSignUp) {
            // SIGN UP with Firebase
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("User created:", userCredential.user.email);
            
            // Store username for later use
            setUserName(username);
            setCurrentUserEmail(email);
            
            // Show name prompt for additional details
            setTimeout(() => {
              setShowNamePrompt(true);
            }, 500);
          } else {
            // SIGN IN with Firebase
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("User signed in:", userCredential.user.email);
            
            // The onAuthStateChanged listener will handle the rest
          }
        } catch (error: any) {
          console.error("Authentication error:", error);
          
          // Handle specific Firebase errors
          switch (error.code) {
            case "auth/email-already-in-use":
              alert("This email is already registered. Please sign in instead.");
              break;
            case "auth/invalid-email":
              alert("Invalid email address.");
              break;
            case "auth/weak-password":
              alert("Password should be at least 6 characters.");
              break;
            case "auth/user-not-found":
              alert("No account found with this email. Please sign up first.");
              break;
            case "auth/wrong-password":
              alert("Incorrect password. Please try again.");
              break;
            case "auth/invalid-credential":
              alert("Invalid email or password. Please check your credentials.");
              break;
            case "auth/too-many-requests":
              alert("Too many failed login attempts. Please try again later.");
              break;
            default:
              alert(`Authentication error: ${error.message}`);
          }
        }
      }
    };

    document.addEventListener("submit", handleFormSubmit);
    return () => document.removeEventListener("submit", handleFormSubmit);
  }, [showNamePrompt, isLoggedIn, loading]);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      const newUserData: UserData = {
        name: userName.trim(),
        email: currentUserEmail,
        username: "",
        phone: "",
        bio: "",
        isAdmin: false,
        emailVerified: false,
        phoneVerified: false,
      };
      setUserData(newUserData);
      // Save to localStorage with user's email as key
      if (currentUserEmail) {
        localStorage.setItem(`userData_${currentUserEmail}`, JSON.stringify(newUserData));
      }
      setIsLoggedIn(true);
      setShowNamePrompt(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
      
      setIsLoggedIn(false);
      // If logging out as admin, clear the admin data from localStorage
      if (userData?.isAdmin) {
        localStorage.removeItem("userData");
        setUserData(null);
      }
      // For regular users, keep their data for next login
      setUserName("");
    } catch (error) {
      console.error("Error signing out:", error);
      alert("Error signing out. Please try again.");
    }
  };

  const handleUpdateProfile = (updatedData: UserData) => {
    setUserData(updatedData);
    // Update localStorage when profile is updated
    if (currentUserEmail) {
      localStorage.setItem(`userData_${currentUserEmail}`, JSON.stringify(updatedData));
    } else if (updatedData.isAdmin) {
      localStorage.setItem("userData", JSON.stringify(updatedData));
    }
  };

  // Show loading spinner while Firebase initializes
  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <div style={{ textAlign: "center", color: "white" }}>
          <div
            style={{
              width: "50px",
              height: "50px",
              border: "5px solid rgba(255, 255, 255, 0.3)",
              borderTop: "5px solid white",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 20px",
            }}
          />
          <p style={{ fontSize: "18px", fontWeight: "500" }}>Loading...</p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (showNamePrompt) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "40px",
            borderRadius: "20px",
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)",
            maxWidth: "400px",
            width: "100%",
          }}
        >
          <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "20px", textAlign: "center" }}>
            Welcome! What's your name?
          </h2>
          <form onSubmit={handleNameSubmit}>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
              required
              style={{
                width: "100%",
                padding: "12px 20px",
                fontSize: "16px",
                border: "2px solid #e0e0e0",
                borderRadius: "10px",
                marginBottom: "20px",
                outline: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#667eea")}
              onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
            />
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                background: "#667eea",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (isLoggedIn && userData) {
    return <Dashboard userData={userData} onLogout={handleLogout} onUpdateProfile={handleUpdateProfile} />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <AuthSwitch />
    </div>
  );
}

export default App;
