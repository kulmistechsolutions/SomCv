# Fix Admin Login - Step by Step

## The Problem
Your `.env` file has a placeholder user ID: `youruser_39AXKjft8BYHHbYpTNnqdqlNoTa`

You need to replace it with your **actual Clerk User ID**.

## Quick Fix (3 Steps)

### Step 1: Get Your Real User ID

**Option A - From the App:**
1. Make sure you're signed in to your app
2. Go to: `http://localhost:3000/my-user-id`
3. Copy your User ID (it will look like: `user_2abc123def456`)

**Option B - From Clerk Dashboard:**
1. Go to https://dashboard.clerk.com
2. Sign in
3. Click "Users" in the sidebar
4. Find your account
5. Copy the User ID (starts with `user_`)

### Step 2: Update .env File

Open your `.env` file and find this line:
```
ADMIN_USER_IDS=youruser_39AXKjft8BYHHbYpTNnqdqlNoTa
```

Replace it with your actual User ID:
```
ADMIN_USER_IDS=user_2abc123def456
```

**Important:**
- Remove "youruser_" - that's just a placeholder
- Use your actual Clerk User ID (starts with `user_`)
- No spaces around the `=` sign
- No quotes around the value

### Step 3: Restart Server

1. Stop your dev server: Press `Ctrl+C` in the terminal
2. Start it again: Run `npm run dev`
3. Go to: `http://localhost:3000/admin/login`
4. You should now be redirected to the admin dashboard!

## Still Not Working?

### Check These:
1. ✅ Are you signed in? (Check the top right corner - you should see your profile)
2. ✅ Did you copy the EXACT User ID? (No extra spaces, no typos)
3. ✅ Did you restart the server? (This is required!)
4. ✅ Is the User ID in the correct format? (Should start with `user_`)

### Get Help:
- Go to `/admin/login` - it will show your User ID and instructions
- Go to `/my-user-id` - alternative way to see your User ID

## Example .env File

```env
# ... other variables ...

# Admin User IDs (replace with your actual Clerk User ID)
ADMIN_USER_IDS=user_2abc123def456

# ... other variables ...
```

**Remember:** Clerk User IDs always start with `user_` not `youruser_`!
