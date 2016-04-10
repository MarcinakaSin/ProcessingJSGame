
//  0=blank, 2=, 3=, 4=, 5=plain block
//  6=tall wall, 7=wall, 8=, 9=, 10=
var mapTile = [
    [6,7,7,7,5,5,7,7,7,6],
    [7,0,0,0,0,0,0,0,0,7],
    [7,0,0,0,0,0,0,0,0,7],
    [7,0,0,0,0,0,0,0,0,7],
    [7,0,0,0,0,0,0,0,0,7],
    [7,0,0,0,0,0,0,0,0,7],
    [6,7,7,6,0,0,6,7,7,6],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
];
var m = new MapOfLevel(5,5);
m.setStart(1,1);
m.createMap(mapTile);


//println(Object.keys(m));
//println(Object.keys(m.mapSpaces[1][1]));
//println(m.mapSpaces[1][1].elevation);
draw = function() { 
    //  Draws green background
    background(62, 120, 33);
    m.draw();
    //text(mouseX + ", " + mouseY, mouseX + 10, mouseY);
}; 