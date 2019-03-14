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

module.exports = { Layout, SplitLayout, Window, TabbedWindow, SplitType, Tab, ToSerialize, ToDeserialize };