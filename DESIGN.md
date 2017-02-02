# Design

## A diagram of modules or classes that you’ve decided to implement, in appropriate detail
updateMap for updating the map.

updateTreemap for updating the treemap.

updateBarchart for updating the barchart.

updateSlider that updates the year and the position of the slider circle

## Advanced sketches of your UI that clearly explain which features are connected to which underlying part of the code

The first screen would look something like this

![Chloropleth map](https://github.com/JulesBlm/Eindproject/blob/master/img/Sketch%200.png?raw=true)

Then when a nation is clicked a treemap like this, for either import or export, is shown.

![Treemap imports example](https://github.com/JulesBlm/Eindproject/blob/master/img/sketch1.jpg?raw=true)

Then when a square is clicked it will show the import/export relation in a barchart between the nation selected in the map and the nation selected in the treemap

![Third view](https://github.com/JulesBlm/Eindproject/blob/master/img/sketch2.jpg?raw=true)

## A list of APIs and frameworks or plugins that you will be using to provide functionality in your app

d3-geo: For drawing a map
d3-hierarchy: For drawing the treemaps
d3-scale-chromatic: For using a scale for the map, treemap and barchart.

## A list of data sources if you will get data from an external source

OPEC, MIT Media atlas

## If your application has multiple independent programs working together (e.g. a separate script to clean your dataset) you need to provide a high-level overview of these components and then provide a lower-level overview of the inner workings of each component.

countrycodesTopoJSON.py adds three letter country codes as identifiers to the TopoJSON world map.

extractor.py extracts only Crude Oil data from the UN SITC4 REV. 2 (1962 - 2014) trade dataset.

impexptojson.py convert the extracted data to a JSON format that works for this visualization.

CSVtoJSON convert the data for import or export (seperate datasets) per nation to a convenient JSON file.

