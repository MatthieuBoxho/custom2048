export class Tile {
    public value: number;
    public xPos: number;
    public yPos: number;
    public merged: boolean;

    constructor(initValue: number, initX: number, initY: number) {
        this.value = initValue;
        this.xPos = initX;
        this.yPos = initY;
        this.merged = false;
    }

    initTile() {
        this.value = 2;
    }

    resetTile() {
        this.value = 0;
        this.merged = false;
    }

    copyTile(tileToCopy: Tile) {
        this.value = tileToCopy.value;
    }

    levelUp() {
        this.value *= 2;
        this.merged = true;
    }

}
