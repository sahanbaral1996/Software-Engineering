class Actor:

    color = (255,255,255)

    def __init__(self,start_x,start_y,width,height,velocity):
        self.start_x = start_x
        self.start_y = start_y
        self.width = width
        self.height = height
        self.velocity = velocity