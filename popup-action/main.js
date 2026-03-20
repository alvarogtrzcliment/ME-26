const FeatureLayer = await $arcgis.import('@arcgis/core/layers/FeatureLayer.js')

const arcgisMap = document.querySelector('arcgis-map')
const arcgisPopup = document.querySelector('arcgis-popup')

const capaHospitales = new FeatureLayer({
  url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/arcgis/rest/services/Hospitales/FeatureServer',
  popupTemplate: {
    title: '{Nombre}',
    actions: [
      {
        id: 'rotate',
        icon: 'rotate',
        title: 'Rotar'
      },
      {
        id: 'zoom-out',
        icon: 'magnifying-glass-minus',
        title: 'Zoom Out'
      }
    ],
    content: [
      {
        type: 'fields',
        fieldInfos: [
          {
            fieldName: 'Direccion',
            label: 'Dirección'
          },
          {
            fieldName: 'Telefono',
            label: 'Teléfono'
          },
          {
            fieldName: 'NCAMAS',
            label: 'Número de camas'
          }
        ]
      }
    ]
  }
})

if (arcgisMap) {
  arcgisMap.addEventListener('arcgisViewReadyChange', () => {
    arcgisMap.map?.add(capaHospitales)
  })
}

if (arcgisPopup) {
  arcgisPopup.addEventListener('arcgisTriggerAction', (eventoTriggerAction) => {
    if (eventoTriggerAction.detail.action.id === 'rotate') {
      arcgisMap.view.rotation = arcgisMap.view.rotation + 15
    }

    if (eventoTriggerAction.detail.action.id === 'zoom-out') {
      arcgisMap.view.goTo({
        target: arcgisMap.view.center,
        zoom: arcgisMap.view.zoom - 1
      })
    }
  })
}
