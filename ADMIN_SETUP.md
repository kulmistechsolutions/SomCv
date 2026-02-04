# Admin Login Setup Guide

## Overview
The admin system uses Clerk user IDs to identify administrators. Only users whose Clerk user IDs are listed in the `ADMIN_USER_IDS` environment variable can access admin pages.

## Setup Instructions

### Step 1: Find Your Clerk User ID

1. **Sign in to your application** using Clerk authentication
2. **Go to the admin dashboard** (you'll be redirected to unauthorized page initially - that's OK)
3. **Check the browser console** or go to `/admin` - it will show your User ID
4. **Alternatively**, you can find your User ID in the Clerk Dashboard:
   - Go to https://dashboard.clerk.com
   - Navigate to "Users" in the sidebar
   - Find your user account
   - Copy the User ID (starts with `user_`)

### Step 2: Add Admin User IDs to .env

Open your `.env` file and add the `ADMIN_USER_IDS` variable:

```env
# Admin User IDs (comma-separated list of Clerk user IDs)
ADMIN_USER_IDS=user_2abc123def456,user_2xyz789ghi012
```

**Important:**
- Separate multiple admin IDs with commas (no spaces)
- Each ID should be a valid Clerk user ID (starts with `user_`)
- You can add multiple admins by separating IDs with commas

### Step 3: Restart Your Server

After updating the `.env` file:

1. Stop your dev server (press `Ctrl+C`)
2. Run `npm run dev` again
3. The changes will take effect immediately

### Step 4: Access Admin Pages

Once your user ID is in the `ADMIN_USER_IDS` list:

- **Admin Dashboard**: `/admin`
- **Subscription Requests**: `/admin/subscription-requests`

## Admin Features

### Subscription Requests Management
- View all subscription requests
- Approve or reject pending requests
- See request status (pending, approved, rejected)
- View user details and request information

### Access Control
- Only users listed in `ADMIN_USER_IDS` can access admin pages
- Non-admin users are redirected to `/admin/unauthorized`
- All admin actions require authentication

## Troubleshooting

### "Access Denied" Error
- **Check**: Your user ID is correctly added to `ADMIN_USER_IDS` in `.env`
- **Check**: No extra spaces or typos in the user ID
- **Check**: Server has been restarted after updating `.env`

### Can't Find User ID
1. Sign in to your app
2. Go to `/admin` - it will show your User ID
3. Or check Clerk Dashboard → Users → Your Account

### Multiple Admins
To add multiple admins, separate their user IDs with commas:
```env
ADMIN_USER_IDS=user_123,user_456,user_789
```

## Security Notes

- **Never commit `.env` file** to version control
- **Keep admin user IDs secure** - only trusted users should have access
- **Regularly review** the admin list to remove access for users who no longer need it
- Admin access is checked on every request - changes to `.env` require a server restart

## Example .env Configuration

```env
# ... other variables ...

# Admin User IDs (comma-separated)
ADMIN_USER_IDS=user_2abc123def456

# ... other variables ...
```
