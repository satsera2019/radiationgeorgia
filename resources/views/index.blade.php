<!DOCTYPE html>
<!--
 @license
 Copyright 2019 Google LLC. All Rights Reserved.
 SPDX-License-Identifier: Apache-2.0
-->
<html>

<head>
    <title>Default Data Layer: Earthquakes</title>
    <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
    <script>
        /**
         * @license
         * Copyright 2019 Google LLC. All Rights Reserved.
         * SPDX-License-Identifier: Apache-2.0
         */
        let map;

        function initMap() {
            map = new google.maps.Map(document.getElementById("map"), {
                center: {
                    lat: 41.7415928,
                    lng: 44.7977544
                },
                zoom: 12,
            });

            infoWindow = new google.maps.InfoWindow({
                content: ""
            });

            // Get the earthquake data (JSONP format)
            // This feed is a copy from the USGS feed, you can find the originals here:
            //   http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
            const script = document.createElement("script");

            script.setAttribute(
                "src",
                "https://storage.googleapis.com/mapsdevsite/json/quakes.geo.json"
            );
            document.getElementsByTagName("head")[0].appendChild(script);
        }

        // Defines the callback function referenced in the jsonp file.
        function eqfeed_callback(results) {

            for (let i = 0; i < results.features.length; i++) {
                const coords = results.features[i].geometry.coordinates;

                const latLng = new google.maps.LatLng(coords[1], coords[0]);
                const marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                });

                const f = results.features[i].properties;

                marker.addListener("click", (e) => {
                    const d = new Date(0);
                    d.setUTCMilliseconds(f.time);

                    const contentString =
                        '<div class="info-window-content">' +
                        '<h2>' + f.place + '</h2>' +
                        '<h3>Magnitude ' + f.mag + '</h3><p>' + d.toString() + '</p>' +
                        '<a href="' + f.url + '" target="new">View on USGS</a>' +
                        '</div>';

                    infoWindow.setContent(contentString);
                    infoWindow.open({
                        anchor: marker,
                        map,
                        shouldFocus: false,
                    });

                });
            }
        }

        window.initMap = initMap;
        window.eqfeed_callback = eqfeed_callback;
    </script>
    <style>
        /**
       * @license
       * Copyright 2019 Google LLC. All Rights Reserved.
       * SPDX-License-Identifier: Apache-2.0
       */
        /* 
       * Always set the map height explicitly to define the size of the div element
       * that contains the map. 
       */
        #map {
            height: 100%;
        }

        /** 
       * Optional: Makes the sample page fill the window. 
       */
        html,
        body {
            height: 100%;
            margin: 0;
            padding: 0;
        }

        h2 {
            margin-top: 0;
        }

        .info-window-content {
            padding: 8px;
        }
    </style>
</head>

<body>
    <div id="map"></div>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBzIVZ456ZBUbWkwWjCpL9tvi_9la-Qmi0&callback=initMap&v=weekly" defer></script>
</body>

</html>