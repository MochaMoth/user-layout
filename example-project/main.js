const electron = require("electron");
const { app, BrowserWindow } = electron;
const userlayout = require("user-layout");
const { rootPath } = require("electron-root-path");
const { Layout, SplitLayout, Window, TabbedWindow, SplitType, Tab } = userlayout;
const styles = require('./styles.json')

app.on("ready", () =>
{
    let mainWindow = new BrowserWindow({ width: 800, height: 600 });

    layout = new Layout();
    layout.updateStyles(styles)
    //test for full split layout
    // layout.setLayout(SplitType.VERTICAL, 25, new Window("Test File 3.html"), new Window("Test File 3.html"))
    // test for full page layout
    layout.setLayout(new Window("Test File 3.html"));

    let layoutHtml = layout.GenerateHtml(rootPath);

    mainWindow.loadURL(`data:text/html;charset=utf-8,${layoutHtml}`);
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