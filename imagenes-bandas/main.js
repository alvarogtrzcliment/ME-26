const ImageryTileLayer = await $arcgis.import(
  '@arcgis/core/layers/ImageryTileLayer.js'
)

const arcgisMap = document.querySelector('arcgis-map')

const incendioITL = new ImageryTileLayer({
  url: 'https://tiledimageservices1.arcgis.com/MPSkeshhtFz9vjCL/arcgis/rest/services/Imagen_Incendio_Canarias___Sentinel_2/ImageServer',
  effect: 'brightness(5) contrast(200%)',
  bandIds: [11, 10, 1],
  blendMode: 'multiply'
})

if (arcgisMap) {
  arcgisMap.addEventListener('arcgisViewReadyChange', () => {
    arcgisMap.map.add(incendioITL)
  })
}
