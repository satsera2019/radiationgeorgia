<!DOCTYPE html>
<html>

<head>

    <title>Popup</title>

    {{-- ol7/css/ol.css --}}
    <link rel="stylesheet" href="{{ asset('assets/ol7/css/ol.css') }}" />
    {{-- ol7/js/ol.js --}}
    <script src="{{ asset('assets/ol7/js/ol.js') }}"></script>

    <style>
        html,
        body,
        .map {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
        }

        .ol-popup {
            position: absolute;
            background-color: white;
            -webkit-filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
            filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
            padding: 15px;
            border-radius: 10px;
            border: 1px solid #cccccc;
            bottom: 12px;
            left: -50px;
            min-width: 280px;
        }

        .ol-popup:after,
        .ol-popup:before {
            top: 100%;
            border: solid transparent;
            content: " ";
            height: 0;
            width: 0;
            position: absolute;
            pointer-events: none;
        }

        .ol-popup:after {
            border-top-color: white;
            border-width: 10px;
            left: 48px;
            margin-left: -10px;
        }

        .ol-popup:before {
            border-top-color: #cccccc;
            border-width: 11px;
            left: 48px;
            margin-left: -11px;
        }

        .ol-popup-closer {
            text-decoration: none;
            position: absolute;
            top: 2px;
            right: 8px;
        }

        .ol-popup-closer:after {
            content: "✖";
        }

        .ol-marker .ol-icon {
            cursor: pointer !important;
        }
    </style>

</head>

<body>
    <div id="map" class="map"></div>

    <div id="popup" class="ol-popup">
        <a href="#" id="popup-closer" class="ol-popup-closer"></a>
        <div id="popup-content"></div>
    </div>



    {{-- <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script> --}}
    {{-- ol.js --}}
    {{-- <script src="../assets/ol3/js/ol.js"></script> --}}



    <script>
        /**
         * Elements that make up the popup.
         */
        const container = document.getElementById('popup');
        const content = document.getElementById('popup-content');
        const closer = document.getElementById('popup-closer');

        /**
         * Create an overlay to anchor the popup to the map.
         */
        const overlay = new ol.Overlay({
            element: container,
            autoPan: {
                animation: {
                    duration: 250,
                },
            },
        });

        /**
         * Add a click handler to hide the popup.
         * @return {boolean} Don't follow the href.
         */
        closer.onclick = function() {
            overlay.setPosition(undefined);
            closer.blur();
            return false;
        };

        const Model = [{
                category: 'Capital city',
                title: 'London',
                long: 44.76488828241705,
                lat: 41.72839858048209,
                description: 'UK capital',
            },
            {
                category: 'Capital city',
                title: 'Rome',
                long: 44.7894181004358,
                lat: 41.706101338417945,
                description: 'Italy capital',
            },
        ];


        // center location
        let lat = 41.7415928;
        let lng = 44.7977544;
        // Create latitude and longitude and convert them to default projection
        let tbilisi = ol.proj.transform([lng, lat], 'EPSG:4326', 'EPSG:3857');

        /**
         * Create the map.
         */
        const map = new ol.Map({
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM(),
                }),
            ],
            overlays: [overlay],
            target: 'map',
            view: new ol.View({
                center: ol.proj.fromLonLat([lng, lat]),
                zoom: 11,
                minZoom: 11,
            }),
        });

        const features = [];
        for (key in Model) {
            const _Data = Model[key];
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

        map.addLayer(markers);

        map.on('click', function(evt) {
            const feature = map.forEachFeatureAtPixel(evt.pixel, function(feature) {
                return feature;
            });
            if (feature) {
                const coordinates = feature.getGeometry().getCoordinates();
                content.innerHTML =
                    '<p>Category:</p><code>' + feature.get('category') + '</code><br>' +
                    '<p>Title:</p><code>' + feature.get('title') + '</code><br>' +
                    '<p>Description:</p><code>' + feature.get('description') + '</code>'
                overlay.setPosition(coordinates);
            }
        });












        // bounce after reload
        // doBounce(tbilisi);

        // function doBounce(location) {
        //     // bounce by zooming out one level and back in
        //     var bounce = ol.animation.bounce({
        //         resolution: map.getView().getResolution() * 2
        //     });
        //     // start the pan at the current center of the map
        //     var pan = ol.animation.pan({
        //         source: map.getView().getCenter()
        //     });
        //     map.beforeRender(bounce);
        //     map.beforeRender(pan);
        //     // when we set the center to the new location, the animated move will
        //     // trigger the bounce and pan effects
        //     map.getView().setCenter(location);
        // }



















        /* marker cursor pointer start */
        map.on('pointermove', evt => {
            if (!evt.dragging) {
                map.getTargetElement().style.cursor = map.hasFeatureAtPixel(map.getEventPixel(evt
                    .originalEvent)) ? 'pointer' : '';
            }
        });
        /* marker cursor pointer end */
    </script>
</body>

</html>
