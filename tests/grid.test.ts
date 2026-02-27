import { describe, expect, it, test } from "bun:test";
import { Cell } from "../src";
import { CellCategory } from "../src/Cell";
import { Grid } from "../src/Grid";

test("default tests", () => {
	expect(1 + 1).toBe(2);
});

describe("Grid tests", () => {
	it("Should create a default 9x9 grid", () => {
		const grid = new Grid();
		expect(grid.size).toBe(9);
		expect(grid.cells).toBeArrayOfSize(81);
		for (let x = 0; x < 9; x++) {
			for (let y = 0; y < 9; y++) {
				expect(grid.getCell(x, y)).toEqual(new Cell());
			}
		}
	});

	it("Should create a 16x16 grid", () => {
		const size = 16;
		const grid = new Grid(size);
		expect(grid.size).toBe(size);
		expect(grid.cells).toBeArrayOfSize(size * size);
	});

	it("Should not create a grid", () => {
		expect(() => new Grid(10)).toThrow("Invalid grid size");
		expect(() => new Grid(5)).toThrow("Invalid grid size");
		expect(() => new Grid(7)).toThrow("Invalid grid size");
	});

	it("Should throw throw dimension error", () => {
		const grid = new Grid();
		expect(() => grid.getCell(-1, 0)).toThrow("Invalid dimensions");
		expect(() => grid.getCell(0, -1)).toThrow("Invalid dimensions");
		expect(() => grid.getCell(9, 0)).toThrow("Invalid dimensions");
		expect(() => grid.getCell(0, 9)).toThrow("Invalid dimensions");
	});
	it("Should return a row of cells", () => {
		const grid = new Grid();
		grid.put(0, 0, 1);
		grid.put(1, 0, 2);
		grid.put(2, 0, 3);
		grid.put(3, 0, 4);
		grid.put(4, 0, 5);
		grid.put(5, 0, 6);
		grid.put(6, 0, 7);
		grid.put(7, 0, 8);
		grid.put(8, 0, 9);
		const row = grid.getRow(0);

		expect(row).toBeArrayOfSize(9);
		expect(row[0]!.number).toBe(1);
		expect(row[1]!.number).toBe(2);
		expect(row[2]!.number).toBe(3);
		expect(row[3]!.number).toBe(4);
		expect(row[4]!.number).toBe(5);
		expect(row[5]!.number).toBe(6);
		expect(row[6]!.number).toBe(7);
		expect(row[7]!.number).toBe(8);
		expect(row[8]!.number).toBe(9);
	});

	it("Should throw on invalid row index", () => {
		const grid = new Grid();
		expect(() => grid.getRow(-1)).toThrow("Invalid dimensions");
		expect(() => grid.getRow(9)).toThrow("Invalid dimensions");
	});

	it("Should return a full column of cells", () => {
		const grid = new Grid();
		grid.put(0, 0, 1);
		grid.put(0, 1, 2);
		const col = grid.getColumn(0);
		expect(col).toBeArrayOfSize(9);
		expect(col[0]!.number).toBe(1);
		expect(col[1]!.number).toBe(2);
		expect(col[2]!.number).toBeNull();
	});

	it("Should throw invalid column index", () => {
		const grid = new Grid();
		expect(() => grid.getColumn(-1)).toThrow("Invalid dimensions");
		expect(() => grid.getColumn(9)).toThrow("Invalid dimensions");
	});

	it("Should return the correct 3x3 block", () => {
		const grid = new Grid();
		grid.put(0, 0, 1);
		grid.put(1, 1, 2);
		grid.put(2, 2, 3);
		const block = grid.getBlock(0, 0);
		expect(block).toBeArrayOfSize(9);
		expect(block.filter((c) => c.number !== null).length).toBe(3);
	});

	it("Should return a different block for coords in another region", () => {
		const grid = new Grid();
		grid.put(3, 3, 5);
		const block = grid.getBlock(4, 4);
		expect(block).toBeArrayOfSize(9);
		expect(block.some((c) => c.number === 5)).toBeTrue();
		const topLeftBlock = grid.getBlock(0, 0);
		expect(topLeftBlock.some((c) => c.number === 5)).toBeFalse();
	});

	it("Should throw on invalid block coordinates", () => {
		const grid = new Grid();
		expect(() => grid.getBlock(-1, 0)).toThrow("Invalid dimensions");
		expect(() => grid.getBlock(0, 9)).toThrow("Invalid dimensions");
	});

	it("Should put the correct cell", () => {
		const grid = new Grid();
		const cellNormale = new Cell();
		const cellDraft = new Cell();
		cellNormale.put(1, CellCategory.Normal);
		cellDraft.put(1, CellCategory.Draft);

		grid.put(0, 0, 1);
		grid.put(0, 1, 1, CellCategory.Draft);
		expect(grid.getCell(0, 0)).toEqual(cellNormale);
		expect(grid.getCell(0, 1)).toEqual(cellDraft);
	});

	it("Should allow duplicate value in Draft mode", () => {
		const grid = new Grid();
		grid.put(0, 0, 1);
		expect(grid.put(1, 0, 1, CellCategory.Draft)).toBeTrue();
		expect(grid.getCell(1, 0).drafts).toContain(1);
	});

	it("Should erase a placed number", () => {
		const grid = new Grid();
		grid.put(0, 0, 1);
		expect(grid.getCell(0, 0).number).toBe(1);
		expect(grid.erase(0, 0, 1)).toBeTrue();
		expect(grid.getCell(0, 0).number).toBeNull();
	});

	it("Should erase a draft", () => {
		const grid = new Grid();
		grid.put(0, 0, 1, CellCategory.Draft);
		expect(grid.getCell(0, 0).drafts).toContain(1);
		expect(grid.erase(0, 0, 1, CellCategory.Draft)).toBeTrue();
		expect(grid.getCell(0, 0).drafts).toBeArrayOfSize(0);
	});

	it("Should return false when erasing a non-existent value", () => {
		const grid = new Grid();
		expect(grid.erase(0, 0, 1)).toBeFalse();
	});
});
