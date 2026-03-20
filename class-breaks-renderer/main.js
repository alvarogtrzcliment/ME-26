const FeatureLayer = await $arcgis.import('@arcgis/core/layers/FeatureLayer.js')
const ClassBreaksRenderer = await $arcgis.import(
  '@arcgis/core/renderers/ClassBreaksRenderer.js'
)

const arcgisMap = document.querySelector('arcgis-map')

const zonasSaludFL = new FeatureLayer({
  url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/arcgis/rest/services/ZONAS_BASICAS_SALUD_MADRID/FeatureServer',
  renderer: new ClassBreaksRenderer({
    field: 'F_POBLACION__Población',
    classBreakInfos: [
      {
        minValue: 0,
        maxValue: 10000,
        symbol: {
          type: 'simple-fill',
          color: 'red'
        }
      },
      {
        minValue: 10001,
        maxValue: 30000,
        symbol: {
          type: 'simple-fill',
          color: 'yellow'
        }
      },
      {
        minValue: 30001,
        maxValue: Infinity,
        symbol: {
          type: 'simple-fill',
          color: 'green'
        }
      }
    ]
  })
})

if (arcgisMap) {
  arcgisMap.addEventListener('arcgisViewReadyChange', () => {
    arcgisMap.map.add(zonasSaludFL)
  })
}
