# Eindproject
Data processsing Eindproject Minor Programmeren
Jules Blom 11363150

## Short Description

My project visualizes the trade of crude oil between nations.

A choropleth map shows the countries that either import or export crude oil. The year can be selected with the slider below the map. When a country is clicked a treemap showing the where the crude oils is imported from or exported to. When a country is clicked in the treemap, a barchart showing the history of the past 10 years of the crude oil trade between the two selected countries is shown.

## Clearly describe the technical design: how is the functionality implemented in your code?

### High level overview.

First are the initializations. Where elements such as the projection, the map, treemap and barchart are declared and some color functions as well.
Then the main function 'ready' runs if all data is loaded. In this function:

The world map is drawn.

Radio button toggle properties are set so that it updates the map and treemap if it is switched.

The function updateMap that updates the map with the appropriate data. This is called whenever some option is changed.

A slider to select years and function updateSliderCircle that moves the circle in the slider and updates the year.

A function updateTreemap that constructs new appropriate data for the treemap and a title for selected country and year and used d3's hierarchy and treemap function to translate the data to coordinates of the squares. Inside the function updateTreemap there's a function drawTreemap that draws the treemap squares.

The function updateBachart constructs the data for the barchart with the right options and then draws a barcharts. When the year slider is changed the barcharts transitions to the new data.

#### Detailed 


## Clearly describe challenges that your have met during development. Document all important changes that your have made with regard to your design document (from the PROCESS.md). Here, we can see how much you have learned in the past month.

At first the goal was to use data for all petroleum products. Due to lack of data for this this was changed to only crude oil trade. 

The d3.treemap function call for a specific format of JSON. The d3.treemap function requires a specific format of JSON. I had to rewrite my python script for converting the source CSV into the right format of JSON several times to get it right.

The d3 treemap squarified tiling method produced some pretty ugly treemaps. Contrary to what it's name suggest the rectangles drawn by the Squarified method weren't square at all and often had long thin shapes. I changed the tiling method to d3.binary which did produce nice square rectangles. Unfortunately the binary tiling method couldnot handle values of zero while the Squarified method had no problems with this. After painstakingly printing all the output I was able to write satifying error handling.

At first the plan was to use a line graph instead of a barchart for the third linked view.

At first I wanted to display the country names and values in the rectangles of the treemap. Due to some strange error the text would appear in the HTML but would not be visible. I solved this by showing a tooltip when hovering over a square. 

## Defend your decisions by writing an argument of a most a single paragraph. Why was it good to do it different than you thought before? Are there trade-offs for your current solution? In an ideal world, given much more time, would you choose another solution?

At first the plan was to use a line graph instead of a barchart for the third linked view. I changed it to barchart since the data is missing in some years for some countries and with a line chart this can look like a sharp decrease in the previous year and a large increase for the next year. A barchart better reflects that data is missing and is also more useful if there is data for only a few years instead of the regular 10 years. 

The tooltip for the treemap is a satisfactory solution. It might even be a better solution for really small rectangles because the text would not fit in them. With the tooltip all country names and values are clearly legible.

If I had more times I would have searched for more data. The farther back in time in my data the more data is lacking. Also data many smaller countries are not present in my dataset.

## Acknowledgments

I have adapted code from the following examples:

https://bl.ocks.org/mbostock/6452972 [Drag slider]
https://bl.ocks.org/mbostock/4063582 [Treemap]
http://blockbuilder.org/john-guerra/f22abc69555df8558b7051bb8ec2ee79 [Choropleth]
https://bl.ocks.org/RandomEtc/cff3610e7dd47bef2d01 [Barchart transitions]
