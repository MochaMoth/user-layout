const electron = require("electron");
const { app, BrowserWindow } = electron;
const userlayout = require("user-layout");
const { rootPath } = require("electron-root-path");
const { Layout, SplitLayout, Window, TabbedWindow, SplitType } = userlayout;

app.on("ready", () =>
{
    let mainWindow = new BrowserWindow({ width: 800, height: 600 });

    layout = new Layout(
        new SplitLayout(SplitType.HORIZONTAL, 25,
            new SplitLayout(SplitType.VERTICAL, 25,
                new Window("Test File 1.html"),
                new Window("Test File 2.html")),
            new Window("Test File 3.html"))
    );

    let layoutHtml = layout.GenerateHtml(rootPath);

    mainWindow.loadURL(`data:text/html;charset=utf-8,${layoutHtml}`);
});