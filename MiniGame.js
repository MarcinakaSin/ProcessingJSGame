// Button Constructor and Methods (start)
var Button = function(config) {
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.width = config.width || 150;
    this.height = config.height || 50;
    this.txtSize = config.txtSize || 11;
    this.label = config.label || "";
    this.message = config.message || "Clicked!";
    this.onClick = config.onClick || function() {};
};

Button.prototype.draw = function() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.width, this.height);
    fill(0, 0, 0);
    textSize(this.txtSize);
    textAlign(LEFT, TOP);
    text(this.label, this.x + 10, this.y + this.height/4);
};

Button.prototype.isMouseInside = function() {
    return (mouseX >= this.x &&
            mouseX <= (this.x + this.width) &&
            mouseY >= this.y &&
            mouseY <= (this.y + this.height));
};

Button.prototype.handleMouseClick = function() {
    if(this.isMouseInside()) {
        this.onClick();
    }
};
// Button Constructor and Methods (end)


// Create different types of block objects.  

// Game Tile Structure.
var Canvas = function(config) {
    this.width = config.width || width;
    this.height = config.height || height;
};

var Tile = function(config) {
    Canvas.call(this, width/10, height/10);
    this.image = config.image || getImage("cute/BrownBlock");
    //this.positionX = config.positionX || 0;
    //this.positionY = config.positionY || 0;
    //this.objPass = config.objPass || function() {
    //    if(image.contains("Tree")){ return false;}
    //};
    //this.objInteract = config.objInteract || function() {};
};


var emtpyTile = new Tile({
    //width = this.width;
    //height = this.height;
    //image = this.image;
});


Tile.prototype.draw = function(posX, posY) {
    image(this.image, posX, posY, this.width, this.height);
};

var currentScene = 0,
    landImg = [
        [
            getImage("cute/GrassBlock"),    // grass
            getImage("cute/WaterBlock"),    // water
            getImage("cute/DirtBlock"),     // dirt
            getImage("cute/PlainBlock"),    // plain stone
            getImage("space/background"),   // background
            getImage("cute/Blank")          // blank space
        ],
        [
            getImage("cute/TreeShort"),     // trees
            getImage("cute/TreeTall"), 
            getImage("cute/TreeUgly")
        ],
        [
            getImage("cute/StoneBlock"),    // stone block
            getImage("cute/StoneBlockTall")
        ],
        [
            getImage("cute/WallBlock"),     // wall
            getImage("cute/WallBlockTall")
        ],
        [
            getImage("cute/DoorTallClosed"),     // door
            getImage("cute/DoorTallOpen")
        ],
        [
            getImage("cute/RampEast"),     // walkway
            getImage("cute/RampNorth"), 
            getImage("cute/RampSouth"), 
            getImage("cute/RampWest")
        ],
        [
            getImage("cute/Rock")   // rock
        ],
        [
            getImage("cute/ChestClosed"),     // chest
            getImage("cute/ChestOpen"), 
            getImage("cute/ChestLid")
        ],
        [
            getImage("avatars/piceratops-tree"),     // chest
            getImage("avatars/aqualine-ultimate"), 
            getImage("avatars/mr-pink")
        ]
    ],
    mapItems = [  // Tiles for first lvl
        landImg[0][0], landImg[1][0],landImg[1][2], landImg[1][2], landImg[0][2],landImg[0][0], landImg[0][0], landImg[3][1],landImg[3][1], landImg[3][1], 
        landImg[0][0], landImg[0][0], landImg[0][0], landImg[0][0],landImg[0][0], landImg[0][0], landImg[0][0],landImg[3][1], landImg[0][0], landImg[0][0],
        landImg[0][0], landImg[0][0], landImg[0][0],landImg[0][0], landImg[0][0], landImg[0][0],landImg[0][0], landImg[3][1], landImg[0][0],landImg[0][0], 
        landImg[0][0], landImg[0][0],landImg[0][0], landImg[0][0], landImg[0][0],landImg[0][0], landImg[4][0], landImg[3][1],landImg[0][0], landImg[0][0], 
        landImg[0][2],landImg[0][0], landImg[0][0], landImg[0][0],landImg[0][0], landImg[0][0], landImg[5][1],landImg[0][0], landImg[0][0], landImg[0][0],
        
        landImg[0][1], landImg[0][2], landImg[0][0],landImg[0][0], landImg[0][0], landImg[0][0],landImg[0][3], landImg[0][0], landImg[0][0],landImg[0][0], 
        landImg[0][1], landImg[0][1],landImg[0][2], landImg[0][0], landImg[0][0],landImg[0][3], landImg[0][3], landImg[0][0],landImg[0][0], landImg[0][0], 
        landImg[0][1],landImg[0][1], landImg[0][1], landImg[0][2], landImg[0][2], landImg[0][3], landImg[0][0],landImg[0][0], landImg[0][0], landImg[0][0], 
        landImg[0][1], landImg[0][1],landImg[0][2], landImg[0][2], landImg[6][0],landImg[0][3], landImg[0][0], landImg[0][0],landImg[0][0], landImg[0][0], 
        landImg[0][1], landImg[0][1],landImg[0][2], landImg[1][1], landImg[1][1],landImg[0][3], landImg[1][1], landImg[1][1],landImg[0][0], landImg[0][0]
    ],
    objectTiles = [
        //tileImg[][],
    ];
// Game variables (end)




/*
Start Scene is the game menu.  
It has two buttons and a Title.
Other buttons may be added as features are added.
*/
var startBtn = new Button({
    x: 125, 
    y: 150, 
    width: 150, 
    height: 40,
    txtSize: 20,
    label: "Start Game",
    onClick: function() {
        currentScene = 1;
    }
});

var quitBtn = new Button({
    x: 125, 
    y: 250, 
    width: 150, 
    height: 40,
    txtSize: 20,
    label: "Quit Game",
    onClick: function() {
        println("End Game");
    }
});

var drawScene0 = function() {
    background(51, 167, 255);
    
    fill(232, 25, 25);
    textSize(40);
    text("Adventure Game!", 25, 100);
    startBtn.draw();
    quitBtn.draw();

};

/*
First Scene is the game level.  
It has two buttons and a Title.
Other buttons may be added as features are added.
*/
    // Menu items are set up in this section.};
var menuReturnBtn = new Button({
    x: 0, 
    y: 0, 
    width: 100, 
    height: 20,
    label: "Return to Menu",
    onClick: function() {
        currentScene = 0;
    }
});

var menuQuitBtn = new Button({
    x: menuReturnBtn.x, 
    y: menuReturnBtn.y + 20, 
    width: menuReturnBtn.width, 
    height: menuReturnBtn.height,
    label: "Quit Game",
    onClick: function() {
        println("End Game");
    }
});
    var drawScene1 = function() {
        currentScene = 1;
        background(11, 153, 20);
        
        var positionX = 0,
            positionY = -20,
            blockWidth = 40,
            blockHeight = 80,
            charX = 200,
            charY = 360;
        for(var l = 0; l < mapItems.length; l++){
            image(mapItems[5], positionX, positionY, blockWidth, blockHeight);
            positionX += blockWidth;
            if(400 <= positionX) {
                positionX = 0;
                positionY += blockHeight-40;
            }
        }
        positionY = -20;
        for(var l = 0; l < mapItems.length; l++){
            image(mapItems[l], positionX, positionY, blockWidth, blockHeight);
            positionX += blockWidth;
            if(400 <= positionX) {
                positionX = 0;
                positionY += blockHeight-40;
            }
        }
        
        menuReturnBtn.draw();
        menuQuitBtn.draw();
    //    gameMenu();
emtpyTile.draw(250, 250);

        
        image(getImage("space/beetleship"), charX, charY, blockWidth, blockHeight - 40);
    
    };
draw = function() { 
    if(currentScene === 0) {
        drawScene0();
    } else if(currentScene === 1) {
        drawScene1();
    }
};

mouseClicked = function() {
    if(currentScene === 0) {
        startBtn.handleMouseClick();
        quitBtn.handleMouseClick();
    } else if(currentScene === 1) {
        menuReturnBtn.handleMouseClick();
        menuQuitBtn.handleMouseClick();
    }
};

drawScene0();




















