let lat = 48.8534;
let lon = 2.3488;
let alt = '';
let n = 3;




//prevision passage
$.getJSON('http://api.open-notify.org/iss-pass.json?lat='+lat+'&lon='+lon+'&alt='+alt+'&n='+n+'&callback=?', function(data) {
    data['response'].forEach(function (d) {
        var date = new Date(d['risetime']*1000);
        $('#isspass').append('<li>' + date.toString() + '</li>');
    });
    console.log(data)
});


//position iss
$.getJSON('http://api.open-notify.org/iss-now.json?callback=?', function(data) {
    var lat = data['iss_position']['latitude'];
    var lon = data['iss_position']['longitude'];

    var map = L.map('map').setView([lat,lon], 5);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 20,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiZmV5em9yIiwiYSI6ImNrN2V4MTBnZDBhMWozaHB0dTY4YWU5a2MifQ.iCcQd3dHiDcBpnUJLdZA3g'
    }).addTo(map);
    // The update to the map is done here:


    var marker = L.marker([lat,lon]).addTo(map);
    map.panTo([lat, lon], animate=true);
});
