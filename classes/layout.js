const electron = require("electron");

class Layout
{
    /**
     * Takes in a class that extends Layout in a tree structure
     * @param {Layout} layout 
     */
    constructor(layout)
    {
        this.layout = layout;
        this.GenerateHtml = function (rootPath)
        {
            //Magic here!
            //returns each window/tabbed window in an overall layout with files defined in 'Modules' loaded
            //elements should have events bound automagically
            //
            return (`
                <div class="user-layout" style="width:100%; height:100%;">
                    ${this.layout.GenerateHtml(rootPath)}
                </div>
                <script>
                    const electron = require("electron");
                    const { ipcRenderer } = electron;
                </script>
            `);
        }
    }
}

module.exports = Layout