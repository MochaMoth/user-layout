const Layout = require('./layout');
const Config = require("../Config.json");
const Constants = require('../constants.js');
const { SplitType } = Constants;

module.exports = class SplitLayout extends Layout
{
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
        let subCalc = `calc(${this.splitDistance}% - (${Config.HandleWidth} / 2))`;

        let panelAStyles = `${mainDimension}: ${mainCalc}; ${subDimension}: 100%; float: left;`;
        let panelBStyles = `${mainDimension}: ${subCalc};  ${subDimension}: 100%; float: left;`;
        let handleStyles = `float: left;`;

        return (`
            <div class="split ${this.splitType}">
                <div class="panel" style="${panelAStyles}">${this.layout.GenerateHtml(rootPath)}</div>
                <div class="handle" style="${handleStyles}"></div>
                <div class="panel" style="${panelBStyles}">${this.layoutB.GenerateHtml(rootPath)}</div>
            </div>
        `);
    }
}