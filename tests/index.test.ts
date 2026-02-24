import { describe, expect, it, test } from "bun:test";
import { Cell } from "../src";
import { CellType } from "../src/Cell";

test("default tests", () => {
	expect(1 + 1).toBe(2);
});

describe("cell tests", () => {
	it("Should create an empty cell", () => {
		const cell = new Cell();
		expect(cell.number).toBeNull();
		expect(cell.drafts).toBeArrayOfSize(0);
		expect(cell.type).toBe(CellType.Empty);
	});

	it("Should set to 1 an empty cell", () => {
		const cell = new Cell();
		const number = 1;
		expect(cell.number).toBeNull();
		expect(cell.put(number, CellType.Written)).toBeTrue();
		expect(cell.number).toBe(number);
	});

	it("Should set to 9 an empty cell", () => {
		const cell = new Cell();
		const number = 9;
		expect(cell.number).toBeNull();
		expect(cell.put(number, CellType.Written)).toBeTrue();
		expect(cell.number).toBe(number);
	});

	it("Should add numbers to drafts", () => {
		const cell = new Cell();
		expect(cell.put(1, CellType.Draft)).toBeTrue();
		expect(cell.drafts).toContainValue(1);
		expect(cell.drafts.length).toBe(1);
		expect(cell.put(1, CellType.Draft)).toBeFalse();
		expect(cell.drafts.length).toBe(1);
		expect(cell.put(9, CellType.Draft)).toBeTrue();
		expect(cell.drafts).toContain(9);
		expect(cell.drafts).toContainValue(9);
		expect(cell.drafts.length).toBe(2);
	});

	it("Should not add illegal numbers to drafts", () => {
		const cell = new Cell();
		expect(cell.put(0, CellType.Draft)).toBeFalse();
		expect(cell.put(10, CellType.Draft)).toBeFalse();
		expect(cell.put(Number.MIN_SAFE_INTEGER, CellType.Draft)).toBeFalse();
		expect(cell.put(Number.MAX_SAFE_INTEGER, CellType.Draft)).toBeFalse();
		expect(cell.drafts.length).toBe(0);
	});

	it("Should not set an off-range number", () => {
		const cell = new Cell();
		expect(cell.put(10, CellType.Written)).toBeFalse();
		expect(cell.put(-1, CellType.Written)).toBeFalse();
		expect(cell.put(Number.MIN_SAFE_INTEGER, CellType.Written)).toBeFalse();
		expect(cell.put(Number.MAX_SAFE_INTEGER, CellType.Written)).toBeFalse();
	});

	it("Should set to final", () => {
		const cell = new Cell();
		expect(cell.finalize()).toBeFalse();
		expect(cell.put(1, CellType.Written)).toBeTrue();
		expect(cell.finalize()).toBeTrue();
		expect(cell.type).toBe(CellType.Final);
		expect(cell.put(1, CellType.Written)).toBeFalse();
	});
});

describe("grid tests", () => {});
