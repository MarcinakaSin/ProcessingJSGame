
// This is a constructor for map spaces.
var MapSpace = function(height, width, image, x, y, elevation, landscape) {
    if(!(this instanceof MapSpace)) {
        return new MapSpace(height, width, image, x, y, elevation, landscape);
    }
    Tile.call(this, height, width, image, x, y);
    this.elevation  = elevation || "low"; // low, mid, high
    this.landscape  = landscape || "plane"; // plane, brittle, solid 
};

MapSpace.prototype = Object.create(Tile.prototype);
