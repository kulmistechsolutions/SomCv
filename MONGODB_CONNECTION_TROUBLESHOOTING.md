# MongoDB Connection Troubleshooting

## Error: Server selection timeout / InternalError

This error typically occurs due to:

### 1. IP Address Not Whitelisted (Most Common)

**MongoDB Atlas requires your IP address to be whitelisted.**

**Solution:**
1. Go to [MongoDB Atlas Dashboard](https://cloud.mongodb.com/)
2. Navigate to your cluster
3. Click **"Network Access"** in the left sidebar
4. Click **"Add IP Address"**
5. Either:
   - Click **"Add Current IP Address"** (recommended for development)
   - Or click **"Allow Access from Anywhere"** (0.0.0.0/0) - **Only for testing, not recommended for production**

### 2. Connection String Options

Try adding SSL/TLS options to your connection string:

**Current:**
```
DATABASE_URL=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/database?appName=SOMCV
```

**With additional options:**
```
DATABASE_URL=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/database?appName=SOMCV&retryWrites=true&w=majority&ssl=true
```

### 3. Check MongoDB Atlas Cluster Status

1. Go to MongoDB Atlas Dashboard
2. Check if your cluster is **running** (not paused)
3. If paused, click **"Resume"** to start it

### 4. Verify Connection String

Make sure:
- Username and password are correct
- No extra spaces or special characters
- Database name is correct
- Connection string uses `mongodb+srv://` (not `mongodb://`)

### 5. Test Connection from MongoDB Atlas

1. Go to MongoDB Atlas Dashboard
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string and compare with yours
5. Make sure they match (except for password)

### 6. Network/Firewall Issues

If you're behind a corporate firewall or VPN:
- Try disconnecting VPN
- Check if your network blocks MongoDB ports (27017)
- Contact your network administrator

### 7. Alternative: Use Standard Connection String

If `mongodb+srv://` doesn't work, try the standard format (requires specific port):

```
mongodb://USERNAME:PASSWORD@shard-00-00.mongodb.net:27017,shard-00-01.mongodb.net:27017,shard-00-02.mongodb.net:27017/database?ssl=true&replicaSet=replica-set-name&authSource=admin&retryWrites=true&w=majority&appName=SOMCV
```

## Quick Fix Steps

1. **Whitelist your IP in MongoDB Atlas** (most important!)
2. **Verify cluster is running**
3. **Update .env with correct connection string**
4. **Try again: `npx prisma db push`**

## Still Not Working?

If the issue persists:
1. Check MongoDB Atlas status page for outages
2. Verify your MongoDB Atlas account is active
3. Check if you have the correct permissions
4. Try creating a new database user in MongoDB Atlas
5. Generate a new connection string from Atlas dashboard
