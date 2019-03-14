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

        let id = "id" + Math.round(Math.random() * 10000000);

        return (`
            <div id="${id}" class="window split ${this.splitType}">
                <div class="panel panel-A" style="${panelAStyles}">${this.layout.GenerateHtml(rootPath)}</div>
                <div class="handle" ondragstart="${id}DragHandleStart(event)" ondrag="${id}DragHandle(event)" style="${handleStyles}"></div>
                <div class="panel panel-B" style="${panelBStyles}">${this.layoutB.GenerateHtml(rootPath)}</div>
            </div>
            <script>
                function ${id}DragHandleStart(e)
                {
                    ${id}split = document.querySelector("%23${id}");
                    ${id}panelA = document.querySelector("%23${id}>.panel-A");
                    ${id}panelB = document.querySelector("%23${id}>.panel-B");
                    ${id}handle = document.querySelector("%23${id}>.handle");
                }

                function ${id}DragHandle(e)
                {
                    ${id}handleSize = "${Config.HandleWidth}";
                    ${id}mainDimension = "${mainDimension}";
                    ${id}subDimension = "${subDimension}";
                    ${id}mousePos = ${id}mainDimension == "height" ? e.pageY : e.pageX;
                    if (${id}mousePos == 0) return;
                    ${id}newDistance = (${id}mousePos / ${isHorizontalSplit ? `${id}split.clientHeight` : `${id}split.clientWidth`}) * 100;
                    ${id}mainCalc = \`calc(\${${id}newDistance}% - (\${${id}handleSize} / 2))\`;
                    ${id}subCalc = \`calc(\${100 - ${id}newDistance}% - (\${${id}handleSize} / 2))\`;
                    ${id}panelAStyles = \`\${ ${id}mainDimension }: \${ ${id}mainCalc }; \${ ${id}subDimension }: 100%; float: left; \`;
                    ${id}panelBStyles = \`\${ ${id}mainDimension }: \${ ${id}subCalc }; \${ ${id}subDimension }: 100%; float: left; \`;

                    ${id}panelA.setAttribute("style", \`\${${id}panelAStyles}\`);
                    ${id}panelB.setAttribute("style", \`\${${id}panelBStyles}\`);
                }
            </script>
        `);
    }
}