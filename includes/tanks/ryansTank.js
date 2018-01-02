class RyansTank extends BaseTank {
    constructor(callback, options, setup) {
        super(callback, options, setup);
        this.scanInProgress = false;
        this.currentMode = 'search';
        this.directions = {
            ne: 315,
            nw: 45,
            sw: 135,
            se: 225
        };
    }
    scanVicinity() {
        console.log("This is the scan vicinity function");
    }
    compute() {
        switch (this.currentMode) {
            case 'search':
            this.currentMode = 'scanning';
            this.scanVicinity();
            this.move('stop');
            break;
            case 'scanning':
            this.currentMode = 'search';
            this.move('forward');
        }
        // console.log("Here is ryan\'s tank");
    }
}