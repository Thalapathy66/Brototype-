import { useState, useEffect } from "react";
import AuthSwitch from "../components/ui/demo";
import Dashboard from "./Dashboard";
import { ADMIN_CREDENTIALS, UserData } from "./types";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState<UserData | null>(null);

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      try {
        const parsed = JSON.parse(savedUserData);
        // Only load if it's not a new session
        if (!isLoggedIn) {
          setUserData(parsed);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    }
  }, []);

  // Simulate login after form submission
  useEffect(() => {
    const handleFormSubmit = (e: Event) => {
      const target = e.target as HTMLFormElement;
      // Only handle auth forms, not the name prompt form
      if (target.tagName === "FORM" && !showNamePrompt && !isLoggedIn) {
        e.preventDefault();
        
        // Get email and password from form
        const formData = new FormData(target);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        
        // Check if admin login
        if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
          // Admin login - clear any existing user data and set admin data
          const adminData: UserData = {
            name: "Admin",
            isAdmin: true,
          };
          setUserData(adminData);
          localStorage.setItem("userData", JSON.stringify(adminData));
          setTimeout(() => {
            setIsLoggedIn(true);
          }, 500);
          return;
        }
        
        // Regular user login
        const savedUserData = localStorage.getItem("userData");
        if (savedUserData) {
          try {
            const parsed = JSON.parse(savedUserData);
            // Check if saved data is admin data - if so, clear it for regular user
            if (parsed.isAdmin) {
              localStorage.removeItem("userData");
              // New regular user, show name prompt
              setTimeout(() => {
                setShowNamePrompt(true);
              }, 500);
            } else {
              // Regular user already has data, log them in directly
              setUserData(parsed);
              setTimeout(() => {
                setIsLoggedIn(true);
              }, 500);
            }
          } catch (error) {
            // Error parsing, treat as new user
            setTimeout(() => {
              setShowNamePrompt(true);
            }, 500);
          }
        } else {
          // New user, show name prompt
          setTimeout(() => {
            setShowNamePrompt(true);
          }, 500);
        }
      }
    };

    document.addEventListener("submit", handleFormSubmit);
    return () => document.removeEventListener("submit", handleFormSubmit);
  }, [showNamePrompt, isLoggedIn]);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      const newUserData: UserData = {
        name: userName.trim(),
        username: "",
        phone: "",
        bio: "",
        isAdmin: false,
      };
      setUserData(newUserData);
      // Save to localStorage
      localStorage.setItem("userData", JSON.stringify(newUserData));
      setIsLoggedIn(true);
      setShowNamePrompt(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // If logging out as admin, clear the admin data from localStorage
    if (userData?.isAdmin) {
      localStorage.removeItem("userData");
      setUserData(null);
    }
    // For regular users, keep their data for next login
    setUserName("");
  };

  const handleUpdateProfile = (updatedData: UserData) => {
    setUserData(updatedData);
    // Update localStorage when profile is updated
    localStorage.setItem("userData", JSON.stringify(updatedData));
  };

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
