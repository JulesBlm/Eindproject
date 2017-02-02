## Week 1

Gathered data and wrote Python scripts to extract data from source. Wrote another Python script to convert CSV into the JSON format I wanted

Wrote a Python script to add three letter country codes to the World TopoJSON file which only had iso-numeric country codes.

Used d3 geopath and projection to draw a nice projection of said TopoJSON file.

Change the opacity of a country when hovered over.

## Week 2

Wrote a dictionary that contains the appropriate values for the map when options are changed.

Manually reformatted a part of my data to work with d3.treemap. Afterwards I rewrote the Python script to reformat all of the data into a JSON format that is compatible with d3.treemap.

Added a slider for selecting the year.

Added a tooltip for the map showing the country and the data.

## Week 3

Wrote the the third view, the barchart when a country is clicked in the treemap.

Wrote a dictionary to display full country names instead of country codes.

Formatted page using Bootstrap and CSS.

Added legend for the map.

Color the clicked country in the map red.

Color the clicked in the treemap and map yellow.

Added titles for second and third views that change with selected countries.

## Week 4

Removed all "NA" in the data so countries are not filled black in the map.

Added animated transition for the barchart when the year is changed.

Wrote exceptions for when Antarctica, Western Sahara or Puntland are clicked in the map

Splitted the javascript into multiple JS files.

On advice of BetterCodeHub I rewrote the function so they use less arguments. Now there are only a few global variables that change instead of arguments passed between functions. For example the selected country in the map, the selected country in the treemap, the selected year and wether the selected trade is import or export.

Moved the code for the toggle for import/export below the code for the drawing of the map so that the toggle can't be changed before the map is drawn.