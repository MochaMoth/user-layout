"use strict";
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
        this.id = "id" + Math.round(Math.random() * 10000000);
        this.GenerateHtml = function (rootPath, layoutId)
        {
            let tabs = "";
            let modules = "";
            let hasChecked = false;

            this.tabs.forEach((element, index) =>
            {
                if (element.visible === "visible") hasChecked = true;
                let module = fs.readFileSync(path.join(rootPath, element.file), { encoding: "utf-8" });
                tabs += `<div class="tab ${element.visible}" index="${index}" draggable="true" ondragstart="${layoutId}onDragStart(event)">${element.name}</div>`;
                modules += `<div class="window visual-content ${element.visible}">${module}</div>`;
            });

            return (`
                <div id="${this.id}">
                    <div class="tab-navigation" onclick="${this.id}tabClick(event)">${tabs}</div>
                    <div class="tab-modules">${modules}</div>
                    ${this.GetAnchors()}
                    <script>
                        if (!${hasChecked})
                        {
                            document.querySelector("%23${this.id}>.tab-navigation>.tab").classList.add("visible");
                            document.querySelector("%23${this.id}>.tab-modules>.window").classList.add("visible");
                        }

                        function ${this.id}tabClick(event)
                        {
                            index = event.target.getAttribute("index");
                            ${this.id}resetTabs();

                            document.querySelectorAll("%23${this.id}>.tab-navigation>.tab")[index].classList.add("visible");
                            document.querySelectorAll("%23${this.id}>.tab-modules>.window")[index].classList.add("visible");
                        }

                        function ${this.id}resetTabs()
                        {
                            tabs = document.querySelectorAll("%23${this.id}>.tab-navigation>.tab");
                            windows = document.querySelectorAll("%23${this.id}>.tab-modules>.window");

                            tabs.forEach((element, index) => {
                                element.classList.remove("visible");
                                windows[index].classList.remove("visible");
                            });
                        }
                    </script>
                </div>
            `);
        }
    }

}
