import { BrowserWindow, app, shell } from "electron";
import { join } from "node:path";
export const createWindow = () => {
  let win = new BrowserWindow({
    minWidth: 1280,
    minHeight: 720,
    title: "主界面",
    icon: join(process.env.VITE_PUBLIC, "flower.png"),
    webPreferences: {
      preload: join(__dirname, "../preload/index.mjs"),
    },
  });
  const url = process.env.VITE_DEV_SERVER_URL;
  if (process.env.VITE_DEV_SERVER_URL) {
    // electron-vite-vue#298
    win.loadURL(url);
    // Open devTool if the app is not packaged
    win.webContents.openDevTools();
  } else {
    const indexHtml = join(process.env.DIST, "index.html");
    win.loadFile(indexHtml);
  }

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url);
    return { action: "deny" };
  });

  app.on("window-all-closed", () => {
    win = null;
    if (process.platform !== "darwin") app.quit();
  });

  return win;
};
