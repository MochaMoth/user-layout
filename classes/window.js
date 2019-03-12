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
        const location = path.join(rootPath, this.contents);
        return fs.readFileSync(location, { encoding: "utf-8" });
    }
}