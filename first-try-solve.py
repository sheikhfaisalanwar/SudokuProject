from copy import deepcopy


class SudokuSolution:
    board = []
    default = '856014730090000000240000160062059300031802450005340920024000073000000010018630294'

    def init_empty_board(self):
        """Board with tuples as dictionary keys to determine the coordinates
        of grid position on the sudoku board"""
        for i in range(0, 9):
            for j in range(0, 9):
                self.board.append({
                    (i, j): '0'
                })

    def get_row(self, board, row_number):
        """Given a board and a row index return that row from the board"""
        board_row = []
        for item in board:
            for key, value in item.items():
                if key[0] == row_number:
                    board_row.append(item)
        return board_row

    def get_cell_value(self, entry_list):
        """ For a given row/column/grid get the list of values for its
        given coordinates"""
        values = []
        for item in entry_list:
            for key, value in item.items():
                values.append(str(value))
        return values

    def get_column(self, board, column_number):
        """Given a board and a column index return that column from the board"""
        board_column= []
        for item in board:
            for key, value in item.items():
                if key[1] == column_number:
                    board_column.append(item)
        return board_column

    def get_3x3_grid(self, cell):
        """Given a cell get the 3x3 grid around it"""
        grid_list = []
        start_row = (int(list(cell.keys())[0][0]) // 3) * 3
        start_column = (int(list((cell.keys()))[0][1]) // 3) * 3
        for row_value in range(start_row, start_row + 3):
            for column_value in range(start_column, start_column + 3):
                for item in self.board:
                    for key, value in item.items():
                        if key == (row_value, column_value):
                            grid_list.append(item)
        return grid_list

    def check_length(self, board):
        """Check for total values in the sudoku board"""
        print(len(board) == 81)

    def print_board(self):
        for i in range(0, 9):
            print('\n------------------------------------')
            for item in self.board:
                for key, value in item.items():
                    if key[0] == i:
                        print("|", end=" ")
                        print(value, end=" ")
        print('\n------------------------------------')

    def parse_input_board(self, string_values=None):
        n= 9
        convert_to_list = list(self.default if not string_values else string_values)
        group_into_n_array = [
            convert_to_list[i:i + n] for i in range(0, len(convert_to_list), n)
        ]
        print("Total rows in default board: " + "{}".format(len(group_into_n_array)))
        copy_board = deepcopy(self.board)
        self.board.clear()
        for row_index, row in enumerate(group_into_n_array):
            board_row = self.get_row(copy_board, row_index)
            for cell_index, cell in enumerate(board_row):

                self.board.append(
                    {
                        (row_index, cell_index): row[cell_index]
                    }
                )

    def find_empty(self):
        for index, item in enumerate(self.board):
            for key, value in item.items():
                if '0' in value:
                    return item, index

    def check_valid(self, x, y, empty_value, entry):
        row = self.get_cell_value(self.get_row(self.board, x))
        column = self.get_cell_value(self.get_column(self.board, y))
        square_grid = self.get_cell_value(self.get_3x3_grid(empty_value))
        validity_list =[row, column, square_grid]
        for item in validity_list:
            for value in item:
                if entry in value:
                    return False
        return True

    def solve(self):
        try:
            empty_value, index = self.find_empty()
        except TypeError as e:
            return True

        if not empty_value:
            return True

        for i in range(1, 10):
            for key, value in empty_value.items():
                if self.check_valid(key[0], key[1], empty_value, str(i)):
                    self.board[index] = {(key[0], key[1]): str(i)}
                    if self.solve():
                        return True
                    self.board[index] = {(key[0], key[1]): '0'}
        return False


    # Press the green button in the gutter to run the script.
if __name__ == '__main__':
    s = SudokuSolution()
    s.init_empty_board()
    s.print_board()
    s.parse_input_board('001004002050003019470000005000080207004090800806030000200000068180200040500300900')
    s.print_board()
    s.solve()
    print("#####################################################")
    print("Solved Board")
    print("#####################################################")

    s.print_board()

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
