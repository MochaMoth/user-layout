"use strict";
module.exports = class Tab
{
    /**
     * Dataset for a Tab.
     * Takes the tab title as 'name' and the relative path to the html document as 'file'.
     * If this tab is visible, set 'visible' to "visible", otherwise omit the argument.
     * In most cases, only one tab should be marked 'visible' at a time.
     * @param {String} name 
     * @param {String} file 
     * @param {String} visible 
     */
    constructor(name, file, visible = "")
    {
        this.name = name;
        this.file = file;
        this.visible = visible;
    }
}