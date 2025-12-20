# Next-Auth Advanced Toolkit

## 🚀 Key Features

##  [ 👉 Live Site](https://nextauth-v5-advanced-toolkit.vercel.app/)



### Authentication

* 🔐 **Next-Auth v5 (Auth.js)**
* 🔑 Credentials provider for username/password login
* 🌐 OAuth support (Google & GitHub)
* 🔒 Forgot password functionality
* ✉️ Email verification
* 📱 Two-factor authentication (2FA)

### User Management & Roles


* 👥 User roles: Admin & User
* 🔄 Change user role (for development purposes)
* 🛂 `useRole` and `currentRole` utilities
* 👤 `useCurrentUser` and `currentUser` utilities

### UI Components


* 🔓 Login component (supports redirect or modal)
* 📝 Register component
* 🤔 Forgot password component
* ✅ Verification component
* ⚠️ Error component
* 🔘 Login button
* 🚪 Logout button

### Access Control

* 🚧 RoleGate component for conditional rendering based on roles
* 🛡️ Protect API routes for admins only
* 🔐 Protect server actions for admins only
* 👑 Render admin-only content securely

### Advanced Exploration

* 🔍 Next.js middleware exploration
* 📈 Extending and exploring Next-Auth session
* 🔄 Exploring Next-Auth callbacks
* 🖥️ Examples with server components
* 💻 Examples with client components

### Account Settings

* 📧 Change email with verification
* 🔑 Change password with old password confirmation
* 🔔 Enable/disable two-factor authentication

---

## 🛠️ Tech Stack

* **Framework:** Next.js 16 (App Router & Server Actions)
* **Authentication:** Next-Auth v5 (Auth.js)
* **Database:** Any (Prisma, PostgreSQL, MongoDB supported)
* **Email:**  Third-party providers (RESEND)
* **Frontend:** React 18 (Server & Client Components)
* **Security:** Role-based access, 2FA, password/email verification

---

## 📈 Why This Project Matters

This project demonstrates advanced backend engineering skills:

* Secure and production-ready authentication flows
* Role-based authorization for API routes and server actions
* Middleware usage and session management in modern Next.js
* Social login integration and 2FA for enterprise-level apps
* Clean separation of server and client responsibilities

---

## ⚡ Getting Started

### 1. Clone the Repository

Make sure **Git is installed** on your system.

```bash
git clone https://github.com/aabhaysharmaa/next-auth--advance-toolkit.git
cd next-auth--advance-toolkit
```

### 2. Install Dependencies

```bash
npm install
```

*(You can also use `yarn` or `pnpm` if preferred)*

### 3. Configure Environment Variables

Create a `.env` file in the project root and add:

```bash
# App URL
NEXTAUTH_URL=http://localhost:3000

# JWT Secret
NEXTAUTH_SECRET=your_secret_here

# Database URL
DATABASE_URL=your_database_url_here

# OAuth Providers
GITHUB_ID=your_github_id
GITHUB_SECRET=your_github_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret


```

### 4. Run Prisma Setup (if using Prisma)

```bash
npx prisma generate
npx prisma db push
```





### 5. Start the Development Server

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)
