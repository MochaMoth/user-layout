const Layout = require('./layout');
const path = require("path");
const fs = require("fs");

module.exports = class Window extends Layout
{
    /**
     * Displays an html partial document within the Window.
     * Takes the relative path to the html document.
     * @param {String} contents 
     */
    constructor(contents)
    {
        super();
        this.contents = contents;
    }

    GetAnchors()
    {
        return (`
            <div class="window hidden-content">
                <div class="anchor-top" ></div >
                    <div class="anchor-bottom"></div>
                    <div class="anchor-left"></div>
                    <div class="anchor-right"></div>
                    <div class="anchor-center"></div>
                </div >`);
    }

    GenerateHtml(rootPath)
    {
        console.log(this.styles);
        let module = fs.readFileSync(path.join(rootPath, this.contents), { encoding: "utf-8" });

        return (`
            <div class="window visual-content">${module}</div>
            ${this.GetAnchors()}
        `);
    }
}