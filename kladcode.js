function drawTreemap(passedTrade) {

    // Constructs a root node from the specified hierarchical data. The specified data must be an object representing the root node.
    var root = d3.hierarchy(treemapData)
        .sum(function(d) { return d.passedTrade; });

    treemap(root)

    // console.log("tm'ed root", root)
    var square = svgTreemap.selectAll("g")
      .data(root.leaves()) //Join the data
      .enter().append("g")
        .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")" }); 

    square.append("rect")
      .attr("class", "treemap-country")
      .attr("id", function(d) { return d.data.country; })
      .attr("width", function(d) { return d.x1 - d.x0; })
      .attr("height", function(d) { return d.y1 - d.y0; })
      .attr("fill", function(d) { return colorTreemap(d.data[passedTrade]); })
      .on("mousemove", function(d) { showTooltip( d.data.country, (d.data.passedTrade/1000000), "million mystery units") ; })
      .on("mouseout", function() { tooltip.classed("hidden", true); });

    square.append("clipPath")
      .attr("id", function(d) { return "clip-" + d.data.country; })
     .append("use")
      .attr("xlink:href", function(d) { return "#" + d.data.country; });
}

// d.data.imports of d.data.exports meegeven


  /* ------ TREEMAP ANIMATION ------*/ 
  // function changeYear(selectedYear) {
  //     var t = d3.transition()
  //       .duration(750);

  //     treemapData = data[country][selectedYear]

  //     console.log("Changed treemapData:", treemapData)

  //     var root = d3.hierarchy(treemapData)
  //       .sum(function(d) { return d.import; });
      
  //     treemap(root);
  //     console.log("new tm'ed root", root)

  //     // Join new data with old elements, if any.
  //     square.data(root.leaves())
      
  //     // EXIT old elements not present in new data.
  //     square.exit()
  //         .attr("class", "exit")
  //       .transition(t)
  //         .attr("y", 60)
  //         .style("fill-opacity", 1e-6)
  //         .remove();

  //     // UPDATE old elements present in new data.
  //     square.enter()
  //       .attr("class", "update")
  //       .transition(t)
  //         .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; })
  //       .select("rect")
  //         .attr("width", function(d) { return d.x1 - d.x0; })
  //         .attr("height", function(d) { return d.y1 - d.y0; })

  //     // ENTER new elements present in new data.
  //     square.enter().append("text")
  //         .attr("class", "enter")
  //         .attr("id", function(d) { return d.data.country; })
  //       .transition(t)
  //         .attr("width", function(d) { return d.x1 - d.x0; })
  //         .attr("height", function(d) { return d.y1 - d.y0; })
  //         .attr("fill", function(d) { return colorTreemap(d.data.import); });
  //   }

