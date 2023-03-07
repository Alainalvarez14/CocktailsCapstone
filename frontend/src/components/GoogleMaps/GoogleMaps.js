import useExternalScripts from "../../hooks/useExternalScripts";

const GoogleMaps = () => {

    useExternalScripts("https://maps.googleapis.com/maps/api/js?key=AIzaSyDu4DzSFnpfHDj2o7pQjKb2ZAnjxuloFHE&libraries=places");

    let map;
    let service;
    // let infowindow;

    function initMap() {

        let london = new google.maps.LatLng(51.5072, 0.1276);

        map = new google.maps.Map(document.getElementById('map'), {
            center: london,
            zoom: 12
        })

        let userInput = document.getElementById('searchField');

        let autocomplete = new google.maps.places.Autocomplete(userInput);

        autocomplete.bindTo('bounds', map);

        const marker = new google.maps.Marker({
            map: map
        })

        google.maps.event.addListener(autocomplete, 'place_changed', () => {
            let place = autocomplete.getPlace();

            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport)
            } else {
                map.setCenter(place.geometry.location)
                map.setZoom(15)
            }
            marker.setPosition(place.geometry.location)
            marker.setVisible(true)

            let request = {
                location: place.geometry.location,
                radius: '5000',
                type: ['liquor_store']
            }

            service = new google.maps.places.PlacesService(map)
            service.nearbySearch(request, callback)

        })

    }

    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (let i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
        }
    }

    function createMarker(place) {
        const marker = new google.maps.Marker({
            map,
            position: place.geometry.location
        });
        google.maps.event.addListener(marker, 'click', () => {
            alert(place.name + "\n" + place.vicinity + "\n" + "Store is " + (place.opening_hours.open_now ? "open" : "closed"));
            // infowindow.setContent(place.name || "");
            // infowindow.open(map);
        });
    }

    google.maps.event.addDomListener(window, 'load', initMap)

    return (
        <div>
            <h6 style={{ marginTop: '10px', color: '#0D6EFD', fontWeight: '320' }} >Search for liquor stores near you!</h6>
            <input id="searchField" type="text" style={{ width: '100%' }} />
            <div id="map"></div>
        </div>
    );
}

export default GoogleMaps;
