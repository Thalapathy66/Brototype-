import { useState, useEffect } from "react";
import AuthSwitch from "../components/ui/demo";
import Dashboard from "./Dashboard";
import { ADMIN_CREDENTIALS, UserData } from "./types";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentUserEmail, setCurrentUserEmail] = useState<string>("");

  // Handle authentication after form submission
  useEffect(() => {
    const handleFormSubmit = (e: Event) => {
      const target = e.target as HTMLFormElement;
      // Only handle auth forms, not the name prompt form
      if (target.tagName === "FORM" && !showNamePrompt && !isLoggedIn) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(target);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const username = formData.get("username") as string; // Only present in sign-up form
        
        // Determine if this is sign-up or sign-in
        const isSignUp = !!username;
        
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
        
        // Get registered users from localStorage
        const registeredUsersJSON = localStorage.getItem("registeredUsers");
        const registeredUsers: Array<{email: string; password: string; name: string}> = 
          registeredUsersJSON ? JSON.parse(registeredUsersJSON) : [];
        
        if (isSignUp) {
          // SIGN UP - Register new user
          const existingUser = registeredUsers.find(u => u.email === email);
          if (existingUser) {
            alert("This email is already registered. Please sign in instead.");
            return;
          }
          
          // Register the new user
          registeredUsers.push({ email, password, name: username });
          localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
          
          // Show name prompt for additional details
          setCurrentUserEmail(email);
          setUserName(username);
          setTimeout(() => {
            setShowNamePrompt(true);
          }, 500);
        } else {
          // SIGN IN - Validate credentials
          const user = registeredUsers.find(u => u.email === email && u.password === password);
          
          if (!user) {
            alert("Invalid email or password. Please sign up if you don't have an account.");
            return;
          }
          
          // Check if user has profile data
          const savedUserData = localStorage.getItem(`userData_${email}`);
          setCurrentUserEmail(email);
          
          if (savedUserData) {
            try {
              const parsed = JSON.parse(savedUserData);
              setUserData(parsed);
              setTimeout(() => {
                setIsLoggedIn(true);
              }, 500);
            } catch (error) {
              console.error("Error loading user data:", error);
              // Show name prompt if data is corrupted
              setUserName(user.name);
              setTimeout(() => {
                setShowNamePrompt(true);
              }, 500);
            }
          } else {
            // First time login after signup - show name prompt
            setUserName(user.name);
            setTimeout(() => {
              setShowNamePrompt(true);
            }, 500);
          }
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
      // Save to localStorage with user's email as key
      if (currentUserEmail) {
        localStorage.setItem(`userData_${currentUserEmail}`, JSON.stringify(newUserData));
      }
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
    if (currentUserEmail) {
      localStorage.setItem(`userData_${currentUserEmail}`, JSON.stringify(updatedData));
    } else if (updatedData.isAdmin) {
      localStorage.setItem("userData", JSON.stringify(updatedData));
    }
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
