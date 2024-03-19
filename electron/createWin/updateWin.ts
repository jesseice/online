import { BrowserWindow, app, ipcMain } from "electron";
import { join } from "node:path";

export const createUpdateWindow = async () => {
  let updateWin = new BrowserWindow({
    width: 450,
    height: 300,
    resizable: false,
    maximizable: false,
    title: "更新",
    autoHideMenuBar: true,
    frame: false,
    icon: join(process.env.VITE_PUBLIC, "flower.png"),
    webPreferences: {
      preload: join(__dirname, "../preload/index.mjs"),
    },
  });

  const url = process.env.VITE_DEV_SERVER_URL;
  if (process.env.VITE_DEV_SERVER_URL) {
    updateWin.loadURL(url + "#update");
    updateWin.webContents.openDevTools();
  } else {
    const indexHtml = join(process.env.DIST, "index.html");
    await updateWin.loadFile(indexHtml);
    updateWin.webContents.executeJavaScript(`window.location.hash = '#update'`);
  }

  const allWins = BrowserWindow.getAllWindows();
  allWins.forEach((win) => {
    if (updateWin.id !== win.id) {
      win.id === 1 ? win.hide() : win.destroy();
    }
  });

  ipcMain.on("update_closed", () => {
    const mainWin = allWins.find((win) => win.id === 1);
    if (mainWin) mainWin.show();
    updateWin.destroy();
    updateWin = null;
  });

  ipcMain.on("update_minus", () => {
    updateWin.minimize();
  });
  return { updateWin };
};
