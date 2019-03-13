module.exports = class Layout
{
    /**
     * Takes in a class that extends Layout in a tree structure
     * @param {Layout} layout 
     */
    constructor(layout)
    {
        this.layout = layout;
    }

    LoadLayoutFromJson(layoutData)
    {
        this.layout = JSON.parse(layoutData);
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
            <div class="user-layout" style="width:100%; height:100%;">
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