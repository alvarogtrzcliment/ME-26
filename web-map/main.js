const arcgisMap = document.querySelector('arcgis-map')

arcgisMap.addEventListener('arcgisViewReadyChange', () => {
  console.log('Objeto AllLayers', arcgisMap.map.allLayers)
  console.log('Objeto Layers', arcgisMap.map.layers)
})
