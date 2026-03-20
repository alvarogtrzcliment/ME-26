const FeatureLayer = await $arcgis.import('@arcgis/core/layers/FeatureLayer.js')
const SimpleRenderer = await $arcgis.import(
  '@arcgis/core/renderers/SimpleRenderer.js'
)
const SimpleMarkerSymbol = await $arcgis.import(
  '@arcgis/core/symbols/SimpleMarkerSymbol.js'
)

const arcgisMap = document.querySelector('arcgis-map')

// Símbolo compatible con puntos y mapas en 2D

const simbologiaHospitales = new SimpleMarkerSymbol({
  angle: 0,
  color: [51, 252, 255, 1],
  outline: {
    cap: 'round',
    color: [0, 162, 194, 1],
    join: 'round',
    miterLimit: 1,
    style: 'solid',
    width: 1
  },
  path: 'undefined',
  size: 10,
  style: 'circle',
  xoffset: 0,
  yoffset: 0
})

const capaHospitales = new FeatureLayer({
  url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/Hospitales/FeatureServer/0',
  renderer: new SimpleRenderer({
    symbol: simbologiaHospitales
  })
})

if (arcgisMap) {
  arcgisMap.addEventListener('arcgisViewReadyChange', () => {
    arcgisMap.map.add(capaHospitales)
  })
}
