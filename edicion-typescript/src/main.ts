import './style.css'

import '@arcgis/map-components/components/arcgis-map'
import '@arcgis/map-components/components/arcgis-editor'
import '@arcgis/map-components/components/arcgis-feature-table'

import FeatureLayer from '@arcgis/core/layers/FeatureLayer'

const arcgisMap = document.querySelector('arcgis-map')
const arcgisFeatureTable = document.querySelector('arcgis-feature-table')

const capaEditable = new FeatureLayer({
  url: 'https://services1.arcgis.com/MPSkeshhtFz9vjCL/arcgis/rest/services/Capa_de_Edicion_Master_Experto/FeatureServer'
})

if (arcgisMap && arcgisFeatureTable) {
  arcgisMap.addEventListener('arcgisViewReadyChange', () => {
    arcgisMap.map?.add(capaEditable)
    arcgisFeatureTable.layer = capaEditable
  })
}
