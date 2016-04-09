
//  1=blank, 2=tall tree, 3=short tree, 4=ugly tree, 5=rock
//  6=tall wall, 7=wall, 8=heart, 9=chest, 10=open chest
var mapTile = [
    [6,7,7,7,5,5,7,7,7,6],
    [7,2,3,4,1,1,4,3,2,7],
    [7,2,1,1,1,1,1,1,2,7],
    [7,2,1,9,1,1,1,8,2,7],
    [7,2,1,1,1,1,1,1,2,7],
    [7,2,3,4,5,1,4,3,2,7],
    [6,7,7,6,1,1,6,7,7,6],
    [1,2,2,3,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,4,1],
    [4,3,3,4,1,1,3,1,1,1]
];
var m = new MapOfLevel(5,5);
m.setStart(1,1);
m.createMap(mapTile);


println(Object.keys(m));
println(Object.keys(m.mapSpaces[1][1]));
println(m.mapSpaces[1][1].elevation);

/*
var m = new MapOfLevel(5,5);
m.setStart(1,1);
m.createMap(mapTile);

println(Object.keys(m));
println(Object.keys(m.mapSpaces[1][1]));
println(m.mapSpaces[1][1].elevation);

draw = function() { 
    //  Draws green background
    background(62, 120, 33);
    m;
    //text(mouseX + ", " + mouseY, mouseX + 10, mouseY);
}; 







println(Object.keys(wallTile.image));
println(wallTile.image.sourceImg);


//var firstPlayer = new Player("marcin", 2, 120);

println(firstPlayer.name);
println(firstPlayer.level);
println(firstPlayer.health);
*/