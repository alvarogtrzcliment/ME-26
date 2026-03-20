const FeatureLayer = await $arcgis.import('@arcgis/core/layers/FeatureLayer.js')

const arcgisMap = document.querySelector('arcgis-map')

const renderizadorSimple = {
  type: 'simple',
  symbol: {
    type: 'simple-marker',
    path: 'M14.5,29 23.5,0 14.5,9 5.5,0z',
    color: 'black'
  },
  visualVariables: [
    {
      type: 'color',
      field: 'TEMP',
      stops: [
        { value: 10, color: '#4951e6' },
        { value: 32, color: '#e8e8f7' },
        { value: 60, color: '#f74c3c' }
      ]
    },
    {
      type: 'size',
      field: 'WIND_SPEED',
      minDataValue: 0,
      maxDataValue: 40,
      minSize: 8,
      maxSize: 40
    },
    {
      type: 'rotation',
      field: 'WIND_DIRECT',
      rotationType: 'geographic'
    }
  ]
}

const estacionesMeteorologicasFL = new FeatureLayer({
  url: 'https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/weather_stations_010417/FeatureServer/0',
  renderer: renderizadorSimple
})

if (arcgisMap) {
  arcgisMap.addEventListener('arcgisViewReadyChange', () => {
    arcgisMap.map.add(estacionesMeteorologicasFL)
  })
}
