# Sudoku backend

Hello :) You'll find in this repository the code logic to implement a Sudoku game.

## How to install?

You'll need to generate a Github token to read packages before all. Go in your `Settings > Developer settings > Personal access tokens > Tokens (classic)` and generate a token with the permission `read:packages`.

Put the token in a `.env` file in your project, and set your `.npmrc` file to import from GitHub packages.

Go in the node project you would like to install this backend logic, and run the following command:

> I use bun, but you can use all the node package manager (like npm)

```pwsh
bun install @tintinlegrand/sudoku.backend
```

Now, you'll be able to import the different classes in your code by adding an import in the header, as:

```ts
import { Game, Cell, Grid, CellCategory } from '@tintinlegrand/sudoku.backend';
```

## Documentation

### Game

The `Game` class is the main entry point. It generates a sudoku puzzle and holds its state.

#### Properties

- **time**: `number` - Elapsed time in the game session
- **grid**: `Grid | null` - The current puzzle grid (cells to fill), or null before `start()` is called

#### Methods

##### `start(difficulty?: Difficulty): void`

Generates a new sudoku puzzle at the given difficulty and starts the game. Defaults to `Medium`.

```typescript
import { Game } from '@tintinlegrand/sudoku.backend';
import { Difficulty } from '@tintinlegrand/sudoku.backend/algorithm/grid';

const game = new Game();
game.start(Difficulty.Hard);

const puzzle = game.grid; // Grid with some cells empty (value null)
```

---

### Grid

The `Grid` class represents the 9×9 sudoku board (or any N×N where N is a perfect square).

#### Constructor

```typescript
new Grid(size?: number) // defaults to 9
```

#### Properties

- **size**: `number` - The grid size (default 9)
- **cells**: `Cell[]` - Flat array of all cells, row by row

#### Methods

##### `getCell(x: number, y: number): Cell`

Returns the cell at column `x`, row `y` (0-indexed).

##### `getRow(y: number): Cell[]`

Returns all cells in row `y`.

##### `getColumn(x: number): Cell[]`

Returns all cells in column `x`.

##### `getBlock(x: number, y: number): Cell[]`

Returns all cells in the 3×3 block containing position `(x, y)`.

##### `put(x, y, value, category?): boolean`

Places a number in the cell at `(x, y)`. Returns `false` if the placement is invalid.

##### `erase(x, y, value, category?): boolean`

Erases a number from the cell at `(x, y)`. Returns `false` if the value wasn't there.

##### `displayGrid(): string[][]`

Prints the grid to the console and returns it as a 2D string array.

#### Example Usage

```typescript
const grid = game.grid!;

// Read a cell
const cell = grid.getCell(0, 0);
console.log(cell.number); // e.g. 5, or null if empty

// Place a number
grid.put(0, 0, 5, CellCategory.Normal);

// Place a draft
grid.put(0, 0, 3, CellCategory.Draft);

// Erase a number
grid.erase(0, 0, 5, CellCategory.Normal);
```

---

### Cell

The `Cell` class represents a single cell in the grid.

#### Properties

- **number**: `number | null` - The number placed in the cell (1–9, or null if empty)
- **drafts**: `number[]` - Draft numbers the player has pencilled in
- **final**: `boolean` - If true, the cell is locked and cannot be modified (used for pre-filled puzzle cells)

#### Enum

##### `CellCategory`

| Value | Description |
|-------|-------------|
| `CellCategory.Normal` | A confirmed number placement |
| `CellCategory.Draft` | A pencilled-in candidate number |

#### Methods

##### `put(number: number, category: CellCategory): boolean`

Places a number as Normal or Draft. Returns `false` if the cell is final or the number is already present as a draft.

##### `erase(number: number, category: CellCategory): boolean`

Removes a number from the Normal or Draft slot. Returns `false` if not found or cell is final.

##### `finalize(): boolean`

Locks the cell permanently. Only succeeds if the cell has a number. Used internally to mark pre-filled puzzle cells.

#### Example Usage

```typescript
const cell = new Cell();
cell.put(3, CellCategory.Draft);
cell.put(7, CellCategory.Draft);
cell.put(3, CellCategory.Normal);
cell.finalize();
```

