# Course Centre - Education Consultancy Platform

A modern, enterprise-grade website for Course Centre, a leading education and student recruitment consultant in the United Kingdom.

## 🚀 Tech Stack

- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT with localStorage

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Database

1. Create a PostgreSQL database:
```sql
CREATE DATABASE course_centre;
```

2. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

3. Update `.env` with your database credentials:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/course_centre?schema=public"
JWT_SECRET="your-super-secret-jwt-key"
```

### 3. Run Database Migrations

```bash
npx prisma migrate dev
```

This will:
- Create all database tables
- Generate Prisma Client

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. (Optional) Seed Database

Create a seed file if needed, then run:
```bash
npx prisma db seed
```

### 6. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
course-centre/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin panel pages
│   ├── api/               # API routes
│   ├── dashboard/         # Student dashboard
│   └── ...
├── components/            # React components
│   ├── admin/             # Admin panel components
│   └── ui/               # shadcn/ui components
├── contexts/              # React contexts (Auth)
├── lib/                   # Utilities and helpers
│   ├── auth.ts           # Authentication logic
│   ├── db.ts             # Prisma client
│   └── utils.ts          # Utility functions
└── prisma/               # Database schema
    └── schema.prisma     # Prisma schema
```

## 🔐 Authentication

The application uses JWT-based authentication with localStorage for client-side session management.

- **Register**: `/register`
- **Login**: `/login`
- **Dashboard**: `/dashboard` (requires authentication)
- **Admin Panel**: `/admin` (requires ADMIN role)

## 👥 User Roles

- **STUDENT**: Default role for registered users
- **ADMIN**: Full access to admin panel
- **CONSULTANT**: Can manage consultations

## 🎨 Admin Panel

The admin panel (`/admin`) provides:

- **Dashboard**: Overview statistics and metrics
- **Users**: User management
- **Courses**: Course management
- **Applications**: Application review and management
- **Consultations**: Consultation scheduling
- **Messages**: Communication management
- **Settings**: System settings

## 🗄️ Database Schema

Key models:
- `User` - Authentication and user profiles
- `Student` - Student-specific information
- `Course` - Course listings
- `University` - University information
- `Application` - Student applications
- `Consultation` - Booking system
- `Document` - File uploads

See `prisma/schema.prisma` for complete schema.

## 🚀 Deployment

### Environment Variables

Make sure to set these in production:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Strong secret key (use a secure random string)
- `IMAGEKIT_PUBLIC_KEY` - ImageKit public key
- `IMAGEKIT_PRIVATE_KEY` - ImageKit private key
- `IMAGEKIT_URL_ENDPOINT` - ImageKit URL endpoint
- `NEXT_PUBLIC_APP_URL` - Your domain URL (e.g., https://yourdomain.com)
- `NODE_ENV` - Set to "production" in production

See `.env.example` for a complete list of required environment variables.

### Build for Production

```bash
npm run build
npm start
```

### Database Migrations (Production)

```bash
npx prisma migrate deploy
```

## 🌐 Vercel Deployment

### Prerequisites

1. A Vercel account ([vercel.com](https://vercel.com))
2. A GitHub repository with your code
3. A PostgreSQL database (Vercel Postgres, Supabase, or any PostgreSQL provider)
4. ImageKit account for image uploads

### Step-by-Step Deployment

#### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/course-centre.git
git push -u origin main
```

#### 2. Import Project to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings

#### 3. Configure Environment Variables

In Vercel project settings, go to **Settings** → **Environment Variables** and add these:

**Add as Environment Variables** (not Secrets):

- `DATABASE_URL` - Your PostgreSQL connection string
  - Example: `postgresql://user:password@host:5432/database?sslmode=require`
- `JWT_SECRET` - Generate a secure random string
  - Generate with: `openssl rand -base64 32`
- `IMAGEKIT_PUBLIC_KEY` - From your ImageKit dashboard
- `IMAGEKIT_PRIVATE_KEY` - From your ImageKit dashboard
- `IMAGEKIT_URL_ENDPOINT` - From your ImageKit dashboard
  - Example: `https://ik.imagekit.io/your_imagekit_id`
- `NEXT_PUBLIC_APP_URL` - Your Vercel domain
  - Example: `https://your-project.vercel.app`
- `NODE_ENV` - Set to `production`

**Important**: Add these directly as environment variables in the Vercel dashboard. You don't need to create Vercel Secrets unless you prefer that method.

#### 4. Configure Build Settings

Vercel will auto-detect Next.js, but ensure:
- **Framework Preset**: Next.js
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)

#### 5. Run Database Migrations

After first deployment, run migrations:

```bash
# Option 1: Using Vercel CLI
vercel env pull .env.local
npx prisma migrate deploy

# Option 2: Using direct connection
DATABASE_URL="your-production-db-url" npx prisma migrate deploy
```

#### 6. Deploy

Click "Deploy" and wait for the build to complete.

### Post-Deployment

1. **Create Admin User**: Use the script to create an admin account:
   ```bash
   npm run create:admin
   ```

2. **Verify Deployment**: Visit your Vercel URL and test:
   - Homepage loads
   - Admin panel accessible
   - Database connections work
   - Image uploads work

### Vercel-Specific Notes

- **Automatic Deployments**: Every push to `main` branch triggers a new deployment
- **Preview Deployments**: Pull requests get preview deployments automatically
- **Environment Variables**: Can be set per environment (Production, Preview, Development)
- **Database**: Consider using Vercel Postgres for seamless integration
- **Build Time**: First build may take 3-5 minutes

### Troubleshooting

**Build Fails:**
- Check environment variables are set correctly
- Verify `DATABASE_URL` is accessible from Vercel
- Check build logs in Vercel dashboard

**Database Connection Issues:**
- Ensure database allows connections from Vercel IPs
- Check connection string format
- Verify SSL requirements

**Image Upload Issues:**
- Verify ImageKit credentials
- Check ImageKit CORS settings
- Verify `IMAGEKIT_URL_ENDPOINT` is correct

## 📝 Development

### Prisma Studio

View and edit database:
```bash
npx prisma studio
```

### Database Migrations

Create a new migration:
```bash
npx prisma migrate dev --name migration_name
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

Private project for Course Centre.

## 🆘 Support

For issues or questions, please contact the development team.

---

Built with ❤️ using Next.js 16
