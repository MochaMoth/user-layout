const Window = require('./window');
const path = require("path");
const fs = require("fs");

module.exports = class TabbedWindow extends Window
{
    constructor(tabs, selectedTab)
    {
        super();
        this.tabs = tabs;
        this.selectedTab = selectedTab;
    }

    GenerateHtml(rootPath)
    {
        const location = path.join(rootPath, this.contents);
        return fs.readFileSync(location, { encoding: "utf-8" });
    }
}
