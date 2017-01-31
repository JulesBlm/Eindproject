var width = 1000,
    height = 600,
    margin = {top: 40, right: 40, bottom: 40, left: 40}
    format = d3.format(",d")
    format2 = d3.format(".5s");

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
    .defer(d3.json, "jsons/world-50m-cc.json")
    .defer(d3.json, "jsons/imports.json")
    .defer(d3.json, "jsons/exports.json")
    .defer(d3.json, "jsons/data.json")
    .await(ready);

/* ---------------------------------------------- WHEN DATA IS READY ----------------------------------------------*/
function ready(error, world, imports, exports, data) {
  if (error) throw error;

  // Default is exports in 2013 and no countries selected yet
  trade = exports,
  year = 2013;
  country = undefined;
  treemapCountry = undefined;
  var tradeString;

  updateMap()

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
          if (dictCountries[d.id]) {showTooltip(d.id, dictCountries[d.id], "thousand bbl/day");}
          else {showTooltip(d.id, 0, ": Insufficient data");}
      })       
      .on("mouseout", function() {tooltip.classed("hidden", true);})
      .on("click", function() {
          country = this.id;

          // Update map, make new treemap and remove previous barchart
          updateMap();
          updateTreemap(data);
          treemapCountry = undefined;
          clearBarchart();
       });

  /* ----------------------- RADIO BUTTON TOGGLE -----------------------*/
  // Select import or export with radio button
  var inputElems = d3.selectAll("input")
    .on("change", function() {
      var inputValue = this.value;

      if (inputValue === "imports") {trade = imports;}
      else {trade = exports;}

      updateMap()

      // If a country is clicked in map update the treemap
      if (country !== undefined) {
        updateTreemap(data);
        // If a country is clicked in the treemap clear the barchart
        if (treemapCountry !== undefined) {clearBarchart();}
      }
   })

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

      updateMap();

      // If a country is selected in the map then update the map
      if (country) {
        updateTreemap(data);
        // If a country is selected in the treemap update the barchart
        if (treemapCountry) {
          updateBarchart(tradeString, "y", data);};
     }
  }

  /*------ MAP LEGEND ----*/
  var defs = svgMap.append("g")
  .attr("transform", "translate(" + margin.left /6 + "," + margin.top / 4 + ")");

  var linearGradient = defs.append("linearGradient")
      .attr("id", "linear-gradient");

  // Append multiple color stops by using D3"s data/enter step
  linearGradient.selectAll("stop") 
      .data(colorMap.range())                  
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

}