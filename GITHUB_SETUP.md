# GitHub Setup Guide

This guide will help you set up your repository on GitHub and prepare it for deployment.

## 📋 Pre-Deployment Checklist

- [x] `.gitignore` configured
- [x] `.env.example` created
- [x] `README.md` updated
- [x] `DEPLOYMENT.md` created
- [x] `vercel.json` configured
- [x] Build passes locally (`npm run build`)
- [x] No sensitive data in code
- [x] All environment variables documented

## 🚀 Initial GitHub Setup

### 1. Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click "New repository"
3. Repository name: `course-centre` (or your preferred name)
4. Description: "Course Centre - Education Consultancy Platform"
5. Set to **Private** (recommended for production apps)
6. **Don't** initialize with README, .gitignore, or license (we already have these)
7. Click "Create repository"

### 2. Initialize Git (if not already done)

```bash
cd course-centre

# Initialize git (if not already initialized)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Course Centre platform"

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/course-centre.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 3. Verify Files Are Committed

```bash
# Check what will be committed
git status

# Verify .env is NOT tracked
git check-ignore .env && echo ".env is properly ignored" || echo "WARNING: .env might be tracked!"
```

## 🔐 Security Best Practices

### Never Commit:

- ❌ `.env` files
- ❌ `node_modules/`
- ❌ `.next/` build folder
- ❌ Database credentials
- ❌ API keys or secrets
- ❌ Personal information

### Always Commit:

- ✅ `.env.example` (template file)
- ✅ Source code
- ✅ Configuration files
- ✅ Documentation
- ✅ `package.json` and `package-lock.json`

## 📝 Branch Strategy

### Recommended Workflow:

```bash
# Main branch (production-ready)
main

# Development branch
develop

# Feature branches
feature/feature-name
```

### Example Workflow:

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature"

# Push to GitHub
git push origin feature/new-feature

# Create Pull Request on GitHub
# After PR is merged, delete feature branch
```

## 🔄 Continuous Integration

The repository includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that:

- Runs on every push to `main` and `develop`
- Runs on pull requests
- Tests the build
- Runs linter

### To Enable CI:

1. Push the repository to GitHub
2. GitHub Actions will automatically run on pushes/PRs
3. Check the "Actions" tab in your GitHub repository

## 📦 Repository Structure

Your repository should look like this:

```
course-centre/
├── .env.example          # Environment variables template
├── .gitignore           # Git ignore rules
├── .github/             # GitHub Actions workflows
│   └── workflows/
│       └── ci.yml       # CI/CD pipeline
├── README.md            # Main documentation
├── DEPLOYMENT.md        # Deployment guide
├── vercel.json          # Vercel configuration
├── package.json         # Dependencies
├── next.config.ts       # Next.js config
├── prisma/              # Database schema
├── app/                 # Next.js app directory
├── components/          # React components
└── lib/                 # Utilities
```

## 🎯 Next Steps

After setting up GitHub:

1. **Set up Vercel**: Follow `DEPLOYMENT.md`
2. **Configure Secrets**: Add environment variables in Vercel
3. **Set up Database**: Configure PostgreSQL connection
4. **Deploy**: Push to `main` branch to trigger deployment

## 🆘 Troubleshooting

### Git Issues

**"Repository not found"**
- Check repository URL is correct
- Verify you have access to the repository
- Ensure repository exists on GitHub

**"Permission denied"**
- Check your GitHub credentials
- Use SSH keys or Personal Access Token
- Verify authentication: `gh auth status`

**"Large file" warning**
- Check `.gitignore` includes `node_modules/`
- Remove large files: `git rm --cached large-file`
- Use Git LFS for large files if needed

### Common Mistakes

1. **Committing `.env`**: Always check `git status` before committing
2. **Forgetting to push**: Remember to `git push` after committing
3. **Wrong branch**: Always verify you're on the correct branch
4. **Missing files**: Ensure all necessary files are committed

## 📚 Additional Resources

- [GitHub Docs](https://docs.github.com)
- [Git Handbook](https://guides.github.com/introduction/git-handbook/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)

