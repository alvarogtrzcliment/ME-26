// Imports 
const FeatureLayer = await $arcgis.import("@arcgis/core/layers/FeatureLayer.js");
const GraphicsLayer = await $arcgis.import("@arcgis/core/layers/GraphicsLayer.js");
const SimpleFillSymbol = await $arcgis.import("@arcgis/core/symbols/SimpleFillSymbol.js");
const Query = await $arcgis.import("@arcgis/core/rest/support/Query.js");
const Graphic = await $arcgis.import("@arcgis/core/Graphic.js");
const PictureMarkerSymbol = await $arcgis.import("@arcgis/core/symbols/PictureMarkerSymbol.js");


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
    color: [0, 0, 0, 0],
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


const query = new Query({
    geometry: geometriaPoligono,
    spatialRelationship: "intersects",
    returnGeometry: true,
    outFields: ["*"]
})


arcgisMap.addEventListener("arcgisViewReadyChange", () => {

    const simbologiaHospital = new PictureMarkerSymbol({
        height: 32,
        url: 'https://cdn-icons-png.flaticon.com/512/2895/2895071.png',
        width: 32
    })


    hospitalesFL.queryFeatures(query)
        .then((results) => {
            // console.log(results)
            results.features.forEach((hospi) => {
                const hospital = new Graphic({
                    geometry: hospi.geometry,
                    symbol: simbologiaHospital
                })
                graphicsLayer.add(hospital)
            })
        })


    arcgisMap.map.addMany([graphicsLayer]);
});