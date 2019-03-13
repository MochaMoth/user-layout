const Window = require('./window');
const Tab = require("./tab");
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
        let tabs = "";
        let modules = "";

        this.tabs.forEach(element =>
        {
            let module = fs.readFileSync(path.join(rootPath, element.file), { encoding: "utf-8" });
            tabs += `<div class="tab ${element.visible}">${element.name}</div>`;
            modules += `<div class="window visual-content ${element.visible}">${module}</div>`;
        });

        return (`
            <div class="tab-navigation">${tabs}</div>
            <div class="tab-modules">${modules}</div>
            <div class="window hidden-content">
                <div class="anchor-top"></div>
                <div class="anchor-bottom"></div>
                <div class="anchor-left"></div>
                <div class="anchor-right"></div>
                <div class="anchor-center"></div>
            </div>
        `);
    }
}
