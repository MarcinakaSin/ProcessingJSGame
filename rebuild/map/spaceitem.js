// Items to place on map tiles.
var SpaceItem = function(config) {
    if(!(this instanceof SpaceItem)) {
        return new SpaceItem(config);
    }
	Tile.call(this, config);
	this.hardness = null; // null, brittle, solid
	this.image = getImage("cute/Blank");
	this.isBroken = null;
	this.isOpen = null;
};

SpaceItem.prototype = Object.create(MapSpace.prototype);

SpaceItem.prototype.draw = function(x, y) {
    image(this.image, (x * this.width), (y * (this.height/2) - (this.height*(1/4))), this.width, this.height);
};

SpaceItem.prototype.addItem = function() {


};
SpaceItem.prototype.removeItem = function() {


};