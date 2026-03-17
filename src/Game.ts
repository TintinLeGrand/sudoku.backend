import { Grid } from "./Grid";

export class Game {
	time: number;
	private _grid: Grid;
	private _paused: boolean;

	constructor(gridSize: number = 9) {
		this.time = 0;
		this._grid = new Grid(gridSize);
		this._paused = true;
	}

	public start() {}
}
