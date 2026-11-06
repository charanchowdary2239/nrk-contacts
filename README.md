# PERSON DIRECTORY PLATFORM

A production-ready, private multi-user Person Directory Management Platform built with React, TypeScript, Vite, Tailwind CSS, and Supabase.

---

## 🌟 Key Highlights & Architectural Features

1. **Strict Multi-Tenant Database Space Isolation**:
   - Every registered user has their own private directory partition.
   - Enforced at the PostgreSQL level via Supabase **Row Level Security (RLS)** (`owner_id = auth.uid()`).
   - A user can never see, search, edit, or delete another user's saved people.

2. **Zero-Knowledge Super Admin Panel (`/admin`)**:
   - Super Admin dashboard displays only aggregate platform statistics (Total Users, Total Entries, Active Accounts, Blocked Accounts, Storage Usage).
   - Under database security policies, Super Admin has **zero access** to view or query private directory rows, photographs, phone numbers, villages, dates of birth, or personal notes.
   - User account lifecycle management: Block accounts, Unblock accounts, Delete user accounts with audit logging.

3. **Multi-Field Instant Search**:
   - Case-insensitive, partial matching across 8 attributes: Full Name, Profession, Village, Date of Birth (DD/MM/YYYY), Primary Phone, Secondary Phone, Party/Organization, and Address.

4. **One-Tap WhatsApp & Calling Integration**:
   - Dynamically constructs sanitized Click-to-Chat links (`https://wa.me/COUNTRYCODEPHONENUMBER`) stripping invalid characters (`+`, spaces, brackets, hyphens).
   - Direct dialing integration (`tel:...`).

5. **Private Object Storage**:
   - Dedicated Supabase Storage bucket `person-photos` with user-partitioned paths: `{userId}/{personId}/{filename}`.
   - Image validation for JPG, JPEG, PNG, WEBP with 5MB size limit.

6. **Self-Sovereign Data Portability & Settings**:
   - One-click directory export in **CSV** (spreadsheet) and **JSON** formats.
   - Account deletion with full cascade cleanup.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite 6, Tailwind CSS, Lucide Icons.
- **Backend & Database**: Supabase PostgreSQL.
- **Authentication**: Supabase Auth (Email & Password, Session management, Role verification).
- **Storage**: Supabase Storage (`person-photos`).
- **Deployment**: Vercel ready (with `vercel.json` SPA routing).

---

## 📂 Project Structure

```text
├── supabase/
│   ├── migrations/
│   │   └── 20260101000000_init_schema.sql  # Complete schema, RLS policies, triggers, RPCs
│   ├── schema.sql                         # Consolidated schema script
│   └── set_super_admin.sql                # Script to promote administrator safely
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   └── AdminDashboard.tsx         # Super Admin metrics & account governance
│   │   ├── auth/
│   │   │   └── AuthModal.tsx              # Login, Register, Forgot Password
│   │   ├── common/
│   │   │   ├── ConfirmationModal.tsx      # Danger & warning confirmation dialogs
│   │   │   ├── Footer.tsx                 # Legal links, privacy statement
│   │   │   ├── Navbar.tsx                 # Navigation, status pill, user menu
│   │   │   └── SupabaseSetupGuideModal.tsx# Live backend configuration & test accounts
│   │   ├── directory/
│   │   │   ├── AddEditPersonModal.tsx     # Add & edit form with photo upload
│   │   │   ├── Dashboard.tsx              # User dashboard, cards, pagination, FAB (+)
│   │   │   ├── FilterBar.tsx              # Multi-field search, filters & sort
│   │   │   ├── PersonCard.tsx             # Responsive card with WhatsApp action
│   │   │   └── PersonDetailModal.tsx      # Full individual profile view
│   │   ├── landing/
│   │   │   └── LandingPage.tsx            # Hero, features, how it works, CTA
│   │   ├── legal/
│   │   │   └── LegalModals.tsx            # Privacy Policy, Terms, Contact form
│   │   └── settings/
│   │       └── AccountSettingsModal.tsx   # Profile edit, password change, CSV/JSON export
│   ├── context/
│   │   ├── AuthContext.tsx                # Auth state, session, role check
│   │   └── ToastContext.tsx               # Toast notification system
│   ├── lib/
│   │   ├── mockEngine.ts                  # Persistent local sandbox for instant testing
│   │   ├── supabase.ts                    # Supabase client initialization
│   │   └── whatsapp.ts                    # WhatsApp sanitization & phone helpers
│   ├── services/
│   │   ├── adminService.ts                # Admin RPC calls, user management
│   │   └── peopleService.ts               # Private CRUD, search & export service
│   ├── types/
│   │   └── index.ts                       # TypeScript interfaces
│   ├── App.tsx                            # Root application view orchestrator
│   ├── index.css                          # Tailwind CSS custom themes & styles
│   └── main.tsx                           # Application entry point
├── .env.example                           # Template environment variables
├── package.json                           # Dependencies & scripts
├── tailwind.config.js                     # Theme configuration (Navy / Orange / White)
├── tsconfig.json                          # TypeScript configuration
├── vercel.json                            # Vercel SPA deployment configuration
└── vite.config.ts                         # Vite configuration
```

---

## 🚀 Step-by-Step Setup Guide

### 1. Local Development Quickstart

```bash
# Clone the repository
git clone https://github.com/your-username/person-directory.git
cd person-directory

# Install dependencies
npm install

# Start development server
npm run dev
```

*Note: The application includes an interactive local sandbox mode out of the box, allowing you to test User A, User B, and Super Admin isolation immediately before connecting Supabase.*

---

### 2. Supabase Cloud Configuration

#### A. Create a Free Supabase Project
1. Log in to [supabase.com](https://supabase.com).
2. Click **New Project**, choose an organization, project name (e.g. `person-directory`), database password, and your nearest region.

#### B. Run the SQL Migration
1. In your Supabase dashboard, click **SQL Editor** from the left navigation.
2. Open `supabase/migrations/20260101000000_init_schema.sql` from this repository.
3. Paste the entire SQL script into the SQL Editor and click **Run**.
4. This script sets up:
   - Tables: `profiles`, `people`, `admin_audit_logs`.
   - Performance indexes on `owner_id`, `full_name`, `village`, `profession`, `date_of_birth`, `phone_number_1`.
   - Triggers for automatic user profile initialization on registration.
   - Row Level Security (RLS) policies guaranteeing total isolation.
   - Private storage bucket `person-photos` with storage security policies.
   - Secure RPC functions: `get_admin_dashboard_stats()`, `admin_set_user_status()`, `admin_delete_user()`.

#### C. Set Environment Variables
1. Go to **Project Settings** &rarr; **API**.
2. Copy your **Project URL** and **anon public** key.
3. Create a `.env` file in the project root:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```

#### D. Create the First Super Admin Account
1. Open the website and click **Create Account** to register your administrator email (e.g. `admin@yourdomain.com`). Every user registers with the standard `user` role.
2. In the Supabase **SQL Editor**, run the following script:
   ```sql
   UPDATE public.profiles
   SET role = 'admin'
   WHERE email = 'admin@yourdomain.com';
   ```
3. Refresh your application. You will now see the **Super Admin** badge and button in the navigation bar!

---

## 🔒 Verification & Security Testing

| Test Case | Expected Behavior | Status |
|---|---|---|
| **Test 1: User A & User B Isolation** | User A adds contacts; User B registers and adds different contacts. User A sees only their records; User B sees only their records. | Verified |
| **Test 2: Database RLS Enforcement** | Direct queries with User A's token cannot fetch or alter records with `owner_id` of User B. | Verified |
| **Test 3: Multi-Field Search** | Searches across name, village (e.g. "Eluru"), profession, phone number, and DOB update immediately and return only owned records. | Verified |
| **Test 4: WhatsApp Formatting** | WhatsApp buttons open `https://wa.me/919876543210` with country code dynamically attached and invalid symbols stripped. | Verified |
| **Test 5: Super Admin Privacy** | Super Admin dashboard (`/admin`) displays aggregate counts and user management with ZERO access to users' directory rows or photos. | Verified |
| **Test 6: Account Suspension** | When admin blocks a user, their dashboard immediately shows an Account Suspended notice and blocks additions/edits. | Verified |
| **Test 7: Data Portability** | Users can export their private directory at any time in clean CSV or JSON format. | Verified |

---

## 🌐 Deploy to Vercel

1. Push your repository to GitHub.
2. In [Vercel Dashboard](https://vercel.com), click **Add New Project** and import the repository.
3. In **Environment Variables**, add:
   - `VITE_SUPABASE_URL`: Your Supabase Project URL.
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon public key.
4. Click **Deploy**. Vercel will build using `npm run build` and serve the static files with SPA routing handled via `vercel.json`.

---

## 📄 License

MIT License. Designed and engineered for secure, private person directory management.
