///////////////////////////////////////////////////////////////////
// This block controls the background map view in map.html.
// Not sure what images 1 to 9 do.

// get variable for view
var myData = getQueryVariable("variable");
var setView = "hi";

export function getQueryVariable(variable) {
   var query = window.location.search.substring(1);
   var vars = query.split("?");
   return vars[0];
}

export var setView = getQueryVariable(myData);

// View
if (setView == "image/image1.jpg") {
   var mapView = new ol.View({
      projection: "EPSG:4326",
      center: [120.0612450359377, 26.807813203610294],
      zoom: 17,
   });
} else if (setView == "image/image2.jpg") {
   var mapView = new ol.View({
      projection: "EPSG:4326",
      center: [53.50036680178997, 36.37237385670914],
      zoom: 18,
   });
} else if (setView == "image/image3.jpg") {
   var mapView = new ol.View({
      projection: "EPSG:4326",
      center: [56.35009562002112, 27.187660711741906],
      zoom: 17,
   });
} else if (setView == "image/image4.jpg") {
   var mapView = new ol.View({
      projection: "EPSG:4326",
      center: [51.35898432847965, 31.15046290962657],
      zoom: 18,
   });
} else if (setView == "image/image5.jpg") {
   var mapView = new ol.View({
      projection: "EPSG:4326",
      center: [53.856461126777724, 36.35510151317725],
      zoom: 20,
   });
} else if (setView == "image/image6.jpg") {
   var mapView = new ol.View({
      projection: "EPSG:4326",
      center: [53.426985788137316, 36.22107994059045],
      zoom: 17,
   });
} else if (setView == "image/image7.jpg") {
   var mapView = new ol.View({
      projection: "EPSG:4326",
      center: [48.56313307473338, 37.99206608365083],
      zoom: 14,
   });
} else if (setView == "image/image8.jpg") {
   var mapView = new ol.View({
      projection: "EPSG:4326",
      center: [50.024850481620234, 37.18115508723072],
      zoom: 17,
   });
} else if (setView == "image/image9.jpg" || setView == "image/image10.jpg") {
   var mapView = new ol.View({
      projection: "EPSG:4326",
      center: [45.39128255155722, 37.717319495338465],
      zoom: 10,
   });
} else {
   var mapView = new ol.View({
      projection: "EPSG:4326",
      center: [53, 33],
      zoom: 6,
   });
}

///////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////
// This block controls the basemaps if they are clicked on.

// map
var map = new ol.Map({
   target: "map",
   view: mapView,
   // controls: [],
});

// console.log(map);
// OSM
var osm = new ol.layer.Tile({
   title: "OSM",
   visible: false,
   source: new ol.source.OSM(),
});

map.addLayer(osm);

// google road map
var googleRoadMap = new ol.layer.Tile({
   title: "Google Road Map",
   visible: false,
   source: new ol.source.XYZ({
      url: "http://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
      attributions: "Powered by Google",
      // projection: "EPSG:4326",
   }),
});

map.addLayer(googleRoadMap);

// Google Terrain and Roads
var googleTerrainRoads = new ol.layer.Tile({
   title: "Google Terrain and Roads",
   visible: false,
   source: new ol.source.XYZ({
      url: "http://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}",
      attributions: "Powered by Google",
   }),
});

map.addLayer(googleTerrainRoads);

// google satellite
var googleSatellite = new ol.layer.Tile({
   title: "Google Satellite",
   visible: true,
   source: new ol.source.XYZ({
      url: "http://mt1.google.com/vt/lyrs=s&hl=pl&&x={x}&y={y}&z={z}",
      attributions: "Powered by Google",
   }),
});

map.addLayer(googleSatellite);

// google satellite and Roads
var googleSatelliteRoads = new ol.layer.Tile({
   title: "Google Satellite and Roads",
   visible: false,
   source: new ol.source.XYZ({
      url: "http://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
      attributions: "Powered by Google",
   }),
});

map.addLayer(googleSatelliteRoads);

// WaterColor
var water = new ol.layer.Tile({
   title: "Water Color",
   visible: false,
   source: new ol.source.Stamen({
      layer: "watercolor",
   }),
});

map.addLayer(water);

// google road
var googleRoad = new ol.layer.Tile({
   title: "Google Road Names",
   visible: false,
   source: new ol.source.XYZ({
      url: "http://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}",
      attributions: "Labels: Powered by Google",
   }),
});

map.addLayer(googleRoad);

///////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////
// This block reads layers from geoserver.

// Layers:
var AKList = [];
for (var i = 0; i <= 34; i++) {
   var num1 = i + 1987;
   AKList[i] = new ol.layer.Image({
      title: "Amirkabir:a_".concat("", i.toString()),
      visible: false,
      // extent: [-180, -90, -180, 90],
      source: new ol.source.ImageWMS({
         url: "http://bina.civil.sharif.edu/geoserver/wms",
         params: { LAYERS: "Amirkabir:a_".concat("", i.toString()) },
         ratio: 1,
         serverType: "geoserver",
      }),
   });

   map.addLayer(AKList[i]);
}

var allwelandsLayerPoint = new ol.layer.Image({
   title: "Wetlands:Wetlands",
   visible: false,
   // extent: [-180, -90, -180, 90],
   source: new ol.source.ImageWMS({
      url: "http://bina.civil.sharif.edu/geoserver/wms",
      params: { LAYERS: "Wetlands:Wetlands" },
      ratio: 1,
      serverType: "geoserver",
   }),
});

map.addLayer(allwelandsLayerPoint);

// All dams:
var alldamsLayerPoint = new ol.layer.Image({
   title: "allyears:y1987",
   visible: false,
   // extent: [-180, -90, -180, 90],
   source: new ol.source.ImageWMS({
      url: "http://bina.civil.sharif.edu/geoserver/wms",
      params: { LAYERS: "allyears:y1987" },
      ratio: 1,
      serverType: "geoserver",
   }),
});

map.addLayer(alldamsLayerPoint);

// console.log(AKList);

///////// This section defines the pointlayer of dams /////////////////////
var areaList = [];
for (var i = 0; i <= 34; i++) {
   var num1 = i + 1987;
   areaList[i] = new ol.layer.Image({
      title: "allyears:y".concat("", num1.toString()),
      visible: false,
      // extent: [-180, -90, -180, 90],
      source: new ol.source.ImageWMS({
         url: "http://bina.civil.sharif.edu/geoserver/wms",
         params: { LAYERS: "allyears:y".concat("", num1.toString()) },
         ratio: 1,
         serverType: "geoserver",
      }),
   });

   map.addLayer(areaList[i]);
}
////// End of section /////////////////////////////////////////////////////

// AKList[0].setVisible(true);
// areaList[0].setVisible(true);

var overlays = new ol.layer.Group({
   title: "Overlays",
   layers: areaList.concat(AKList), // what does this part do?
});

///////////////////////////////////////////////////////////////////////
// This block creates checkboxes in the layers section for both dams and wetlands:

// create a layer
const layerBoxText = document.getElementById("layerBoxText");

// create an array of checkbox names
const checkboxNames = ["Reservoirs", "Wetlands"];

// create the checkboxes
checkboxNames.forEach((name, index) => {
   const input = document.createElement("input");
   input.type = "checkbox";
   input.id = `checkbox-${index}`;
   input.name = name;
   input.setAttribute("onchange", `inputPress();`);
   input.setAttribute("data-year", index); // add a data-year attribute to the checkbox

   const label = document.createElement("label");

   // show checkbox label
   label.innerHTML = checkboxNames[index];

   // add a space between the checkbox and label
   label.style.marginLeft = "1em";

   // add the checkbox and label to the layer
   layerBoxText.appendChild(input);
   layerBoxText.appendChild(label);
   layerBoxText.appendChild(document.createElement("br"));
});

const firstdate = 0;

// Create a layer for Reservoirs
const reservoirsLayer = alldamsLayerPoint;

// Create a layer for Wetlands
const wetlandsLayer = allwelandsLayerPoint;

export function inputPress() {
   const checkboxes = document.querySelectorAll('input[type="checkbox"]');
   let anyChecked = false;

   checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
         anyChecked = true;
         const index = Number(checkbox.getAttribute("data-year"));

         // Check the name of the checked checkbox
         if (checkbox.name === "Reservoirs") {
            reservoirsLayer.setVisible(true);
         } else if (checkbox.name === "Wetlands") {
            wetlandsLayer.setVisible(true);
         }
      } else {
         const index = Number(checkbox.getAttribute("data-year"));

         // Check the name of the unchecked checkbox
         if (checkbox.name === "Reservoirs") {
            reservoirsLayer.setVisible(false);
         } else if (checkbox.name === "Wetlands") {
            wetlandsLayer.setVisible(false);
         }
      }
   });

   // Hide the layers if no checkboxes are checked
   if (!anyChecked) {
      wetlandsLayer.setVisible(false);
      reservoirsLayer.setVisible(false);
   }
}

/////////////////////////////////////////////////////////////////////////

// Mouse Control
var mousePosition = new ol.control.MousePosition({
   // className: "mousePosition",
   projection: "EPSG:4326",
   coordinateFormat: function (coordinate) {
      return ol.coordinate.format(coordinate, "{x}, {y}", 6);
   },
});

map.addControl(mousePosition);

// Scale Bar
var scaleControl = new ol.control.ScaleLine({
   bar: true,
   // text: true
});

map.addControl(scaleControl);

// Get Feature Info

var container = document.getElementById("popup");
var content = document.getElementById("popup-content");
var myChart = document.getElementById("myChart");
var closer = document.getElementById("popup-closer");

closer.onclick = function () {
   overlay.setPosition(undefined);
   closer.blur();
   return false;
};

var overlay = new ol.Overlay({
   element: container,
   autoPan: true,
   autoPanAnimation: {
      duration: 250,
   },
});

map.addOverlay(overlay);

/// THIS SECTION CONTROLS "GET ATTRIBUTE INFO" AND "CHART" OPTIONS. ///////////////////////

/// THIS SECTION CONTROLS "GET ATTRIBUTE INFO" AND "CHART" OPTIONS ///////////////////////  (Info section of this code is right)

export function getinfo(evt) {
   if (info.getAttribute("clicked") == "true") {
      document.getElementById("popup").className = "ol-popup";
      var coordinate = evt.coordinate;
      var viewResolution = mapView.getResolution();
      $("#popup-content").empty();
      document.getElementById("myinfo").innerHTML = "";

      var wetlandsLayerTitle = "Wetlands:Wetlands";
      var reservoirsLayerTitle = "allyears:y1987";

      var wetlandsSource = new ol.source.ImageWMS({
         url: "http://bina.civil.sharif.edu/geoserver/wms",
         params: { LAYERS: wetlandsLayerTitle },
         serverType: "geoserver",
         crossOrigin: "anonymous",
      });

      var reservoirsSource = new ol.source.ImageWMS({
         url: "http://bina.civil.sharif.edu/geoserver/wms",
         params: { LAYERS: reservoirsLayerTitle },
         serverType: "geoserver",
         crossOrigin: "anonymous",
      });

      var wetlandsFeatureInfoUrl = wetlandsSource.getFeatureInfoUrl(
         coordinate,
         viewResolution,
         "EPSG:4326",
         { INFO_FORMAT: "text/html" }
      );

      var reservoirsFeatureInfoUrl = reservoirsSource.getFeatureInfoUrl(
         coordinate,
         viewResolution,
         "EPSG:4326",
         { INFO_FORMAT: "text/html" }
      );

      // Retrieve wetlands information
      $.get(wetlandsFeatureInfoUrl, function (wetlandsData) {
         $("#popup-content").append(wetlandsData);
         overlay.setPosition(coordinate);
      });

      // Retrieve reservoirs information
      $.get(reservoirsFeatureInfoUrl, function (reservoirsData) {
         $("#popup-content").append(reservoirsData);
         overlay.setPosition(coordinate);
      });
   }
}

map.on("singleclick", getinfo);

// // END OF GET ATTRIBUTE INFO AND CHART SECTION /////////////////////////////////////////////////////////////////

export function getchart(evt) {
   if (chart.getAttribute("clicked") == "true") {
      document.getElementById("popup").className = "ol-popup2";
      var coordinate = evt.coordinate;
      var viewResolution = mapView.getResolution();
      $("#popup-content").empty();
      document.getElementById("myinfo").innerHTML = "";
      var no_layers = overlays.getLayers().get("length");
      var wetlandsLayerTitle = "Wetlands:Wetlands";
      var reservoirsLayerTitle = "allyears:y1987";
      var wetlandsSource = new ol.source.ImageWMS({
         url: "http://bina.civil.sharif.edu/geoserver/wms",
         params: { LAYERS: wetlandsLayerTitle },
         // params: { 'LAYERS': 'allyears:y1987' },
         serverType: "geoserver",
         crossOrigin: "anonymous",
      });
      var reservoirsSource = new ol.source.ImageWMS({
         url: "http://bina.civil.sharif.edu/geoserver/wms",
         params: { LAYERS: reservoirsLayerTitle },
         serverType: "geoserver",
         crossOrigin: "anonymous",
      });
      url = reservoirsSource.getFeatureInfoUrl(
         coordinate,
         viewResolution,
         "EPSG:4326"
         // { 'INFO_FORMAT': 'text/html' }
      );
      $.get(url, function (data) {
         // $("#popup-content").append(data);
         // overlay.setPosition(coordinate);

         var second = data.split("Dam_Name = ")[1];
         var first = second.split("\nLong")[0];

         var canvas = document.createElement("canvas");
         canvas.id = "myChart";
         canvas.style.width = "100%";
         var dataSource = "./dam/".concat(first).concat("_bina.csv");

         $.get(dataSource, function (CSVdata) {
            // CSVdata is populated with the file contents...
            // ...ready to be converted into an Array

            data = $.csv.toObjects(CSVdata);

            var ctx = document.getElementById("myChart").getContext("2d");
            var gradient = ctx.createLinearGradient(0, 0, 0, 300);
            gradient.addColorStop(0, "blue");
            gradient.addColorStop(0.4, "green");
            gradient.addColorStop(0.6, "yellow");
            //gradient.addColorStop(0.70, 'orange');
            gradient.addColorStop(1, "red");

            const dataset2 = {
               label: "%Full",
               data: data.map((d) => d.fullness),
               //backgroundColor: 'rgba(255, 0, 0, 0.5)', // Set the background color to red for filled bars
               backgroundColor: gradient,
               borderColor: "black", // Set the border color for filled bars
               borderWidth: 0.5,
               type: "bar",
               //yAxisID: "y-axis-2"
               // groupWidth: "80%"
               // barPercentage: 0.4, // Adjust this value to control the width of the bars
            };

            // Create the chart data
            const chartData = {
               //labels: data.map((d) => parseInt(d.x)),
               labels: data.map((d) => d.imagedate),
               //datasets: [dataset1, dataset2]
               datasets: [dataset2],
            };

            const damtv = data.map((d) => d.totalvolume); // damtv = dam total volume
            const damstorage = data.map((d) => d.currentvolume); // damstorage = dam storage
            const damdate = data.map((d) => d.imagedate); // damdate = dates retreived from satellite

            // Create the chart options
            const chartOptions = {
               legend: {
                  display: false,
               },
               title: {
                  display: true,
                  text: [
                     first.concat(" Reservoir"),
                     "Total reservoir storage = "
                        .concat(damtv[0])
                        .concat(" MCM"),
                     "Total storage on "
                        .concat(damdate.pop())
                        .concat(" = ")
                        .concat(damstorage.pop())
                        .concat(" MCM"),
                  ],
                  //lineHeight: 1.2
               },

               scales: {
                  xAxes: [
                     {
                        scaleLabel: {
                           display: true,
                           labelString: "Date",
                        },
                        barPercentage: 1.0, // Set this to 1.0 to overlap the bars
                        categoryPercentage: 1.0, // Set this to 1.0 to overlap the bars
                     },
                  ],
                  yAxes: [
                     // {
                     //     id: "y-axis-1",
                     //     position: "left",
                     //     scaleLabel: {
                     //         display: true,
                     //         labelString: "Volume (MCM)",
                     //     },
                     //     ticks: {
                     //         beginAtZero: true,
                     //     },
                     // },
                     {
                        //    id: "y-axis-2",
                        //    position: "right",

                        scaleLabel: {
                           display: true,
                           labelString: "Reservoir % full",
                        },
                        ticks: {
                           min: 0,
                           max: 100,
                           beginAtZero: true,
                        },
                     },
                  ],
               },
            };

            // Create a new bar chart object
            new Chart("myChart", {
               type: "bar",
               data: chartData,
               options: chartOptions,
            });
         });

         $("#popup-content").append(canvas);
         overlay.setPosition(coordinate);
      });

      url2 = wetlandsSource.getFeatureInfoUrl(
         coordinate,
         viewResolution,
         "EPSG:4326"
         // { 'INFO_FORMAT': 'text/html' }
      );

      $.get(url2, function (data) {
         // $("#popup-content").append(data);
         // overlay.setPosition(coordinate);

         var second = data.split("Name = ")[1];
         var first = second.split("\nLong")[0];

         var canvas = document.createElement("canvas");
         canvas.id = "myChart";
         canvas.style.width = "100%";
         var dataSource = "./wetland/".concat(first).concat(".csv");

         $.get(dataSource, function (CSVdata) {
            // CSVdata is populated with the file contents...
            // ...ready to be converted into an Array

            data = $.csv.toObjects(CSVdata);

            var ctx = document.getElementById("myChart").getContext("2d");
            var gradient = ctx.createLinearGradient(0, 0, 0, 300);
            gradient.addColorStop(0, "blue");
            gradient.addColorStop(0.4, "green");
            gradient.addColorStop(0.6, "yellow");
            //gradient.addColorStop(0.70, 'orange');
            gradient.addColorStop(1, "red");

            const dataset2 = {
               label: "Water Area",
               data: data.map((d) => d.area_Water),
               //backgroundColor: 'rgba(255, 0, 0, 0.5)', // Set the background color to red for filled bars
               backgroundColor: gradient,
               borderColor: "black", // Set the border color for filled bars
               borderWidth: 0.5,
               type: "bar",
               //yAxisID: "y-axis-2"
               // groupWidth: "80%"
               // barPercentage: 0.4, // Adjust this value to control the width of the bars
            };

            // Create the chart data
            const chartData = {
               //labels: data.map((d) => parseInt(d.x)),
               // labels: data.map((d) => d.StartDate),
               labels: data.map((d) => d.StartDate.slice(0, 4)),

               //datasets: [dataset1, dataset2]
               datasets: [dataset2],
            };

            const damtv1 = data.map((d) => d.Maximum_Area); // damtv = dam total volume
            const damstorage = data.map((d) => d.area_Water); // damstorage = dam storage
            const damdate = data.map((d) => d.StartDate); // damdate = dates retreived from satellite
            const a = damtv1[0];

            const maxArea = data.map((d) => d.Maximum_Area)[0];
            const margin = maxArea * 0.05; // Adjust the margin percentage as needed
            var maxValue = Math.max.apply(null, damstorage);

            const chartOptions = {
               legend: {
                  display: false,
               },
               title: {
                  display: true,
                  text: [
                     first.concat(" Wetland"),
                     "Maximum wetland area = "
                        .concat(maxValue.toFixed(2))
                        .concat(" km²"),
                     "Wetland area on "
                        .concat(damdate.pop().slice(0, 4))
                        .concat(" = ")
                        .concat(parseFloat(damstorage.pop()).toFixed(2))
                        .concat(" km²"),
                  ],
                  //lineHeight: 1.2
               },
               scales: {
                  xAxes: [
                     {
                        scaleLabel: {
                           display: false,
                           labelString: "Date",
                        },
                        barPercentage: 1.0, // Set this to 1.0 to overlap the bars
                        categoryPercentage: 1.0, // Set this to 1.0 to overlap the bars
                     },
                  ],
                  yAxes: [
                     {
                        id: "y-axis-1",
                        position: "left",
                        scaleLabel: {
                           display: true,
                           labelString: "Water Area (km ²)",
                        },
                        ticks: {
                           display: true,
                           min: 0,
                           max: maxValue,
                           stepSize: maxValue / 5,
                           beginAtZero: true,
                           // barPercentage: 4.0,
                           // precision: 1
                           // categoryPercentage: 0.01,
                        },
                     },
                     {
                        id: "y-axis-2",
                        position: "right",
                        scaleLabel: {
                           display: true,
                           labelString:
                              "Wetland area / Maximum historical area %",
                        },
                        ticks: {
                           min: 0,
                           suggestedMax: 100,
                           // beginAtZero: true,
                        },
                     },
                  ],
               },
            };

            // Create a new bar chart object
            new Chart("myChart", {
               type: "bar",
               data: chartData,
               options: chartOptions,
            });

            // Create a new bar chart object
            new Chart("myChart", {
               type: "bar",
               data: chartData,
               options: chartOptions,
            });
         });

         $("#popup-content").append(canvas);
         overlay.setPosition(coordinate);
      });
   }
}

map.on("singleclick", getchart);

// END OF GET ATTRIBUTE INFO AND CHART SECTION /////////////////////////////////////////////////////////////////

// measure length
var lengthButton = document.createElement("button");
lengthButton.className = "myButton";
lengthButton.id = "lengthButton";

var lengthElement = document.createElement("div");
lengthElement.className = "lengthButtonDiv";
lengthElement.appendChild(lengthButton);

var lengthControl = new ol.control.Control({
   element: lengthElement,
});

var lengthFlag = false;
measure.addEventListener("click", () => {
   lengthButton.classList.toggle("clicked");
   lengthFlag = !lengthFlag;
   document.getElementById("map").style.cursor = "default";
   if (measure.getAttribute("clicked") == "true") {
      map.removeInteraction(draw);
      addInteraction("LineString");
   } else {
      map.removeInteraction(draw);
      source.clear();
      const elements = document.getElementsByClassName(
         "ol-tooltip ol-tooltip-static"
      );
      while (elements.length > 0) elements[0].remove();
   }
});

map.addControl(lengthControl);

// measure area
var areaButton = document.createElement("button");
areaButton.className = "myButton";
areaButton.id = "areaButton";

var areaElement = document.createElement("div");
areaElement.className = "areaButtonDiv";
areaElement.appendChild(areaButton);

var areaControl = new ol.control.Control({
   element: areaElement,
});

var areaFlag = false;
area.addEventListener("click", () => {
   // console.log('hi');
   areaButton.classList.toggle("clicked");
   areaFlag = !areaFlag;
   document.getElementById("map").style.cursor = "default";
   if (area.getAttribute("clicked") == "true") {
      map.removeInteraction(draw);
      addInteraction("Polygon");
   } else {
      map.removeInteraction(draw);
      source.clear();
      const elements = document.getElementsByClassName(
         "ol-tooltip ol-tooltip-static"
      );
      while (elements.length > 0) elements[0].remove();
   }
});

map.addControl(areaControl);

var continuePolygonMsg = "click to continue polygon, Double click to complete";
var continueLineMsg = "click to continue line, Double click to complete";

var draw;
var source = new ol.source.Vector();

var vector = new ol.layer.Vector({
   source: source,
   style: new ol.style.Style({
      fill: new ol.style.Fill({
         color: "rgba(255, 255, 255, 0.2)",
      }),
      stroke: new ol.style.Stroke({
         color: "#ffcc33",
         width: 2,
      }),
      image: new ol.style.Circle({
         radius: 7,
         fill: new ol.style.Fill({
            color: "#ffcc33",
         }),
      }),
   }),
});

map.addLayer(vector);

export function addInteraction(intType) {
   draw = new ol.interaction.Draw({
      source: source,
      type: intType,
      style: new ol.style.Style({
         fill: new ol.style.Fill({
            color: "rgba(200, 200, 200, 0.6)",
         }),
         stroke: new ol.style.Stroke({
            color: "rgba(0, 0, 0, 0,5)",
            lineDash: [10, 10],
            width: 2,
         }),
         image: new ol.style.Circle({
            radius: 5,
            stroke: new ol.style.Stroke({
               color: "rgba(0, 0, 0, 0.7)",
            }),
            fill: new ol.style.Fill({
               color: "rgba(255, 255, 255, 0.2)",
            }),
         }),
      }),
   });

   map.addInteraction(draw);

   createMeasureTooltip();
   createHelpTooltip();

   var sketch;

   var pointMoveHandler = function (evt) {
      if (evt.dragging) {
         return;
      }
      var helpMsg = "Click to start drawing";

      if (sketch) {
         var geom = sketch.getGeometry();
      }
   };

   map.on("pointermove", pointMoveHandler);

   draw.on("drawstart", function (evt) {
      sketch = evt.feature;

      var tooltipCoord = evt.coordinate;

      sketch.getGeometry().on("change", function (evt) {
         var geom = evt.target;
         var output;
         if (geom instanceof ol.geom.Polygon) {
            output = formatArea(geom);
            tooltipCoord = geom.getInteriorPoint().getCoordinates();
         } else if (geom instanceof ol.geom.LineString) {
            output = formatLength(geom);
            tooltipCoord = geom.getLastCoordinate();
         }
         measureTooltipElement.innerHTML = output;
         measureTooltip.setPosition(tooltipCoord);
      });
   });

   draw.on("drawend", function () {
      measureTooltipElement.className = "ol-tooltip ol-tooltip-static";
      measureTooltip.setOffset([0, -7]);
      sketch = null;
      measureTooltipElement = null;
      createMeasureTooltip();
   });
}

var helpTooltipElement;
var helpTooltip;

export function createHelpTooltip() {
   if (helpTooltipElement) {
      helpTooltipElement.parentNode.removeChild(helpTooltipElement);
   }
   helpTooltipElement = document.createElement("div");
   helpTooltipElement.className = "ol-tooltip hidden";
   helpTooltip = new ol.Overlay({
      element: helpTooltipElement,
      offset: [15, 0],
      positioning: "center-left",
   });
   map.addOverlay(helpTooltip);
}

map.getViewport().addEventListener("mouseout", function () {
   helpTooltipElement.classList.add("hidden");
});

var measureTooltipElement;
var measureTooltip;

function createMeasureTooltip() {
   if (measureTooltipElement) {
      measureTooltipElement.parentNode.removeChild(measureTooltipElement);
   }
   measureTooltipElement = document.createElement("div");
   measureTooltipElement.className = "ol-tooltip ol-tooltip-measure";
   measureTooltip = new ol.Overlay({
      element: measureTooltipElement,
      offset: [0, -15],
      positioning: "bottom-center",
   });
   map.addOverlay(measureTooltip);
}

var formatLength = function (line) {
   var length = ol.sphere.getLength(line, { projection: "EPSG:4326" });
   if (length > 100) {
      output = Math.round((length / 1000) * 100) / 100 + " " + "km";
   } else {
      output = Math.round(length * 100) / 100 + " " + "m";
   }
   return output;
};

var formatArea = function (polygon) {
   var areaa = ol.sphere.getArea(polygon, { projection: "EPSG:4326" });
   var output;
   if (areaa > 10000) {
      output =
         Math.round((areaa / 1000000) * 100) / 100 + " " + "km<sup>2</sup>";
   } else {
      output = Math.round(areaa * 100) / 100 + " " + "m<sup>2</sup>";
   }
   return output;
};

// Create an element where the slider current position is shown.
var sliderdateLabel = document.createElement("sliderdateBox");
sliderdateLabel.className = "sliderdateBox";
sliderdateLabel.id = "sdBox";

var sliderdataControl = new ol.control.Control({
   element: sliderdateLabel,
});

// Read the CSV file
fetch("./slider/dates.csv")
   .then((response) => response.text())
   .then((data) => {
      // Parse the CSV data
      var rows = data.split("\n");
      var fulldates = [];
      var datevalues = [];
      for (var row of rows) {
         var columns = row.split(",");
         fulldates.push(columns[0]);
         datevalues.push(columns[1]);
      }

      // Create empty arrays for year, month, day, and integer values of dates
      var years = [];
      var months = [];
      var days = [];
      var dates = [];
      Intdatevalues = [];

      // Loop through each date and split it into year, month, and day
      for (var i = 0; i < fulldates.length; i++) {
         var dateParts = fulldates[i].split("-");
         var year = parseInt(dateParts[0]);
         var month = parseInt(dateParts[1]);
         var day = parseInt(dateParts[2]);
         var Intvalues = parseInt(datevalues[i]);

         // Push the values into the corresponding arrays
         years.push(year);
         months.push(month);
         days.push(day);
         dates.push(fulldates[i]);
         Intdatevalues.push(Intvalues);
      }

      var slider = new Slider("#time-slider", {
         min: Intdatevalues[0],
         max: Intdatevalues[Intdatevalues.length - 1],
         step: 1,
         value: Intdatevalues[0], // sets the inivial value of the slider.
         ticks: Intdatevalues,
         ticks_labels: "",
         tooltip: "hide",
         ticks_snap_bounds: 0,
      });

      slider.on("change", function (slideEvt) {
         var newValue = slideEvt.newValue;
         const ticksValue = slider.getAttribute("ticks");
         const tempindex = ticksValue.indexOf(newValue);
         // Show the date corresponding to the current position of slider.
         sliderdateLabel.textContent = "Selected date: ".concat(
            dates[tempindex]
         );

         for (var i = 0; i <= years.length - 1; i++) {
            if (newValue == i + years[0]) {
               for (var j = 0; j <= years.length - 1; j++) {
                  if (j == i) {
                     const checkboxes = document.querySelectorAll(
                        'input[type="checkbox"]'
                     );
                     checkboxes.forEach((checkbox) => {
                        if (checkbox.checked) {
                           areaList[j].setVisible(true);
                        }
                     });
                  } else {
                     areaList[j].setVisible(false);
                  }
               }
            }
         }
      });
   });
map.addControl(sliderdataControl);
