
var Player = function(height, width, image, x, y, name, level, health) {
    if(!(this instanceof Player)) {
        return new Player(height, width, image, x, y, name, level, health);
    }
    Characters.call(this, height, width, image, x, y, name, level, health);
    
};

Player.prototype = Object.create(Characters.prototype);