 /* ----------------------- TREEMAP PART -----------------------*/
  function updateTreemap(passedData) {
    // Remove previous treemap and title
    d3.select("#treemap").selectAll("g").remove();
    d3.select("#treemapdiv").select("h4").remove();

    // Break if Antarctica, Westernsahara or Puntland is clicked bc no data exists for these.
    if (country === "ATA" || country === "ESH" || country === "PUNT") {return;}

    // Get a string for selected trade
    if (document.getElementById("exports").checked) {var tradeString = "exports";}
    else {var tradeString = "imports";}

    console.log(passedData, country, year);

    var treemapData = passedData[country][year];

    // If theres no data for country in selected year display so then break from function
    if (treemapData === undefined) {
      d3.select("#treemapdiv").insert("h4", ":first-child")
        .text("No data for " + countrycodesDict[country] + " in " + year);
      clearBarchart();
      return;
   }

    function drawTreemap(passedTrade) {

      var root = d3.hierarchy(treemapData)
          .sum(function(d) {return d[passedTrade];});

      treemap(root)

      var square = svgTreemap.selectAll("g")
        .attr("transform", "translate(0," + margin.top / 2 + ")")
        .data(root.leaves())
        .enter().append("g")
          .attr("transform", function(d) {
            // Ignore d.x0 and y0 if they are not valid nr's
            if (Number.isNaN(d.x0) || Number.isNaN(d.y0)) {}
            else {return "translate(" + d.x0 + "," + d.y0 + ")";}
       }); 

      square.append("rect")
        .attr("class", "treemap-country")
        .attr("id", function(d) {return d.data.country;})
        .attr("width", function(d) {
          if ( Number.isNaN(d.x1) || Number.isNaN(d.x0) ) {}
          else {return (d.x1 - d.x0)};
       })
        .attr("height", function(d) {
          if ( Number.isNaN(d.y1) || Number.isNaN(d.y0) ) {}
          else {return (d.y1 - d.y0)};
       })
        .attr("fill", function(d) {return colorTreemap(d.data[passedTrade]);})
        .on("mousemove", function(d) {showTooltip(d.data.country, (d.data[passedTrade]), "kg") ;})
        .on("mouseout", function() {tooltip.classed("hidden", true);})
        .on("click", function() {
          treemapCountry = this.id;
          // Remove old group element since new one is appended
          d3.select("#barchart").select("g").remove();
          updateBarchart(tradeString, "n", passedData);
        }); 

      square.append("clipPath")
        .attr("id", function(d) {return "clip-" + d.data.country;})
       .append("use")
        .attr("xlink:href", function(d) {return "#" + d.data.country;});
  }

  if (tradeString === "imports") {
    drawTreemap(tradeString);
    d3.select("#treemapdiv").insert("h4", ":first-child")
      .text("Orgins of " + tradeString + " of " + countrycodesDict[country] + " in " + year);
  } else {
    drawTreemap(tradeString);
    // Insert title with year, country, trade
    d3.select("#treemapdiv").insert("h4", ":first-child")
      .text("Destinations of " + tradeString + " of " + countrycodesDict[country] + " in " + year);
    }
  }