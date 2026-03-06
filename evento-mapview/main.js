// Imports

const { watch } = await $arcgis.import('@arcgis/core/core/reactiveUtils.js')

const arcgisMap = document.querySelector('arcgis-map')

// Así ponemos un evento directamente en un map component!!

arcgisMap.addEventListener('arcgisViewReadyChange', () => {
  arcgisMap.view.on('click', (eventoClick) => {
    console.log(eventoClick.mapPoint)
  })

  watch(
    () => arcgisMap.view.zoom,
    (zoom) => {
      console.log(zoom)
      if (zoom > 16) {
        arcgisMap.map.basemap = 'topo-vector'
      } else {
        arcgisMap.map.basemap = 'dark-gray'
      }
    }
  )
})

// Podemos poner eventos de muchas maneras

// arcgisMap.addEventListener('arcgisViewClick', (eventoClick) => {
//   console.log(eventoClick)
// })
