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
        city: 'Tbilisi',
        street: 'Javakheti I Turn',
        radiation: '3',
        long: 44.8700212802142,
        lat: 41.694259083403544,
    },
    {
        city: 'Tbilisi',
        street: 'Varketili-3 I Micro-District',
        radiation: '2',
        long: 44.872720,
        lat: 41.699500, 
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
        zoom: defaultZoom
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
        city: _Data.city,
        street: _Data.street,
        radiation: _Data.radiation,
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
            src: '../assets/img/marker.png',
            // size: [10, 10],
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
            '<div class="row"><p class="col">City:</p><code class="col">' + feature.get('city') + '</code><div>' +
            '<div class="row"><p class="col">Street:</p><code class="col">' + feature.get('street') + '</code><div>' +
            '<div class="row"><p class="col">Radiation:</p><code class="col">' + feature.get('radiation') + '</code><div>'
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
