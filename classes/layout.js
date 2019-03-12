module.exports = class Layout
{
    constructor(layout)
    {
        this.layout = layout;
    }

    LoadLayoutFromJson(layoutData)
    {
        this.layout = JSON.parse(layoutData);
    }

    SaveLayoutToJson(layoutObject)
    {
        return (JSON.stringify(layoutObject));
    }

    GenerateHtml(rootPath)
    {
        //Magic here!
        //returns each window/tabbed window in an overall layout with files defined in 'Modules' loaded
        //elements should have events bound automagically
        //
        return `<div class="user-layout" style="width:100%; height:100%;">${this.layout.GenerateHtml(rootPath)}</div>`;
    }
}