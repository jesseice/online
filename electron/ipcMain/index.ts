import { ipcMain } from "electron";
import { createLoginWindow } from "../createWin/loginWin";

ipcMain.handle("open_login_win", () => {
  createLoginWindow();
});