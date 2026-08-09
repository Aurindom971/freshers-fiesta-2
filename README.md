# Fresher's Fiesta 2.0 Registration Portal

## Requirements

- Node.js 18 or newer
- Git
- MongoDB Atlas

## First-time setup

```powershell
cd "C:\APPS\programs\mtc\fresher fiesta 2.0 registation website"
npm.cmd install
```

Create `.env` in the project root:

```env
MONGODB_URI=your_mongodb_connection_string
DATABASE_NAME=freshers_fiesta
COLLECTION_NAME=registrations
PORT=3000
```

Never commit or share the `.env` file. MongoDB Atlas must allow your IP under Network Access.

## Run locally

```powershell
npm.cmd start
```

Open `http://localhost:3000` and stop the server with `Ctrl + C`.
