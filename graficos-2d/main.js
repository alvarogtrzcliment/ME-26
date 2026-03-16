// Importar clases
const GraphicsLayer = await $arcgis.import("@arcgis/core/layers/GraphicsLayer.js");
const Graphic = await $arcgis.import("@arcgis/core/Graphic.js");

// Acceder al mapa
const arcgisMap = document.querySelector('arcgis-map');

// Crear capa gráfica
const graphicsLayer = new GraphicsLayer();

// Crear gráfico de punto
let point = {
  type: "point",  // autocasts as new Point()
  longitude: -3,
  latitude: 40
};

// Create a symbol for drawing the point
let markerSymbol = {
  type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
  color: [226, 119, 40]
};

// Create a graphic and add the geometry and symbol to it
let pointGraphic = new Graphic({
  geometry: point,
  symbol: markerSymbol,
  popupTemplate: {
    title: "Tarancón",
    content: "hola hola"
  }
});


const polyline = {
  type: "polyline", // autocasts as new Polyline()
  paths: [
    [-111.3, 52.68],
    [-98, 49.5],
    [-93.94, 29.89],
  ],
};

const lineSymbol = {
  type: "simple-line", // autocasts as SimpleLineSymbol()
  color: [226, 119, 40],
  width: 4,
};

const lineGraphic = new Graphic({
    geometry: polyline,
    symbol: lineSymbol
})

// graphicsLayer.add(pointGraphic)
// graphicsLayer.add(lineGraphic)
graphicsLayer.addMany([pointGraphic, lineGraphic])

arcgisMap.addEventListener('arcgisViewReadyChange', () => {
    arcgisMap.map.add(graphicsLayer)
})

