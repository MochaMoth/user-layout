const electron = require("electron");
const { app, BrowserWindow } = electron;
const userlayout = require("user-layout");
const path = require("path");
const fs = require("fs");
const { rootPath } = require("electron-root-path");
const { Layout, SplitLayout, Window, TabbedWindow, SplitType, Tab } = userlayout;

app.on("ready", () =>
{
    let mainWindow = new BrowserWindow({ width: 800, height: 600 });

    layout = new Layout(
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

    let preHtml = fs.readFileSync(path.join(rootPath, "Header.html"), { encoding: "utf-8" });
    let layoutHtml = layout.GenerateHtml(rootPath);
    let postHtml = fs.readFileSync(path.join(rootPath, "Footer.html"), { encoding: "utf-8" });

    mainWindow.loadURL(`data:text/html;charset=utf-8,${preHtml}${layoutHtml}${postHtml}`);
});