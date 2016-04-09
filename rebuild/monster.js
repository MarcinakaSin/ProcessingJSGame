
// This is a constructor for creating Monsters.
var Monster = function(height, width, image, x, y, name, level, health) {
    if(!(this instanceof Monster)) {
        return new Monster(height, width, image, x, y, name, level, health);
    }
    Characters.call(this, height, width, image, x, y, name, level, health);
    
};

Monster.prototype = Object.create(Characters.prototype);