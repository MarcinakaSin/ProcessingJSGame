
// Character Properties (Monster & Player)
var Characters = function(height, width, image, x, y, name, level, health) {
    Tile.call(this, height, width, image, x, y);
    this.name = name || "Unknown";
    this.level = level || 1;
    this.health = health || 100;
};

Characters.prototype = Object.create(Tile.prototype);