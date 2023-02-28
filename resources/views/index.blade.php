<!doctype html>
<html>

<head>
    <title>Hello OpenStreetMap</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <link rel="stylesheet" href="../assets/ol3/css/ol.css" type="text/css" />
    <link rel="stylesheet" href="../assets/css/samples.css" type="text/css" />

</head>

<body>
    <div id="map" class="full-map"></div>
    <script src="../assets/ol3/js/ol.js"></script>
    <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>

    {{-- <script>
        // center location
        let lat = 41.7415928;
        let lng = 44.7977544;

        // the source of our photos is a KML file
        var flickrSource = new ol.source.KML({
            url: '../assets/data/flickr_data.kml',
            projection: 'EPSG:3857',
            extractStyles: false
        });

        // use a style function to replace the styles in the KML file
        // this is a placeholder for now
        function flickrStyle(feature) {
            var style = new ol.style.Style({
                image: new ol.style.Circle({
                    // url: "../assets/img/dog.png",
                    radius: 16,
                    stroke: new ol.style.Stroke({
                        color: 'white',
                        width: 2
                    }),
                    fill: new ol.style.Fill({
                        color: 'green'
                    })
                })
            });
            return [style];
        }

        var flickrLayer = new ol.layer.Vector({
            source: flickrSource,
            style: flickrStyle
        });

        var layer = new ol.layer.Tile({
            source: new ol.source.OSM()
        });

        // Create latitude and longitude and convert them to default projection
        var tbilisi = ol.proj.transform([lng, lat], 'EPSG:4326', 'EPSG:3857');

        var view = new ol.View({
            center: tbilisi,
            zoom: 2
        });

        var map = new ol.Map({
            target: 'map',
            layers: [layer, flickrLayer],
            view: view
        });
    </script> --}}

    <script>
        let lat = 41.7415928;
        let lng = 44.7977544;

        var tbilisi = ol.proj.transform([lng, lat], 'EPSG:4326', 'EPSG:3857');
        var view = new ol.View({
            center: tbilisi,
            zoom: 12
        });

        var vectorSource = new ol.source.Vector({});
        var places = [
            [44.76488828241705, 41.72839858048209, 'http://maps.google.com/mapfiles/ms/micons/blue.png'],
            [44.7894181004358, 41.706101338417945, 'http://maps.google.com/mapfiles/ms/micons/blue.png'],
        ];

        var features = [];
        for (var i = 0; i < places.length; i++) {
            var iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.transform([places[i][0], places[i][1]], 'EPSG:4326',
                    'EPSG:3857')),
            });

            var iconStyle = new ol.style.Style({
                image: new ol.style.Icon({
                    src: places[i][2],
                    // color: places[i][3],
                    crossOrigin: 'anonymous',
                    color: 'green'
                })
            });
            iconFeature.setStyle(iconStyle);
            vectorSource.addFeature(iconFeature);
        }

        var vectorLayer = new ol.layer.Vector({
            source: vectorSource,
            updateWhileAnimating: true,
            updateWhileInteracting: true
        });

        var map = new ol.Map({
            target: 'map',
            view: view,
            layers: [
                new ol.layer.Tile({
                    preload: 3,
                    source: new ol.source.OSM(),
                }),
                vectorLayer,
            ],
            loadTilesWhileAnimating: true,
        });

        // bounce after reload
        doBounce(tbilisi);

        function doBounce(location) {
            // bounce by zooming out one level and back in
            var bounce = ol.animation.bounce({
                resolution: map.getView().getResolution() * 2
            });
            // start the pan at the current center of the map
            var pan = ol.animation.pan({
                source: map.getView().getCenter()
            });
            map.beforeRender(bounce);
            map.beforeRender(pan);
            // when we set the center to the new location, the animated move will
            // trigger the bounce and pan effects
            map.getView().setCenter(location);
        }
    </script>


</body>

</html>
