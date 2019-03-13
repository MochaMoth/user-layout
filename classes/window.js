const Layout = require('./layout');
const path = require("path");
const fs = require("fs");

module.exports = class Window extends Layout
{
    constructor(contents)
    {
        super();
        this.contents = contents;
    }

    GenerateHtml(rootPath)
    {
        let module = fs.readFileSync(path.join(rootPath, this.contents), { encoding: "utf-8" });

        return (`
            <div class="window visual-content">${module}</div>
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