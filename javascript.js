document.getElementById("defaultOpen").click(); 

function openPage(pageName, elmnt, color) {
    // Hide all elements with class="tabcontent" by default */
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Remove the background color of all tablinks/buttons
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
    }
  
    // Show the specific tab content
    document.getElementById(pageName).style.display = "block";
  
    // Add the specific color to the button used to open the tab content
    elmnt.style.backgroundColor = color;
  }
    

function get_simbrief_data() {

    //getting user ID
    var userid = document.getElementById("user_id").value;

    if (isNaN(userid)) {
        alert("Your Simbrief ID is not valid! Try again.")
    } else {

        //fetch function for simbrief
        fetch('https://www.simbrief.com/api/xml.fetcher.php?userid=' + userid + '&json=1').then(
            function (u) {
                return u.json();
            }
        ).then(

            //calling and passing json to another function data_function
            function (json) {
                data_function(json);
            })

        //fetch function for airportio
        fetch('https://airportdb.io/api/v1/airport/' + icao + '?apiToken=c69cb3ec009e40fe7283bcd8f0404f985e2d39e86a039cd8a48fd0b645de4e22bcabcc8454e66a58846d858aa2862001').then(
            function (u) { return u.json(); }
        ).then(

            //calling and passing json to another function data_function
            function (json) {
                data_function_2(json);
            })

        var icao;

        now = new Date();
        datetime = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
        document.getElementById("received_message").innerHTML = "Data received at " + datetime + " lcl!" ;
        //alert(datetime);
}

	//writing Data in HTML
	 function data_function(data){
		fuel = data.fuel.plan_ramp;
     
		dep_metar = data.weather.orig_metar;
		arr_metar = data.weather.dest_metar;

        plan_rwy = data.origin.plan_rwy;
        tow = data.weights.est_tow;
        elevation = data.origin.elevation;
        icao = data.origin.icao_code;

        pdf_main_link = data.files.directory;
        pdf_user_link = data.files.pdf.link;
     
        pdf_link = pdf_main_link + pdf_user_link;

        map_main_link = data.images.directory;
        map_user_link = data.images.map[0].link;
                
        map_link = map_main_link + map_user_link;

        fnum = data.general.flight_number;
        dep = data.origin.icao_code;
        arr = data.destination.icao_code;
        ftime_sec = data.times.est_time_enroute;

        var hr = Math.floor(ftime_sec / 3600);
        var min = Math.floor(ftime_sec % 3600 / 60);

        av_wind_comp = data.general.avg_wind_comp;

        route = data.general.route;
        
        document.getElementById("fnum").innerHTML = fnum;
        document.getElementById("dep").innerHTML = dep;
        document.getElementById("arr").innerHTML = arr;
        document.getElementById("ftime").innerHTML = hr + " : " + min + " h";
        document.getElementById("av_wind").innerHTML = av_wind_comp + " knt";
        document.getElementById("route").innerHTML = route;
                
		document.getElementById("BlockFuel").placeholder = fuel + " kg";

		document.getElementById("metar_1").innerHTML = dep_metar;
        document.getElementById("metar_2").innerHTML = dep_metar;
        document.getElementById("metar_3").innerHTML = dep_metar;
		document.getElementById("arr_metar_1").innerHTML = arr_metar;
        document.getElementById("arr_metar_2").innerHTML = arr_metar;

        document.getElementById("plan_rwy").innerHTML = plan_rwy;
        document.getElementById("tow").innerHTML = tow  + " kg";
        document.getElementById("elevation").innerHTML = elevation + " ft";
        document.getElementById("icao").innerHTML = icao;

        document.getElementById("iframe_src").src = pdf_link;

        document.getElementById("map_1").src = map_link;
        //alert(map_link);

        }


}


cg_factor;

function cg_berechnen() {

	//überprüfung
	//alert("hat geklappt");

    fuel = document.getElementById("BlockFuel").value;

	fuel = Math.round(fuel / 500);
	fuel_rounded = fuel * 500;
	//alert(fuel_rounded);


	//Umrechnung auf CG-Faktor

	if (fuel_rounded == 500) {
		cg_factor = -0.3;
	}
	else if (fuel_rounded == 1000) {
		cg_factor = -0.7;
	}
	else if (fuel_rounded == 1500) {
                cg_factor = -1.0;
        }
    else if (fuel_rounded == 2000) {
                cg_factor = -1.3;
        } 
	else if (fuel_rounded == 2500) {
                cg_factor = -1.6;
        }
	else if (fuel_rounded == 3000) {
        	cg_factor = 2.2;
        }
	else if (fuel_rounded == 3500) {
        	cg_factor = 1.9;
        }
	else if (fuel_rounded == 4000) {
        	cg_factor = 1.6;
        }
	else if (fuel_rounded == 4500) {
        	cg_factor = 1.4;
        }
	else if (fuel_rounded == 5000) {
        	cg_factor = 1.1;
        }
	else if (fuel_rounded == 5500) {
        	cg_factor = 0.9;
        }
	else if (fuel_rounded == 6000) {
        	cg_factor = 0.7;
        }
    else if (fuel_rounded == 6500) {
        	cg_factor = 0.5;
        }
    else if (fuel_rounded == 7000) {
        	cg_factor = 0.4;
        }
	else if (fuel_rounded == 7500) {
            cg_factor = 0.2;
        }
    else if (fuel_rounded == 8000) {
            cg_factor = 0.1;
        }
	else if (fuel_rounded == 8500) {
            cg_factor = 0;
        }
    else if (fuel_rounded == 9000) {
            cg_factor = 0;
        }
    else if (fuel_rounded == 9500) {
            cg_factor = 0.1;
        }
    else if (fuel_rounded == 10000) {
            cg_factor = 0.3;
        }
    else if (fuel_rounded == 10500) {
            cg_factor = 0.6;
        }
    else if (fuel_rounded == 11000) {
            cg_factor = 1.0;
        }
	else if (fuel_rounded == 11500) {
            cg_factor = 1.5;
        }
    else if (fuel_rounded == 12000) {
            cg_factor = 2.1;
        }
    else if (fuel_rounded == 12500) {
            cg_factor = 2.5;
        }
    else if (fuel_rounded == 13000) {
            cg_factor = 2.2;
        }
    else if (fuel_rounded == 13500) {
            cg_factor = 1.8;
        }
    else if (fuel_rounded == 14000) {
            cg_factor = 1.3;
        }
    else if (fuel_rounded == 14500) {
            cg_factor = 0.8;
        }
    else if (fuel_rounded == 15000) {
            cg_factor = 0.3;
        }
	else if (fuel_rounded == 15500) {
            cg_factor = -0.2;
        }
    else if (fuel_rounded == 16000) {
            cg_factor = -0.7;
        }
    else if (fuel_rounded == 16500) {
            cg_factor = -1.2;
        }
    else if (fuel_rounded == 17000) {
            cg_factor = -1.7;
        }
    else if (fuel_rounded == 17500) {
            cg_factor = -2.3;
        }
    else if (fuel_rounded == 18000) {
            cg_factor = -2.8;
        }
    else if (fuel_rounded == 18500) {
            cg_factor = -3.3;
        }
    else if (fuel_rounded == 19000) {
            cg_factor = -3.9;
        }
	
	let real_cg = 0;
    trim = 0;

	let zfw_cg = document.getElementById("zfw_cg").value;
	
	zfw_cg = parseFloat(zfw_cg);
	real_cg = zfw_cg + cg_factor;
    real_cg = real_cg.toFixed(2);

	document.getElementById("real_cg").innerHTML = real_cg + "%";

    //alert(real_cg);

    if (real_cg < 17) {
        trim = "3.8UP";
    } else if (real_cg >= 17 && real_cg < 18) {
        trim = "3.7UP";
    } else if (real_cg >= 18 && real_cg < 19) {
        trim = "3.3UP";
    } else if (real_cg >= 19 && real_cg < 20) {
        trim = "3.0UP";
    } else if (real_cg >= 20 && real_cg < 21) {
        trim = "2.8UP";
    } else if (real_cg >= 21 && real_cg < 22) {
        trim = "2.7UP";
    } else if (real_cg >= 22 && real_cg < 23) {
        trim = "2.3UP";
    } else if (real_cg >= 23 && real_cg < 24) {
        trim = "2.0UP";
    } else if (real_cg >= 24 && real_cg < 25) {
        trim = "1.6UP";
    } else if (real_cg >= 25 && real_cg < 26) {
        trim = "1.4UP";
    } else if (real_cg >= 26 && real_cg < 27) {
        trim = "1.1UP";
    } else if (real_cg >= 27 && real_cg < 28) {
        trim = "0.9UP";
    } else if (real_cg >= 28 && real_cg < 29) {
        trim = "0.6UP";
    } else if (real_cg >= 29 && real_cg < 30) {
        trim = "0.4UP";
    } else if (real_cg >= 30 && real_cg < 31) {
        trim = "0.0UP";
    } else if (real_cg >= 31 && real_cg < 32) {
        trim = "0.1DN";
    } else if (real_cg >= 32 && real_cg < 33) {
        trim = "0.6DN";
    } else if (real_cg >= 33 && real_cg < 34) {
        trim = "0.8DN";
    } else if (real_cg >= 34 && real_cg < 35) {
        trim = "1.1DN";
    } else if (real_cg >= 35 && real_cg < 36) {
        trim = "1.6DN";
    } else if (real_cg >= 36 && real_cg < 37) {
        trim = "1.9DN";
    } else if (real_cg >= 37 && real_cg < 38) {
        trim = "2.1DN";
    } else if (real_cg >= 38 && real_cg < 39) {
        trim = "2.3DN";
    } else if (real_cg >= 39) {
        trim = "2.5DN";
	}

    //alert(trim);

    document.getElementById("trim").innerHTML = trim;

}