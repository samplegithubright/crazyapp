# RootLayout (`app/layout.tsx`) Documentation

## Overview

The `app/layout.tsx` file is the fundamental structural component in your Next.js application using the App Router. It serves as the top-level template that wraps every page within your entire application. This specific layout is marked as a Client Component.

## Code Explanation

Below is an explanation of the core aspects and imports within your `app/layout.tsx` file:

### 1. `"use client";` Directive
At the very top of the file, `"use client";` indicates to Next.js that this layout and its immediate logic should be run on the client-side (in the browser) rather than rendered purely as a static Server Component. 

*Why is it here?* Typically, `RootLayout` is a Server Component. However, it was made a Client Component here likely because React context providers (like `SessionProvider`) often require access to React hooks that only run on the client. 

### 2. Dependencies
* `import { SessionProvider } from "next-auth/react";` - Imports the session context wrapper from `next-auth`. It gives the rest of the application access to the current authenticated user's session data.
* `import Script from "next/script";` - Next.js's optimized script component. It is used to load third-party scripts efficiently.
* `import "./globals.css";` - Imports global CSS styling (such as TailwindCSS rules and cross-app default states). Since this is the root layout, these styles are applied across the entire app.

### 3. RootLayout Component Definition
```typescript
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
})
```
This is the default export component. It accepts a `children` prop. Next.js automatically injects your active page routing content (e.g., your login page, your blog, your careers page) where `children` is placed.

### 4. HTML structure
```html
<html>
    <body className="min-h-full flex flex-col">
       {/* ... */}
    </body>
</html>
```
Every root layout requires you to define the `<html>` and `<body>` tags. 
* The `<body>` tag includes styling (`min-h-full flex flex-col`), ensuring your overall app takes up the full minimum height of the viewport and supports flexbox layouts for sticky footers and centered content out-of-the-box.

### 5. Provided Functionality within the Body
* **Razorpay Script Component**:
  ```tsx
  <Script
    src="https://checkout.razorpay.com/v1/checkout.js"
    strategy="beforeInteractive"
  />
  ```
  Injects the Razorpay payment gateway script into the HTML flow. Given the `beforeInteractive` strategy, Next.js tries to fetch and execute it early in the page's lifecycle, ensuring it resolves before the user actively tries to make a payment.

* **NextAuth Session Provider**:
  ```tsx
  <SessionProvider>
    {children}
  </SessionProvider>
  ```
  This wraps your entire application routing sequence (`children`). Because of this, any child component underneath (which is essentially your whole Next.js application context) can safely call NextAuth functions like `useSession()` and `signOut()` to read authentication states.

## Summary

This file establishes the foundational HTML, loads your global styles, pre-loads your payment solution script (Razorpay), and orchestrates the user's authentication context (NextAuth) around all pages served by the Next.js router.
