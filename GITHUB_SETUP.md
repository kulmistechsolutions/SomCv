# GitHub Setup Guide

## Current Issue: Permission Denied (403)

You're getting a 403 error because:
- The repository might not exist yet, OR
- You don't have write access to the `kulmistechsolutions` organization, OR
- You need to authenticate

## Solution Options

### Option 1: Create Repository First (Recommended)

1. **Go to GitHub:** https://github.com
2. **Sign in** with your account
3. **Create new repository:**
   - Click "+" → "New repository"
   - Name: `SomCv`
   - Owner: `kulmistechsolutions` (or your personal account)
   - **Don't** initialize with README
   - Click "Create repository"

4. **Then push:**
   ```bash
   git push -u origin main
   ```

### Option 2: Use Personal Access Token

If the repository exists but you need authentication:

1. **Create Personal Access Token:**
   - GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Click "Generate new token (classic)"
   - Name: `SomCv Push`
   - Select scopes: `repo` (full control)
   - Click "Generate token"
   - **Copy the token** (you won't see it again!)

2. **Push with token:**
   ```bash
   git push -u origin main
   ```
   - Username: `engabdirahmaan12` (or your GitHub username)
   - Password: **Paste your personal access token**

### Option 3: Use SSH Instead of HTTPS

1. **Generate SSH key** (if you don't have one):
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

2. **Add SSH key to GitHub:**
   - Copy public key: `cat ~/.ssh/id_ed25519.pub`
   - GitHub → Settings → SSH and GPG keys → New SSH key
   - Paste and save

3. **Change remote to SSH:**
   ```bash
   git remote set-url origin git@github.com:kulmistechsolutions/SomCv.git
   git push -u origin main
   ```

### Option 4: Use Your Personal Account

If you don't have access to `kulmistechsolutions`:

1. **Change remote to your personal account:**
   ```bash
   git remote set-url origin https://github.com/engabdirahmaan12/SomCv.git
   ```

2. **Create repository on your account:**
   - Go to https://github.com/new
   - Name: `SomCv`
   - Create (don't initialize)

3. **Push:**
   ```bash
   git push -u origin main
   ```

## Quick Check

Verify your remote URL:
```bash
git remote -v
```

## Current Status

✅ Git initialized  
✅ All files committed (157 files)  
✅ Branch set to `main`  
✅ Remote configured  
⏳ Waiting for repository creation/authentication  

## Next Steps

1. **Create the repository on GitHub** (if it doesn't exist)
2. **Get write access** (if using organization)
3. **Authenticate** (use personal access token or SSH)
4. **Push:** `git push -u origin main`
