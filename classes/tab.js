module.exports = class Tab
{
    /**
     * 
     * @param {String} name 
     * @param {String} file 
     * @param {String} visible 
     */
    constructor(name, file, visible = "")
    {
        this.name = name;
        this.file = file;
        this.visible = visible;
    }
}