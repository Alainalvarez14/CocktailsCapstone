var map;
var service;
var infowindow;

function initialize() {

    var pyrmont = new google.maps.LatLng(-33.8665433, 151.1956316);

    map = new google.maps.Map(document.getElementById('map'), {
        center: pyrmont,
        zoom: 15
    })

    var input = document.getElementById('searchTextField');

    let autocomplete = new google.maps.places.Autocomplete(input)

    autocomplete.bindTo('bounds', map)

    let marker = new google.maps.Marker({
        map: map
    })

    google.maps.event.addListener(autocomplete, 'place_changed', () => {
        let place = autocomplete.getPlace()

        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport)
        } else {
            map.setCenter(place.geometry.location)
            map.setZoom(17)
        }
        marker.setPosition(place.geometry.location)
        marker.setVisible(true)

        let request = {
            location: place.geometry.location,
            radius: '50000',
            type: ['liquor_store']
        }

        service = new google.maps.places.PlacesService(map)
        service.nearbySearch(request, callback)

    })

}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            createMarker(results[i]);
        }
    }
}


function createMarker(place) {
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function () {
        alert(place.name);
    });
}

google.maps.event.addDomListener(window, 'load', initialize)
