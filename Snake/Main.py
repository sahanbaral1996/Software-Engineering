import pygame
from Actor import Actor
import random
import time
pygame.init()


class Main:
    score = 0

    def __init__(self,snake,mouse):
        self.snake = snake
        self.mouse = mouse
        self.win_width = 500
        self.win_height = 500
        self.run = True
        self.game_close = False
        self.game_over = False
        self.font_style = pygame.font.SysFont(None, 50)
        self.win = pygame.display.set_mode((self.win_width, self.win_height))

    def place_mosue(self):
        mouse.start_x = random.randint(5, 45)*10
        mouse.start_y = random.randint(5, 45)*10

    def message1(self, msg, color):
        mesg = self.font_style.render(msg, True, color)
        self.win.blit(mesg, [self.win_width / 2-250, self.win_height / 2])


    def init_window(self, snake, mouse):
        length = 1
        x_change =0
        y_change = 0
        win = pygame.display.set_mode((self.win_width,self.win_height))
        pygame.display.set_caption("Snake")
        clock = pygame.time.Clock()
        snakeList = []
        while self.run:
            pygame.time.delay(100)
            while self.game_over:
                self.win.fill((0,0,0))
                self.message1("You Lost! Press Q-Quit or C-Play Again", (255,0,0))
                pygame.display.update()

                for event in pygame.event.get():
                    if event.type == pygame.KEYDOWN:
                        if event.key == pygame.K_q:
                            self.run = False
                            self.game_over = False
                        if event.key == pygame.K_c:
                            self.game_over = False


            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    self.run = False
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_LEFT:
                        x_change = -snake.velocity
                        y_change = 0
                    if event.key == pygame.K_RIGHT:
                         x_change = snake.velocity
                         y_change = 0
                    if event.key == pygame.K_UP:
                         x_change = 0
                         y_change = -snake.velocity
                    if event.key == pygame.K_DOWN:
                         x_change = 0
                         y_change = snake.velocity

            if snake.start_x == self.win_width-10 or snake.start_x == 0:
                self.game_over = True

            if snake.start_y == self.win_height-10 or snake.start_y == 0:
                self.game_over = True

            if snake.start_x + 10 == mouse.start_x and snake.start_y == mouse.start_y:
                self.score += 1
                self.place_mosue()
                snake.width += 1
                length += 1
                print("yummy")

            snake.start_x += x_change
            snake.start_y += y_change
            win.fill((0, 0, 0))
            mouse_act = pygame.draw.rect(win, Actor.color, [mouse.start_x,mouse.start_y,10,10])

            snake_head = []
            snake_head.append(snake.start_x)
            snake_head.append(snake.start_y)
            snakeList.append(snake_head)
            if len(snakeList) > length:
                del snakeList[0]
            for head in snakeList:
                pygame.draw.rect(win, Actor.color, [head[0], head[1], snake.width, 10])
            pygame.display.update()
            clock.tick(30)
        self.message1(f"Game Over your score is {self.score}",(255,0,0))
        pygame.display.update()
        time.sleep(3)
        pygame.quit()


if __name__ == "__main__":
    m = Main(None,None)
    snake = Actor(60,80,10,10,5)
    mouse = Actor(160,180,10,10,5)
    m.init_window(snake,mouse)
