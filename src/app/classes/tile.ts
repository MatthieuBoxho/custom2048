export class Tile {
    public value: number;
    public xPos: number;
    public yPos: number;

    constructor(initValue: number, initX: number, initY: number) {
        this.value = initValue;
        this.xPos = initX;
        this.yPos = initY;
    }

    initTile() {
        if (this.value !== 0) {
            console.log('wut', this);
        }
        this.value = 2;
    }

    resetTile() {
        this.value = 0;
    }

    copyTile(tileToCopy: Tile) {
        this.value = tileToCopy.value;
    }

    levelUp() {
        this.value *= 2;
    }

}
