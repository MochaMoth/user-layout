const electron = require("electron");
const { ipcMain } = electron;
const Layout = require('./layout');
const Config = require("../Config.json");
const Constants = require('../constants.js');
const { SplitType } = Constants;

module.exports = class SplitLayout extends Layout
{
    /**
     * Extends Layout. Creates a split with layoutA on the top or left side, and layoutB on the bottom or right side.
     * splitDistance is a percentage between 0 and 100.
     * @param {SplitType} splitType 
     * @param {Number} splitDistance 
     * @param {Layout} layoutA 
     * @param {Layout} layoutB 
     */
    constructor(splitType, splitDistance, layoutA, layoutB)
    {
        super();
        this.splitType = splitType;
        this.layout = layoutA;
        this.layoutB = layoutB;
        this.splitDistance = splitDistance;
        this.id = "id" + Math.round(Math.random() * 10000000);
    }

    GenerateHtml(rootPath)
    {
        let isHorizontalSplit = this.splitType === SplitType.HORIZONTAL;
        let mainDimension = isHorizontalSplit ? "height" : "width";
        let subDimension = isHorizontalSplit ? "width" : "height";
        let mainCalc = `calc(${this.splitDistance}% - (${Config.HandleWidth} / 2))`;
        let subCalc = `calc(${100 - this.splitDistance}% - (${Config.HandleWidth} / 2))`;

        let panelAStyles = `${mainDimension}: ${mainCalc}; ${subDimension}: 100%; float: left;`;
        let panelBStyles = `${mainDimension}: ${subCalc};  ${subDimension}: 100%; float: left;`;
        let handleStyles = `${mainDimension}: ${Config.HandleWidth}; ${subDimension}: 100%; float: left;`;

        ipcMain.on(`userlayout:${this.id}handleChange`, (e, newDistance) =>
        {
            console.log(newDistance);
            this.splitDistance = newDistance;
        });

        return (`
            <div id="${this.id}" class="window split ${this.splitType}">
                <div class="panel panel-A" style="${panelAStyles}">${this.layout.GenerateHtml(rootPath)}</div>
                <div class="handle" draggable="true" ondragstart="${this.id}DragHandleStart(event)" ondrag="${this.id}DragHandle(event)" ondragend="${this.id}DragHandleStop(event)" style="${handleStyles}"></div>
                <div class="panel panel-B" style="${panelBStyles}">${this.layoutB.GenerateHtml(rootPath)}</div>
            </div>
            <script>
                function ${this.id}DragHandleStart(e)
                {
                    split = document.querySelector("%23${this.id}");
                    panelA = document.querySelector("%23${this.id}>.panel-A");
                    panelB = document.querySelector("%23${this.id}>.panel-B");
                    handle = document.querySelector("%23${this.id}>.handle");
                    splitDistance = ${this.splitDistance};
                }

                function ${this.id}DragHandle(e)
                {
                    handleSize = "${Config.HandleWidth}";
                    mainDimension = "${mainDimension}";
                    subDimension = "${subDimension}";
                    mousePos = mainDimension == "height" ? e.pageY : e.pageX;
                    if (mousePos == 0) return;
                    newDistance = (mousePos / ${isHorizontalSplit ? `split.clientHeight` : `split.clientWidth`}) * 100;
                    splitDistance = newDistance;
                    mainCalc = \`calc(\${newDistance}% - (\${handleSize} / 2))\`;
                    subCalc = \`calc(\${100 - newDistance}% - (\${handleSize} / 2))\`;
                    panelAStyles = \`\${ mainDimension }: \${ mainCalc }; \${ subDimension }: 100%; float: left; \`;
                    panelBStyles = \`\${ mainDimension }: \${ subCalc }; \${ subDimension }: 100%; float: left; \`;

                    panelA.setAttribute("style", \`\${panelAStyles}\`);
                    panelB.setAttribute("style", \`\${panelBStyles}\`);
                }

                function ${this.id}DragHandleStop(e)
                {
                    console.log("Hello");
                    ipcRenderer.send("userlayout:${this.id}handleChange", newDistance);
                }
            </script>
        `);
    }
}