// This is a constructor for creating levels.
var MapOfLevel = function(width, height) {
    // Checks to see if map was created correctly.  
    // Avoids polluting the global name space. 
    if(!(this instanceof MapOfLevel)) {
        return new MapOfLevel(height, width);
    }
    this.width  = width     || width;
    this.height = height    || height;
    
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
    var x, y;
    for(x = 0; x < mapArray.length; x += 1) {
        this.mapSpaces[x] = [];
        for (y = 0; y < mapArray[0].length; y += 1) {
            switch(mapArray[x][y]) {
                case 1:
                    this.mapSpaces[x][y] = new MapSpace((height/5), (width/5), getImage("cute/CharacterBoy"), (x * (width/5)), (y * (height/10)), "low", "plane");
                    break;
                case 2:
                    this.mapSpaces[x][y] = new MapSpace((height/5), (width/5), getImage("cute/CharacterBoy"), (x * (width/5)), (y * (height/10)), "low", "plane");
                    break;
                default:
                    this.mapSpaces[x][y] = new MapSpace((height/5), (width/5), getImage("cute/Blank"), (x * (width/5)), (y * (height/10)), "low", "plane");
            }
        }
    }
};

