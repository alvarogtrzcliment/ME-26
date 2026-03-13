const basemapGallery = document.querySelector("arcgis-basemap-gallery");

const LocalBasemapsSource = await $arcgis.import("@arcgis/core/widgets/BasemapGallery/support/LocalBasemapsSource.js");
const Basemap = await $arcgis.import("@arcgis/core/Basemap.js");

basemapGallery.source = new LocalBasemapsSource({
    basemaps: [Basemap.fromId("topo-vector"), Basemap.fromId("hybrid"), Basemap.fromId("streets")],
});