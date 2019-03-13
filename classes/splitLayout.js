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

        return (`
            <div class="window split ${this.splitType}">
                <div class="panel" style="${panelAStyles}">${this.layout.GenerateHtml(rootPath)}</div>
                <div class="handle" style="${handleStyles}"></div>
                <div class="panel" style="${panelBStyles}">${this.layoutB.GenerateHtml(rootPath)}</div>
            </div>
        `);
    }
}