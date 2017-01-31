  /*----------------------- TOOLTIP FUNCTIE -----------------------*/
  function showTooltip(passedCountry, passedData, unitString) {

    tooltip.classed("hidden", false)
      .attr("style", "left:" + (d3.event.pageX + 5) + "px; top:" + (d3.event.pageY - 70) + "px")
      .html("<strong>" + countrycodesDict[passedCountry] + "</strong>" + "<br>" + format(passedData) + " " + unitString );
 }