
// This is a constructor for map spaces.
var MapSpace = function(config) {
    if(!(this instanceof MapSpace)) {
        return new MapSpace(config);
    }
    Tile.call(this, config);
    this.elevation  = config.elevation || "low"; // low, mid, high
    //this.landscape  = landscape || "plane"; // plane, brittle, solid 
    this.spaceItem = null;
};

MapSpace.prototype = Object.create(Tile.prototype);

MapSpace.prototype.draw = function(x, y) {
    image(this.image, (x * this.width), (y * (this.height/2) - (this.height*(1/4))), this.width, this.height);

};