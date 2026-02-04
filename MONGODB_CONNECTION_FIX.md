# 🔧 MongoDB Connection Error - Quick Fix

## The Problem

You're seeing this error:
```
Server selection timeout: None of the available servers suitable for criteria ReadPreference(Primary)
```

This means your app **cannot connect to MongoDB Atlas**.

## ✅ Quick Fix (5 Minutes)

### Step 1: Whitelist Your IP Address

**This is the most common cause!**

1. Go to [MongoDB Atlas Dashboard](https://cloud.mongodb.com/)
2. Click on **"Network Access"** in the left sidebar
3. Click **"Add IP Address"**
4. Click **"Add Current IP Address"** (recommended)
   - OR click **"Allow Access from Anywhere"** (0.0.0.0/0) for testing only
5. Click **"Confirm"**

### Step 2: Check Your Cluster Status

1. Go to MongoDB Atlas Dashboard
2. Check if your cluster shows **"Running"** (not "Paused")
3. If paused, click **"Resume"** to start it

### Step 3: Verify Connection String

Check your `.env` file has the correct connection string:

```env
DATABASE_URL=mongodb+srv://SOMCV:YOUR_PASSWORD@somcv.jqkci9f.mongodb.net/somcv?appName=SOMCV&retryWrites=true&w=majority
```

**Important:**
- Replace `YOUR_PASSWORD` with your actual MongoDB password
- Make sure there are no extra spaces
- The connection string should start with `mongodb+srv://`

### Step 4: Test Connection

After whitelisting your IP, restart your dev server:

```bash
# Stop server (Ctrl+C)
npm run dev
```

## 🔍 Still Not Working?

### Option 1: Check MongoDB Atlas Status

1. Go to [MongoDB Atlas Status Page](https://status.mongodb.com/)
2. Check if there are any ongoing issues

### Option 2: Regenerate Connection String

1. Go to MongoDB Atlas Dashboard
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the new connection string
5. Update your `.env` file

### Option 3: Check Firewall/VPN

- If you're on a VPN, try disconnecting it
- If you're behind a corporate firewall, contact IT
- Some networks block MongoDB ports

### Option 4: Use Standard Connection String

If `mongodb+srv://` doesn't work, try the standard format:

```env
DATABASE_URL=mongodb://SOMCV:YOUR_PASSWORD@ac-vpscxnj-shard-00-00.jqkci9f.mongodb.net:27017,ac-vpscxnj-shard-00-01.jqkci9f.mongodb.net:27017,ac-vpscxnj-shard-00-02.jqkci9f.mongodb.net:27017/somcv?ssl=true&replicaSet=atlas-miv5wt-shard-0&authSource=admin&retryWrites=true&w=majority&appName=SOMCV
```

## ✅ What I Fixed

I've added error handling so the app won't crash if MongoDB is unavailable:
- If database connection fails, the app defaults to "free" tier
- Users can still use the app (with free tier features)
- Error is logged to console for debugging

## 🎯 Most Likely Solution

**90% of the time, the issue is IP whitelisting.**

Just whitelist your IP in MongoDB Atlas and restart the server - that should fix it!
