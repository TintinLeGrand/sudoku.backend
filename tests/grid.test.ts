import { describe, expect, it, test } from "bun:test";
import { Grid } from "../src/Grid";

test("default tests", () => {
	expect(1 + 1).toBe(2);
});

describe("Grid tests", () => {
	it("Should create an empty grid", () => {
		const grid = new Grid();
		expect(grid).toBeArrayOfSize(9);
		expect(grid[0]).toBeArrayOfSize(9);
	});
});
