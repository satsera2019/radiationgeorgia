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
        street: 'Varketili-3 I Micro-District',
        radiation: '2',
        long: 44.872720,
        lat: 41.699500, 
    },
    {
        city: 'Tbilisi',
        street: '1 Ilia Chavchavadze Ave',
        radiation: '90.6',
        long: 44.77800845482623,
        lat: 41.71007928815785, 
    },
    {
        city: 'Tbilisi',
        street: 'Mziuri Park',
        radiation: '189.6',
        long: 44.7712165977353,
        lat: 41.71166444689598, 
        
    },
    {
        city: 'Tbilisi',
        street: 'Mrgvali Baghi',
        radiation: '80',
        long: 44.774939536213815,
        lat: 41.70735563539224, 
    },
    
    {
        city: 'Tbilisi',
        street: 'University Street',
        radiation: '65',
        long: 44.718061,
        lat: 41.717475, 
    },
    {
        city: 'Tbilisi',
        street: 'Petre Kavtaradze St 32',
        radiation: '132',
        long: 44.718959210449064,
        lat: 41.71984268573625, 
    },
    
    {
        city: 'Tbilisi',
        street: 'Sandro Euli Street',
        radiation: '60.6',
        long: 44.71689321866395,
        lat: 44.71689321866395, 
    },
    
    {
        city: 'Tbilisi',
        street: '34 Shalva Nutsubidze Street',
        radiation: '33.75',
        long: 44.72151619251394,
        lat: 41.72590096147128, 
    },
    
    {
        city: 'Tbilisi',
        street: '34 Vazha Pshavela Ave',
        radiation: '25',
        long: 44.74989292084527,
        lat: 41.72601327149425, 
    },
    
    {
        city: 'Tbilisi',
        street: '8 Aleksandre Kazbegi Ave',
        radiation: '45',
        long: 44.76510436623354,
        lat: 41.72606604836169, 
    },
    {
        city: 'Tbilisi',
        street: 'Mushthaid Garden',
        radiation: '75',
        long: 44.78651051616429,
        lat: 41.721181154364764, 
    },
    
    {
        city: 'Tbilisi',
        street: '52 Tsereteli Ave',
        radiation: '135',
        long: 44.78618927859276,
        lat: 41.73038599629105, 
    },
   
    {
        city: 'Tbilisi',
        street: 'Samtredia St 2',
        radiation: '60.6',
        long: 44.77438907841825,
        lat: 41.74295409621279, 
    },
   
    {
        city: 'Tbilisi',
        street: '32 Dighomi Massive III Quarter',
        radiation: '28.8',
        long: 44.77608229490563,
        lat: 41.75684381102219, 
    },
    
    {
        city: 'Tbilisi',
        street: '8 Dighomi Massive IV Quarter',
        radiation: '35',
        long: 44.772955645675026,
        lat: 41.762404944154206, 
    },
    
    {
        city: 'Tbilisi',
        street: 'Mose Gogiberidze St',
        radiation: '14.7',
        long: 44.774482690107156,
        lat: 41.765480312476036, 
    },
    {
        city: 'Tbilisi',
        street: '1 Omar Khizanishvili St',
        radiation: '120.7',
        long: 44.81869912110035,
        lat: 41.79317601769007, 
    },
    
    {
        city: 'Tbilisi',
        street: 'Tsageri St',
        radiation: '67.5',
        long: 44.82478206209968,
        lat: 41.79622405179718, 
    },
   
    {
        city: 'Tbilisi',
        street: 'Gldani V Micro-District',
        radiation: '52',
        long: 44.83048175289412,
        lat: 41.79955376619718, 
    },
    
    {
        city: 'Tbilisi',
        street: 'Omar Khizanishvili St',
        radiation: '30',
        long: 44.8322150367668,
        lat: 41.80399660960234, 
    },
    
    {
        city: 'Tbilisi',
        street: 'Gldani VI Micro-District',
        radiation: '82',
        long: 44.82583065276319,
        lat: 41.80440899189453, 
    },
    
    {
        city: 'Tbilisi',
        street: 'Gldani IV Micro-District',
        radiation: '12',
        long: 44.81974018553376,
        lat: 41.79937330782889, 
    },
    
    {
        city: 'Tbilisi',
        street: 'Viktor Kupradze St',
        radiation: '5',
        long: 44.872754758023746,
        lat: 41.69979954798147, 
    },
    
    {
        city: 'Tbilisi',
        street: '66 Javakheti St',
        radiation: '2',
        long: 44.869073528009224,
        lat: 41.69685223221426, 
    },
    {
        city: 'Tbilisi',
        street: 'Javakheti I Turn',
        radiation: '3',
        long: 44.8700212802142,
        lat: 41.694259083403544,
    },
    
    {
        city: 'Tbilisi',
        street: '20 Tskneti Hwy',
        radiation: '42.2',
        long: 44.731096843465366,
        lat: 41.71004585910329, 
    },
    
    {
        city: 'Tbilisi',
        street: '41 Tskneti Hwy',
        radiation: '11',
        long: 44.72789223619341,
        lat: 41.71074304776282, 
    },
    
    {
        city: 'Tbilisi',
        street: '17 Tskneti Hwy',
        radiation: '39.8',
        long: 44.73427181146992,
        lat: 41.709350621302626, 
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

