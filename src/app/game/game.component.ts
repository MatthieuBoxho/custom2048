import { Component, OnInit, HostListener } from '@angular/core';

import { Tile } from '../classes/tile';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})
export class GameComponent implements OnInit {
  grid: Tile[][];
  emptyTiles: Tile[];

  constructor() { }

  @HostListener('window:keydown', ['$event'])
  keyboardInput(event: any) {
    event.preventDefault();
    event.stopPropagation();
    console.log(event);
  }

  ngOnInit() {
    this.createGrid();
  }

  createGrid() {
    this.grid = [];

    for (let _i = 0; _i < 4; _i++) {
      this.grid[_i] = [];
      for (let _j = 0; _j < 4; _j++) {
        this.grid[_i][_j] = new Tile(0);
      }
    }
    this.getEmptyTiles();
    this.initEmptyTile();
  }

  initEmptyTile() {
    const tile = this.chooseEmptyTile();
    tile.value = 2;
  }

  chooseEmptyTile() {
    return this.emptyTiles[Math.floor(Math.random() * this.emptyTiles.length)];;
  }

  getEmptyTiles() {
    this.emptyTiles = [];
    for (let _i = 0; _i < 4; _i++) {
      for (let _j = 0; _j < 4; _j++) {
        if (this.grid[_i][_j].value === 0) {
          this.emptyTiles.push(this.grid[_i][_j]);
        }
      }
    }
  }

}
