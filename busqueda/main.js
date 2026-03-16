const FeatureLayer = await $arcgis.import("@arcgis/core/layers/FeatureLayer.js");
const arcgisMap = document.querySelector('arcgis-map')
const searchComponent = document.querySelector('arcgis-search')

const hospitalesFL = new FeatureLayer({
  url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/Hospitales/FeatureServer/0'
})

arcgisMap.addEventListener('arcgisViewReadyChange', () => {
    arcgisMap.map.add(hospitalesFL)
})

searchComponent.addEventListener('arcgisReady', () => {
    searchComponent.sources = [
        {
            layer: hospitalesFL,
            searchFields: ['Nombre', 'Municipio'],
            displayField: 'Nombre',
            placeholder: 'Nuestra capa',
        }
    ]
})