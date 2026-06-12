import { Difficulty, generateGrid, type Sudoku } from "../algorithm/grid";
import { Grid } from "./Grid";

export class Game {
	time: number;
	private _sudoku: Sudoku | null;
	private _paused: boolean;

	constructor() {
		this.time = 0;
		this._sudoku = null;
		this._paused = true;
	}

	get grid(): Grid | null {
		return this._sudoku?.puzzle ?? null;
	}

	public start(difficulty: Difficulty = Difficulty.Medium) {
		this._sudoku = generateGrid(new Grid(), difficulty);
		this._paused = false;
	}
}
