class RyansTank extends BaseTank {
    constructor(callback, options, setup) {
        super(callback, options, setup);
        this.scanInProgress = false;
        this.currentMode = 'search';
        this.mobileDirection = 'forward';
        this.counter = -1;
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
                // this.move('stop');
                break;
            case 'scanning':
                this.currentMode = 'kill';
                var boundary = this.getDistanceToBounds();
                const { north, south, east, west } = boundary;
                if (west > 5000 && east < 10000) {
                    this.mobileDirection = 'backward';
                } else if (east > 5000 && west < 4400) {
                    this.mobileDirection = 'forward';
                }
                this.move(this.mobileDirection);
                const directions = [45,135,225,315];
                if (this.counter >= 4) {
                    this.counter = 0;
                } else {
                    this.counter++;
                }
                this.turretTurn(directions[this.counter]);
                console.log(boundary);
                let targets = this.activateMagnetoDetector();
                if (targets) {
                    console.log("There is an enemy.");
                }
                console.log(targets);
            case 'kill':
                this.fireCannon();
                this.currentMode = 'search';
                break;
        }
        // console.log("Here is ryan\'s tank");
    }
}