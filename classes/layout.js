const { SplitType } = require('../constants')

module.exports = class Layout
{
    constructor()
    {
        this.state = {};
    }

    Split()
    {
        //
    }

    GetHtml()
    {
        //
    }

    SetModule()
    {
        //
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

                    ipcRenderer.send("userlayout:startdrag");

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