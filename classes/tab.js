"use strict";
module.exports = class Tab
{
    /**
     * Dataset for a Tab.
     * Takes the tab title as 'name' and the relative path to the html document as 'file'.
     * If this tab is visible, set 'visible' to "visible", otherwise omit the argument.
     * In most cases, only one tab should be marked 'visible' at a time. If the first tab
     * is going to be visible, you can omit that argument, as well.
     * @param {String} file 
     * @param {String} name 
     * @param {String} visible 
     */
    constructor(file, name = "", visible = "")
    {
        if (name === "")
            this.name = file.split(".")[0].replace(/_/g, " ");
        else
            this.name = name;
        this.file = file;
        this.visible = visible;
    }
}