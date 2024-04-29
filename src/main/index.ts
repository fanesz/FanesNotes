import { app, shell, BrowserWindow, ipcMain, dialog } from "electron";
import path, { join } from "path";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";
import icon from "../../resources/icon.png?asset";
import fs from "fs";

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === "linux" ? { icon } : {}),
    center: true,
    title: "Fanes Notes",
    backgroundMaterial: "acrylic",
    trafficLightPosition: { x: 15, y: 10 },
    titleBarOverlay: {
      color: "#000000"
    },
    transparent: true,
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false,
      nodeIntegration: true
    },
    resizable: true
  });

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }

  // mainWindow.webContents.on("did-finish-load", () => {
  //   mainWindow.webContents.send(
  //     "allWindows",
  //     BrowserWindow.getAllWindows().length
  //   );
  // });
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId("com.electron");

  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  ipcMain.on("ping", () => console.log("pong"));

  ipcMain.on("saveFile", async (_, data) => {
    const filePath = await dialog.showSaveDialog({
      title: "Save File",
      buttonLabel: "Save",
      filters: [
        { name: "Text Files", extensions: ["txt"] },
        { name: "All Files", extensions: ["*"] }
      ],
      defaultPath: path.join(app.getPath("downloads"), `${data.title}.txt`)
    });

    if (!filePath.canceled && filePath.filePath) {
      fs.writeFileSync(filePath.filePath, data.content, "utf-8");
      shell.showItemInFolder(filePath.filePath);
    }
  });

  ipcMain.on("saveFiles", async (_, notes) => {
    const folderPath = await dialog.showOpenDialog({
      title: "Select Folder to Save Files",
      buttonLabel: "Select Folder",
      properties: ["openDirectory"]
    });

    if (!folderPath.canceled && folderPath.filePaths.length > 0) {
      notes.forEach((note) => {
        const filePath = path.join(
          folderPath.filePaths[0],
          `${note.title}.txt`
        );
        fs.writeFileSync(filePath, note.content, "utf-8");
      });
      shell.openPath(folderPath.filePaths[0]);
    }
  });

  ipcMain.on("backupOnClose", async (_, state) => {
    const userDataPath = app.getPath("userData");
    const fileName = new Date()
      .toISOString()
      .replace(/:/g, "-")
      .replace(/T/, "_")
      .replace(/\..+/, "");
    const filePath = `${userDataPath}/FanesNotes/stateBackup/${fileName}.json`;

    const directoryPath = path.dirname(filePath);
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    fs.writeFileSync(filePath, JSON.stringify(state), "utf-8");
  });

  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
