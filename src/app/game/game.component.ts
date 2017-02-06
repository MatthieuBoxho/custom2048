import { Component, OnInit, HostListener } from '@angular/core';

import { Tile } from '../classes/tile';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  grid: Tile[][];
  emptyTiles: Tile[];

  constructor() { }

  // Listens to user input
  @HostListener('window:keydown', ['$event'])
  keyboardInput(event: any) {
    if (event.keyCode === 37
        || event.keyCode === 38
        || event.keyCode === 39
        || event.keyCode === 40) {
      event.preventDefault();
      event.stopPropagation();
      this.move(event.keyCode);
    }
  }

  ngOnInit() {
    this.createGrid();
  }

  // We initialize the game grid here
  createGrid() {
    this.grid = [];

    for (let row = 0; row < 4; row++) {
      this.grid[row] = [];
      for (let col = 0; col < 4; col++) {
        this.grid[row][col] = new Tile(0, col, row);
      }
    }

    this.getEmptyTiles();
    this.initTile();
  }

  // Initialise Tile to 2
  initTile() {
    const tile = this.chooseEmptyTile();
    tile.initTile();
  }

  // Reset Tile instance and push it to the emptyTiles array
  resetTile(tileToReset: Tile) {
    tileToReset.resetTile();
    this.emptyTiles.push(tileToReset);
  }

  // Picks an empty Tile
  chooseEmptyTile() {
    return this.emptyTiles.splice(Math.floor(Math.random() * this.emptyTiles.length), 1)[0];
  }

  // Gets all the tiles that are empty
  getEmptyTiles() {
    this.emptyTiles = [];
    for (let col = 0; col < 4; col++) {
      for (let row = 0; row < 4; row++) {
        if (this.grid[row][col].value === 0) {
          this.emptyTiles.push(this.grid[row][col]);
        }
      }
    }
  }

  move(keyCode: number) {
    let moved = true;
    let successfulMove = false;
    this.resetMove();
    while (moved) {
      moved = false;
      if (!successfulMove) {
        [moved, successfulMove] = this.chooseDirection(keyCode);
      } else {
        moved = this.chooseDirection(keyCode)[0];
      }
    }
    if (successfulMove) {
      this.initTile();
    }
  }

  resetMove() {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        this.grid[row][col].merged = false;
      }
    }
  }

  chooseDirection(keyCode: number) {
    switch (keyCode) {
      case 37:
        return this.moveToLeft();
      case 38:
        return this.moveToUp();
      case 39:
        return this.moveToRight();
      case 40:
        return this.moveToDown();
    }
  }

  moveToRight() {
    let moved = false;
    let successfulMove = false;
    for (let row = 0; row < 4; row++) {
      for (let col = 3; col > 0 ; col--) {
        if (this.grid[row][col - 1].value !== 0) {
          if (this.grid[row][col].value === 0) {
            this.grid[row][col].copyTile(this.grid[row][col - 1]);
            this.resetTile(this.grid[row][col - 1]);
            this.emptyTiles = this.emptyTiles.filter(function(el) {return el.value === 0; });
            moved = true;
            successfulMove = true;
          } else if (!this.grid[row][col].merged && !this.grid[row][col - 1].merged
              && this.grid[row][col].value === this.grid[row][col - 1].value) {
            this.grid[row][col].levelUp();
            this.resetTile(this.grid[row][col - 1]);
            moved = true;
            successfulMove = true;
          }
        }
      }
    }
    return [moved, successfulMove];
  }

  moveToLeft() {
    let moved = false;
    let successfulMove = false;
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 3 ; col++) {
        if (this.grid[row][col + 1].value !== 0) {
          if (this.grid[row][col].value === 0) {
            this.grid[row][col].copyTile(this.grid[row][col + 1]);
            this.resetTile(this.grid[row][col + 1]);
            this.emptyTiles = this.emptyTiles.filter(function(el) {return el.value === 0; });
            moved = true;
            successfulMove = true;
          } else if (!this.grid[row][col].merged && !this.grid[row][col + 1].merged
              && this.grid[row][col].value === this.grid[row][col + 1].value) {
            this.grid[row][col].levelUp();
            this.resetTile(this.grid[row][col + 1]);
            moved = true;
            successfulMove = true;
          }
        }
      }
    }
    return [moved, successfulMove];
  }

  moveToUp() {
    let moved = false;
    let successfulMove = false;
    for (let col = 0; col < 4; col++) {
      for (let row = 0; row < 3 ; row++) {
        if (this.grid[row + 1][col].value !== 0) {
          if (this.grid[row][col].value === 0) {
            this.grid[row][col].copyTile(this.grid[row + 1][col]);
            this.resetTile(this.grid[row + 1][col]);
            this.emptyTiles = this.emptyTiles.filter(function(el) {return el.value === 0; });
            moved = true;
            successfulMove = true;
          } else if (!this.grid[row][col].merged && !this.grid[row + 1][col].merged
              && this.grid[row][col].value === this.grid[row + 1][col].value) {
            this.grid[row][col].levelUp();
            this.resetTile(this.grid[row + 1][col]);
            moved = true;
            successfulMove = true;
          }
        }
      }
    }
    return [moved, successfulMove];
  }

  moveToDown() {
    let moved = false;
    let successfulMove = false;
    for (let col = 0; col < 4; col++) {
      for (let row = 3; row > 0 ; row--) {
        if (this.grid[row - 1][col].value !== 0) {
          if (this.grid[row][col].value === 0) {
            this.grid[row][col].copyTile(this.grid[row - 1][col]);
            this.resetTile(this.grid[row - 1][col]);
            this.emptyTiles = this.emptyTiles.filter(function(el) {return el.value === 0; });
            moved = true;
            successfulMove = true;
          } else if (!this.grid[row][col].merged && !this.grid[row - 1][col].merged
              && this.grid[row][col].value === this.grid[row - 1][col].value) {
            this.grid[row][col].levelUp();
            this.resetTile(this.grid[row - 1][col]);
            moved = true;
            successfulMove = true;
          }
        }
      }
    }
    return [moved, successfulMove];
  }

}
