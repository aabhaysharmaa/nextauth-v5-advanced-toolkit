## 🚀 Key Features

### Authentication
- 🔐 **Next-Auth v5 (Auth.js)**
- 🔑 Credentials provider for username/password login
- 🌐 OAuth support (Google & GitHub)
- 🔒 Forgot password functionality
- ✉️ Email verification
- 📱 Two-factor authentication (2FA)

### User Management & Roles
- 👥 User roles: Admin & User
- 🔄 Change user role (for development purposes)
- 🛂 `useRole` and `currentRole` utilities
- 👤 `useCurrentUser` and `currentUser` utilities

### UI Components
- 🔓 Login component (supports redirect or modal)
- 📝 Register component
- 🤔 Forgot password component
- ✅ Verification component
- ⚠️ Error component
- 🔘 Login button
- 🚪 Logout button

### Access Control
- 🚧 RoleGate component for conditional rendering based on roles
- 🛡️ Protect API routes for admins only
- 🔐 Protect server actions for admins only
- 👑 Render admin-only content securely

### Advanced Exploration
- 🔍 Next.js middleware exploration
- 📈 Extending and exploring Next-Auth session
- 🔄 Exploring Next-Auth callbacks
- 🖥️ Examples with server components
- 💻 Examples with client components

### Account Settings
- 📧 Change email with verification
- 🔑 Change password with old password confirmation
- 🔔 Enable/disable two-factor authentication

---

## 🛠️ Tech Stack
- **Framework:** Next.js 16 (App Router & Server Actions)
- **Authentication:** Next-Auth v5 (Auth.js)
- **Database:** Any (Prisma, PostgreSQL, MongoDB supported)
- **Email:** SMTP / Third-party providers
- **Frontend:** React 18 (Server & Client Components)
- **Security:** Role-based access, 2FA, password/email verification

---

## 📈 Why This Project Matters
This project demonstrates advanced backend engineering skills:
- Secure and production-ready authentication flows
- Role-based authorization for API routes and server actions
- Middleware usage and session management in modern Next.js
- Social login integration and 2FA for enterprise-level apps
- Clean separation of server and client responsibilities

---

## ⚡ Getting Started

1. Clone the repository:
```bash
 make sure you had git already  installed

git clone https://github.com/aabhaysharmaa/next-auth--advance-toolkit.git
