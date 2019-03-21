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
        //this.id = "id" + Math.round(Math.random() * 10000000);
        this.GetAnchors = function (layoutId)
        {
            return (`
                <div class="window hidden-content" style="position: relative; top: -100%; display: grid; grid-template-rows: 20% 60% 20%; grid-template-columns: 20% 60% 20%;">
                    <div class="anchor anchor-top"    dropdirection="top" style="grid-column: 2 / 3; grid-row: 1 / 2;" ondragover="${this.id}allowDragoverWindow(event)" ondragleave="${this.id}onDragLeaveWindow(event)" ondrop="${this.id}onDropWindow(event)"></div>
                    <div class="anchor anchor-bottom" dropdirection="bottom" style="grid-column: 2 / 3; grid-row: 3 / 4;" ondragover="${this.id}allowDragoverWindow(event)" ondragleave="${this.id}onDragLeaveWindow(event)" ondrop="${this.id}onDropWindow(event)"></div>
                    <div class="anchor anchor-left"   dropdirection="left" style="grid-column: 1 / 2; grid-row: 2 / 3;" ondragover="${this.id}allowDragoverWindow(event)" ondragleave="${this.id}onDragLeaveWindow(event)" ondrop="${this.id}onDropWindow(event)"></div>
                    <div class="anchor anchor-right"  dropdirection="right" style="grid-column: 3 / 4; grid-row: 2 / 3;" ondragover="${this.id}allowDragoverWindow(event)" ondragleave="${this.id}onDragLeaveWindow(event)" ondrop="${this.id}onDropWindow(event)"></div>
                    <div class="anchor anchor-center" dropdirection="center" style="grid-column: 2 / 3; grid-row: 2 / 3;" ondragover="${this.id}allowDragoverWindow(event)" ondragleave="${this.id}onDragLeaveWindow(event)" ondrop="${this.id}onDropWindow(event)"></div>
                </div >
                <script>
                    function ${this.id}allowDragoverWindow(event)
                    {
                        event.target.classList.add("hover");
                        ${layoutId}allowDragover(event);
                    }

                    function ${this.id}onDragLeaveWindow(event)
                    {
                        event.target.classList.remove("hover");
                    }

                    function ${this.id}onDropWindow(event)
                    {
                        event.target.classList.remove("hover");
                        document.querySelectorAll(".window.hidden-content").forEach(element => {
                            element.classList.remove("visible");
                        });
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