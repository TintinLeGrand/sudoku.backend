import { describe, expect, it, test } from "bun:test";
import { Cell } from "../src";
import { CellCategory } from "../src/Cell";

test("default tests", () => {
	expect(1 + 1).toBe(2);
});

describe("Cell tests", () => {
	it("Should create an empty cell", () => {
		const cell = new Cell();
		expect(cell.number).toBeNull();
		expect(cell.drafts).toBeArrayOfSize(0);
		expect(cell.final).toBeFalse();
		expect(cell).toBeTypeOf("object");
	});

	it("Should set a number in a Cell", () => {
		const cell = new Cell();
		var number = 1;
		expect(cell.number).toBeNull();
		expect(cell.put(number, CellCategory.Normal)).toBeTrue();
		expect(cell.number).toBe(number);
		number = 9;
		expect(cell.put(number, CellCategory.Normal)).toBeTrue();
		expect(cell.number).toBe(number);
	});

	it("Should not set an illegal number in a Cell", () => {
		const cell = new Cell();
		expect(cell.put(0, CellCategory.Normal)).toBeFalse();
		expect(cell.put(10, CellCategory.Normal)).toBeFalse();
		expect(cell.put(Number.MIN_SAFE_INTEGER, CellCategory.Normal)).toBeFalse();
		expect(cell.put(Number.MAX_SAFE_INTEGER, CellCategory.Normal)).toBeFalse();
	});

	it("Should add numbers to drafts", () => {
		const cell = new Cell();
		expect(cell.put(1, CellCategory.Draft)).toBeTrue();
		expect(cell.drafts).toContainValue(1);
		expect(cell.drafts.length).toBe(1);
		expect(cell.put(1, CellCategory.Draft)).toBeFalse();
		expect(cell.drafts.length).toBe(1);
		expect(cell.put(9, CellCategory.Draft)).toBeTrue();
		expect(cell.drafts).toContain(9);
		expect(cell.drafts).toContainValue(9);
		expect(cell.drafts.length).toBe(2);
	});

	it("Should not add illegal numbers to drafts", () => {
		const cell = new Cell();
		expect(cell.put(0, CellCategory.Draft)).toBeFalse();
		expect(cell.put(10, CellCategory.Draft)).toBeFalse();
		expect(cell.put(Number.MIN_SAFE_INTEGER, CellCategory.Draft)).toBeFalse();
		expect(cell.put(Number.MAX_SAFE_INTEGER, CellCategory.Draft)).toBeFalse();
	});

	it("Should set to final a Cell", () => {
		const cell = new Cell();
		expect(cell.finalize()).toBeFalse();
		expect(cell.put(1, CellCategory.Normal)).toBeTrue();
		expect(cell.finalize()).toBeTrue();
		expect(cell.final).toBeTrue();
		expect(cell.put(1, CellCategory.Normal)).toBeFalse();
	});

	it("Should not set to final", () => {
		const cell = new Cell();
		expect(cell.finalize()).toBeFalse();
		expect(cell.put(1, CellCategory.Draft)).toBeTrue();
		expect(cell.finalize()).toBeFalse();
		expect(cell.final).toBeFalse();
	});

	it("Should erase a draft", () => {});

	it("Should not erase a draft if cell is final", () => {});

	it("Should erase a number", () => {});

	it("Should not erase a number if cell is final", () => {});
});

describe("grid tests", () => {});
