// Example: Enhanced AuthSwitch with form handling and API integration
// Save as: components/ui/auth-switch-enhanced.tsx

"use client";

import React, { useState, useEffect } from "react";

interface AuthSwitchProps {
  onSignIn?: (data: SignInData) => Promise<void>;
  onSignUp?: (data: SignUpData) => Promise<void>;
  onSocialLogin?: (provider: SocialProvider) => void;
  defaultMode?: "signin" | "signup";
}

interface SignInData {
  email: string;
  password: string;
}

interface SignUpData {
  username: string;
  email: string;
  password: string;
}

type SocialProvider = "google" | "facebook" | "twitter" | "linkedin";

export default function AuthSwitchEnhanced({
  onSignIn,
  onSignUp,
  onSocialLogin,
  defaultMode = "signin",
}: AuthSwitchProps) {
  const [isSignUp, setIsSignUp] = useState(defaultMode === "signup");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const container = document.querySelector(".container");
    if (!container) return;
    if (isSignUp) container.classList.add("sign-up-mode");
    else container.classList.remove("sign-up-mode");
  }, [isSignUp]);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!onSignIn) return;

    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data: SignInData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      await onSignIn(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!onSignUp) return;

    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data: SignUpData = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      await onSignUp(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign up failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialClick = (provider: SocialProvider) => {
    if (onSocialLogin) {
      onSocialLogin(provider);
    }
  };

  return (
    <>
      <style>{`/* ... same styles as demo.tsx ... */`}</style>

      <div className="container">
        {error && (
          <div className="error-banner" style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#ef4444',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            zIndex: 999,
          }}>
            {error}
          </div>
        )}

        <div className="forms-container">
          <div className="signin-signup">
            {/* Sign In Form */}
            <form className="sign-in-form" onSubmit={handleSignIn}>
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <i>📧</i>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="input-field">
                <i>🔒</i>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  disabled={isLoading}
                />
              </div>
              <input
                type="submit"
                value={isLoading ? "Loading..." : "Login"}
                className="btn solid"
                disabled={isLoading}
              />
              <p className="social-text">Or sign in with social platforms</p>
              <div className="social-media">
                <SocialIcons onSocialClick={handleSocialClick} disabled={isLoading} />
              </div>
            </form>

            {/* Sign Up Form */}
            <form className="sign-up-form" onSubmit={handleSignUp}>
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <i>👤</i>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="input-field">
                <i>📧</i>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="input-field">
                <i>🔒</i>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  minLength={8}
                  disabled={isLoading}
                />
              </div>
              <input
                type="submit"
                value={isLoading ? "Loading..." : "Sign up"}
                className="btn"
                disabled={isLoading}
              />
              <p className="social-text">Or sign up with social platforms</p>
              <div className="social-media">
                <SocialIcons onSocialClick={handleSocialClick} disabled={isLoading} />
              </div>
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here?</h3>
              <p>
                Join us today and discover a world of possibilities. Create
                your account in seconds!
              </p>
              <button
                className="btn transparent"
                onClick={() => setIsSignUp(true)}
                disabled={isLoading}
              >
                Sign up
              </button>
            </div>
          </div>

          <div className="panel right-panel">
            <div className="content">
              <h3>One of us?</h3>
              <p>Welcome back! Sign in to continue your journey with us.</p>
              <button
                className="btn transparent"
                onClick={() => setIsSignUp(false)}
                disabled={isLoading}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function SocialIcons({
  onSocialClick,
  disabled,
}: {
  onSocialClick?: (provider: SocialProvider) => void;
  disabled?: boolean;
}) {
  const handleClick = (provider: SocialProvider) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (!disabled && onSocialClick) {
      onSocialClick(provider);
    }
  };

  return (
    <>
      <a
        href="#"
        className="social-icon"
        onClick={handleClick("google")}
        style={{ opacity: disabled ? 0.5 : 1, pointerEvents: disabled ? 'none' : 'auto' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
      </a>
      <a
        href="#"
        className="social-icon"
        onClick={handleClick("facebook")}
        style={{ opacity: disabled ? 0.5 : 1, pointerEvents: disabled ? 'none' : 'auto' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </a>
      <a
        href="#"
        className="social-icon"
        onClick={handleClick("twitter")}
        style={{ opacity: disabled ? 0.5 : 1, pointerEvents: disabled ? 'none' : 'auto' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#1DA1F2">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      </a>
      <a
        href="#"
        className="social-icon"
        onClick={handleClick("linkedin")}
        style={{ opacity: disabled ? 0.5 : 1, pointerEvents: disabled ? 'none' : 'auto' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#0A66C2">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </a>
    </>
  );
}
