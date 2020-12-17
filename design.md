""High level requirements for the project:""

- Web Application platform to host project
- Algorithm by API
- UI for client actions

//------------------------------------------------------------------------------------------------------------------------------------------//

**Initial User Stories:**
As a user I should be presented the option to enter a new puzzle or solve a pre existing one
As a user when I pick the option I should be able to see a pre loaded sudoku board
As a user I should see the option to solve the displayed board
As a user when I click the Solve option I should be displayed a solved version of the board
As a user I should be able to navigate back to the main page to be able select both options (new or pre existing)

Lower priority
As a user I need to be able to enter  a new puzzle -- This needs further explanation 

**If I'm following TDD I need to denote acceptance tests for each of these**

//------------------------------------------------------------------------------------------------------------------------------------------//


**Scope and stack decision:**

1. First scope of action is deciding on the tech stack
    - Preferred method from Devs was the minimum of NodeJs as the underlying backend
        - Seems like the natural integration with this would be React based components
            React Component unit tests (Research on Jest and React testing Library) 
        - Unit testing NodeJS API's using Mocha
    - No DB backend would be required. We have the option of Redux states 
        from React as well as storing them as JSON confgiurations on our server side Node endpoints

2. Build a boilerplate for each layer and how it would look in the most basic sense of a request reponse lifecyle

3. Work on the algorithm:
   
   At first glance the most brute force approach would be the following based on the rules and constraints of Sudoku:
    Check Row/Column for duplicates. Check immediate 3x3 column for duplicates.
    Keep track of every value entered incase in end up being invalid
    Backtrack to remove invalid values and replace with valid ones


4. Implement Nodejs API structure to handle React Routers requesting for solution  ______
                                                                                           --------------->>>> We could build the front end with hardcoded data and then plugin the API          
5. A basic wireframe of what the react components would look like _______________________

6. Implement React components based on the wireframes

7. If possible make an end to end testing

8. If within time constraint allow a docker image in case there is docker available on local deployment machine


//------------------------------------------------------------------------------------------------------------------------------------------//

**Main constraints for myself:**
Use SOLID principles to structure the code --> https://learn.uno/learning/typescript-solid/
Use of TDD : Write Tests first, then write minimum code to make tests pass --> https://www.rizzonicola.com/express-tdd/
No magic numbers. Math heavy backend so constants should be documented well
Concise library functions. Ideally just a few lines of code
Use of typescript to reduce type-based errors. Since I'm used to more python the type restrictions might help
Use of ES6 classes for OOP ?

Generally I think the tests shouldnt be about lines of coverage but covering all possibles flows, due to the time constraints

//------------------------------------------------------------------------------------------------------------------------------------------//

**Random starting thoughts**
NodeJS -- Will handle the Initial state of the board
-library/business function to solve the board
-module for parsing board state
-- could be done on client side if not heavy --> validate custom submissions

**Data structures?**
2 dimensional data structure for the board.
Simplest brute force approach would be to solve it by backtracking
1. Check Row - Column for duplicates. Check immediate 3x3 column for duplicates. Backtrack to remove invalid columns

Redux state storage for UI components
React front end? 
Individual cell components? or compponent for row/column/3*3 subset ?

could we provide different ways to solve the sudoku game ?

The algorithm to solve it is the core of the "product"

Algorithm first? Largest overhead ?


Allow option of docker image for easy deployment in case they have docker on their local machine


API requirements could be somthing like:

1. getDefaultPuzzle
2. createCustomPuzzle/deleteCustomPuzzle^$/updateCustomPuzzle^$/getCustomPuzzle^$
3. solvePuzzle --> If there are multiple algorithm implementations this will need multiple options
 
Can't think of any others for now

**Base domain models in a sudoku board structure ?**
1. Cells
2. Rows --> subset of 9 horizontal cells
3. Columns
4. Should the 3*3 grid be there ?
5. Board -> subset of 81 cells OR 9 rows and 9 columns OR 9 (3*3) grid 
    - The relationship between these should be properly subset
    - Then when we are writing the tests we should be able to see the flow very quickly


Should probably start by creating a functional script for solving using method mentioned above
Finish default front end and backend display solving
Add feature to enter puzzle 
Add additional solving algorithm



Backend structure:

```
── root
    ├── backend
    │   ├── app.ts
    │   ├── controllers
    │   │   ├── BaseController.ts
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
    │   │   └── models.tests
    │   │       ├── Board.test.ts
    │   │       ├── Cell.test.ts
    │   │       └── dist

```
