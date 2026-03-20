const ImageryTileLayer = await $arcgis.import(
  '@arcgis/core/layers/ImageryTileLayer.js'
)
const FlowRenderer = await $arcgis.import(
  '@arcgis/core/renderers/FlowRenderer.js'
)

const arcgisMap = document.querySelector('arcgis-map')

const flowRenderer = new FlowRenderer({
  density: 1,
  color: [50, 120, 240],
  flowSpeed: 10,
  trailWidth: '2px',
  visualVariables: [
    {
      type: 'color',
      field: 'Magnitude',
      stops: [
        { value: 0, color: 'darkblue' },
        { value: 6, color: 'orange' },
        { value: 25, color: 'red' }
      ]
    }
  ]
})

const campoVectorialITL = new ImageryTileLayer({
  url: 'https://tiledimageservices.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/NLDAS_Hourly_8_30_2021/ImageServer',
  renderer: flowRenderer,
  effect: 'bloom(1.5, 0.5px, 0)'
})

if (arcgisMap) {
  arcgisMap.addEventListener('arcgisViewReadyChange', () => {
    arcgisMap.map.add(campoVectorialITL)
  })
}
