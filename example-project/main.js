const electron = require("electron");
const { app, BrowserWindow } = electron;
const userlayout = require("user-layout");
const { rootPath } = require("electron-root-path");
const { Layout } = userlayout;
const styles = require('./styles.json')

app.on("ready", () =>
{
    let mainWindow = new BrowserWindow({ width: 800, height: 600 });

    layout = new Layout();
    const { layoutA, layoutB } = layout.Split(SplitType.HORIZONTAL, 25);
    const { layoutC, layoutD } = layoutA.Split(SplitType.VERTICAL, 25);

    layoutB.setModule("Test File 2.html");
    layoutC.setModule("Test File 3.html");
    layoutD.setModule("Test File 1.html");

    mainWindow.loadURL(`data:text/html;charset=utf-8,${layout.GetHtml()}`);
});

//holding for reference

// new SplitLayout(SplitType.HORIZONTAL, 25,
//     // new SplitLayout(SplitType.VERTICAL, 25,
//     //     new Window("Test File 1.html"),
//     //     new TabbedWindow([
//     //         new Tab("File 2", "Test File 2.html", "visible"),
//     //         new Tab("File 4", "Test File 4.html")
//     //     ]),
//     // ),
//     new Window("Test File 3.html")
// )