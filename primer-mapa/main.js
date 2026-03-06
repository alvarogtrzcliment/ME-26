// Imports

const FeatureLayer = await $arcgis.import('@arcgis/core/layers/FeatureLayer.js')

// const hospitalesFL = new FeatureLayer({
//   url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/Hospitales/FeatureServer/0'
// })

const hospitalesFL = new FeatureLayer({
  portalItem: {
    id: '68745a7fb7a348b6b0d722c8517790af'
  }
})

const arcgisMap = document.querySelector('arcgis-map')

arcgisMap.addEventListener('arcgisViewReadyChange', () => {
  arcgisMap.map.add(hospitalesFL)
})
