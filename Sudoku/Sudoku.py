import numpy as np
import random

class Sudoku:

    def __init__(self):
        pass

    def solve(self,sudoku_matrix):

        l = [0,0]

        if not self.give_empty_pos(sudoku_matrix, l):
            return True

        row = l[0]
        column = l[1]
        for k in range(1, 10):
            if self.is_valid(sudoku_matrix, row, column, k):
                sudoku_matrix[row][column] = k
                if self.solve(sudoku_matrix):
                    return True
                sudoku_matrix[row][column] = 0
        return False


    def give_empty_pos(self,sudoku_matrix,l):
        for row in range(9):
            for col in range(9):
                if (sudoku_matrix[row][col] == 0):
                    l[0] = row
                    l[1] = col
                    return True
        return False

    def is_valid(self, sudoku_matrix,row,column,num):
        valid_row = self.is_valid_row(num,sudoku_matrix[row])
        valid_col = self.is_valid_column(num, [rw[column] for rw in sudoku_matrix])
        valid_mat = self.is_valid_3_3(row-row%3, column-column%3, sudoku_matrix,num)
        if not valid_row or not valid_col or not valid_mat:
            return False
        return True

    @staticmethod
    def is_valid_3_3(row,column, sudoku_matrix,num):
        for i in range(3):
            for j in range(3):
                if sudoku_matrix[i+row][j+column] == num:
                    return False
        return True


    @staticmethod
    def is_valid_row(num, row):
        return row.count(num) == 0

    @staticmethod
    def is_valid_column(num, column):
        return column.count(num) == 0


c = Sudoku()
puz = [[3,0,6,5,0,8,4,0,0],
          [5,2,0,0,0,0,0,0,0],
          [0,8,7,0,0,0,0,3,1],
          [0,0,3,0,1,0,0,8,0],
          [9,0,0,8,6,3,0,0,5],
          [0,5,0,0,9,0,6,0,0],
          [1,3,0,0,0,0,2,5,0],
          [0,0,0,0,0,0,0,7,4],
          [0,0,5,2,0,6,3,0,0]]
#print(c.is_valid([[6,3,9,5,7,4,1,8,2],[5,4,1,8,2,9,3,7,6],[7,8,2,6,1,3,9,5,4],[1,9,8,4,6,7,5,2,3],[3,6,5,9,8,2,4,1,7],[4,2,7,1,3,5,8,6,9],[9,5,6,7,4,8,2,3,1],[8,1,3,2,9,6,7,4,5],[2,7,4,3,5,1,6,9,8]]))

if c.solve(puz):
    for i in range(9):
        for j in range(9):
            print(str(puz[i][j])+"\t",end="")
        print("\n")