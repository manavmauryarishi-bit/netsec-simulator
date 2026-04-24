import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // Check if we are running in dev or prod
  const isDev = process.env.NODE_ENV !== 'development';
  // Note: For actual dev, we'll connect to vite dev server. For this setup we will assume we start vite, then start electron and point to localhost:5173
  
  // For simplicity, we just load localhost where Vite is running
  win.loadURL('http://localhost:5173').catch(() => {
    // Fallback if production
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
