const electron = require("electron");
const serializer = require("serialijse");
const path = require("path");
const fs = require("fs");
const userlayout = require("user-layout");

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
        fs.writeFileSync(this.path, JSON.stringify(this.data));
    }
}

function parseDataFile(filePath, defaults)
{
    try
    {
        return JSON.parse(fs.readFileSync(filePath));
    }
    catch (error)
    {
        console.log("There was an error when loading preferences:");
        console.log(error);
        return defaults;
    }
}