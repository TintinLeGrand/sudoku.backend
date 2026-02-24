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
		if (isIllegalNumber(number)) return false;
		if (this._final) return false;

		if (category === CellCategory.Normal) {
			this._number = number;
			return true;
		} else if (category === CellCategory.Draft) {
			if (this._drafts.includes(number)) return false;
			this._drafts.push(number);
			return true;
		}
		return false;
	}

	public erase(number: number, category: CellCategory): boolean {
		if (isIllegalNumber(number)) return false;
		if (this._final) return false;

		if (category === CellCategory.Normal) {
			if (this._number === number) {
				this._number = null;
				return true;
			}
			return false;
		} else if (category === CellCategory.Draft) {
			const index = this._drafts.indexOf(number);
			if (index !== -1) {
				this._drafts.splice(index, 1);
				return true;
			}
			return false;
		}
		return false;
	}

	public finalize(): boolean {
		if (this._number !== null && !this._final) {
			this._final = true;
			return true;
		}
		return false;
	}
}

function isIllegalNumber(number: number) {
	return number < 1 || number > 9 || !Number.isInteger(number);
}
