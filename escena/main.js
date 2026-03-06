const SceneLayer = await $arcgis.import('@arcgis/core/layers/SceneLayer.js')
const Camera = await $arcgis.import('@arcgis/core/Camera.js')

const arcgisScene = document.querySelector('arcgis-scene')

const capaEdificiosSL = new SceneLayer({
  // portalItem: {
  //   id: 'ca0470dbbddb4db28bad74ed39949e25'
  // }
  url: 'https://basemaps3d.arcgis.com/arcgis/rest/services/OpenStreetMap3D_Buildings_v1/SceneServer'
})

arcgisScene.addEventListener('arcgisViewReadyChange', () => {
  arcgisScene.map.add(capaEdificiosSL)
})

const boton1 = document.getElementById('boton1')
const boton2 = document.getElementById('boton2')
const boton3 = document.getElementById('boton3')

const camara1 = new Camera({
  heading: 90,
  tilt: 45,
  position: {
    latitude: 38,
    longitude: -122,
    z: 20000,
    spatialReference: { wkid: 3857 }
  }
})

const camara2 = new Camera({
  heading: 90,
  tilt: 70,
  position: {
    latitude: 4,
    longitude: -122,
    z: 20000,
    spatialReference: { wkid: 3857 }
  }
})

const camara3 = new Camera({
  heading: 90,
  tilt: 45,
  position: {
    latitude: 38,
    longitude: 40,
    z: 20000,
    spatialReference: { wkid: 3857 }
  }
})

boton1.addEventListener('click', () => {
  arcgisScene.view.goTo(camara1)
})

boton2.addEventListener('click', () => {
  arcgisScene.view.goTo(camara2)
})

boton3.addEventListener('click', () => {
  arcgisScene.view.goTo(camara3)
})
