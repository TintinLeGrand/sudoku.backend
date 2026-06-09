import { Cell, CellCategory } from "../src/Cell";
import { Grid } from "../src/Grid";

export enum Difficulty {
	Easy = "easy",
	Medium = "medium",
	Hard = "hard",
	Expert = "expert",
}

export interface Sudoku {
	difficulty: Difficulty;
	puzzle: Grid;
	solution: Grid;
}

const SUPPRESSION_RATIO: Record<Difficulty, number> = {
	[Difficulty.Easy]: 0.5,
	[Difficulty.Medium]: 0.6,
	[Difficulty.Hard]: 0.65,
	[Difficulty.Expert]: 0.73,
};

const STRATEGIES = ["line", "column", "block"];

function randomCells(size: number): Cell[] {
	var numbers: number[] = [];
	var cells: Cell[] = [];
	for (let i = 0; i < size; i++) {
		cells[i] = new Cell();
		numbers.push(i + 1);
	}

	for (let i = 0; i < size; i++) {
		const choice = Math.floor(Math.random() * (numbers.length - 1 + 1));
		cells[i]!.put(numbers[choice]!, CellCategory.Normal);

		numbers.splice(choice, 1);
	}

	return cells;
}

function generateGrid(grid: Grid, difficulty: Difficulty) {
	var sudoku: Sudoku;

	const pos = Math.floor(Math.random() * (grid.size - 1 + 1));
	const strategy = STRATEGIES[Math.floor(Math.random() * (2 + 1))];
	const shuffledCells: Cell[] = randomCells(grid.size);

	switch (strategy) {
		case "line":
			grid.putLine(pos, shuffledCells);
			break;
		case "column":
			grid.putColumn(pos, shuffledCells);
			break;
		case "block":
			grid.putBlock(pos, shuffledCells);
			break;
		default:
			console.error("Strategy choice does not exist");
	}

	grid.displayGrid();
}

function backtrack(grid: Grid): boolean {
	const tab = grid.convertToTab();
	return backtrackTab(tab);
}

function backtrackTab(tab: number[][]): boolean {
	const size = tab.length;

	for (let y = 0; y < size; y++) {
		for (let x = 0; x < size; x++) {
			if (tab[y]![x] !== 0) continue;

			for (let num = 1; num <= size; num++) {
				if (isValid(tab, y, x, num)) {
					tab[y]![x] = num;
					if (backtrackTab(tab)) return true;
					tab[y]![x] = 0;
				}
			}

			return false;
		}
	}

	return true;
}

function isValid(
	tab: number[][],
	row: number,
	col: number,
	num: number,
): boolean {
	const size = tab.length;
	const blockSize = Math.sqrt(size);

	for (let i = 0; i < size; i++) {
		if (tab[row]![i] === num) return false;
		if (tab[i]![col] === num) return false;
	}

	const startRow = Math.floor(row / blockSize) * blockSize;
	const startCol = Math.floor(col / blockSize) * blockSize;
	for (let i = 0; i < blockSize; i++) {
		for (let j = 0; j < blockSize; j++) {
			if (tab[startRow + i]![startCol + j] === num) return false;
		}
	}

	return true;
}

for (let i = 0; i < 10; i++) generateGrid(new Grid(), Difficulty.Medium);
