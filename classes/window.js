"use strict";
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
        this.id = "id" + Math.round(Math.random() * 10000000);
        this.GetAnchors = function (layoutId)
        {
            return (`
                <div class="window hidden-content" style="position: relative; top: -100%; display: grid; grid-template-rows: 20% 60% 20%; grid-template-columns: 20% 60% 20%;">
                    <div class="anchor anchor-top"    style="grid-column: 2 / 3; grid-row: 1 / 2;" ondragover="${this.id}allowDragover(event)" ondragleave="${this.id}onDragLeave(event)" ondrop="${this.id}onDrop(event)"></div>
                    <div class="anchor anchor-bottom" style="grid-column: 2 / 3; grid-row: 3 / 4;" ondragover="${this.id}allowDragover(event)" ondragleave="${this.id}onDragLeave(event)" ondrop="${this.id}onDrop(event)"></div>
                    <div class="anchor anchor-left"   style="grid-column: 1 / 2; grid-row: 2 / 3;" ondragover="${this.id}allowDragover(event)" ondragleave="${this.id}onDragLeave(event)" ondrop="${this.id}onDrop(event)"></div>
                    <div class="anchor anchor-right"  style="grid-column: 3 / 4; grid-row: 2 / 3;" ondragover="${this.id}allowDragover(event)" ondragleave="${this.id}onDragLeave(event)" ondrop="${this.id}onDrop(event)"></div>
                    <div class="anchor anchor-center" style="grid-column: 2 / 3; grid-row: 2 / 3;" ondragover="${this.id}allowDragover(event)" ondragleave="${this.id}onDragLeave(event)" ondrop="${this.id}onDrop(event)"></div>
                </div >
                <script>
                    function ${this.id}allowDragover(event)
                    {
                        console.log(event.target);
                        event.target.classList.add("hover");
                        ${layoutId}allowDragover(event);
                    }

                    function ${this.id}onDragLeave(event)
                    {
                        console.log(event.target);
                        event.target.classList.remove("hover");
                    }

                    function ${this.id}onDrop(event)
                    {
                        console.log(event.target);
                        event.stopPropagation();
                    }
                </script>`);
        }

        this.GenerateHtml = function (rootPath, layoutId)
        {
            let module = fs.readFileSync(path.join(rootPath, this.contents), { encoding: "utf-8" });

            return (`
                <div class="window visual-content">${module}</div>
                ${this.GetAnchors(layoutId)}
            `);
        }
    }

}