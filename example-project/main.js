const electron = require("electron");
const { app, BrowserWindow, ipcMain } = electron;
const userlayout = require("user-layout");
const { Layout, SplitLayout, Window, TabbedWindow, SplitType, Tab } = userlayout;
const { join } = require("path");
const { readFileSync } = require("fs");
const { rootPath } = require("electron-root-path");
const UserPrefs = require("./UserPrefs");

defaultLayout = new Layout(
    new SplitLayout(SplitType.HORIZONTAL, 25,
        new SplitLayout(SplitType.VERTICAL, 25,
            new Window("Test File 1.html"),
            new TabbedWindow([
                new Tab("File 2", "Test File 2.html", "visible"),
                new Tab("File 4", "Test File 4.html")
            ]),
        ),
        new Window("Test File 3.html")
    )
);

const userPrefs = new UserPrefs("preferences", {
    "layout": defaultLayout
});
let layout = userPrefs.get("layout");

app.on("ready", () =>
{
    let mainWindow = new BrowserWindow({ width: 800, height: 600 });

    let preHtml = readFileSync(join(rootPath, "Header.html"), { encoding: "utf-8" });
    let layoutHtml = layout.GenerateHtml(rootPath);
    let postHtml = readFileSync(join(rootPath, "Footer.html"), { encoding: "utf-8" });

    mainWindow.loadURL(`data:text/html;charset=utf-8,${preHtml}${layoutHtml}${postHtml}`);
    userPrefs.set("layout", layout);
});

app.on("before-quit", (e) =>
{
    userPrefs.set("layout", layout);
});