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

Here are some additional puzzle formats to test with:
- Easy: 001004002050003019470000005000080207004090800806030000200000068180200040500300900

### Content

Backend Client built in ExpressJS
├── README.md
├── Sudokuassignment-webversion_Nov2020.docx
├── design.md
├── first-try-solve.py
├── img_1.png
├── package-lock.json
├── package.json
└── root
    ├── backend
    │   ├── app.ts
    │   ├── controllers
    │   │   ├── BaseController.ts
    │   │   ├── CustomBoardController.ts
    │   │   ├── DefaultBoardController.ts
    │   │   └── HomeController.ts
    │   ├── lib
    │   │   └── util.ts
    │   ├── middleware
    │   │   └── base.ts
    │   ├── models
    │   │   ├── Board.ts
    │   │   ├── Cell.ts
    │   │   ├── constants.ts
    │   │   └── dist
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── server
    │   │   └── server.ts
    │   ├── services
    │   │   └── services.ts
    │   ├── tests
    │   │   ├── models.tests
    │   │   │   ├── Board.test.ts
    │   │   │   ├── Cell.test.ts
    │   │   │   └── dist
    │   │   └── services.tests
    │   │       └── Strategy.test.ts
    │   └── tsconfig.json
    ├── frontend-client
    │   ├── package-lock.json
    │   ├── package.json
    │   └── src
    │       ├── App.css
    │       ├── api
    │       ├── components
    │       └── index.css
    ├── package-lock.json
    ├── package.json
    └── persistance
        └── state.json



Frontend Client in React

### Requirements

NodeJS 14.15.3

### Limitations

Currently only implements only 1 Solving Algorithm

The service that implments the solving algorithm is build on the Strategy patten so any additonal algorithms can be implemented here:
https://github.com/sheikhfaisalanwar/SudokuProject/blob/master/root/backend/services/services.ts


## Next Steps:
 - Decorate all controllers with swagger and generate swagger.json
 - Add additional algorithms as solution services: http://norvig.com/sudoku.html
 - Add React dialog to choose Algorithm
  




