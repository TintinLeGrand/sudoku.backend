import { Cell } from "./Cell";

const SIZE = 9;

export class Grid {
	private _grid: Cell[][] = new Array<Array<Cell>>(SIZE);
	[index: number]: Cell[];

	constructor() {
		for (let x = 0; x < SIZE; x++) {
			this._grid[x] = new Array<Cell>(SIZE);
			for (let y = 0; y < SIZE; y++) {
				this._grid[x]![y] = new Cell();
			}
		}
	}
}
