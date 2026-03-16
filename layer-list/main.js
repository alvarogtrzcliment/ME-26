const arcgisScene = document.querySelector("arcgis-scene")

arcgisScene.addEventListener("arcgisViewReadyChange", () => {
    // console.log(arcgisScene.view)  
    const div = document.createElement('calcite-list')
    div.id = "layer-list-custom"

    // Acceder a la escena > Accedemos al mapa > A los elementos > Recorremos con un bucle (forEach) para sacar nombre capas
    arcgisScene.map.allLayers.items.forEach(layer => {
        // console.log(layer.title)
        const p = document.createElement('calcite-list-item')
        p.label = layer.title
        div.appendChild(p)

    });
    document.body.appendChild(div)
})
