import { Cell, CellCategory } from "./Cell";

export class Grid {
	public size: number;
	public startingGrid: number[];
	private _cells: Cell[];

	constructor(size: number = 9) {
		if (!Number.isInteger(Math.sqrt(size)))
			throw new Error("Invalid grid size - need to be a square number");
		this.size = size;
		this._cells = Array.from(
			{ length: this.size * this.size },
			() => new Cell(),
		);
		this.startingGrid = [];
	}

	get cells() {
		return this._cells;
	}

	public getCell(x: number, y: number): Cell {
		this.verifyIndexes(x, y);
		return this._cells[y * this.size + x]!;
	}

	public getRow(y: number): Cell[] {
		this.verifyIndexes(y);
		const row: Cell[] = [];
		for (let x = 0; x < this.size; x++) {
			row.push(this.getCell(x, y));
		}
		return row;
	}

	public getColumn(x: number): Cell[] {
		this.verifyIndexes(x);
		const column: Cell[] = [];
		for (let y = 0; y < this.size; y++) {
			column.push(this.getCell(x, y));
		}
		return column;
	}

	public getBlock(x: number, y: number): Cell[] {
		this.verifyIndexes(x, y);

		const blockSize = Math.sqrt(this.size);

		const blockX = Math.floor(x / blockSize);
		const blockY = Math.floor(y / blockSize);

		const startX = blockX * blockSize;
		const startY = blockY * blockSize;
		const endX = startX + blockSize - 1;
		const endY = startY + blockSize - 1;

		const block: Cell[] = [];
		for (let i = startX; i <= endX; i++) {
			for (let j = startY; j <= endY; j++) {
				block.push(this.getCell(i, j));
			}
		}
		return block;
	}

	public put(
		x: number,
		y: number,
		value: number,
		category: CellCategory = CellCategory.Normal,
	): boolean {
		if (
			(category === CellCategory.Normal || category === CellCategory.Draft) &&
			value >= 1 &&
			value <= this.size
		) {
			return this.getCell(x, y).put(value, category);
		}
		return false;
	}

	public erase(
		x: number,
		y: number,
		value: number,
		category: CellCategory = CellCategory.Normal,
	): boolean {
		return this.getCell(x, y).erase(value, category);
	}

	private verifyIndexes(...indexes: number[]): void {
		for (let i = 0; i < indexes.length; i++) {
			if (indexes[i]! < 0 || indexes[i]! >= this.size) {
				throw new Error(
					`Invalid dimensions - need to be between 0 and ${this.size - 1}`,
				);
			}
		}
	}
}
