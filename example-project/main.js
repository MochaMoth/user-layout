"use strict";
const electron = require("electron");
const { app, BrowserWindow, ipcMain } = electron;
const { join } = require("path");
const { readFileSync } = require("fs");
const { rootPath } = require("electron-root-path");
const userLayout = require("user-layout");
const styles = require('./styles.json');

let defaultLayout = new userLayout.Layout(
    new userLayout.SplitLayout(userLayout.SplitType.HORIZONTAL, 25,
        new userLayout.SplitLayout(userLayout.SplitType.VERTICAL, 25,
            new userLayout.TabbedWindow(["Test_File_1.html"]),
            new userLayout.TabbedWindow(["Test_File_2.html", "Test_File_4.html"]),
        ),
        new userLayout.TabbedWindow(["Test_File_3.html"])
    )
);
//let layout = userLayout.LoadLayout("mainlayout", defaultLayout);
let layout = defaultLayout;

app.on("ready", () =>
{
    layout.UpdateStyles(styles);
    let mainWindow = new BrowserWindow({ width: 800, height: 600 });

    let preHtml = readFileSync(join(rootPath, "Header.html"), { encoding: "utf-8" });
    let layoutHtml = layout.GenerateHtml(rootPath);
    let postHtml = readFileSync(join(rootPath, "Footer.html"), { encoding: "utf-8" });

    mainWindow.loadURL(`data:text/html;charset=utf-8,${preHtml}${layoutHtml}${postHtml}`);
});

app.on("before-quit", (e) =>
{
    userLayout.SaveLayout("mainlayout", layout);
});