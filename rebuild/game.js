
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








println(Object.keys(wallTile.image));
println(wallTile.image.sourceImg);


var firstPlayer = new Player("marcin", 2, 120);

println(firstPlayer.name);
println(firstPlayer.level);
println(firstPlayer.health);




/*
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
    */