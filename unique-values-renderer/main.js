const FeatureLayer = await $arcgis.import('@arcgis/core/layers/FeatureLayer.js')

const arcgisMap = document.querySelector('arcgis-map')

const capaHospitalesFL = new FeatureLayer({
  url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/Hospitales/FeatureServer/0',
  renderer: {
    type: 'unique-value',
    field: 'Dependencia_Funcional',
    uniqueValueInfos: [
      {
        label: 'Privados',
        symbol: {
          type: 'simple-marker',
          color: 'red'
        },
        value: 'Privados'
      },
      {
        label: 'Servicios e Institutos de Salud de Las Comunidades Autónomas',
        symbol: {
          type: 'simple-marker',
          color: 'blue'
        },
        value: 'Servicios e Institutos de Salud de Las Comunidades Autónomas'
      }
    ],
    defaultSymbol: {
      type: 'simple-marker',
      color: 'green'
    }
  }
})

if (arcgisMap) {
  arcgisMap.addEventListener('arcgisViewReadyChange', () => {
    arcgisMap.map.add(capaHospitalesFL)
  })
}
