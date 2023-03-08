// Define some parameters for display
var isLabels = 0;
var width = 300,
height = 300,
thr = 8,
charge = -30,
distance = 7;
var colorScale = 0.7,
radiusScale = 1.3;
var colorList = [
                 [100,100,100], // grey
                 [27,122,224], // blue
                 [210,210,17], //yellow (c)
                 [120,200,27], // green
                 [224,27,122] // pink
                 ];
var force = d3.layout.force()
.charge(charge)
.linkDistance(distance)
.size([width, height]);

var svg = d3.select("#chart").append("svg")
.attr("width", width)
.attr("height", height);


drawNetwork();