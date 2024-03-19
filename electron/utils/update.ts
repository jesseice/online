// electron 更新模块 自创
import fs from "fs";
import path from "path";
import { fetch } from "umi-request";
import { app, dialog } from "electron";
import { spawn } from "child_process";
import http from "http";
import { createUpdateWindow } from "../createWin/updateWin";

export default (mainWin) => {
  // const _updateInfoUrl =
  //   "http://1.14.209.241:5555/?explorer/index/fileOut&path=%7Bio%3A1%7D%2F202403%2F15_6a1d3924%2Fversion.json";
  const _updateInfoUrl = "http://1.14.209.241:3000/version";
  const updateInfo = {
    lastVersion: "",
    lastFileExe: "",
  };
  let dialogVisible = false;

  const compareVersions = (version1, version2) => {
    const v1 = version1.split(".").map(Number);
    const v2 = version2.split(".").map(Number);

    const maxLength = Math.max(v1.length, v2.length);

    for (let i = 0; i < maxLength; i++) {
      const num1 = v1[i] || 0;
      const num2 = v2[i] || 0;

      if (num1 < num2) {
        return false;
      } else if (num1 > num2) {
        return true;
      }
    }
    return false; // 版本相等
  };

  const executeFile = (filePath) => {
    const child = spawn(filePath, [], { detached: true, stdio: "ignore" });
    child.unref();
    app.quit();
  };

  const checkUpdate = async () => {
    const res = await fetch(_updateInfoUrl);
    const response = await res.json();
    console.log("[response] ---> ", response);
    const { version, url } = response;

    updateInfo.lastVersion = version;
    updateInfo.lastFileExe = url;
    const curVersion = app.getVersion();
    const needUpdate = compareVersions(version, curVersion);
    if (needUpdate) {
      if (dialogVisible) return;
      dialogVisible = true;
      const options: Electron.MessageBoxOptions = {
        type: "warning",
        title: "有新版本",
        message: "新版本已发布，是否马上更新?",
        buttons: ["是", "否"],
        cancelId: -1,
      };
      dialog.showMessageBox(options).then(({ response }) => {
        console.log("[dialog response] ---> ", response);
        if (response === 0) {
          downloadUpdate();
          return;
        }
        dialogVisible = false;
        mainWin.webContents.send(
          "note-msg",
          "取消更新将使用不了新功能，重新更新请按鼠标右键",
          "info"
        );
      });
    }
  };

  const downloadUpdate = async () => {
    const { lastFileExe, lastVersion } = updateInfo;
    const updateDir = path.join(app.getPath("userData"), "updates");
    const filePath = path.join(
      updateDir,
      `online_flower_setup_${lastVersion}.exe`
    );
    http.get(lastFileExe, async (response) => {
      // 获取文件总大小
      const totalSize = parseInt(response.headers["content-length"], 10);
      let downloadedSize = 0;

      if (!fs.existsSync(updateDir)) {
        fs.mkdirSync(updateDir);
      }
      // 创建可写流
      const fileStream = fs.createWriteStream(filePath);
      fileStream.on("finish", () => {
        fileStream.close((err) => {
          if (!err) executeFile(filePath);
        });
      });
      // 创建更新窗口
      const { updateWin } = await createUpdateWindow();
      // 监听数据接收事件
      response.on("data", (chunk) => {
        downloadedSize += chunk.length;
        const percent = (downloadedSize / totalSize) * 100;
        if (!updateWin) return;
        try {
          updateWin.webContents.send("update-percent", {
            percent: Number(percent.toFixed(2)),
          });
        } catch (error) {
          console.log("[error] ---> ", error);
          response.destroy();
          dialogVisible = false;
        }
        // 写入数据到文件
        fileStream.write(chunk);
      });

      // 监听数据接收完成事件
      response.on("end", () => {
        fileStream.end();
        console.log("end!");
      });
    });
  };
  return { checkUpdate, updateInfo };
};
