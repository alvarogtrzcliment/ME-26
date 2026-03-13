// Imports 
const FeatureLayer = await $arcgis.import("@arcgis/core/layers/FeatureLayer.js");
const GraphicsLayer = await $arcgis.import("@arcgis/core/layers/GraphicsLayer.js");
const SimpleFillSymbol = await $arcgis.import("@arcgis/core/symbols/SimpleFillSymbol.js");
const Graphic = await $arcgis.import("@arcgis/core/Graphic.js");


const arcgisMap = document.querySelector("arcgis-map");

const hospitalesFL = new FeatureLayer({
    url: "https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/Hospitales/FeatureServer/0"
});

const graphicsLayer = new GraphicsLayer();

// Polígono
const geometriaPoligono = {
    type: "polygon",
  rings: [
    [
      [-3.8, 40.45],
      [-3.6, 40.45],
      [-3.6, 40.38],
      [-3.8, 40.38],
      [-3.8, 40.45]
    ]
  ]
}

// Simbología
let symbol = {
  type: "simple-fill",  // autocasts as new SimpleFillSymbol()
  color: [ 0, 0, 0, 0],
  style: "solid",
  outline: {  // autocasts as new SimpleLineSymbol()
    color: "blue",
    width: 1
  }
};

graphicsLayer.add(new Graphic({
    geometry: geometriaPoligono,
    symbol: symbol
}))


arcgisMap.addEventListener("arcgisViewReadyChange", () => {
    arcgisMap.map.addMany([hospitalesFL, graphicsLayer]);
});