export const writePin = (Latitude, Longitude) => {
    var data = JSON.stringify({
     reporter_email: this.state.email,
     date: new Date().toDateString(),
     coordinates: {
       latitude: Latitude,
       longitude: Longitude
     }
   });
 
   
     var xhr = new XMLHttpRequest();
     xhr.withCredentials = true;
     
     xhr.addEventListener("readystatechange", function () {
       if (this.readyState === 4) {
         console.log(this.responseText);
       }
     });
     
     xhr.open("POST", "http://localhost:8000/reports");
     xhr.setRequestHeader("content-type", "application/json");
     xhr.setRequestHeader("cache-control", "no-cache");
     xhr.setRequestHeader("postman-token", "31f2753d-0d97-aec4-293d-e6c0890ed513");
     
     xhr.send(data);
   }
 
export const addPinToList = (latitude, longitude) => {
     var pin_loc = {
       title: "pin_drop",
       coordinates: {
         latitude,
         longitude,
       }
     }
     console.log(pin_loc)
     var new_markers_list = this.state.markers.concat(pin_loc);
     this.setState(previousState => {
       return {
         markers: new_markers_list,
       }
     })
   }
 
export const dropPin = () => {
     navigator.geolocation.getCurrentPosition(
       (position) => {
         var current_longitude = position.coords.longitude;
         var current_latitude = position.coords.latitude;
         console.log("pin dropped at")
         console.log("longitude ", current_longitude)
         console.log("latitude ", current_latitude)
         this.addPinToList(current_latitude, current_longitude)
         this.writePin(current_latitude, current_longitude)
       },
       (error) => this.setState({ error: error.message }),
       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
     );
   }