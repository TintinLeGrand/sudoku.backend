export enum CellCategory {
	Normal = "normal",
	Draft = "draft",
}

export class Cell {
	private _number: number | null;
	private _drafts: number[];
	private _final: boolean;

	constructor() {
		this._number = null;
		this._drafts = [];
		this._final = false;
	}

	get number(): number | null {
		return this._number;
	}

	get drafts(): number[] {
		return this._drafts;
	}

	get final(): boolean {
		return this._final;
	}

	public put(number: number, category: CellCategory): boolean {
		return false;
	}

	public erase(number: number, category: CellCategory): boolean {
		return false;
	}

	public finalize(): boolean {
		this._final = true;
		return false;
	}
}
