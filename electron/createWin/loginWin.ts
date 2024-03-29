import { BrowserWindow, app, ipcMain } from "electron";
import { join } from "node:path";

export const createLoginWindow = async () => {
  let loginWin = new BrowserWindow({
    width: 400,
    height: 500,
    resizable: false,
    maximizable: false,
    title: "登录",
    autoHideMenuBar: true,
    frame: false,
    icon: join(process.env.VITE_PUBLIC, "flower.png"),
    webPreferences: {
      preload: join(__dirname, "../preload/index.mjs"),
    },
  });

  const url = process.env.VITE_DEV_SERVER_URL;
  if (process.env.VITE_DEV_SERVER_URL) {
    loginWin.loadURL(url + "#login");
    loginWin.webContents.openDevTools();
  } else {
    const indexHtml = join(process.env.DIST, "index.html");
    await loginWin.loadFile(indexHtml);
    loginWin.webContents.executeJavaScript(`window.location.hash = '#login'`);
  }
  // 关闭其他窗口
  const allWins = BrowserWindow.getAllWindows();
  allWins.forEach((win) => {
    if (win.id === 1) {
      win.hide();
    }
    if (loginWin.id !== win.id) {
      win.destroy();
    }
  });

  loginWin.addListener("close", () => {
    allWins.forEach((win) => win.destroy());
  });

  ipcMain.on("login_closed", () => {
    app.quit();
  });

  ipcMain.on("login_minus", () => {
    loginWin.minimize();
  });
  return loginWin;
};
