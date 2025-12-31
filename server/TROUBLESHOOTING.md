# MongoDB Atlas Connection Troubleshooting

## Authentication Error Fix

If you're getting `bad auth : Authentication failed`, follow these steps:

### Step 1: Verify Your Connection String

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Select your cluster
3. Click **"Connect"**
4. Choose **"Connect your application"**
5. Copy the connection string

### Step 2: Update Connection String

The connection string should look like:
```
mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>?retryWrites=true&w=majority
```

**Important:** Replace `<username>` and `<password>` with your actual credentials.

### Step 3: Create/Update .env File

Create a `.env` file in the `server/` directory:

```env
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cehospitality.nyod0or.mongodb.net/cehospitality?retryWrites=true&w=majority&appName=cehospitality
```

**Replace:**
- `YOUR_USERNAME` with your MongoDB Atlas username
- `YOUR_PASSWORD` with your MongoDB Atlas password

### Step 4: Whitelist Your IP Address

1. In MongoDB Atlas, go to **Network Access**
2. Click **"Add IP Address"**
3. Click **"Add Current IP Address"** (or add `0.0.0.0/0` for all IPs - less secure)
4. Click **"Confirm"**

### Step 5: Verify Database User

1. Go to **Database Access** in MongoDB Atlas
2. Make sure your user exists
3. User should have **"Read and write to any database"** permissions
4. If password was reset, update it in your connection string

### Step 6: Test Connection

```bash
cd server
npm run test-connection
```

### Step 7: Run Seed Script

Once connection works:
```bash
npm run seed
```

## Common Issues

### Issue: Password Contains Special Characters
**Solution:** URL encode special characters in the password:
- `@` becomes `%40`
- `#` becomes `%23`
- `$` becomes `%24`
- etc.

Or use a password without special characters.

### Issue: IP Not Whititelisted
**Solution:** Add your IP address in MongoDB Atlas Network Access settings.

### Issue: User Doesn't Have Permissions
**Solution:** 
1. Go to Database Access
2. Edit your user
3. Set permissions to "Read and write to any database"

## Alternative: Use MongoDB Compass

You can also test your connection using MongoDB Compass:
1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Paste your connection string
3. Test the connection
4. If it works in Compass, use the same connection string in your .env file

