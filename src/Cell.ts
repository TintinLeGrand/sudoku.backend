export enum CellType {
	Empty = "empty",
	Final = "final",
	Draft = "draft",
	Written = "written",
}

export class Cell {
	private _number: number | null;
	private _drafts: number[];
	private _type: CellType;

	constructor() {
		this._number = null;
		this._drafts = [];
		this._type = CellType.Empty;
	}

	get number(): number | null {
		return this._number;
	}

	get drafts(): number[] {
		return this._drafts;
	}

	get type(): CellType {
		return this._type;
	}

	public put(number: number, as: CellType.Draft | CellType.Written): boolean {
		return false;
	}

	public erase(): boolean {
		return false;
	}

	public finalize(): boolean {
		this._type = CellType.Final;
		return false;
	}
}
