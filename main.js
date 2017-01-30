var width = 1000,
    height = 600,
    margin = {top: 40, right: 40, bottom: 40, left: 40}
    format = d3.format(",d");

var svgMap = d3.select("#map").append("svg")
  .attr("id", "worldMap")
  .attr("width", 900)
  .attr("height", 550);

var svgSlider = d3.select("#map").append("svg")
  .attr("id", "slider")
  .attr("width", 1200)
  .attr("height", 80);

var svgTreemap = d3.select("#treemapdiv").append("svg")
  .attr("id", "treemap")
  .attr("width", 400)
  .attr("height", 400);

var svgBarchart = d3.select("#barchartdiv").append("svg")
  .attr("id", "barchart")
  .attr("width", 450)
  .attr("height", 450);

var tooltip = d3.select("body").append("div")
      .attr("class", "hidden tooltip");

// Color function for treemap squares
var colorTreemap = d3.scaleLinear()
    .domain([100000, 12332145000])
    .range(d3.schemeBlues[5]);

// var colorBarchart = d3.

/*----------------------- MAP PART -----------------------*/
var projection = d3.geoWinkel3()
  .scale(width / 2 / Math.PI)
  .translate([width / 2, height / 2]);

var path = d3.geoPath()
  .projection(projection);

var colorMap = d3.scaleLinear()
  .domain([100, 1500])
  .range(d3.schemeBlues[5]);

var dictCountries = {};

var treemap = d3.treemap()
  .tile(d3.treemapBinary)
  .size([500, 500])
  .padding(1)
  .round(true);

// Dictionary for displaying full country names
var countrycodesDict = {"AFG": "Afghanistan", "ALB": "Albania", "DZA": "Algeria", "ASM": "American Samoa", "AND": "Andorra", "AGO": "Angola", "AIA": "Anguilla", "ATA": "Antarctica", "ATG": "Antigua and Barbuda", "ARG": "Argentina", "ARM": "Armenia", "ABW": "Aruba", "AUS": "Australia", "AUT": "Austria", "AZE": "Azerbaijan", "BHS": "Bahamas", "BHR": "Bahrain", "BGD": "Bangladesh", "BRB": "Barbados", "BLR": "Belarus", "BEL": "Belgium", "BLZ": "Belize", "BEN": "Benin", "BMU": "Bermuda", "BTN": "Bhutan", "BOL": "Bolivia", "BES": "Bonaire", "BIH": "Bosnia and Herzegovina", "BWA": "Botswana", "BVT": "Bouvet Island", "BRA": "Brazil", "IOT": "British Indian Ocean Territory", "BRN": "Brunei Darussalam", "BGR": "Bulgaria", "BFA": "Burkina Faso", "BDI": "Burundi", "KHM": "Cambodia", "CMR": "Cameroon", "CAN": "Canada", "CPV": "Cape Verde", "CYM": "Cayman Islands", "CAF": "Central African Republic", "TCD": "Chad", "CHL": "Chile", "CHN": "China", "COL": "Colombia", "COM": "Comoros", "COG": "Republic of Congo", "COD": "Congo", "COK": "Cook Islands", "CRI": "Costa Rica", "CIV": "Côte dIvoire", "HRV": "Croatia", "CUB": "Cuba", "CUW": "Curaçao", "CYP": "Cyprus", "CZE": "Czech Republic", "DNK": "Denmark", "DJI": "Djibouti", "DMA": "Dominica", "DOM": "Dominican Republic", "ECU": "Ecuador", "EGY": "Egypt", "SLV": "El Salvador", "GNQ": "Equatorial Guinea", "ERI": "Eritrea", "EST": "Estonia", "ETH": "Ethiopia", "FLK": "Falkland Islands (Malvinas)", "FRO": "Faroe Islands", "FJI": "Fiji", "FIN": "Finland", "FRA": "France", "GUF": "French Guiana", "PYF": "French Polynesia", "ATF": "French Southern Territories", "GAB": "Gabon", "GMB": "Gambia", "GEO": "Georgia", "DEU": "Germany", "GHA": "Ghana", "GIB": "Gibraltar", "GRC": "Greece", "GRL": "Greenland", "GRD": "Grenada", "GLP": "Guadeloupe", "GUM": "Guam", "GTM": "Guatemala", "GGY": "Guernsey", "GIN": "Guinea", "GNB": "Guinea-Bissau", "GUY": "Guyana", "HTI": "Haiti", "HMD": "Heard Island and McDonald Islands", "VAT": "Vatican City State", "HND": "Honduras", "HKG": "Hong Kong", "HUN": "Hungary", "ISL": "Iceland", "IND": "India", "IDN": "Indonesia", "IRN": "Iran", "IRQ": "Iraq", "IRL": "Ireland", "IMN": "Isle of Man", "ISR": "Israel", "ITA": "Italy", "JAM": "Jamaica", "JPN": "Japan", "JEY": "Jersey", "JOR": "Jordan", "KAZ": "Kazakhstan", "KEN": "Kenya", "KIR": "Kiribati", "PRK": "North Korea", "KOR": "South Korea", "KWT": "Kuwait", "KGZ": "Kyrgyzstan", "LAO": "Laos", "LVA": "Latvia", "LBN": "Lebanon", "LSO": "Lesotho", "LBR": "Liberia", "LBY": "Libya", "LIE": "Liechtenstein", "LTU": "Lithuania", "LUX": "Luxembourg", "MAC": "Macao", "MKD": "Macedonia", "MDG": "Madagascar", "MWI": "Malawi", "MYS": "Malaysia", "MDV": "Maldives", "MLI": "Mali", "MLT": "Malta", "MHL": "Marshall Islands", "MTQ": "Martinique", "MRT": "Mauritania", "MUS": "Mauritius", "MYT": "Mayotte", "MEX": "Mexico", "FSM": "Micronesia", "MDA": "Moldova", "MCO": "Monaco", "MNG": "Mongolia", "MNE": "Montenegro", "MSR": "Montserrat", "MAR": "Morocco", "MOZ": "Mozambique", "MMR": "Myanmar", "NAM": "Namibia", "NRU": "Nauru", "NPL": "Nepal", "NLD": "the Netherlands", "NCL": "New Caledonia", "NZL": "New Zealand", "NIC": "Nicaragua", "NER": "Niger", "NGA": "Nigeria", "NIU": "Niue", "NFK": "Norfolk Island", "MNP": "Northern Mariana Islands", "NOR": "Norway", "OMN": "Oman", "PAK": "Pakistan", "PLW": "Palau", "PSE": "Palestine", "PAN": "Panama", "PNG": "Papua New Guinea", "PRY": "Paraguay", "PER": "Peru", "PHL": "Philippines", "PCN": "Pitcairn", "POL": "Poland", "PRT": "Portugal", "PRI": "Puerto Rico", "QAT": "Qatar", "REU": "Réunion", "ROU": "Romania", "RUS": "Russia", "RWA": "Rwanda", "KNA": "Saint Kitts and Nevis", "LCA": "Saint Lucia", "MAF": "Saint Martin (French part)", "SPM": "Saint Pierre and Miquelon", "VCT": "Saint Vincent and the Grenadines", "WSM": "Samoa", "SMR": "San Marino", "STP": "Sao Tome and Principe", "SAU": "Saudi Arabia", "SEN": "Senegal", "SRB": "Serbia", "SYC": "Seychelles", "SLE": "Sierra Leone", "SGP": "Singapore", "SXM": "Sint Maarten (Dutch part)", "SVK": "Slovakia", "SVN": "Slovenia", "SLB": "Solomon Islands", "SOM": "Somalia", "ZAF": "South Africa", "SGS": "South Georgia and the South Sandwich Islands", "SSD": "South Sudan", "ESP": "Spain", "LKA": "Sri Lanka", "SDN": "Sudan", "SUR": "Suriname", "SJM": "Svalbard and Jan Mayen", "SWZ": "Swaziland", "SWE": "Sweden", "CHE": "Switzerland", "SYR": "Syrian Arab Republic", "TWN": "Taiwan", "TJK": "Tajikistan", "TZA": "Tanzania", "THA": "Thailand", "TLS": "Timor-Leste", "TGO": "Togo", "TKL": "Tokelau", "TON": "Tonga", "TTO": "Trinidad and Tobago", "TUN": "Tunisia", "TUR": "Turkey", "TKM": "Turkmenistan", "TCA": "Turks and Caicos Islands", "TUV": "Tuvalu", "UGA": "Uganda", "UKR": "Ukraine", "ARE": "United Arab Emirates", "GBR": "United Kingdom", "USA": "United States", "UMI": "United States Minor Outlying Islands", "URY": "Uruguay", "UZB": "Uzbekistan", "VUT": "Vanuatu", "VEN": "Venezuela", "VNM": "Viet Nam", "VGB": "Virgin Islands", "VIR": "Virgin Islands", "WLF": "Wallis and Futuna", "ESH": "Western Sahara", "YEM": "Yemen", "ZMB": "Zambia", "ZWE": "Zimbabwe"};

d3.queue()
    .defer(d3.json, "world-50m-cc.json")
    .defer(d3.json, "imports.json")
    .defer(d3.json, "exports.json")
    .defer(d3.json, "data.json")
    .await(ready);

/* ---------------------------------------------- WHEN DATA IS READY ----------------------------------------------*/
function ready(error, world, imports, exports, data) {
  if (error) throw error;

  // Default is exports in 2013
  var trade = exports,
      year = 2013;

  var country;
  var tradeString;
  var treemapCountry;

  updateMap(trade, year)

  /* ----------------------- RADIO BUTTON TOGGLE -----------------------*/
  // Select import or export with radio button
  var inputElems = d3.selectAll("input")
    .on("change", function() {
      var inputValue = this.value;

      if (inputValue === "imports") {trade = imports;}
      else {trade = exports;}

      updateMap(trade, year, country)

      // If a country is clicked in map update the treemap
      if (country !== undefined) {
        updateTreemap(country, year);
        // If a country is clicked in the treemap clear the barchart
        if (treemapCountry !== undefined) {clearBarchart();}
      }
   })

  /*----------------------- MAP PART -----------------------*/
  // Get country lines from map
  var countries = topojson.feature(world, world.objects.countries).features;

  // Draw the map
  svgMap.selectAll(".country")
      .data(countries)
    .enter().insert("path")
      .attr("class", "country")
      .attr("id", function (d) {return d.id;})
      .attr("d", path)
      .style("fill", function (d) {
            // Lookup country in dictionary with values
            var countryValue = dictCountries[d.id];
            // If there is data for the country give a fill
            if (countryValue) {return colorMap(countryValue)};
         })
      // Tooltip var voteable = (age < 18) ? "Too young":"Old enough";
      .on("mousemove", function(d) {
          // var exists = (dictCountries[d.id] !== undefined) ? dictCountries[d.id]:;

          if (dictCountries[d.id]) {showTooltip(d.id, dictCountries[d.id], "thousand bbl/day");}
          else {showTooltip(d.id, 0, ": Insufficient data");}
      })       
      .on("mouseout", function() {tooltip.classed("hidden", true);})
      .on("click", function() {
          country = this.id;

          // Update map, make new treemap and remove previous barchart
          updateMap(trade, year, country);
          updateTreemap(country, year);
          treemapCountry = undefined;
          clearBarchart();
       });
    
  // Update the map when toggle is switched or year is changed
  function updateMap(selectedTrade, selectedYear, selectedCountry) {
    // Empty the dictionary
    dictCountries = {};

    // Make new dictionary with appropriate data
    selectedTrade[selectedYear].forEach(function (d) {dictCountries[d.country] = d.value;});

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
    d3.selectAll("#" + selectedCountry)
      .transition()
      .style("fill", "#FF7976");
 }

  /*----------------------- YEAR SLIDER -----------------------*/
  var xSlider = d3.scaleLinear()
    .domain([1960, 2013])
    .range([0, width])
    .clamp(true);

  var slider = svgSlider.append("g")
    .attr("class", "slider")
    .attr("transform", "translate(" + margin.left / 2 + "," + 100 / 2 + ")");

  slider.append("line")
    .attr("class", "track")
    .attr("x1", xSlider.range()[0])
    .attr("x2", xSlider.range()[1])
  .select(function() {return this.parentNode.appendChild(this.cloneNode(true));})
    .attr("class", "track-inset")
  .select(function() {return this.parentNode.appendChild(this.cloneNode(true));})
    .attr("class", "track-overlay")
    .call(d3.drag()
        .on("start.interrupt", function() {slider.interrupt();})
        .on("start drag", function() {updateSliderCircle(xSlider.invert(d3.event.x)) ;}));

  slider.insert("g", ".track-overlay")
      .attr("class", "ticks")
      .attr("transform", "translate(0," + 18 + ")")
    .selectAll("text")
    .data(xSlider.ticks(18))
    .enter().append("text")
      .attr("x", xSlider)
      .attr("text-anchor", "middle")
      .text(function(d) {return d;});

  var handle = slider.insert("circle", ".track-overlay")
    .attr("id", "handle")
    .attr("r", 7)
    .attr("cx", xSlider(2013));

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
          // console.log("treemapCountry:", treemapCountry, "trade",tradeString);
          updateBarchart(country, treemapCountry, year, tradeString, "y");};
     }
 }

  /* ----------------------- TREEMAP PART -----------------------*/
  function updateTreemap(selectedCountry, selectedYear) {

    console.log(selectedCountry)
    if (selectedCountry === "ATA" || selectedCountry === "ESH" || selectedCountry === "-99") {return;}

    // Remove previous treemap and title
    d3.select("#treemap").selectAll("g").remove();
    d3.select("#treemapdiv").select("h4").remove();
    // d3.select("#barchart").selectAll("g").remove();

    // Get a string for selected trade
    if (document.getElementById("exports").checked) {var tradeString = "exports";}
    else {var tradeString = "imports";}

    var treemapData = data[selectedCountry][selectedYear];

    // If theres no data for country in selected year display so then break from function
    if (data[selectedCountry][selectedYear] === undefined) {
      d3.select("#treemapdiv").insert("h4", ":first-child")
        .text("No data for " + countrycodesDict[selectedCountry] + " in " + selectedYear);
      clearBarchart();
      return;
   }

    function drawTreemap(passedTrade) {

      var root = d3.hierarchy(treemapData)
          .sum(function(d) {return d[passedTrade];});

      var t = d3.transition()
        .duration(300);

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
        .on("mousemove", function(d) {showTooltip(d.data.country, (d.data[passedTrade]/1000000), "million mystery units") ;})
        .on("mouseout", function() {tooltip.classed("hidden", true);})
        .on("click", function() {updateBarchart(selectedCountry, this.id, year, tradeString);} ); 

      square.append("clipPath")
        .attr("id", function(d) {return "clip-" + d.data.country;})
       .append("use")
        .attr("xlink:href", function(d) {return "#" + d.data.country;});
   }


  if (tradeString === "imports") {
    drawTreemap("imports");
    d3.select("#treemapdiv").insert("h4", ":first-child")
      .text("Orgins of " + tradeString + " of " + countrycodesDict[selectedCountry] + " in " + selectedYear);
  } else {
    drawTreemap("exports");
    // Insert title with year, country, trade
    d3.select("#treemapdiv").insert("h4", ":first-child")
      .text("Destinations of " + tradeString + " of " + countrycodesDict[selectedCountry] + " in " + selectedYear);
    }
 }

  /*----------------------- BARCHART PART -----------------------*/
  function clearBarchart() {
    d3.select("#barchartdiv").select("h4").remove();
    d3.select("#barchart").selectAll("rect").remove();
    d3.select("#barchart").selectAll(".axis").remove();
  }

  function updateBarchart(selectedCountry, clickedCountry, selectedYear, passedTrade, transitionOption) {
    // Remove old title and axis
    d3.select("#barchartdiv").select("h4").remove();
    d3.select("#barchart").selectAll(".axis").remove();
    // Clear selectedCountry in worldmap and marked square in treemap
    updateMap(trade, year, country); 
    updateTreemap(country, year);

    // If clickedCountry is not defined yet break from function
    if (clickedCountry === undefined) {console.log("B-B-B Break!!!"); return;};

    var barchartData = [],
        barchartRange = [],
        bcWidth = +svgBarchart.attr("width") - margin.left - margin.right,
        bcHeight = +svgBarchart.attr("height") - margin.top - margin.bottom;

    // treemapCountry is a global variable
    treemapCountry = clickedCountry;

    // Color clicked country in both treemap and worldmap
    d3.selectAll("#" + treemapCountry)
      .transition()
      .style("fill", "#FFE066");

    // Construct new array with data of past 10 years
    for (var lowerYear = selectedYear - 9 ; lowerYear <= selectedYear ; lowerYear++) {
      var dataPast = data[selectedCountry][lowerYear];

      if (dataPast) {
        dataPast.children.forEach(function(element) {
          if (element.country === treemapCountry) {
            if (passedTrade === "imports") {
                barchartData.push({"year": lowerYear, "data": element.imports});
                barchartRange.push(element.imports);
           }
            else {
                barchartData.push({"year": lowerYear, "data": element.exports});
                barchartRange.push(element.exports);
           }
         }
       })
     }
   }

    // If there is no data available or only 1 year: remove barcharty
    if (barchartData.length === 0 || barchartData.length === 1) {clearBarchart(); return;}

    var xBarchart = d3.scaleBand().rangeRound([0, bcWidth]).padding(0.1)
          .domain(barchartData.map(function(d) {return(d.year);})),
        yBarchart = d3.scaleLinear()
          .rangeRound([bcHeight, 0])
          .domain([0, d3.max(barchartRange)]);

    // Append new title for barchart
    if (passedTrade === "imports") {
        d3.select("#barchartdiv").insert("h4", ":first-child")
          .text("History of " + passedTrade + " of " + countrycodesDict[selectedCountry] + " from " + countrycodesDict[treemapCountry]);
   } else if (passedTrade === "exports") {
        d3.select("#barchartdiv").insert("h4", ":first-child")
          .text("History of " + passedTrade + " of " + countrycodesDict[selectedCountry] + " to " + countrycodesDict[treemapCountry]);      
   }

    // If a new barchart has to be drawn remove previous
    if (!(transitionOption === "y")) {
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
        .attr("text-anchor", "start")
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
        .attr("text-anchor", "end")
        .text("Mystery Units");

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
      .attr("fill", function(d) {return colorTreemap(d.data)});

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

  /*------ MAP LEGEND ----*/
  var defs = svgMap.append("g")
  .attr("transform", "translate(" + margin.left /6 + "," + margin.top / 4 + ")");

  var linearGradient = defs.append("linearGradient")
      .attr("id", "linear-gradient");

  // Append multiple color stops by using D3"s data/enter step
  linearGradient.selectAll("stop") 
      .data( colorMap.range() )                  
      .enter().append("stop")
        .attr("offset", function(d,i) {return i / (colorMap.range().length - 1);})
        .attr("stop-color", function(d) {return d;});

  // Append a linearGradient element
  defs.append("rect")
    .attr("id", "key")
    .attr("width", 300)
    .attr("height", 20)
    .attr("fill", "url(#linear-gradient)");

  xLegend = d3.scaleLinear()
    .domain([0, 5000])
    .range([0, 300])
    .clamp(true);

  /* Text onder key x : [0, 300] */
  defs.append("text")
     .attr("class", "caption")
     .attr("x", 210)
     .attr("y", 40)
     .attr("fill", "#000")
     .attr("text-anchor", "start")
     .text("Thousand barrels p/day");

  defs.call(d3.axisBottom(xLegend)
      .tickSize(20))
      // .tickValues(colorMap.domain() ) )
    .select(".domain")
      .remove();

  /*----------------------- TOOLTIP FUNCTIE -----------------------*/
  function showTooltip(passedCountry, passedData, unitString) {
    var mouse = d3.mouse(svgMap.node()).map(function(d) {return parseInt(d);});

    tooltip.classed("hidden", false)
      .attr("style", "left: 15%; top: 15%")
      .attr("style", "left:" + (mouse[0] + 5) + "px; top:" + (d3.event.pageY - 70) + "px")
      .html("<strong>" + countrycodesDict[passedCountry] + "</strong>" + "<br>" + format(passedData) + " " + unitString );
 }
}