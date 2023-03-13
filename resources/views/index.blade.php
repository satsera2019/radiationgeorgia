<!DOCTYPE html>
<html>

<head>
    <title>Popup</title>
    <link rel="stylesheet" href="{{ asset('assets/ol7/css/ol.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/css/index.css') }}" />
    <script src="{{ asset('assets/ol7/js/ol.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('assets/css/bootstrap.min.css') }}" />
</head>

<body>
    <div id="map" class="map"></div>

    <div id="popup" class="ol-popup">
        <a href="#" id="popup-closer" class="ol-popup-closer"></a>
        <div id="popup-content"></div>
    </div>

    <script src="{{ asset('assets/js/index.js') }}"></script>
</body>

</html>
