function color (group) {
    return d3.rgb(colorList[group][0],colorList[group][1],colorList[group][2]);
}

function darkColor (group) {
    return d3.rgb(colorScale*colorList[group][0],colorScale*colorList[group][1],colorScale*colorList[group][2]);
}

function radius (cat)
{
    if   (cat=="category") {return 10;}
    else if (cat=="paper") {return 4;}
    else if (cat=="tool") {return 6;}
    else {return 5;}
    
}

function highlightNode (d) {
    d3.selectAll("#node_" + d.name)
    .style("fill", darkColor(d.group))
    .style("stroke", d3.rgb(200,200,200))
    .attr("r",radiusScale*radius(d.cat));
    $("#chartInfo").html("<p>" + d.label + "</p>");
}

function unHighlightNode (d) {
    d3.selectAll("#node_" + d.name)
    .style("fill", color(d.group))
    .style("stroke", d3.rgb(255,255,255))
    .attr("r",radius(d.cat));
    $("#chartInfo").html("<p>(gratuitous collaboration graph - hover or click)</p>");
}

function openLink (d) {
    if (d.url==undefined)
    {
        // do nothing.
    }
    else
    {
        window.open(d.url);
        console.log(d.url);
    }
}

function drawNetwork()
{
    // make links reference nodes directly for this particular data format:
    var hash_lookup = [];
    // make it so we can lookup nodes in O(1):
    indexData.nodes.forEach(function(d, i) {
                            hash_lookup[d.name] = d;
                            });
    indexData.links.forEach(function(d, i) {
                            d.source = hash_lookup[d.source];
                            d.target = hash_lookup[d.target];
                            });
    force
    .nodes(indexData.nodes)
    .links(indexData.links)
    .charge(charge)
    .gravity(0.2);
    
    var link = svg.selectAll("line.link")
    .data(indexData.links)
    .enter()
    .append("line")
    .attr("class", "link")
    .style("stroke-width", function(d) { return 2-d.link+1;});
    
    var node = svg.selectAll("circle.node")
    .data(indexData.nodes)
    .enter()
    .append("circle")
    .attr("class", "node")
    .attr("r", function(d){return radius(d.cat);})
    .attr("id",function(d)
          {
          return ("node_" + d.name);
          })
    .style("fill", function(d) { return color(d.group); })
    .call(force.drag);
    
    force.distance(function(d) {return d.link * distance;});
    
    if (isLabels==1)
    {
        var text = svg.append("svg:g").selectAll("g")
        .data(force.nodes())
        .enter().append("svg:g");
        
        text.append("svg:text")
        .attr("x", 8)
        .attr("y", ".31em")
        .attr("class", "shadow")
        .text(function(d) { return d.label; });
        
        text.append("svg:text")
        .attr("x", 8)
        .attr("y", ".31em")
        .text(function(d) { return d.label; });
    }
    node.on("mouseover",function(d) { highlightNode(d);});
    node.on("mouseout",function(d) { unHighlightNode(d);});
    node.on("click",function(d) { openLink(d);});
    
    
    force.on("tick", function() {
             link
             .attr("x1", function(d) { return d.source.x; })
             .attr("y1", function(d) { return d.source.y; })
             .attr("x2", function(d) { return d.target.x; })
             .attr("y2", function(d) { return d.target.y; });
             
             node
             .attr("cx", function(d) { return d.x; })
             .attr("cy", function(d) { return d.y; });
             
             
             
             if (isLabels==1)
             {
             text.attr("transform", function(d) {
                       return "translate(" + d.x + "," + d.y + ")";
                       });
             }
             });
    
    var N = force.nodes().length;
    for (var i=0; i<N; i++)
    {
        force.nodes()[i].x = Math.random()*force.size()[0];
        force.nodes()[i].y = Math.random()*force.size()[1];
     
    }
    force.start();
    for (var i=0; i<15; i++) {force.tick();}
}

// SC
function shForm (divID)
{
    var $details  = $(divID);
    if ( $details.is(".hidden") ) {
        $details.fadeIn(400);
        $details.removeClass("hidden");
    } else {
        $details.fadeOut(400);
        $details.addClass("hidden");
    }
    return 0;
}
function hideForm (divID)
{
    var $details  = $(divID);
        $details.hide();
        $details.addClass("hidden");
    return 0;
}
