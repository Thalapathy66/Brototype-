# 🚀 Quick Start: Firebase Authentication Setup

This is a simplified guide to get Firebase Authentication working **in 5 minutes**.

## Step 1: Create Firebase Project (2 minutes)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"** or **"Add project"**
3. Enter project name: `Brototype-Reports` (or any name)
4. Disable Google Analytics (you can enable it later if needed)
5. Click **"Create project"** and wait for setup to complete

## Step 2: Register Web App (1 minute)

1. In your Firebase project, click the **Web icon** `</>` on the homepage
2. Register app nickname: `Brototype Web App`
3. **Don't** check "Also set up Firebase Hosting" (unless you want it)
4. Click **"Register app"**
5. You'll see a Firebase configuration object - **COPY IT!**

Example (your values will be different):
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyAbc123...",
  authDomain: "brototype-reports.firebaseapp.com",
  projectId: "brototype-reports",
  storageBucket: "brototype-reports.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

## Step 3: Enable Email/Password Auth (1 minute)

1. In Firebase Console, click **"Authentication"** in left sidebar
2. Click **"Get started"** button
3. Click on **"Sign-in method"** tab
4. Click **"Email/Password"**
5. Toggle **"Enable"** switch to ON
6. Click **"Save"**

## Step 4: Configure Your App (1 minute)

**Option A: Quick Setup (Hardcode in file)**
1. Open `/src/firebase.ts`
2. Replace the placeholder values with your Firebase config:
   ```typescript
   const firebaseConfig = {
     apiKey: "AIzaSyAbc123...",  // Your actual key
     authDomain: "brototype-reports.firebaseapp.com",  // Your actual domain
     projectId: "brototype-reports",  // Your actual project ID
     storageBucket: "brototype-reports.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc123"
   };
   ```

**Option B: Production Setup (Environment Variables)**
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Edit `.env` and add your Firebase config:
   ```env
   VITE_FIREBASE_API_KEY=AIzaSyAbc123...
   VITE_FIREBASE_AUTH_DOMAIN=brototype-reports.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=brototype-reports
   VITE_FIREBASE_STORAGE_BUCKET=brototype-reports.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abc123
   ```
3. **Important**: Add `.env` to `.gitignore` (should already be there)

## Step 5: Test It! (30 seconds)

1. **Restart your dev server** (important!):
   ```bash
   npm run dev
   ```

2. Open `http://localhost:5174` in your browser

3. Try signing up with a test email:
   - Email: `test@example.com`
   - Password: `test123456` (min 6 characters)
   - Username: `testuser`

4. Check Firebase Console > Authentication > Users to see your new user!

5. Try logging out and signing in again.

## ✅ Done! Your Firebase Auth is Working!

### What Changed?
- ✅ Real authentication with Firebase (no more localStorage passwords)
- ✅ Secure password hashing (handled by Firebase)
- ✅ User sessions persist across page refreshes
- ✅ Built-in security against common attacks
- ✅ Free for unlimited users!

### Next Steps (Optional)

**Add Email Verification:**
```typescript
import { sendEmailVerification } from "firebase/auth";

// After user signs up
await sendEmailVerification(auth.currentUser);
```

**Add Password Reset:**
```typescript
import { sendPasswordResetEmail } from "firebase/auth";

await sendPasswordResetEmail(auth, email);
```

**Add Profile Display Name:**
```typescript
import { updateProfile } from "firebase/auth";

await updateProfile(auth.currentUser, {
  displayName: userName
});
```

## Troubleshooting

### "Firebase: Error (auth/invalid-api-key)"
- Check that you copied the API key correctly (no extra spaces)
- Make sure you restarted the dev server after changing `.env`

### Warning in console about Firebase not configured
- You still have placeholder values in `firebase.ts`
- Replace "YOUR_API_KEY" with your actual values

### "Firebase: Error (auth/project-not-found)"
- Verify your projectId matches exactly
- Check that the Firebase project exists in console

### Users created but app doesn't redirect
- Check browser console for JavaScript errors
- Make sure you restarted dev server after installing firebase

### Still using old localStorage authentication
- Clear browser localStorage: Dev Tools > Application > Local Storage > Clear All
- Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)

## Deploy to Vercel

If using environment variables (Option B):

1. Go to your Vercel project dashboard
2. Settings > Environment Variables
3. Add each `VITE_*` variable from your `.env` file
4. Redeploy: `git push origin main`

**Note**: Firebase API keys are safe to expose publicly. Firebase Security Rules protect your data.

## Support

- Read full guide: `FIREBASE_SETUP.md`
- [Firebase Docs](https://firebase.google.com/docs/auth/web/password-auth)
- [Stack Overflow - Firebase Tag](https://stackoverflow.com/questions/tagged/firebase)

---

**That's it! You now have professional authentication in your Brototype app! 🎉**
