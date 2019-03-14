const electron = require("electron");
const serializer = require("serialijse");
const path = require("path");
const fs = require("fs");
const userlayout = require("user-layout");
const { Layout, SplitLayout, Window, TabbedWindow, SplitType, Tab } = userlayout;
const { ipcMain } = electron;
const Config = require("../Config.json");
const BSON = require("bson");

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

module.exports = class UserPrefs
{
    /**
     * Creates new preferences config. Handles saving/loading JSON to/from user's disk.
     * @param {String} configName 
     * @param {*} defaults 
     */
    constructor(configName, defaults)
    {
        const userDataPath = (electron.app || electron.remote.app).getPath("userData");
        this.path = path.join(userDataPath, configName + ".json");

        this.data = parseDataFile(this.path, defaults);
    }

    get(key)
    {
        return this.data[key];
    }

    set(key, value)
    {
        this.data[key] = value;
        fs.writeFileSync(this.path, JSON.stringify(this.data, replacer, 2));
    }
}

function parseDataFile(filePath, defaults)
{
    try
    {
        return JSON.parse(fs.readFileSync(filePath), reviver);
    }
    catch (error)
    {
        console.log("There was an error when loading preferences:");
        console.log(error);
        return defaults;
    }
}