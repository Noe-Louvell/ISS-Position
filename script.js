let ville = [];

$.ajax({
    url: "https://restcountries.eu/rest/v2/all"
}).done(function(data) {
    ville = data;
    listCapital();


});



function listCapital() {
    for (a in ville) {
        let capitaleMondiale = new Object();
        capitaleMondiale.id = ("id", a);
        capitaleMondiale.localisation = (ville[a].latlng);



        if (capitaleMondiale.localisation[0] < 80 && capitaleMondiale.localisation[0] > -80){
            var lat = capitaleMondiale.localisation[0] ;
            console.log(lat);
        }
        if (capitaleMondiale.localisation[1] < 180 && capitaleMondiale.localisation[1] > -180){
            var lon = capitaleMondiale.localisation[1];
        }
        let alt = '';
        let n = 1;


        //prevision passage
        function passIss (){
            $.getJSON('http://api.open-notify.org/iss-pass.json?lat='+lat+'&lon='+lon+'&alt='+alt+'&n='+n+'&callback=?', function(data) {
                data['response'].forEach(function (d) {
                    var date = new Date(d['risetime'] * 1000);

                    let prevTable = $("#prev-list");
                    for (a in ville){

                        let tr = $("<tr></tr>").attr("id", a);

                        let city = $("<td></td>").text(ville[a].capital);

                        //let prevList = $("<ul></ul>").text("Prévision :");

                        let prev=$('<li>' + date.toString() + '</li>');


                        tr.append(city);
                        tr.append(prev);
                        //prev.append(prevList)
                        prevTable.append(tr);
                    }
                })
            })
        }



        //position iss
       function moveISS () {
            $.getJSON('http://api.open-notify.org/iss-now.json?callback=?', function (data) {
                var lat = data['iss_position']['latitude'];
                var lon = data['iss_position']['longitude'];

                var map = L.map('map').setView([lat, lon], 5);

                L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    maxZoom: 18,
                    id: 'mapbox/streets-v11',
                    tileSize: 512,
                    zoomOffset: -1,
                    accessToken: 'pk.eyJ1IjoiZmV5em9yIiwiYSI6ImNrN2V4MTBnZDBhMWozaHB0dTY4YWU5a2MifQ.iCcQd3dHiDcBpnUJLdZA3g'
                }).addTo(map);
                // The update to the map is done here:


                var marker = L.marker([lat, lon]).addTo(map)

            });
        }

        moveISS();
        passIss();

}}




