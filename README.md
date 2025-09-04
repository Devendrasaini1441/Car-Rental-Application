# Car Rental App — Deploy React + Node/Express to Azure App Service with GitHub Actions
This guide walks you through deploying a monorepo full-stack app:

Frontend: React (Create React App)

Backend: Node.js + Express (serves API and the React build)

CI/CD: GitHub Actions → Azure App Service (Linux)

It includes: Azure setup, auth options (Publish Profile or Service Principal), required GitHub secrets, the workflow YAML, and common troubleshooting.
---

## (1) Prerequisites

Azure subscription (free tier works)

GitHub repository with this structure:

```
.
├── backend/
│   ├── package.json        // must include: "start": "node server.js"
│   └── server.js           // Express app that also serves the React build
├── frontend/
│   ├── package.json        // CRA scripts
│   └── (src, public, …)
└── .github/workflows/      // GitHub Actions workflow file

```
If you serve the React build from Express, your server.js should point to the copied build inside backend/frontend/build (details below).
## Clone in Local Enviroment
```
git clone https://github.com/Devendrasaini1441/Car-Rental-Application.git
cd Car-Rental-Application
```
- - 

## (2) Local build expectations

Inside frontend/:
```
npm install
npm run build   # creates frontend/build/
```
- - 
Inside backend/:
```
npm install
npm start       # should start Express on PORT or 8080
```

Your server.js (key parts) should look like:
```
const express = require("express");
const path = require("path");
const app = express();

// API routes first
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/cars", require("./routes/carRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));

// Serve React build that will be copied to backend/frontend/build
app.use(express.static(path.join(__dirname, "frontend", "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => console.log(`Server on ${PORT}`));
```

In production, do not rely on "proxy": "http://localhost:5000" in frontend/package.json. That is ignored by CRA in production. Because Express serves the build and API at the same origin, your frontend can call /api/... directly.

## (3) Create Azure resources

You can use the Portal or CLI. CLI version shown for reproducibility.

Install the Azure CLI: https://learn.microsoft.com/cli/azure/install-azure-cli

Then:
```
# Login
az login

# Variables (change names/region)
RG="CarRental-RG"
PLAN="CarRental-Plan"
APP="car-rental-app"          # must be globally unique
LOCATION="centralindia"

# Create Resource Group
az group create -n $RG -l $LOCATION

# Create Linux App Service Plan (B1 = Basic, change as needed)
az appservice plan create -g $RG -n $PLAN --is-linux --sku B1

# Create the Web App (Linux, Node runtime image)
az webapp create -g $RG -p $PLAN -n $APP --runtime "NODE|20-lts"
```

## (3.1) Configure App Settings (environment variables)

In Azure Portal → your Web App → Configuration → Application settings, add:

NODE_ENV = production

MONGO_URI = your-mongodb-connection-string

JWT_SECRET = your-jwt-secret

(Any other keys you use, e.g. Stripe)

No need to set PORT; Azure sets it and your code reads process.env.PORT.
- - 

## (4) Choose how GitHub Actions authenticates to Azure

You have two good options. Use ONE of them.

## Option A — Publish Profile (simplest)

Azure Portal → Web App → Overview → Get publish profile → download.

In GitHub repo: Settings → Secrets and variables → Actions → New repository secret

Name: ``` AZURE_WEBAPP_PUBLISH_PROFILE ```

Value: paste the entire XML content of the publish profile.

```
## Option B — Service Principal (CLI)

Create a Service Principal with RBAC and a client secret:

# Replace with your subscription ID explicitly to avoid ambiguity
SUB="<YOUR_SUBSCRIPTION_ID>"

# Create SP with Contributor on the resource group
az ad sp create-for-rbac \
  --name car-rental-github \
  --role Contributor \
  --scopes /subscriptions/$SUB/resourceGroups/$RG \
  --sdk-auth
```

Output (sample):
```
{
  "clientId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "clientSecret": "************************",
  "subscriptionId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "tenantId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "activeDirectoryEndpointUrl": "https://login.microsoftonline.com",
  "resourceManagerEndpointUrl": "https://management.azure.com/",
  "managementEndpointUrl": "https://management.core.windows.net/",
  "graphResourceId": "https://graph.windows.net/",
  "azurePortalUrl": "https://portal.azure.com"
}
```

Create these GitHub secrets:

AZURE_CREDENTIALS → paste the entire JSON above

(Optional explicit ones if you prefer) AZURE_SUBSCRIPTION_ID, AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET

Note: Microsoft now recommends OIDC (federated credentials) over client secrets. If you later switch to OIDC, use azure/login@v2 with client-id, tenant-id, and subscription-id (no secret), and set up a federated credential on your Entra App for your repo/branch.

- - 

## (5) GitHub Actions workflow (monorepo build + deploy)

Create .github/workflows/deploy.yml with one of the following variants.

Variant 1 — Publish Profile (uses ```AZURE_WEBAPP_PUBLISH_PROFILE```)
```
name: Deploy to Azure WebApp

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Use Node.js 20 (matches Azure runtime and react-router v7)
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      # --- FRONTEND: install + build (ignore CRA warnings in CI) ---
      - name: Install & build frontend
        run: |
          cd frontend
          npm ci
          # Prevent CRA from failing build on warnings in CI
          CI=false npm run build
          # Workaround rare "Permission denied" for react-scripts on Linux
          chmod +x node_modules/.bin/react-scripts || true

      # --- BACKEND: install only (no scripts) ---
      - name: Install backend deps
        run: |
          cd backend
          npm ci --ignore-scripts

      # --- Copy React build into backend so Express can serve it ---
      - name: Copy frontend build into backend
        run: |
          rm -rf backend/frontend/build
          mkdir -p backend/frontend/build
          cp -r frontend/build/* backend/frontend/build/

      # --- Deploy only the backend folder (it now contains the build too) ---
      - name: Deploy to Azure WebApp (Publish Profile)
        uses: azure/webapps-deploy@v3
        with:
          app-name: car-rental-app               # <-- your web app name
          package: ./backend                     # deploy backend folder
          publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}

```
If you moved server.js and package.json to the repo root instead of backend/, you can deploy package: . and remove the copy step (but update server.js static path accordingly).

## (6) Azure App Service configuration

Runtime: Node 20 (your workflow also uses Node 20)

Startup Command: Leave empty if you deploy backend/ and your backend/package.json has "start": "node server.js"

If needed, you can set:
bash -c 'cd backend && npm start'
(only required when you deploy the repo root but the app lives in backend)

App Settings: Add MONGO_URI, JWT_SECRET, etc. (Configuration → Application settings)

## (7) Verify & Logs

After a push to main, check:

GitHub Actions → the workflow should succeed.

Azure Portal → Web App → Browse to the URL.

If the app fails to start:

Web App → Logs → Log stream (live)

Web App → Deployment Center → check deployment status

Enable filesystem logs (if needed):

```az webapp log config -g $RG -n $APP --application-logging filesystem --level information```

Kudu/SSH:

Advanced Tools (Kudu) → Go → Debug console https://<app>.scm.azurewebsites.net/DebugConsole

Check files under /home/site/wwwroot/

## (8) Common issues (and the fixes we used)

react-scripts: Permission denied during build
Add chmod +x node_modules/.bin/react-scripts || true before npm run build.

CRA treats warnings as errors in CI (process.env.CI = true)
Use CI=false npm run build in the workflow, or fix lint warnings.

Cannot find module '/home/site/wwwroot/index.js'
App Service starts from the deployed root (/home/site/wwwroot).
Fix by either:

Deploying the backend folder only (package: ./backend) and ensuring backend/package.json has "start": "node server.js", or

Setting Startup Command to bash -c 'cd backend && npm start', or

Moving server.js and package.json to the repo root and deploying root.

/opt/startup/startup.sh: cd: can't cd to backend
You set a startup command to cd backend but your deployment did not include a backend/ folder at /home/site/wwwroot.
Fix: either deploy package: . (when backend/ exists in the deployed artifact) or remove the Startup Command and deploy only ./backend.

Container didn't respond to HTTP pings on port: 8080
Your app may have crashed or didn’t start. Check Log Stream for Node errors (missing server.js, missing deps, wrong start script).

409 Conflict — OneDeploy in GitHub Actions
Usually means a previous deployment is still extracting or the app is restarting. Re-run the job; if persistent, Stop the app, deploy, then Start.

ENOENT: ... /home/site/frontend/build/index.html
You served ../frontend/build from Express, but that path wasn’t deployed.
Fix: copy React build into backend/frontend/build before deploying ./backend (see workflow step).

Frontend "proxy": "http://localhost:5000"
Only used in local dev. In production it’s ignored. Since the backend serves the frontend, just call /api/... from the UI.

Node version mismatch (react-router-dom@7 requires Node ≥ 20)
Ensure both Azure Web App runtime and GitHub Action use Node 20.

## (9) Useful commands (reference)
```
# Azure login
az login

# Create RG, Plan, Web App (Linux, Node 20)
az group create -n CarRental-RG -l centralindia
az appservice plan create -g CarRental-RG -n CarRental-Plan --is-linux --sku B1
az webapp create -g CarRental-RG -p CarRental-Plan -n car-rental-app --runtime "NODE|20-lts"

# Configure logs
az webapp log config -g CarRental-RG -n car-rental-app --application-logging filesystem --level information

# Restart app
az webapp restart -g CarRental-RG -n car-rental-app

# Service Principal for GitHub Actions
az ad sp create-for-rbac \
  --name car-rental-github \
  --role Contributor \
  --scopes /subscriptions/<SUB_ID>/resourceGroups/CarRental-RG \
  --sdk-auth
```
## (10) What to commit

This README (README.md)

Your workflow file: .github/workflows/deploy.yml

Ensure backend/package.json has "start": "node server.js"

Ensure server.js serves backend/frontend/build

Your app code

## (11) Quick checklist

 Node 20 in Azure and in workflow

 backend/package.json → "start": "node server.js"

 React build is copied into backend/frontend/build before deploy

 App Settings set in Azure (MONGO_URI, JWT_SECRET, etc.)

 One authentication method configured (Publish Profile or Service Principal)

 No Startup Command unless you really need it

 Logs verified if anything fails




