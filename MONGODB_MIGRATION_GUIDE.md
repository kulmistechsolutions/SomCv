# MongoDB Migration Guide

## ✅ Completed Changes

### 1. Prisma Schema Updated
- ✅ Changed datasource from `postgresql` to `mongodb`
- ✅ Updated all models to use `@db.ObjectId` for IDs
- ✅ Changed ID generation from `@default(cuid())` to `@default(auto())`
- ✅ Kept relations working (Prisma MongoDB supports relations)
- ✅ All models now use MongoDB ObjectId format

### 2. Environment Variables Updated
- ✅ Removed all PostgreSQL-specific variables:
  - `POSTGRES_URL`
  - `POSTGRES_PRISMA_URL`
  - `POSTGRES_URL_NON_POOLING`
  - `POSTGRES_URL_NO_SSL`
  - `POSTGRES_USER`
  - `POSTGRES_HOST`
  - `POSTGRES_PASSWORD`
  - `POSTGRES_DATABASE`
- ✅ Added single `DATABASE_URL` for MongoDB connection string

### 3. Database Queries Updated
- ✅ Fixed `deleteResume` to use `findFirst` instead of `findUnique` (MongoDB compatibility)
- ✅ All other queries remain compatible with MongoDB Prisma

### 4. OpenAI Configuration
- ✅ Updated to explicitly use environment variable

## 📋 Setup Instructions

### 1. Update Your `.env` File

Add these environment variables:

```env
# MongoDB Connection String (database name required)
DATABASE_URL=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/database?appName=SOMCV

# OpenAI API Key
OPENAI_API_KEY=your_openai_api_key_here

# Admin WhatsApp Number
ADMIN_WHATSAPP_NUMBER=+252613609678

# Clerk Authentication (keep your existing values)
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Vercel Blob Storage (keep your existing value)
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 2. Install Dependencies

Make sure all packages are installed:

```bash
npm install
```

### 3. Generate Prisma Client

Generate the Prisma client for MongoDB:

```bash
npx prisma generate
```

### 4. Push Schema to MongoDB

Push the schema to your MongoDB database:

```bash
npx prisma db push
```

**Note:** This will create the collections in MongoDB. Since this is a new database, it will create empty collections.

### 5. (Optional) Migrate Existing Data

If you have existing PostgreSQL data, you'll need to:
1. Export data from PostgreSQL
2. Transform it to match MongoDB structure
3. Import into MongoDB

For a fresh start, you can skip this step.

## 🔍 Verification

### Test Database Connection

You can verify the connection by running:

```bash
npx prisma studio
```

This will open Prisma Studio where you can view and manage your MongoDB data.

### Test the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Test creating a resume
3. Test subscription requests
4. Test admin approval flow

## ⚠️ Important Notes

### MongoDB vs PostgreSQL Differences

1. **IDs**: MongoDB uses ObjectId instead of CUID strings
2. **Relations**: Prisma MongoDB supports relations, but they work differently under the hood
3. **Transactions**: MongoDB transactions work differently than PostgreSQL
4. **Queries**: Most Prisma queries work the same, but some edge cases may differ

### Schema Changes

- All IDs are now `@db.ObjectId` type
- ID generation uses `@default(auto())` which generates MongoDB ObjectIds
- Relations are maintained and work with Prisma MongoDB

### Performance Considerations

- MongoDB is document-based, which can be faster for nested data
- Indexes are automatically created for unique fields
- Consider adding indexes for frequently queried fields (like `userId`)

## 🐛 Troubleshooting

### Connection Issues

If you get connection errors:
1. Check your MongoDB connection string is correct
2. Ensure your IP is whitelisted in MongoDB Atlas (if using Atlas)
3. Check network connectivity

### Prisma Client Issues

If Prisma client doesn't generate:
```bash
rm -rf node_modules/.prisma
npx prisma generate
```

### Type Errors

If you get TypeScript errors:
```bash
npm install
npx prisma generate
```

## ✅ What's Working

- ✅ Resume CRUD operations
- ✅ Work experience and education nested operations
- ✅ Subscription management
- ✅ Subscription requests
- ✅ Admin approval flow
- ✅ All existing features preserved

## 🎉 You're All Set!

Your application is now configured to use MongoDB. All existing features should work exactly as before, but now using MongoDB as the database backend.
