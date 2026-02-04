# Admin Login Guide

## Quick Access

**Admin Login Page:** `/admin/login`

You can also access it from the navbar - there's an "Admin" or "Admin Login" button in the top navigation bar.

## How It Works

### Step 1: Sign In
1. Click the "Admin Login" button in the navbar (or go to `/admin/login`)
2. If you're not signed in, you'll see a "Sign In" button
3. Click it to sign in with Clerk authentication

### Step 2: Get Your User ID
After signing in, the admin login page will show:
- Your Clerk User ID
- Instructions on how to add it to the admin list
- A copy button to easily copy your User ID

### Step 3: Add to Admin List
1. Copy your User ID from the page
2. Open your `.env` file in the project root
3. Add or update this line:
   ```env
   ADMIN_USER_IDS=your_user_id_here
   ```
4. For multiple admins, separate with commas:
   ```env
   ADMIN_USER_IDS=user_123,user_456,user_789
   ```
5. Save the `.env` file
6. **Restart your dev server** (stop with `Ctrl+C`, then run `npm run dev` again)

### Step 4: Access Admin Dashboard
1. After restarting, refresh the `/admin/login` page
2. If your User ID is in the admin list, you'll be automatically redirected to `/admin`
3. You can now access:
   - Admin Dashboard: `/admin`
   - Subscription Requests: `/admin/subscription-requests`

## Admin Features

Once you have admin access, you can:
- ✅ View subscription request statistics
- ✅ Approve or reject subscription requests
- ✅ Manage user subscriptions
- ✅ View all subscription requests with details

## Troubleshooting

### "Access Denied" Message
- **Check:** Your User ID is correctly added to `ADMIN_USER_IDS` in `.env`
- **Check:** No extra spaces or typos in the user ID
- **Check:** Server has been restarted after updating `.env`

### Can't See Admin Button
- Make sure you're signed in
- The button appears in the navbar next to the theme toggle

### User ID Not Showing
- Make sure you're signed in with Clerk
- Try refreshing the page
- Check that Clerk authentication is working properly

## Security Notes

- Admin access is checked on every request
- Only users listed in `ADMIN_USER_IDS` can access admin pages
- Never commit your `.env` file to version control
- Keep admin user IDs secure

## Quick Links

- **Admin Login:** `/admin/login`
- **Admin Dashboard:** `/admin`
- **Subscription Requests:** `/admin/subscription-requests`
- **My User ID:** `/my-user-id` (alternative way to see your User ID)
