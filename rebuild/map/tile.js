
// Player and Map properties (MapSpace, Player, Monster);
// This is the base object for building the map and creatures.
var Tile = function(config) {
    this.height = config.height    || height/5;
    this.width = config.width      || width/10;
    this.image = config.image      || getImage("cute/Blank");
    this.x = config.x              || 0;
    this.y = config.y              || -height/10;
};