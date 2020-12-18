# Sudoku Project Sheikh Faisal Anwar

## About / Synopsis

* A Sudoku Project Build on Typescript, React and JS
* Project status: working/prototype


## Table of contents



> * [Sudoku Project Sheikh Faisal Anwar]
>   * [About / Synopsis](#about--synopsis)
>   * [Table of contents](#table-of-contents)
>   * [Installation](#installation)
>   * [Usage](#usage)
>     * [Screenshots](#screenshots)
>     * [Features](#features)
>     * [Content](#content)
>     * [Requirements](#requirements)
>     
## Installation
Navigate to bash/shell/cmd
```console
git clone https://github.com/sheikhfaisalanwar/SudokuProject.git
cd root
npm install
```

## Usage

```console
npm run app
```
NOTE: I noticed on Windows,
typescript path doesn't get always get set. In this case I installed typescript globally 

`npm i typescript -g`

A browser window should open up with following: 

![img_1.png](img_1.png)

### Features

- Clicking on Solve: Solves the Default board
- Clicking on Reset: Revert to unsolved Default Board
- Clicking on Add new puzzle: Opens a dialog to enter a puzzle in the format below
  **856014730090000000240000160062059300031802450005340920024000073000000010018630294**
  
  
#### API
- GET
  - /getDefaultBoard : Retrieve default board as JSON
  - /solveDefaultboard : Return solved board as JSON
- POST
  - /getCustomBoard/:puzzle/ : Serialize a string passed as `puzzle` and return a JSON
  - /solveCustomBoard/:puzzle/ : Serialize and solve a string board passed as `puzzle`. Return solved JSON
  
  
  
Here are some additional puzzle formats to test with:
  - Easy: 001004002050003019470000005000080207004090800806030000200000068180200040500300900

### Content

Backend Client built in ExpressJS <br />
Frontend Client in React

### Requirements

NodeJS 14.15.3

### Limitations

Currently only implements only 1 Solving Algorithm

The service that implments the solving algorithm is build on the Strategy patten so any additonal algorithms can be implemented here:
https://github.com/sheikhfaisalanwar/SudokuProject/blob/master/root/backend/services/services.ts


## Next Steps:
 - Error handling 
   - Invalid entries
 - Decorate all controllers with swagger and generate swagger.json
 - Add additional algorithms as solution services: http://norvig.com/sudoku.html
 - Add React dialog to choose Algorithm
  




