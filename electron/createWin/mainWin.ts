import { BrowserWindow, Menu, MenuItem, app, ipcMain, shell } from "electron";
import { join } from "node:path";
import updateHandle from "../utils/update";
export const createWindow = () => {
  let win = new BrowserWindow({
    minWidth: 1280,
    minHeight: 720,
    title: "主界面",
    autoHideMenuBar: true,
    frame: false,
    icon: join(process.env.VITE_PUBLIC, "flower.png"),
    webPreferences: {
      preload: join(__dirname, "../preload/index.mjs"),
    },
  });
  const url = process.env.VITE_DEV_SERVER_URL;
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(url);
    console.log("[url] ---> ", url);
    win.webContents.openDevTools();
  } else {
    const indexHtml = join(process.env.DIST, "index.html");
    console.log("[indexHtml] ---> ", indexHtml);
    win.loadURL(indexHtml);
  }

  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url);
    return { action: "deny" };
  });

  app.on("window-all-closed", () => {
    win = null;
    if (process.platform !== "darwin") app.quit();
  });

  ipcMain.on("min", () => win.minimize());
  ipcMain.on("max", () => (win.isMaximized() ? win.restore() : win.maximize()));
  ipcMain.on("close", () => win.close());

  const { checkUpdate, updateInfo } = updateHandle(win);

  checkUpdate();
  setInterval(() => checkUpdate(), 36e5);

  win.webContents.on("context-menu", (_, args) => {
    const contextMenu = new Menu();
    const menuItem = [
      {
        label: "刷新页面",
        fn: () => win.reload(),
      },
      {
        label: "当前软件版本为: " + app.getVersion(),
      },
      {
        label: "获取更新",
        fn: () => {
          checkUpdate();
        },
      },
      {
        label: "最新版本下载",
        fn: () => {
          shell.openExternal(updateInfo.lastFileExe);
        },
      },
    ];
    menuItem.forEach((item) =>
      contextMenu.append(
        new MenuItem({
          label: item.label,
          click: item.fn,
        })
      )
    );
    contextMenu.popup({ window: win, x: args.x, y: args.y });
  });
  return win;
};
