<!DOCTYPE html>
<html>

<head>
    <title>Popup</title>
    <link rel="stylesheet" href="{{ asset('assets/ol7/css/ol.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/css/index.css') }}" />
    <script src="{{ asset('assets/ol7/js/ol.js') }}"></script>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
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
