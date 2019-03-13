const Window = require('./window');
const Tab = require("./tab");
const path = require("path");
const fs = require("fs");

module.exports = class TabbedWindow extends Window
{
    /**
     * 
     * @param {Array<Tab>} tabs 
     */
    constructor(tabs)
    {
        super();
        this.tabs = tabs;
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
            ${this.GetAnchors()}
        `);
    }
}
