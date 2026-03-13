// Imports
const Graphic = await $arcgis.import("@arcgis/core/Graphic.js");
const GraphicsLayer = await $arcgis.import("@arcgis/core/layers/GraphicsLayer.js");

const arcgisScene = document.querySelector('arcgis-scene');

// Sacar info de camara, tilt ... de escenas
// arcgisScene.addEventListener('arcgisViewClick', (evt) => {
//     console.log('evt', evt.target.camera)
// })

//  PONER PUNTO EN 3D
// 1. Crear un gráfico (punto): geometría + simbología
// -3.69, 40.40
const pointGraphic = {
    type: "point",
    longitude: -3.69,
    latitude: 40.40,
}

const pointSymbol = {
    type: "point-3d",
    symbolLayers:[{
        type: "object",
        width: 50,
        height: 100,
        depth: 50,
        resource: {primitive: "sphere"},
        material: {color: "red"}
    }]

}


const pointGraphic3D = new Graphic({
    geometry: pointGraphic,
    symbol: pointSymbol
})

// 2. Crear capa de gráficos

const graphicsLayer = new GraphicsLayer({
    // 3. Añadir gráficos a la capa
    graphics: [pointGraphic3D]
})

// 4. Añadir la capa gráfica a la escena
arcgisScene.addEventListener('arcgisViewReadyChange', () => {
    arcgisScene.map.add(graphicsLayer)
})