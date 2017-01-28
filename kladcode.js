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
function transitionTreemap/(selectedYear) {
.
    treemapData = data[country][selectedYear]

    console.log("Changed treemapData:", treemapData)

    var root = d3.hierarchy(treemapData)
      .sum(function(d) { return d.import; });
    
    treemap(root);
    console.log("new tm'ed root", root)

    // Join new data with old elements, if any.
    square.data(root.leaves())
    
    // EXIT old elements not present in new data.
    square.exit()
      .transition(t)
      .style("fill-opacity", 1e-6)
      .remove();

    // The new enter set
    square.enter().append("text")
    square.enter()
      .transition(t)
        .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; })
      .select("rect")
        .attr("width", function(d) { return d.x1 - d.x0; })
        .attr("height", function(d) { return d.y1 - d.y0; })

    // the "UPDATE" set:
    square.enter()
        .attr("id", function(d) { return d.data.country; })
      .transition(t)
        .attr("width", function(d) { return d.x1 - d.x0; })
        .attr("height", function(d) { return d.y1 - d.y0; })
        .attr("fill", function(d) { return colorTreemap(d.data.import); });
  
  // Remove exit selection
  square.exit()
    .transition(t)
    .style('fill-opacity', 1e-6)
    .remove();

  square.enter().append("rect")
    .attr("class", "treemap-country")
    .attr("id", function(d) { return d.data.country; })
    .attr("width", function(d) {
      // console.log(d.data.country, "x1:", d.x1, "x0:", d.x0);
      if ( Number.isNaN(d.x1) || Number.isNaN(d.x0) ) {}
      else { return (d.x1 - d.x0) };
    })
    .attr("height", function(d) { 
      // console.log(d.data.country,"y1:", d.y1, "y0:", d.y0); 
      if ( Number.isNaN(d.y1) || Number.isNaN(d.y0) ) {}
      else { return (d.y1 - d.y0) };
    })
    .attr("fill", function(d) { return colorTreemap(d.data[passedTrade]); })
    .on("mousemove", function(d) { showTooltip(d.data.country, (d.data[passedTrade]/1000000), "million mystery units", d3.select("#treemap")) ; })
    .on("mouseout", function() { tooltip.classed("hidden", true); })
    .on("click", function() { updateBarchart(selectedCountry, this.id, year, tradeString); } ); 


  square.transition()
      .duration(300)
    .attr("class", "treemap-country")
    .attr("id", function(d) { return d.data.country; })
    .attr("width", function(d) {
      // console.log(d.data.country, "x1:", d.x1, "x0:", d.x0);
      if ( Number.isNaN(d.x1) || Number.isNaN(d.x0) ) {}
      else { return (d.x1 - d.x0) };
    })
    .attr("height", function(d) { 
      // console.log(d.data.country,"y1:", d.y1, "y0:", d.y0); 
      if ( Number.isNaN(d.y1) || Number.isNaN(d.y0) ) {}
      else { return (d.y1 - d.y0) };
    })
    .attr("fill", function(d) { return colorTreemap(d.data[passedTrade]); })
    .on("mousemove", function(d) { showTooltip(d.data.country, (d.data[passedTrade]/1000000), "million mystery units", d3.select("#treemap")) ; })
    .on("mouseout", function() { tooltip.classed("hidden", true); })
    .on("click", function() { updateBarchart(selectedCountry, this.id, year, tradeString); } ); 

  }
//--------------------------
    // Remove old
    bars.exit()
      .transition()
        .duration(300)
      // .attr("y", function(d) { return yBarchart(d.data); })
      .style('fill-opacity', 1e-6)
      .remove();

    // The new enter set
    bars.enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return xBarchart(d.year); })
      .attr("y", function(d) { return yBarchart(d.data); })
      .attr("width", xBarchart.bandwidth() )
      .attr("height", function(d) { return bcHeight - yBarchart(d.data); })
      .style("fill", function(d) { return colorTreemap(d.data) });

    // the "UPDATE" set:
    bars.transition()
      .duration(300)
        .attr("class", "bar")
        .attr("x", function(d) { return xBarchart(d.year); })
        .attr("y", function(d) { return yBarchart(d.data); })
        .attr("width", xBarchart.bandwidth() )
        .attr("height", function(d) { return bcHeight - yBarchart(d.data); })
        .style("fill", function(d) { return colorTreemap(d.data) });
