let Files = {};

const SplitType = {
    HORIZONTAL: 1,
    VERTICAL: 2
}

class Layout {
    constructor(layout) {
        this.layout = layout;
    }

    static GenerateLayout(app, html) {
        //Magic here!
        //returns each window/tabbed window in an overall layout with files defined in Files loaded
        //elements should have events bound automagically
        //
    }
}

class SplitLayout extends Layout {
    constructor(splitType, layoutA, layoutB) {
        this.splitType = splitType;
        this.layout = layoutA;
        this.layoutB = layoutB;
    }
}

class Window extends Layout {
    constructor(contents) {
        this.contents = contents;
    }
}

class TabbedWindow extends Window {
    constructor(tabs, selectedTab) {
        this.tabs = tabs;
        this.selectedTab = selectedTab;
    }
}

module.exports = { Files, Layout };