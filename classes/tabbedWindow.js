const Window = require('./window');
const Tab = require("./tab");
const path = require("path");
const fs = require("fs");

module.exports = class TabbedWindow extends Window
{
    /**
     * Creates a Window with tabs at the top for cycling the contents.
     * @param {Array<Tab>} tabs 
     */
    constructor(tabs)
    {
        super();
        this.tabs = tabs;
        this.GenerateHtml = function (rootPath)
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

}
