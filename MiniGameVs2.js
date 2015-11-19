/* 
Created by Marcin Ufniarz (9/4/15)
I'm trying to make a really cute game to encourage kids to get into programming.
I'm trying to avoid vilance.  

I was thinking this game would work something like this.
I go around healing creatures.
There would be 3 types (Wounded, Mean and Good).

I would heal the wounded, and turn them GOOD.  
The GOOD and MEAN creatures would walk around randomly.  If they interact, they would get WOUNDED.
I would heal the WOUNDED creatures and make them GOOD.

If the MEAN ones ran into me; I would get injured.

I was also thinking of adding MATH into the game, solve math problems when interacting with rocks to obtain abilities or gear.

This is an open source project and therefore free for anyone to use, and modify. :)
*/

// Button Constructor and Methods (start)
var Button = function(config) {
    this.xPos = config.xPos || 0;
    this.yPos = config.yPos || 0;
    this.width = config.width || 150;
    this.height = config.height || 50;
    this.txtSize = config.txtSize || 11;
    this.label = config.label || "";
    this.image = config.image || getImage("cute/None");
    this.message = config.message || "Clicked!";
    this.onClick = config.onClick || function() {};
};

Button.prototype.drawCharacter = function() {
    //fill(255, 0, 0);
    //rect(this.xPos, this.yPos, this.width, this.height);
    //fill(0, 0, 0);
    textSize(this.txtSize);
    textAlign(LEFT, TOP);
    text(this.label, this.xPos - this.width/3, this.yPos - this.height/10);
    image(this.image, this.xPos, this.yPos, this.width, this.height);
};

Button.prototype.draw = function() {
    fill(255, 0, 0);
    stroke(0);
    rect(this.xPos, this.yPos, this.width, this.height);
    fill(0, 0, 0);
    textSize(this.txtSize);
    textAlign(LEFT, TOP);
    text(this.label, this.xPos + 10, this.yPos + this.height/4);
};

Button.prototype.isMouseInside = function() {
    return (mouseX >= this.xPos &&
            mouseX <= (this.xPos + this.width) &&
            mouseY >= this.yPos &&
            mouseY <= (this.yPos + this.height));
};

Button.prototype.handleMouseClick = function() {
    if(this.isMouseInside()) {
        this.onClick();
    }
};
// Button Constructor and Methods (end)


// Create different types of block objects.  
// Game Tile Structure.
var Tile = function(config) {
    this.height = config.height || height/5;
    this.width = config.width || width/10;
    this.image = config.image || getImage("cute/Blank");
    this.xPos = config.xPos || 0;
    this.yPos = config.yPos || -height/10;
};

Tile.prototype.draw = function(posX, posY) {
    image(this.image, posX, posY, this.width, this.height);
};
// Empty tile 
var emptyTile = new Tile({});

// Obstructions
var tallTreeTile = new Tile({
    image: getImage("cute/TreeTall")
});
var shortTreeTile = new Tile({
    image: getImage("cute/TreeShort")
});
var uglyTreeTile = new Tile({
    image: getImage("cute/TreeUgly")
});
var wallTile = new Tile({
    image: getImage("cute/WallBlock")
});
var tallWallTile = new Tile({
    image: getImage("cute/WallBlockTall")
});
var openChestTile = new Tile({
    image: getImage("cute/ChestOpen")
});

//  Interactive Tiles
var rockTile = new Tile({
    image: getImage("cute/Rock")
});
var heartTile = new Tile({
    image: getImage("cute/Heart")
});  
var chestTile = new Tile({
    image: getImage("cute/ChestClosed")
});
var shineTile = new Tile({
    image: getImage("cute/Selector")
});

//  1=blank, 2=tall tree, 3=short tree, 4=ugly tree, 5=rock
//  6=tall wall, 7=wall, 8=heart, 9=chest, 10=open chest
var mapTile = [
    [6,7,7,7,5,5,7,7,7,6],
    [7,2,3,4,1,1,4,3,2,7],
    [7,2,1,1,1,1,1,1,2,7],
    [7,2,1,9,1,1,1,8,2,7],
    [7,2,1,1,1,1,1,1,2,7],
    [7,2,3,4,5,1,4,3,2,7],
    [6,7,7,6,1,1,6,7,7,6],
    [1,2,2,3,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,4,1],
    [4,3,3,4,1,1,3,1,1,1]
];

var tileNumb = 0,
    gameScene = 0;
    
var Player = function(config) {
    Tile.call(this, width, height);
    this.image = config.image || getImage("cute/CharacterCatGirl");
    this.xPos = config.xPos || width/5;
    this.yPos = config.yPos || height/10;
    this.name = config.name || "Cat Girl";
    this.experience = 0;
    this.charLvl = 1;
    this.smartLvl = 0;      //  smartLvl is going to be used like agility
    this.caringLvl = 1;     //  caringLvl is going to be used like energy
    this.health = 10;       //  health is going to keep track of Health
    this.onClick = config.onClick || function() {
        gameScene = 2;
    };
};

Player.prototype = Object.create(Button.prototype);
//Player.prototype = Object.create(Tile.prototype);

Player.prototype.draw = function() {
    image(this.image, this.xPos, this.yPos, this.width, this.height);
};

var mainPlayer = new Player({
    xPos: width/5,
    yPos: height/10
});

Player.prototype.move = function(direction) {
    var curCharPosX = this.xPos,                     //  keeps track of starting xPos position
        curCharPosY = this.yPos,                     //  keeps track of starting yPos position
        indexX = round(this.xPos / (width/10)),      //  determines the xPos index of the character location
        indexY = round(this.yPos / (height/10) + 1), //  determines the yPos index of the character location
        //  looks for objects that are in the way
        isObsticle = (direction === "UP" && (indexY === 0 || mapTile[indexY - 1][indexX] !== 1)) || 
                    (direction === "DOWN" && (indexY === 9 || mapTile[indexY + 1][indexX] !== 1)) || 
                    (direction === "LEFT" && (indexX === 0 || mapTile[indexY][indexX - 1] !== 1)) || 
                    (direction === "RIGHT" && (indexX === 9 || mapTile[indexY][indexX + 1] !== 1));
        //println(isObsticle);
        //println("bX: " + indexX + ", bY: " + indexY);
    if(!isObsticle) {
        if(direction === "UP") {
            this.yPos -= height/10 ;
        } else if(direction === "DOWN") {
            this.yPos += height/10;
        } else if(direction === "LEFT") {
            this.xPos -= width/10;
        } else if(direction === "RIGHT") {
            this.xPos += width/10;
        }
    } else {
        //  Add code to address objects you can walk over and/or collect.
        //  Such as hearts.
    }
     //println("aX: " + round(charPosX / (width/10)) + ", aY: " + round(charPosY / 40 +1));
};

Player.prototype.speak = function(width, height) {
    fill(237, 230, 230);
    noStroke();
    rect(this.xPos/1.5, this.yPos, width, height, 5);
    triangle(this.xPos + this.width/2, this.yPos + this.height/3, this.xPos + this.width/2, this.yPos , this.xPos - this.width/8, this.yPos);
    fill(255, 0, 0);
    textSize(12);
    text(" My name is " + this.name + "!", this.xPos/1.5, this.yPos);
    // Allows charater to speak
};

Player.prototype.openItem = function(){
    //  This method will be used for chests and doors.
    var itemIndexX = round(this.xPos / (width/10)),
        itemIndexY = round(this.yPos / (height/10) + 1),
        mapTileNum = mapTile[itemIndexY - 1][itemIndexX];
        println(mapTileNum);
        if(mapTileNum === 9) {
            //  If Tile is a Chest; Open Chest.
            mapTile[itemIndexY - 1][itemIndexX] = 10;
        } else if (mapTileNum === 10) {
            //  If Tile is an open chest; Close Chest.
            mapTile[itemIndexY - 1][itemIndexX] = 9;
        }
        
};

Player.prototype.dropsTile = function(){
    //  This method will be used for chests and doors.
    var itemIndexX = round(this.xPos / (width/10)),
        itemIndexY = round(this.yPos / (height/10) + 1),
        mapTileNum = mapTile[itemIndexY - 1][itemIndexX];
        //println(mapTileNum);
        if(mapTileNum === 1) {
            //  If Tile is a Chest; Open Chest.
            mapTile[itemIndexY][itemIndexX] = 11;
        } else if (mapTileNum === 11) {
            //  If Tile is an open chest; Close Chest.
            mapTile[itemIndexY][itemIndexX] = 1;
        }
        //println(itemIndexX + " " + itemIndexY); 
        
};

keyPressed = function() {
    //println(keyCode);
    if(keyCode === 38) {
        mainPlayer.move("UP");
    } else if(keyCode === 40) {
        mainPlayer.move("DOWN");
    } else if(keyCode === 37) {
        mainPlayer.move("LEFT");
    } else if(keyCode === 39) {
        mainPlayer.move("RIGHT");
    } else if(keyCode === 79) { // o to open chest
        mainPlayer.openItem();
    } else if(keyCode === 32) { // space to place selector
        mainPlayer.dropsTile();
    }
};

/*
Start Scene is the game menu.  
It has two buttons and a Title.
Other buttons may be added as features are added.
*/
var startBtn = new Button({
    xPos: 40, 
    yPos: 150, 
    width: 150, 
    height: 40,
    txtSize: 20,
    label: "Start Game",
    onClick: function() {
        gameScene = 1;
    }
});

var quitBtn = new Button({
    xPos: 210, 
    yPos: 150, 
    width: 150, 
    height: 40,
    txtSize: 20,
    label: "Quit Game",
    onClick: function() {
        println("End Game");
    }
});

var returnGameBtn = new Button({
    xPos: width/2 - 90, 
    yPos: 340, 
    width: 180, 
    height: 40,
    txtSize: 20,
    label: "Return to Game",
    onClick: function() {
        gameScene = 1;
    }
});

var catGirlPlayer = new Button({
    xPos: width/4 - width/8, 
    yPos: 250, 
    width: width/10, 
    height: height/5,
    txtSize: 20,
    image: getImage("cute/CharacterCatGirl"),
    label: "Cat Girl",
    onClick: function() {
        mainPlayer.image = getImage("cute/CharacterCatGirl");
        playSound(getSound("retro/coin"));
    }
});

var boyPlayer = new Button({
    xPos: width/2 - width/18, 
    yPos: 250, 
    width: width/10, 
    height: height/5,
    txtSize: 20,
    image: getImage("cute/CharacterBoy"),
    label: "Boy",
    onClick: function() {
        mainPlayer.name = "Scott";
        mainPlayer.image = getImage("cute/CharacterBoy");
        playSound(getSound("retro/coin"));
    }
});

var marciPlayer = new Button({
    xPos: width - width/4, 
    yPos: 250, 
    width: width/10, 
    height: height/5,
    txtSize: 20,
    image: getImage("avatars/marcimus"),
    label: "Marcimus",
    onClick: function() {
        mainPlayer.name = "Marcimus";
        mainPlayer.image = getImage("avatars/marcimus");
        playSound(getSound("retro/coin"));
    }
});

//  Game Start Scene
var drawSceneMainMenu = function() {
    background(51, 167, 255);
    fill(232, 25, 25);
    textSize(40);
    text("Cute Mini Game!", 25, 20);
    startBtn.draw();
    quitBtn.draw();
    catGirlPlayer.drawCharacter();
    boyPlayer.drawCharacter();
    marciPlayer.drawCharacter();
};

//  Player Profile Scene
var drawSceneProfile = function() {
    background(51, 167, 255);
    fill(232, 25, 25);
    textSize(40);
    text("Character Profile", 25, 0);
    fill(54, 247, 99);
    rect(20, 49, width/2 - 20, height/14);
    fill(0, 153, 153);
    textSize(20);
    text("Name: " + mainPlayer.name, 30, height/8);
    fill(54, 247, 99);
    rect(20, 49 * 2, width/2 - 20, height/14);
    fill(38, 181, 181);
    text("Level:   " + mainPlayer.charLvl, 30, height/8 * 2);
    fill(54, 247, 99);
    rect(20, 49 * 3, width/2 - 20, height/14);
    fill(0, 153, 153);
    text("Health: " + mainPlayer.health, 30, height/8 * 3);
    fill(54, 247, 99);
    rect(20, 49 * 4, width/2 - 20, height/14);
    fill(0, 153, 153);
    text("Smart:  " + mainPlayer.smartLvl, 30, height/8 * 4);
    fill(54, 247, 99);
    rect(20, 49 * 5, width/2 - 20, height/14);
    fill(0, 153, 153);
    text("Caring: " + mainPlayer.caringLvl, 30, height/8 * 5);
    
    image(mainPlayer.image, height/8 * 5, width/8);
    
    returnGameBtn.draw();
};

/*
Game Scene Level 1 game menu.  
It has two buttons and a Title.
Other buttons may be added as features are added.
*/
var menuReturnBtn = new Button({
    xPos: 0, 
    yPos: 0, 
    width: 100, 
    height: 20,
    label: "Return to Menu",
    onClick: function() {
        gameScene = 0;
    }
});

var menuQuitBtn = new Button({
    xPos: menuReturnBtn.xPos, 
    yPos: menuReturnBtn.yPos + 20, 
    width: menuReturnBtn.width, 
    height: menuReturnBtn.height,
    label: "Quit Game",
    onClick: function() {
        println("End Game");
    }
});
//  Game Scene Level 1
var drawSceneLvlOne = function() {
    //  Draws green background
    background(62, 120, 33);
    //  Splits up the canvas into 10 rows (r)
    for(var r = 0; r < 10; r++) {
        //  Splits up the canvas into 10 columns (c) 
        for(var c = 0; c < 10; c++) {
            //  Obtains the tile number stored in the mapTile array
            tileNumb = mapTile[r][c];
            //  Determines which tile to disply based on the tile number
            if(tileNumb === 1) {
                //  Draws the Tile at position xPos and yPos
                emptyTile.draw(Tile.xPos,Tile.yPos);
            } else if (tileNumb === 2) {
                tallTreeTile.draw(Tile.xPos,Tile.yPos);
            } else if (tileNumb === 3) {
                shortTreeTile.draw(Tile.xPos,Tile.yPos);
            } else if (tileNumb === 4) {
                uglyTreeTile.draw(Tile.xPos,Tile.yPos);
            } else if (tileNumb === 5) {
                rockTile.draw(Tile.xPos,Tile.yPos);
            } else if (tileNumb === 6) {
                tallWallTile.draw(Tile.xPos,Tile.yPos);
            } else if (tileNumb === 7) {
                wallTile.draw(Tile.xPos,Tile.yPos);
            } else if (tileNumb === 8) {
                heartTile.draw(Tile.xPos,Tile.yPos);
            } else if (tileNumb === 9) {
                chestTile.draw(Tile.xPos,Tile.yPos);
            } else if (tileNumb === 10) {
                openChestTile.draw(Tile.xPos,Tile.yPos);
            } else if (tileNumb === 11) {
                shineTile.draw(Tile.xPos,Tile.yPos);
            } else { 
                emptyTile.draw(Tile.xPos,Tile.yPos);
            }
            Tile.xPos += width/10;
        }
        Tile.yPos += height/10;
        // Rests Tile.xPos at the end of the column loop
        Tile.xPos = 0;
    }
    //  Rests Tile.yPos at the end of the row loop
    Tile.yPos = -height/10;
    mainPlayer.draw();
    mainPlayer.speak(140, 20);
    
    menuReturnBtn.draw();
    menuQuitBtn.draw();
};

draw = function() { 
    if(gameScene === 0) {
        drawSceneMainMenu();
    } else if(gameScene === 1) {
        drawSceneLvlOne();
    } else if(gameScene === 2) {
        drawSceneProfile();
    }
    //text(mouseX + ", " + mouseY, mouseX + 10, mouseY);
}; 

mouseClicked = function() {
    if(gameScene === 0) {
        startBtn.handleMouseClick();
        quitBtn.handleMouseClick();
        catGirlPlayer.handleMouseClick();
        boyPlayer.handleMouseClick();
        marciPlayer.handleMouseClick();
    } else if(gameScene === 1) {
        menuReturnBtn.handleMouseClick();
        menuQuitBtn.handleMouseClick();
        mainPlayer.handleMouseClick();
    } else if(gameScene === 2) {
        returnGameBtn.handleMouseClick();
    }
};
