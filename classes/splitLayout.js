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
        let split = this.splitType === SplitType.HORIZONTAL;
        let calcedSize = `calc(${this.splitDistance}% - (${Config.HandleWidth} / 2))`;
        let inverseCalcedSize = `calc((100 - ${this.splitDistance}%) - (${Config.HandleWidth} / 2))`;
        let size = split ? `height: ${calcedSize}; width: 100%` : `width: ${calcedSize}; height: 100%`;
        let inverseSize = split ? `height: ${inverseCalcedSize}; width: 100%` : `width: ${inverseCalcedSize}; height: 100%`;
        let handleWidth = split ? `height: ${Config.HandleWidth}; width: 100%` : `width: ${Config.HandleWidth}; height: 100%;`;

        let split1 = `<div class="panel" style="${size}; ${split ? `` : `float: left`}">${this.layout.GenerateHtml(rootPath)}</div>`;
        let handle = `<div class="handle" style="${handleWidth}; ${split ? `` : `float: left`}"></div>`;
        let split2 = `<div class="panel" style="${inverseSize}; ${split ? `` : `float: left`}">${this.layoutB.GenerateHtml(rootPath)}</div>`;

        return `<div class="split ${this.splitType}" style="width: 100%; height: 100%;">${split1}${handle}${split2}</div>`;
    }
}