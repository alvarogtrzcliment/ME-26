// Import
const FeatureLayer = await $arcgis.import("@arcgis/core/layers/FeatureLayer.js");
const GraphicsLayer = await $arcgis.import("@arcgis/core/layers/GraphicsLayer.js");
const Graphic = await $arcgis.import("@arcgis/core/Graphic.js");

// Accedemos al componente de mapa
const arcgisMap = document.querySelector("arcgis-map");

// Cargado la capa de datos de parques nacionales
const nationalParkFL = new FeatureLayer({
    url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/national_park_service/FeatureServer/0",
    // definitionExpression: "Location_Name = 'Fort Vancouver National Historic Site'"
})

// Creado capa gráfica donde irán los resultados
const graphicsLayer = new GraphicsLayer();

// Creado la consulta
const query = nationalParkFL.createQuery();
query.where = "Location_Name = 'Fort Vancouver National Historic Site'"; 

arcgisMap.addEventListener("arcgisViewReadyChange",  () => {

    // Añadir capa gráfica al mapa
    arcgisMap.map.add(graphicsLayer)

    // LA CONSULTA que es una PROMESA
    nationalParkFL.queryFeatures(query)
    .then((results) => {

        //Recorrer el resultado y ir creando un gráfico por cada resultado
        results.features.forEach((feature) => {
            const graphic = new Graphic({
                geometry: feature.geometry,
                symbol: {
                    type: "simple-marker",
                    color: "orange",
                    style: "triangle"
                }
            })
            //Añadir cada gráfico a la capa gráfica
            graphicsLayer.add(graphic)
        })
    }) // cumple promesa
    .catch((error) => console.error(error)) // no cumple promesa

    // arcgisMap.map.add(nationalParkFL);
}) 