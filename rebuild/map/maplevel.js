// This is a constructor for creating levels.
var MapOfLevel = function(config) {
    // Checks to see if map was created correctly.  
    // Avoids polluting the global name space. 
    if(!(this instanceof MapOfLevel)) {
        return new MapOfLevel(config);
    }
    this.width  = config.width     || width;
    this.height = config.height    || height;
    
    this.startX = null;
    this.startY = null;    

    this.mapSpaces = [];
};

// Start spot for character location.
MapOfLevel.prototype.setStart = function(x, y) {
	this.startX = x;
	this.startY = y;
};

// Allows user to create a map by simply providing a multidimensional array.
MapOfLevel.prototype.createMap = function(mapArray) {
    var x, y,
        // Sets the width and height of spaces based on map array.
        width = width/mapArray.length, 
        height = height/mapArray[0].length;

    for(x = 0; x < mapArray.length; x += 1) {
        this.mapSpaces[x] = [];
        for (y = 0; y < mapArray[0].length; y += 1) {

            switch(mapArray[x][y]) {
                case 0:
                    this.mapSpaces[x][y] = new MapSpace({
                        image: getImage("cute/Blank"), 
                        elevation: "low",
                        width: width,
                        height: height                        
                    });
                    break;
                case 1:
                    this.mapSpaces[x][y] = new MapSpace({
                        image: getImage("cute/BrownBlock"), 
                        elevation: "mid",
                        width: width,
                        height: height                        
                    });
                    break;
                case 2:
                    this.mapSpaces[x][y] = new MapSpace({
                        image: getImage("cute/DirtBlock"),
                        elevation: "mid",
                        width: width,
                        height: height                        
                    });
                    break;
                case 3:
                    this.mapSpaces[x][y] = new MapSpace({
                        image: getImage("cute/GrassBlock"),
                        elevation: "mid",
                        width: width,
                        height: height                   
                    });
                    break;
                case 7:
                    this.mapSpaces[x][y] = new MapSpace({
                        image: getImage("cute/WallBlock"),
                        elevation: "mid",
                        width: width,
                        height: height                        
                    });
                    break;
                case 5:
                    this.mapSpaces[x][y] = new MapSpace({
                        image: getImage("cute/PlainBlock"),
                        elevation: "mid",
                        width: width,
                        height: height                        
                    });
                    break;
                case 8:
                    this.mapSpaces[x][y] = new MapSpace({
                        image: getImage("cute/DoorTallOpen"),
                        elevation: "mid",
                        width: width,
                        height: height                        
                    });
                    break;
                case 6:
                    this.mapSpaces[x][y] = new MapSpace({
                        image: getImage("cute/WallBlockTall"),
                        elevation: "mid",
                        width: width,
                        height: height                        
                    });
                    break;
                case 9:
                    this.mapSpaces[x][y] = new MapSpace({
                        image: getImage("cute/StoneBlock"),
                        elevation: "mid",
                        width: width,
                        height: height                        
                    });
                    break;
                case 10:
                    this.mapSpaces[x][y] = new MapSpace({
                        image: getImage("cute/StoneBlockTall"),
                        elevation: "mid",
                        width: width,
                        height: height                        
                    });
                    break;
                case 11:
                    this.mapSpaces[x][y] = new MapSpace({
                        image: getImage("cute/DoorTallClosed"),
                        elevation: "mid",
                        width: width,
                        height: height                        
                    });
                    break;
                default:
                    // Empty Space
                    this.mapSpaces[x][y] = new MapSpace({ 
                        elevation: "low",
                        width: width,
                        height: height 
                    });
            }
        }
    }
};

// Draw map each time the render(draw canvas) method is called.
MapOfLevel.prototype.draw = function() {
    
    for(var y = 0; y < this.mapSpaces.length; y++) {
        for(var x = 0; x < this.mapSpaces[y].length; x++) {
            this.mapSpaces[y][x].draw(x, y);
            if(this.mapSpaces[y][x].spaceItem){
                this.mapSpaces[y][x].spaceItem.draw(x, y);
            }
        }
    }

};

MapOfLevel.prototype.addItem = function(x, y, item) {
    switch(item) {
        case "chestclosed":
            this.mapSpaces[x][y].spaceItem = new SpaceItem({
                hardness: "solid", // null, brittle, solid
                image: getImage("cute/ChestClosed"),
                isBroken: false,
                isOpen: false
            });
            break;
        case "chestlid":
            this.mapSpaces[x][y].spaceItem = new SpaceItem({
                hardness: "solid", // null, brittle, solid
                image: getImage("cute/ChestLid"),
                isBroken: false,
                isOpen: false
            });
            break;
        case "chestopen":
            this.mapSpaces[x][y].spaceItem = new SpaceItem({
                hardness: "solid", // null, brittle, solid
                image: getImage("cute/ChestOpen"),
                isBroken: false,
                isOpen: true
            });
            break;
        case "gemblue":
            this.mapSpaces[x][y].spaceItem = new SpaceItem({
                hardness: "solid", // null, brittle, solid
                image: getImage("cute/GemBlue"),
                isBroken: false,
                isOpen: true
            });
            break;
        case "gemgreen":
            this.mapSpaces[x][y].spaceItem = new SpaceItem({
                hardness: "solid", // null, brittle, solid
                image: getImage("cute/GemGreen"),
                isBroken: false,
                isOpen: true
            });
            break;
        case "gemorange":
            this.mapSpaces[x][y].spaceItem = new SpaceItem({
                hardness: "solid", // null, brittle, solid
                image: getImage("cute/GemOrange"),
                isBroken: false,
                isOpen: true
            });
            break;
        case 'heart':
            this.mapSpaces[x][y].spaceItem = new SpaceItem({
                hardness: "solid", // null, brittle, solid
                image: getImage("cute/Heart"),
                isBroken: false,
                isOpen: true
            });
            break;
        case 'key':
            this.mapSpaces[x][y].spaceItem = new SpaceItem({
                hardness: "solid", // null, brittle, solid
                image: getImage("cute/Key"),
                isBroken: false,
                isOpen: true
            });
            break;
        case 'rock':
            this.mapSpaces[x][y].spaceItem = new SpaceItem({
                hardness: "solid", // null, brittle, solid
                image: getImage("cute/Rock"),
                isBroken: false,
                isOpen: true
            });
            break;
        case 'star':
            this.mapSpaces[x][y].spaceItem = new SpaceItem({
                hardness: "solid", // null, brittle, solid
                image: getImage("cute/Star"),
                isBroken: false,
                isOpen: true
            });
            break;
        case 'treeshort':
            this.mapSpaces[x][y].spaceItem = new SpaceItem({
                hardness: "solid", // null, brittle, solid
                image: getImage("cute/TreeShort"),
                isBroken: false,
                isOpen: true
            });
            break;
        case 'treetall':
            this.mapSpaces[x][y].spaceItem = new SpaceItem({
                hardness: "solid", // null, brittle, solid
                image: getImage("cute/TreeTall"),
                isBroken: false,
                isOpen: true
            });
            break;
        case 'treeugly':
            this.mapSpaces[x][y].spaceItem = new SpaceItem({
                hardness: "solid", // null, brittle, solid
                image: getImage("cute/TreeUgly"),
                isBroken: false,
                isOpen: true
            });
            break;
        case 'healthheart':
            this.mapSpaces[x][y].spaceItem = new SpaceItem({
                hardness: "solid", // null, brittle, solid
                image: getImage("space/healthheart"),
                isBroken: false,
                isOpen: true
            });
            break;
        default:
            // Empty Space
            this.mapSpaces[x][y].spaceItem = new SpaceItem({

            });
    }

};