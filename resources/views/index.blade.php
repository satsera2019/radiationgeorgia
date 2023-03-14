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

    <button type="button" class="btn bg-transparent btn-inform p-0" 
            data-bs-toggle="offcanvas" aria-controls="offcanvasExample" 
            data-bs-target="#offcanvasExample">
        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" 
                fill="currentColor" 
                class="bi bi-info-circle text-white" 
                viewBox="0 0 16 16"
                style="vertical-align: top;">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
        </svg>
    </button>

    <div class="offcanvas offcanvas-start" tabindex="-1" 
            id="offcanvasExample" 
            aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasExampleLabel">About</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <div>
                about text
            </div>
        </div>
    </div>

    <script src="{{ asset('assets/js/index.js') }}"></script>
    <script src="{{ asset('assets/js/bootstrap.min.js') }}"></script>
</body>

</html>