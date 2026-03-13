const FeatureLayer = await $arcgis.import('@arcgis/core/layers/FeatureLayer.js')
const Query = await $arcgis.import('@arcgis/core/rest/support/Query.js')
const PictureMarkerSymbol = await $arcgis.import("@arcgis/core/symbols/PictureMarkerSymbol.js");
const GraphicsLayer = await $arcgis.import('@arcgis/core/layers/GraphicsLayer.js')
const Graphic = await $arcgis.import("@arcgis/core/Graphic.js");
const geodesicBufferOperator = await $arcgis.import("@arcgis/core/geometry/operators/geodesicBufferOperator.js");

const SimpleMarkerSymbol = await $arcgis.import(
    '@arcgis/core/symbols/SimpleMarkerSymbol.js'
)
const arcgisMap = document.querySelector('arcgis-map')

// Arbolado
const treesRenderer = {
    type: "simple",
    symbol: {
        type: "picture-marker",
        url: "images/icono_arbol.png"
    },
    visualVariables: [
        {
            type: "size",
            field: "Altura",
            stops: [
                { value: 0.5, size: 4 },
                { value: 1.5, size: 6 },
                { value: 3, size: 8 },
                { value: 6, size: 10 },
            ],
        }
    ],
}

const treesLayer = new FeatureLayer({
    url: "https://services1.arcgis.com/hcmP7kr0Cx3AcTJk/ArcGIS/rest/services/Prueba_PyJ/FeatureServer/0",
    renderer: treesRenderer
})

const capaGraficaGL = new GraphicsLayer();



// Buffer
const bufferLayer = new GraphicsLayer();

arcgisMap.addEventListener('arcgisViewReadyChange', () => {

    arcgisMap.map.addMany([bufferLayer, treesLayer, capaGraficaGL])
    // arcgisMap.map.addMany([bufferLayer])

})

// Coordenada del centro
// arcgisMap.addEventListener('click', (e) => {
//   const view = arcgisMap.view;
// const point = view.toMap({
//     x: evt.x,
//     y: evt.y
// });
// console.log(e)})

const polySym = {
    type: "simple-fill", // autocasts as new SimpleFillSymbol()
    color: [255, 188, 226, 0.7],
    outline: {
        color: [142, 68, 173, 0.7],
        width: 2
    }
};

arcgisMap.addEventListener('click', async (evt) => {
    // Añadir buffer

    // console.log('click')
    bufferLayer.removeAll();

    capaGraficaGL.removeAll();

    // console.log(evt)
    const view = arcgisMap.view;

    const point = view.toMap({
        x: evt.x,
        y: evt.y
    })

    if (!geodesicBufferOperator.isLoaded()) {
        await geodesicBufferOperator.load();
    }
    const buffer = geodesicBufferOperator.execute(point, 200, {
        unit: "meters",
    })

    bufferLayer.add(
        new Graphic({
            geometry: buffer,
            symbol: polySym
        })
    )

    // // Seleccionar árboles dentro del buffer
    // CLIENTE - EFECTO
    arcgisMap.view.whenLayerView(treesLayer).then((treeTypeLayerView) => {
        const query = treeTypeLayerView.createQuery();
        query.geometry = buffer;

        treeTypeLayerView.createQuery().then
      treeTypeLayerView.featureEffect = {
        filter: {
          geometry: buffer,
        },
        excludedEffect: "opacity(0.3) blur(5px)",
      };
    });

    // CLIENTE - QUERY
    // arcgisMap.view.whenLayerView(treesLayer).then((treeTypeLayerView) => {
    //     const query = treeTypeLayerView.createQuery();
    //     query.geometry = buffer;


    //     treeTypeLayerView.queryFeatures(query).then((featuresSet) => {

    //         const simbologiaPunto = new SimpleMarkerSymbol({
    //             angle: 0,
    //             color: [255, 255, 255, 0.25],
    //             outline: {
    //                 cap: 'round',
    //                 color: [0, 122, 194, 1],
    //                 join: 'round',
    //                 miterLimit: 1,
    //                 style: 'solid',
    //                 width: 1
    //             },
    //             size: 12,
    //             style: 'circle',
    //             xoffset: 0,
    //             yoffset: 0
    //         });

    //         const featuresSymbol = featuresSet.features.map((feature) => {
    //             feature.symbol = simbologiaPunto;
    //             return feature;
    //         });


    //         // añadir todos los gráficos
    //         capaGraficaGL.addMany(featuresSymbol);
    //     });
    // })



    // SERVIDOR - QUERY
    // const query = treesLayer.createQuery();
    // query.geometry = buffer;

    // treesLayer.queryFeatures(query).then((featuresSet) => {

    //     const simbologiaPunto = new SimpleMarkerSymbol({
    //         angle: 0,
    //         color: [255, 255, 255, 0.25],
    //         outline: {
    //             cap: 'round',
    //             color: [0, 122, 194, 1],
    //             join: 'round',
    //             miterLimit: 1,
    //             style: 'solid',
    //             width: 1
    //         },
    //         size: 12,
    //         style: 'circle',
    //         xoffset: 0,
    //         yoffset: 0
    //     });

    //     const featuresSymbol = featuresSet.features.map((feature) => {
    //         feature.symbol = simbologiaPunto;
    //         return feature;
    //     });


    //     // añadir todos los gráficos
    //     capaGraficaGL.addMany(featuresSymbol);
    // });
})