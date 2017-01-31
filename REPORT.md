I have adapted code from the following examples:

https://bl.ocks.org/mbostock/6452972 [Drag slider]

https://bl.ocks.org/mbostock/4063582 [Treemap]

http://blockbuilder.org/john-guerra/f22abc69555df8558b7051bb8ec2ee79 [Choropleth]

https://bl.ocks.org/RandomEtc/cff3610e7dd47bef2d01 [Barchart transitions]

## Clearly describe the technical design: how is the functionality implemented in your code?

### High level overview, which helps us navigate and understand the total of your code (which components are there?). Second, go into detail, and describe the modules/classes and how they relate.

First are the initializations. Where elements such as the projection, the map, treemap and barchart are declared. Some color functions as well.
Then the main function 'ready' runs if all data is loaded. In this function:

The world map is drawn.

Radio button toggle that updates the map and treemap if it is switched.

Function updateMap that updates the map with the appropriate data.

A slider to select years and function updateSliderCircle that moves the circle in the slider and updates the year.

A function updateTreemap that constructs new appropriate data for the treemap and a title for selected country and year and used d3's hierarchy and treemap function to translate the data to coordinates of the squares. Inside the function updateTreemap there's a function drawTreemap that draws the treemap squares.

#### Detailed 

## Clearly describe challenges that your have met during development. Document all important changes that your have made with regard to your design document (from the PROCESS.md). Here, we can see how much you have learned in the past month.


## Defend your decisions by writing an argument of a most a single paragraph. Why was it good to do it different than you thought before? Are there trade-offs for your current solution? In an ideal world, given much more time, would you choose another solution?
At first the plan was to use a line graph instead of a barchart for the third linked view. I changed it to barchart since the data is missing in some years for some countries and with a line chart this can look like a sharp decrease in the previous year and a large increase for the next year. A barchart better reflects that data is missing and is also more useful if there is data for only a few years instead of the regular 10 years.
