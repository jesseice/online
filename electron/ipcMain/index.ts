import { ipcMain } from "electron";
import { createLoginWindow } from "../createWin/loginWin";
import xhsSign from "../utils/xs_old";
ipcMain.handle("open_login_win", () => {
  createLoginWindow();
});

ipcMain.handle("search_xhs_image", (_: any, str: string) => {
  const sign = xhsSign(
    "https://edith.xiaohongshu.com/api/sns/web/v1/search/notes",
    {
      keyword: "笑猫日记",
      page: 2,
      page_size: 20,
      search_id: "2cyy5s4okugocibmolh23",
      sort: "general",
      note_type: 0,
      ext_flags: [],
      image_formats: ["jpg", "webp", "avif"],
    }
  );
  console.log("[sign] ---> ", sign);
});