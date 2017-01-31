// Update the map when toggle is switched or year is changed
function updateMap() {
  // Empty the dictionary
  dictCountries = {};

  // Make new dictionary with appropriate data
  trade[year].forEach(function (d) {dictCountries[d.country] = d.value;});

  // Recolor the map
  d3.selectAll(".country")
    .transition()
    .style("fill", function (d) {
      // Lookup country in dictionary with values
      var countryValue = dictCountries[d.id];

      // If there is data for the country give it fill
      if (countryValue) {return colorMap(countryValue);};
   })

  // Color selected country red
  d3.selectAll("#" + country)
    .transition()
    .style("fill", "#FF7976");
}