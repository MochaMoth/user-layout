const { SplitType } = require('../constants')

module.exports = class Layout
{
    /**
     * Takes in a class that extends Layout in a tree structure
     * @param {Layout} layout 
     */
    constructor()
    {
        this.name = 'layout'
        this.layout;
        this.styles;
    }
    // working on recursive strategy 
    setLayout(splitType, splitDistance, layoutA, layoutB)
    {
        // checks if only one arg then sets layout to that one arg. Not perfect still working on it. 
        const SplitLayout = require('./splitLayout');
        const Window = require('./window');
        if (arguments.length == 1)
        {
            this.layout = new Window(splitType)
        } else
        {
            this.layout = new SplitLayout(splitType, splitDistance, new Window(layoutA), new Window(layoutB))
        }

    }

    LoadLayoutFromJson(layoutData)
    {
        this.layout = JSON.parse(layoutData);
    }

    updateStyles(styleData) 
    {
        const styles = styleData[this.name]
        let stylesArr = [];
        for (let style in styles)
        {
            if (styles.hasOwnProperty(style))
            {
                stylesArr.push(`${style}:${styles[style]};`);
            }
        };
        let result = stylesArr.join(' ');
        console.log(result);
        this.styles = result;
    }

    SaveLayoutToJson(layoutObject)
    {
        return (JSON.stringify(layoutObject));
    }

    GenerateHtml(rootPath)
    {
        //Magic here!
        //returns each window/tabbed window in an overall layout with files defined in 'Modules' loaded
        //elements should have events bound automagically
        //
        return (`
            <body style="margin:0;">
                <div class="user-layout" style="${this.styles}">
                    ${this.layout.GenerateHtml(rootPath)}
                </div>
                <script>
                    const electron = require("electron");
                    const { ipcRenderer } = electron;

                    ipcRenderer.on("userlayout:startdrag", (e) =>
                    {
                        const hiddenLayer = document.querySelectorAll(".window.hidden-content");
                        hiddenLayout.forEach(element =>
                        {
                            element.classList.add("show");
                        });
                    });

                    ipcRenderer.on("userlayout:enddrag", (e) =>
                    {
                        const hiddenLayer = document.querySelectorAll(".window.hidden-content");
                        hiddenLayout.forEach(element =>
                        {
                            element.classList.remove("show");
                        });
                    });
                </script>
            </body>
        `);
    }
}