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
};
