function clearBarchart() {
  d3.select("#barchartdiv").select("h4").remove();
  d3.select("#barchart").selectAll("rect").remove();
  d3.select("#barchart").selectAll(".axis").remove();
}

function updateBarchart(passedTrade, transitionOption, passedData) {
  // Remove old title and axis
  d3.select("#barchartdiv").select("h4").remove();
  d3.select("#barchart").selectAll(".axis").remove();
  // Clear the selected country in worldmap and marked square in treemap
  updateMap();
  updateTreemap(passedData);

  // If treemapCountry is not defined yet break from function
  if (treemapCountry === undefined) {return;};

  var barchartData = [],
      barchartRange = [],
      bcWidth = +svgBarchart.attr("width") - margin.left - margin.right,
      bcHeight = +svgBarchart.attr("height") - margin.top - margin.bottom;

  // Color clicked country in both treemap and worldmap
  d3.selectAll("#" + treemapCountry)
    .transition()
    .style("fill", "#FFE066");

  // Construct new array with data of past 10 years
  for (var lowerYear = year - 9 ; lowerYear <= year ; lowerYear++) {
    var dataPast = passedData[country][lowerYear];

    if (dataPast) {
      dataPast.children.forEach(function(element) {
        if (element.country === treemapCountry) {
          if (passedTrade === "imports") {
              barchartData.push({"year": lowerYear, "data": element.imports});
              barchartRange.push(element.imports);
          } else {
              barchartData.push({"year": lowerYear, "data": element.exports});
              barchartRange.push(element.exports);
          }
        }
      })
    }
  }

  // If there is no data available or only 1 year: remove barchart
  if (barchartData.length === 0 || barchartData.length === 1) {clearBarchart(); return;}

  var xBarchart = d3.scaleBand().rangeRound([0, bcWidth]).padding(0.1)
        .domain(barchartData.map(function(d) {return(d.year);})),
      yBarchart = d3.scaleLinear()
        .rangeRound([bcHeight, 0])
        .domain([0, d3.max(barchartRange)]);

  // Append new title for barchart
  if (passedTrade === "imports") {
      d3.select("#barchartdiv").insert("h4", ":first-child")
        .text("History of " + passedTrade + " of " + countrycodesDict[country] + " from " + countrycodesDict[treemapCountry]);
  } else if (passedTrade === "exports") {
      d3.select("#barchartdiv").insert("h4", ":first-child")
        .text("History of " + passedTrade + " of " + countrycodesDict[country] + " to " + countrycodesDict[treemapCountry]);      
  }

  // If a new barchart has to be drawn remove previous
  if (transitionOption !== "y") {
    d3.select("#barchart").selectAll("rect").remove();
    g = svgBarchart.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top / 2 + ")");
  }

  // x Axis
  g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + bcWidth + ")")
    .call(d3.axisBottom(xBarchart))
    .append("text")
      .attr("y", 7)
      .attr("dy", "0.71em")
      .style("fill","black")
      .style("text-anchor", "end")
      .text("Year");

  // y Axis
  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(yBarchart)
        .ticks(10)
        .tickFormat(d3.format(".3s")))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .style("fill","black")
      .style("text-anchor", "end")
      .text("Kilogram");

  var bars = g.selectAll("rect")
    .data(barchartData);

  // Remove old
  bars.exit()
    .transition()
      .duration(300)
    .attr("fill-opacity", 1e-6)
    .remove();

  // The new 'enter' set
  bars.enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) {return xBarchart(d.year);})
    .attr("y", function(d) {return yBarchart(d.data);})
    .attr("width", xBarchart.bandwidth() )
    .attr("height", function(d) {return bcHeight - yBarchart(d.data);})
    .attr("fill", function(d) {return colorTreemap(d.data);})
    .on("mousemove", function(d) {
      tooltip.classed('hidden', false)
        .attr("style", "left:" + (d3.event.pageX + 5) + "px; top:" + (d3.event.pageY - 40) + "px")
        .html("<strong>" + d.year + "</strong>" + "</br>" + format2(d.data) + " kg");
    })
    .on("mouseout", function() {tooltip.classed("hidden", true);});

  // the 'update' set:
  bars.transition()
    .duration(300)
      .attr("class", "bar")
      .attr("x", function(d) {return xBarchart(d.year);})
      .attr("y", function(d) {return yBarchart(d.data);})
      .attr("width", xBarchart.bandwidth() )
      .attr("height", function(d) {return bcHeight - yBarchart(d.data);})
      .attr("fill", function(d) {return colorTreemap(d.data)});
}