/**
    * Elements that make up the popup.
    */
const popup_container = document.getElementById('popup');
const popup_content = document.getElementById('popup-content');
const popup_closer = document.getElementById('popup-closer');

// center location
const lat = 41.7415928;
const lng = 44.7977544;

// default zoom ( after refresh )
const defaultZoom = 11;
// view zoom params ( map zoom )
const maxZoomView = 20;
const minZoomView = 11;
// Source zoom params ( layer zoom )
const maxZoomSource = 11;
const minZoomSource = 18;

// Create latitude and longitude and convert them to default projection
const tbilisi = ol.proj.transform([lng, lat], 'EPSG:4326', 'EPSG:3857');

/**
 * set array of markers location data
 */
const Models = [
    {
        category: 'Radiation',
        title: 'Tbilisi',
        long: 44.76488828241705,
        lat: 41.72839858048209,
        description: 'radiation 1',
    },
    {
        category: 'Capital city',
        title: 'Tbilisi',
        long: 44.7894181004358,
        lat: 41.706101338417945,
        description: 'radiation 2',
    },
];

/**
 * Create an overlay to anchor the popup to the map.
 */
const overlay = new ol.Overlay({
    element: popup_container,
    autoPan: {
        animation: {
            duration: 250,
        },
    },
});

/**
 * Create the map.
 */
const map = new ol.Map({
    layers: [
        new ol.layer.Tile({
            // street view
            // source: new ol.source.OSM(),

            // satellite view
            source: new ol.source.XYZ({
                attributions: ['Powered by Esri',
                    'Source: Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community'],
                attributionsCollapsible: false,
                url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                zoom: defaultZoom,
                minZoom: maxZoomSource,
                maxZoom: minZoomSource,
            })
        }),
    ],
    overlays: [overlay],
    target: 'map',
    view: new ol.View({
        center: ol.proj.fromLonLat([lng, lat]),
        zoom: defaultZoom,
        minZoom: minZoomView,
        maxZoom: maxZoomView,
    }),
});

/**
 * extent map ( map x,y limits )
 */
map.setView(
    new ol.View({
        center: ol.proj.fromLonLat([lng, lat]),
        extent: map.getView().calculateExtent(map.getSize()),
        zoom: 12
    })
);

/**
 * prepeare markers array
 */
const features = [];
for (key in Models) {
    const _Data = Models[key];
    const feature = new ol.Feature({
        geometry: new ol.geom.Point(
            ol.proj.fromLonLat([parseFloat(_Data.long), parseFloat(_Data.lat)])
        ),
        category: _Data.category,
        title: _Data.title,
        description: _Data.description,
    });
    features.push(feature);
}

/**
 * set markers
 */
const markers = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: features,
    }),
    style: new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 1],
            src: 'https://ucarecdn.com/4b516de9-d43d-4b75-9f0f-ab0916bd85eb/marker.png',
        }),
        cursor: 'pointer',
    }),
});

/**
 * add markers layer
 */
map.addLayer(markers);

/**
 * modal show on klick markers
 */
map.on('click', function (evt) {
    const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
        return feature;
    });
    if (feature) {
        const coordinates = feature.getGeometry().getCoordinates();
        popup_content.innerHTML =
            '<p>Category:</p><code>' + feature.get('category') + '</code><br>' +
            '<p>Title:</p><code>' + feature.get('title') + '</code><br>' +
            '<p>Description:</p><code>' + feature.get('description') + '</code>'
        overlay.setPosition(coordinates);
    }
});

/**
 * marker cursor pointer
 */
map.on('pointermove', evt => {
    if (!evt.dragging) {
        map.getTargetElement().style.cursor = map.hasFeatureAtPixel(map.getEventPixel(evt
            .originalEvent)) ? 'pointer' : '';
    }
});

/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
    */
popup_closer.onclick = function () {
    overlay.setPosition(undefined);
    popup_closer.blur();
    return false;
};
