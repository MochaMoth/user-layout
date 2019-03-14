const electron = require("electron");
const { ipcMain } = electron;
const path = require("path");
const fs = require("fs");
const { Layout, SplitLayout, Window, Constants, TabbedWindow, Tab } = require('./classes');
const Config = require("./Config");
const { SplitType } = Constants;

let replacer = (key, value) =>
{
    if (typeof value === 'function')
        return value.toString();
    return value;
}

let reviver = (key, value) =>
{
    if (typeof value === 'string'
        && value.indexOf('function ') === 0)
        return eval(`(${value})`);
    return value;
}

let ToSerialize = function (layout)
{
    return (JSON.stringify(layout, replacer, 2));
}

let ToDeserialize = function (data)
{
    return JSON.parse(data, reviver);
}

let SaveLayout = function (layoutName, layout)
{
    console.log("Saving " + layoutName);
    const userDataPath = (electron.app || electron.remote.app).getPath("userData");
    const layoutPath = path.join(userDataPath, `${layoutName}.json`);
    fs.writeFileSync(layoutPath, ToSerialize(layout));
}

let LoadLayout = function (layoutName, defaultLayout)
{
    const userDataPath = (electron.app || electron.remote.app).getPath("userData");
    const layoutPath = path.join(userDataPath, `${layoutName}.json`);

    try
    {
        return ToDeserialize(fs.readFileSync(layoutPath));
    }
    catch (error)
    {
        return defaultLayout;
    }
}

module.exports = { Layout, SplitLayout, Window, TabbedWindow, SplitType, Tab, SaveLayout, LoadLayout };