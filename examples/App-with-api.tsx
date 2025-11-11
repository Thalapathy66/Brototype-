// Example: Using AuthSwitch with real API
// Save as: src/App-with-api.tsx

import AuthSwitchEnhanced from "../examples/auth-switch-enhanced";

function AppWithAPI() {
  const handleSignIn = async (data: { email: string; password: string }) => {
    const response = await fetch("https://your-api.com/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const result = await response.json();
    // Store token in localStorage or cookie
    localStorage.setItem("authToken", result.token);
    
    // Redirect to dashboard
    window.location.href = "/dashboard";
  };

  const handleSignUp = async (data: {
    username: string;
    email: string;
    password: string;
  }) => {
    const response = await fetch("https://your-api.com/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Sign up failed");
    }

    const result = await response.json();
    localStorage.setItem("authToken", result.token);
    window.location.href = "/dashboard";
  };

  const handleSocialLogin = (provider: string) => {
    // Redirect to OAuth provider
    window.location.href = `https://your-api.com/auth/${provider}`;
  };

  return (
    <div className="min-h-screen">
      <AuthSwitchEnhanced
        onSignIn={handleSignIn}
        onSignUp={handleSignUp}
        onSocialLogin={handleSocialLogin}
        defaultMode="signin"
      />
    </div>
  );
}

export default AppWithAPI;
