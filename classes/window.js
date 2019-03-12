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
        let module = fs.readFileSync(path.join(rootPath, this.contents), { encoding: "uts-8" });

        return (`
            <div class="window visual-content">${module}</div>
        `);
    }
}