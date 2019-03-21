"use strict";
const electron = require("electron");

module.exports = class Layout
{
    /**
     * Takes in a class that extends Layout in a tree structure
     * @param {Layout} layout 
     */
    constructor(layout)
    {
        this.layout = layout;
        this.styles;
        this.id = "id" + Math.round(Math.random() * 10000000);
        this.GenerateHtml = function (rootPath)
        {
            //Magic here!
            //returns each window/tabbed window in an overall layout with files defined in 'Modules' loaded
            //elements should have events bound automagically
            //
            return (`
                <div class="user-layout" style="width:100%; height:100%;">
                    ${this.layout.GenerateHtml(rootPath, this.id)}
                </div>
                <script>
                    const electron = require("electron");
                    const { ipcRenderer } = electron;
                    let dragObject;
                    let dragObjectWindow;

                    function ${this.id}setDragTarget(dragTarget, dragTargetWindow)
                    {
                        dragObject = dragTarget;
                        dragObjectWindow = dragTargetWindow
                    }

                    function ${this.id}getDragTarget()
                    {
                        return { dragTarget: dragObject, dragTargetWindow: dragObjectWindow };
                    }
                </script>
            `);
        }
        this.UpdateStyles = function (styleData)
        {
            const styles = styleData[this.name];
            let stylesArr = [];
            for (let style in styles)
            {
                if (styles.hasOwnProperty(style))
                {
                    stylesArr.push(`${style}:${styles[style]};`);
                }
            };
            let result = stylesArr.join('; ');
            this.styles = result;
        }
    }
}