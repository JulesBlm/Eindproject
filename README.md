# Eindproject
Data processsing Eindproject Minor Programmeren

Jules Blom 11363150

## What problem will be solved for the user

The user

## What features will be available to solve the problem

A chloropleth map shows largest petroleum products exporter or importers, whichever option is toggled. When a country is clicked a treemap is shown, again either import or export. Export shows a treemap graph with squares showing the volume and/or value of petroleum products for the destination countries. Import shows the same graph but for the countries the petroleum products originate from.

The user can easily view from which nations petroleum is sourced for one specific country. The user can also easily see what countries are the largest importers and exporters of petroleum products. On top of that the user can view the change over recent years using a a slider.

A slider is used to change the years of the data, increasing or decreasing the treemap squares size.

For some nations a relevent story can be added. For example the decline of imports of the USA due to the shale oil boom; the decrease of Iraq exports due the US led invasion; the decrease in exports of OPEC nations following the 1973 Oil Embargo; the decrease of export to EU nations by Russia following EU sanctions over the 2014 Ukrainian conflict or the global decrease in production following the financial crisis. 

## What data sets and data sources will you need, how you will get the data into the right form for your app

I will use data from EIA, CBS, EuroStat, CIA world Factbook.

In case I can't find a complete dataset for the world I could switch to another natural resource or commodity.

## Visual Sketch

The first screen would look something like this

![Chloropleth map](https://github.com/JulesBlm/Eindproject/blob/master/oil%20prod.svg)

Then when a nation is clicked a treemap like this, for either import or export, is shown.

![Treemap imports example](https://github.com/JulesBlm/Eindproject/blob/master/treemap%20oil.png)

Then when a square is clicked it will show the import/export relation in a barchart between the nation selected in the map and the nation selected in the treemap

## What separate parts of the application can be defined (decomposing the problem) and how these should work together
Chloropleth map

Treemaps

Barchart

## Technical problems or limitations that could arise during development and what possibilities you have to overcome these

## A review of similar applications or visualizations in terms of features and technical aspects (what do they offer? how have they implemented it?)

