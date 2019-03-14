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