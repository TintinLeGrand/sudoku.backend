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
import sudoku from '@tintinlegrand/sudoku.backend';
```

## Documentation

### Cell

The `Cell` class represents a single cell in a Sudoku grid.

#### Properties

- **number**: `number | null` - The number placed in the cell (1-9, or null if empty)
- **drafts**: `number[]` - Array of numbers (1-9) put as draft in the cell
- **final**: `boolean` - Indicates if the cell can be changed or is marked as final (to mark the number as the one that are written by the game)

#### Enum

##### `CellCategory`

This is an enum defined to set a cell number as Draft or Normal

#### Methods

##### `put(number: number, category: CellCategory): boolean`

Places a number in the cell as Normal or Draft. Return false if the insertion is not possible (cell set as final).

##### `erase(number: number, category: CellCategory): boolean`

Removes a number from the cell from the number or draft zone.

##### `finalize(): boolean`

Locks the cell by marking it as final. Can only be called if the cell contains a number.

#### Example Usage

```typescript
const cell = new Cell();
cell.put(3, CellCategory.Draft);
cell.put(7, CellCategory.Draft);
cell.put(3, CellCategory.Normal);
cell.finalize();
```
