# Migration Summary: Stripe to WhatsApp Subscriptions

## ✅ Completed Changes

### 1. Project Rename to "SOMCV"
- ✅ Updated `package.json` name
- ✅ Updated `README.md` title and description
- ✅ Updated `src/app/layout.tsx` metadata
- ✅ Updated `src/app/(main)/Navbar.tsx` brand name
- ✅ Updated `src/app/page.tsx` home page text
- ✅ Updated `src/app/tos/page.tsx` Terms of Service (all references)

### 2. Database Schema Changes
- ✅ Updated `prisma/schema.prisma`:
  - **UserSubscription model**: Removed all Stripe fields, added `plan`, `status`, `expiresAt`
  - **New SubscriptionRequest model**: Added for tracking WhatsApp subscription requests
    - Fields: `id`, `userId`, `fullName`, `phoneNumber`, `plan`, `status`, `requestId`, timestamps

### 3. Stripe Removal
- ✅ Removed `stripe` package from `package.json`
- ✅ Deleted `src/lib/stripe.ts`
- ✅ Deleted `src/app/api/stripe-webhook/route.ts`
- ✅ Removed Stripe webhook route from `src/middleware.ts`
- ✅ Removed Stripe environment variables from `src/env.ts`:
  - Removed: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
  - Removed: `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
  - Removed: `NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY`
  - Removed: `NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY`
- ✅ Added new environment variable: `ADMIN_WHATSAPP_NUMBER`

### 4. Subscription Logic Updates
- ✅ Updated `src/lib/subscription.ts`:
  - Removed Stripe price ID checks
  - Now checks `plan` field and `status` field from UserSubscription
  - Checks `expiresAt` if set
  - Returns "free" if no subscription or inactive

### 5. WhatsApp Subscription Flow
- ✅ Created `src/components/premium/SubscriptionRequestForm.tsx`:
  - Form with Full Name, Phone Number, Plan selection
  - Pre-fills phone number with "+252613609678"
  - Validates input with Zod
  - Opens WhatsApp with pre-filled message on submit

- ✅ Updated `src/components/premium/actions.ts`:
  - Replaced `createCheckoutSession` with `createSubscriptionRequest`
  - Generates unique request ID using crypto.randomBytes
  - Creates SubscriptionRequest record in database
  - Formats WhatsApp message with user details and request ID
  - Returns WhatsApp URL (wa.me link)

- ✅ Updated `src/components/premium/PremiumModal.tsx`:
  - Removed Stripe checkout logic
  - Added form flow: Plan selection → Subscription form
  - Shows SubscriptionRequestForm when plan is selected
  - Updated title to "SOMCV Premium"

### 6. Billing Page Updates
- ✅ Updated `src/app/(main)/billing/page.tsx`:
  - Removed Stripe API calls
  - Removed Stripe price/product retrieval
  - Shows current plan from subscription level
  - Simplified UI (removed cancel date, etc.)

- ✅ Updated `src/app/(main)/billing/GetSubscriptionButton.tsx`:
  - Changed button text to "Upgrade / Subscribe"

- ✅ Deleted `src/app/(main)/billing/ManageSubscriptionButton.tsx`
- ✅ Deleted `src/app/(main)/billing/actions.ts`
- ✅ Deleted `src/app/(main)/billing/success/page.tsx`

### 7. Admin Approval System
- ✅ Created `src/app/(main)/admin/subscription-requests/actions.ts`:
  - `approveSubscriptionRequest()`: Approves request and creates/updates UserSubscription
  - `rejectSubscriptionRequest()`: Marks request as rejected
  - `getSubscriptionRequests()`: Fetches all subscription requests

- ✅ Created `src/app/(main)/admin/subscription-requests/page.tsx`:
  - Displays all subscription requests in cards
  - Shows request details: name, phone, plan, status, request ID, user ID, date
  - Approve/Reject buttons for pending requests
  - Color-coded status indicators

## 📋 Next Steps (Manual Actions Required)

### 1. Database Migration
Run Prisma migration to apply schema changes:
```bash
npx prisma migrate dev --name migrate_to_whatsapp_subscriptions
```

### 2. Environment Variables
Update your `.env` file:
- Remove all Stripe-related variables
- Add: `ADMIN_WHATSAPP_NUMBER=+252613609678` (or your admin WhatsApp number)

### 3. Install Dependencies
Remove Stripe package:
```bash
npm uninstall stripe
```

### 4. Admin Access Control (Optional)
The admin page currently allows any authenticated user. To restrict access:
- Add admin role check in `src/app/(main)/admin/subscription-requests/actions.ts`
- Use Clerk's organization/role system or a custom admin check

### 5. Test the Flow
1. User clicks "Upgrade / Subscribe"
2. Selects Pro or Pro Plus plan
3. Fills subscription request form
4. WhatsApp opens with pre-filled message
5. Admin receives message on WhatsApp
6. Admin goes to `/admin/subscription-requests`
7. Admin approves/rejects request
8. User subscription is activated

## 🔄 Preserved Features
All existing features remain unchanged:
- ✅ Multi-step resume builder
- ✅ Drag-and-drop functionality
- ✅ AI auto-fill (summary & work experience)
- ✅ Auto-save
- ✅ Real-time preview
- ✅ Design customizations (Pro Plus)
- ✅ Photo upload
- ✅ Print/PDF export
- ✅ All form validations
- ✅ All UI components and styles
- ✅ Authentication via Clerk
- ✅ Database structure (except subscription models)

## 📝 Notes
- The WhatsApp number format should be international format (e.g., +252613609678)
- Request IDs are generated using crypto.randomBytes for uniqueness
- Subscription requests are stored with status: "pending" | "approved" | "rejected"
- User subscriptions use status: "active" | "inactive"
- The system maintains the same subscription tier limits:
  - Free: 1 resume
  - Pro: 3 resumes + AI tools
  - Pro Plus: Unlimited resumes + AI tools + design customizations
