# Firebase Authentication Setup Guide

This guide will help you set up Firebase Authentication for your Brototype complaint management system.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter your project name (e.g., "Brototype Reports")
4. (Optional) Enable Google Analytics
5. Click **"Create project"**

## Step 2: Register Your Web App

1. In your Firebase project dashboard, click the **Web icon** (</>) to add a web app
2. Register your app with a nickname (e.g., "Brototype Web App")
3. (Optional) Check "Also set up Firebase Hosting" if you want to use Firebase Hosting
4. Click **"Register app"**
5. Copy the Firebase configuration object - you'll need this!

The config looks like this:
```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

## Step 3: Enable Email/Password Authentication

1. In Firebase Console, go to **Authentication** section (left sidebar)
2. Click **"Get started"** if it's your first time
3. Go to the **"Sign-in method"** tab
4. Click on **"Email/Password"** in the providers list
5. Toggle **"Enable"** switch to ON
6. Click **"Save"**

## Step 4: Configure Your App

1. Open `/src/firebase.ts` in your project
2. Replace the placeholder values with your actual Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "YOUR_ACTUAL_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_ACTUAL_PROJECT_ID",
  storageBucket: "YOUR_ACTUAL_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_ACTUAL_SENDER_ID",
  appId: "YOUR_ACTUAL_APP_ID"
};
```

## Step 5: (Optional) Set Password Policy

1. In Firebase Console, go to **Authentication** > **Settings** tab
2. Click on **"Password policy"**
3. Configure your requirements:
   - Minimum length (default: 6 characters)
   - Require lowercase letters
   - Require uppercase letters
   - Require numbers
   - Require special characters
4. Choose enforcement mode:
   - **Require**: Block sign-ups with weak passwords
   - **Notify**: Allow sign-ups but notify users
5. Click **"Save"**

## Step 6: (Optional) Enable Email Enumeration Protection

For better security, enable email enumeration protection:

```bash
# Install Google Cloud CLI if you haven't
# Follow: https://cloud.google.com/sdk/docs/install

# Enable email enumeration protection
gcloud identity-platform config update --project=YOUR_PROJECT_ID \
  --enable-email-enumeration-protection
```

## Step 7: Deploy Your App

After configuration:

1. Build your app: `npm run build`
2. Test locally: `npm run dev`
3. Deploy to Vercel: `git push origin main` (if auto-deploy is enabled)

## Important Security Notes

### For Local Development
- Your Firebase config contains public API keys - this is normal and safe
- Firebase Security Rules protect your data, not the API key
- Never commit sensitive credentials to Git

### For Production
If you want to add extra security, you can:

1. **Set up domain restrictions** (Firebase Console > Project Settings > General):
   - Add your Vercel domain
   - Add localhost for development
   - This prevents unauthorized domains from using your Firebase project

2. **Configure Security Rules** (if using Firestore/Storage later):
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

## Firebase Authentication Features You Can Add Later

Once basic authentication is working, you can easily add:

- **Email Verification**: Send verification emails to new users
- **Password Reset**: Let users reset forgotten passwords
- **Multi-Factor Authentication**: Add SMS or TOTP 2FA
- **Social Login**: Google, Facebook, GitHub, etc.
- **Anonymous Authentication**: Let users try your app before signing up

## Testing Your Setup

1. Start your dev server: `npm run dev`
2. Try signing up with a new email and password
3. Check Firebase Console > Authentication > Users to see the new user
4. Try signing in with the same credentials
5. Test the logout functionality

## Troubleshooting

### "Firebase: Error (auth/invalid-api-key)"
- Check that you copied the API key correctly
- Make sure there are no extra spaces or quotes

### "Firebase: Error (auth/project-not-found)"
- Verify your projectId is correct
- Make sure the Firebase project exists

### "Firebase: Error (auth/operation-not-allowed)"
- Ensure Email/Password sign-in method is enabled in Firebase Console

### "Firebase: Error (auth/weak-password)"
- Password must be at least 6 characters (or meet your custom policy)

### Users are created in Firebase but localStorage is not updating
- Check browser console for JavaScript errors
- Verify the user data sync logic in App.tsx

## Cost Information

Firebase Authentication is **FREE** for most use cases:
- **Free tier**: Unlimited users
- **No credit card required**
- Only paid if you use advanced features like SAML/OIDC

Perfect for your Brototype project!

## Next Steps

After setting up Firebase Auth, you can:
1. Remove the old localStorage-based authentication
2. Add email verification for new accounts
3. Implement password reset functionality
4. Add user profile photos with Firebase Storage
5. Use Firestore to store complaints (instead of localStorage)

## Support

- [Firebase Documentation](https://firebase.google.com/docs/auth)
- [Firebase Auth REST API](https://firebase.google.com/docs/reference/rest/auth)
- [Stack Overflow - Firebase Tag](https://stackoverflow.com/questions/tagged/firebase)
