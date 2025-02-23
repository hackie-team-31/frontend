# SmartPay Browser Extension Setup Instructions

## Prerequisites
- Node.js (v16+ recommended)
- npm (comes with Node.js)
- Google Chrome browser

## Setup Steps

1. **Unzip the project archive**
```bash
unzip smartpay-frontend.zip
```

2. **Navigate to the frontend directory**
```bash
cd frontend
```

3. **Install project dependencies**
```bash
npm install
```

---

## Running the Extension Locally (Development Mode)

1. **Start the development server**
```bash
npm run dev
```

2. **Access the development server**
- The server will be hosted at:
```
http://localhost:5173
```
- The root of the project is available at:
```
http://localhost:5173/#/
```

---

## Building and Loading the Extension in Chrome

1. **Build the project**
```bash
npm run build
```

2. **Open Chrome Extensions page**
- Navigate to:
```
chrome://extensions/
```

3. **Enable Developer Mode**
- Toggle the "Developer mode" switch in the top-right corner.

4. **Load the unpacked extension**
- Click on "Load unpacked."
- Select the `dist/` directory created by the build process.

5. **Verify Backend Availability**
- Make sure the backend server is running locally at:
```
http://localhost:8000
```

6. **Test the Extension**
- Click on the SmartPay extension icon in the browser to view the popup.

---

## Troubleshooting
- If the extension does not load correctly, ensure all previous versions are removed.
- Check the browser console for errors (Right-click -> Inspect -> Console).

For further assistance, please contact the project team.

