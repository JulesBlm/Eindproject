  function updateSliderCircle(h) {
      // Move the the circle
      handle.attr("cx", xSlider(h));

      year = parseInt(h);

      if (document.getElementById("exports").checked) {trade = exports; tradeString = "exports";}
      else {trade = imports; tradeString = "imports";}

      updateMap(trade, year, country);

      // If a country is selected in the map then update the map
      if (country) {
        updateTreemap(country, year);
        // If a country is selected in the treemap update the barchart
        if (treemapCountry) {
          updateBarchart(country, treemapCountry, year, tradeString, "y");};
     }
 }
