export class Tile {
    public value: number;
    public merged: boolean;

    constructor() {
        this.value = 0;
        this.merged = false;
    }

    initTile() {
        this.value = Math.random() < 0.9 ? 2 : 4;
    }

    resetTile() {
        this.value = 0;
        this.merged = false;
    }

    copyTile(tileToCopy: Tile) {
        this.value = tileToCopy.value;
    }

    levelUp(score: number) {
        this.value *= 2;
        this.merged = true;
        return score + this.value;
    }

}
