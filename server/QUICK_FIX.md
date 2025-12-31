# Quick Fix for Authentication Error

## Option 1: Update .env File (Recommended)

1. **Create `.env` file in `server/` directory:**
   ```env
   MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cehospitality.nyod0or.mongodb.net/cehospitality?retryWrites=true&w=majority&appName=cehospitality
   ```

2. **Get your connection string from MongoDB Atlas:**
   - Go to https://cloud.mongodb.com/
   - Click on your cluster
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password

3. **Whitelist your IP:**
   - In MongoDB Atlas, go to "Network Access"
   - Click "Add IP Address"
   - Click "Add Current IP Address"
   - Click "Confirm"

4. **Run seed:**
   ```bash
   npm run seed
   ```

## Option 2: Verify Current Connection String

If you want to use the hardcoded connection string, verify:

1. **Username is correct:** `cehospitality30_db_user`
2. **Password is correct:** `JLq7jmYHDW8d0XTc`
3. **IP is whitelisted** in MongoDB Atlas
4. **User has permissions** (Read and write to any database)

## Test Connection First

Before seeding, test the connection:
```bash
npm run test-connection
```

If test-connection works, then seed will work too!

