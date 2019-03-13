module.exports = class Layout
{
    /**
     * Takes in a class that extends Layout in a tree structure
     * @param {Layout} layout 
     */
    constructor(layout, styles)
    {
        this.layout = layout;
        this.styles = styles;
    }

    LoadLayoutFromJson(layoutData)
    {
        this.layout = JSON.parse(layoutData);
    }

    updateLayoutStyles(styleData) 
    {
        let layoutStyles = styleData.layout
        let styles = [];
        for (let style in layoutStyles) {
            if (layoutStyles.hasOwnProperty(style)) {
                styles.push(`${style}:${layoutStyles[style]};`);
            }
        };
        let result = styles.join(' ');
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
            <div class="user-layout" style=${this.styles}>
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
        `);
    }
}