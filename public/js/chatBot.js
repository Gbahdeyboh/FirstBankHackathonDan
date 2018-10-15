/* All scripts regarding how the bot interacts with the customer are written below*/
var distances = [];
var distanceText = [];
var duration = [];
//The below is the location is terms of latitudes and longitudes of first bank branches in lagos
var loc = {
    locations : [
    {
    "branch" : "Ibidun St, Surulere, Lagos",
    "longitude" : "6.5055172",
    "latitude" : "3.3647663"
    },
    {
    "branch" : "Aje Road Street, Off Herbert Macaulay Way, Yaba, Sabo yaba, Lagos",
    "longitude" : "6.5058742",
    "latitude" : "3.3709784"
    },
    {
    "branch" : "128 Murtala Muhammed Way, Ebute-Metta, Lagos",
    "longitude" : "6.5068789",
    "latitude" : "3.3716704"
    },
    {
    "branch" : "Commercial Avenue, 32 Tejuosho Road, Oshodi, Yaba, Lagos",
    "longitude" : "6.5070811",
    "latitude" : "3.3693996"
    },
    {
    "branch" : "17 Itire Rd, Surulere, Lagos",
    "longitude" : "6.5116223",
    "latitude" : "3.3594012"
    },
    {
    "branch" : "Daleko Market, Bank Road, Mushin, Surulere, Lagos",
    "longitude" : "6.5032993",
    "latitude" : "3.3551691"
    },
    {
    "branch" : "23 Commercial Ave, Sabo yaba, Lagos",
    "longitude" : "6.5067255",
    "latitude" : "3.3684149"
    },
    {
    "branch" : "10 Alakija St, Igbobi, Lagos",
    "longitude" : "6.5100934",
    "latitude" : "3.3561183"
    },
    {
    "branch" : "59 Lawanson Street, Surulere, Lagos",
    "longitude" : "6.5209672",
    "latitude" : "3.3707877"
    },
    {
    "branch" : "84 Adeniran Ogunsanya St, Surulere, Lagos",
    "longitude" : "6.4913425",
    "latitude" : "3.3561224"
    },
    {
    "branch" : "Oko Oba, Agege, 254 Agege Motor Rd, Fadeyi, Lagos",
    "longitude" : "6.527014",
    "latitude" : "3.3507817"
    },
    {
    "branch" : "322 Herbert Macaulay Way, Alagomeji-Yaba, Lagos",
    "longitude" : "6.498745",
    "latitude" : "3.3743961"
    },
    {
    "branch" : "Lagos State Polytechnic Isolo Campus, Iyana Isolo, Abule ijesha, Lagos",
    "longitude" : "6.5243793",
    "latitude" : "3.3748283"
    },
    {
    "branch" : "Iwaya Rd, Iwaya, Lagos",
    "longitude" : "6.5072184",
    "latitude" : "3.3834065"
    },
    {
    "branch" : "Oju Elegba Rd, Ikate, Lagos",
    "longitude" : "6.5115995",
    "latitude" : "33.3381629"
    }
    ]
    }
//The below date object is used later in the code to get when each message was sent
 localStorage.setItem('username', 'user1') 
 var dt = new Date(); 
 var hours = dt.getHours();     
 var minutes = dt.getMinutes();
 var seconds = dt.getSeconds(); 
 var dayLight; /*This variable is iterated later and depicts if the present time is Morning or Afternoon*/
 //Get the present dayTime at which message was sent 
     if(hours > 11){ //If 12pm has passed
         dayLight = "PM";
     } 
     else{//If its still morning
         dayLight = "AM"; 
     }
 function removeAnimate(){ 
     setTimeout(function(){
        var vl = document.querySelectorAll(".oh"); //get all new messages
        vlNum = vl.length - 1; //get the last message with the "animate" class
        vl[vlNum].classList.remove("animate"); //Remove the "animate" class from this before proceeding
     }, 50);
 }
function sendMessage(message){
    setTimeout(function(){
        removeAnimate();
    }, 50)
    const chatBody = document.querySelector('#chatBody');
    //This function sends a newly typed message
    chatBody.innerHTML += `
        <div class="row full">
            <div class="col s10 right">
                <div class="botMessage z-depth-2 animate oh rightVal">
                ${message}
                </div>
            </div>
        <div class="col s2 timeStamp">${hours}:${minutes}:${seconds}<br />${dayLight}</div>
        </div>
        `
    document.querySelector('#chatBody').scrollTop += 10000000000;
}
function receiveMessage(message){
    //This function replies the users message
    //This function sends a newly typed message
    setTimeout(removeAnimate(), 50); //first removes the animate class
    const chatBody = document.querySelector('#chatBody');
    chatBody.innerHTML += `
        <div class="row full">
            <div class="col s10">
                <div class="botMessage z-depth-2 animate oh right">
                ${message}
                </div>
            </div>
        <div class="col s2 timeStamp">${hours}:${minutes}:${seconds}<br />${dayLight}</div>
        </div>
        `
    document.querySelector('#chatBody').scrollTop += 10000000;
}

document.addEventListener("DOMContentLoaded", function(){
    const messageBody = document.querySelector('#input');
    messageBody.addEventListener('keydown', function(event){
        if(event.keyCode == 13 && messageBody.value !== "" && messageBody.value !== " "){
            //Get message to be sent
            const message = document.querySelector('#input').value;
            sendMessage(message);
            var socket = io();
            var username = localStorage.getItem('username', username);
            socket.emit('chat message', {msg : message, username : username});
            var chatBody = document.querySelector('#chatBody');
        //Clear the input field after sending message
        document.querySelector('#input').value = "";
        }
    });
});
document.addEventListener('DOMContentLoaded', function(){
    var socket = io();
    socket.on('chat response', function(msg){
        localStorage.setItem("data", msg);
        var message = msg.msg;
        console.log("Message is : ", msg);
        var intent = msg.data.intents[0];
        /**All the below code would later go into the if code block below */
        if(/*msg.username*/ 'user1' == localStorage.getItem("username")){
            if(intent == undefined){
                console.log("Intent is : ", intent);
                receiveMessage(message);
            }
            else{
                if(intent.intent == "Create_Account"){
                    var newMessage = `
                    <div id="form" class="z-depth-2">
                        <div id="title">Fullname</div>
                        <div id="content">
                            <input type="text" id="fullname" class="browser-default"/>
                        </div>
                        <div id="title">PhoneNumber</div>
                        <div id="content">
                            <input type="text" id="phoneNumber" class="browser-default"/>
                        </div>
                        <div id="title">Email</div>
                        <div id="content">
                            <input type="text" id="email" class="browser-default"/>
                        </div>
                        <div id="title">BVN</div>
                        <div id="content">
                            <input type="text" id="bvn" class="browser-default"/>
                        </div>
                        <div id="content">
                            <div class="btn waves-effect" id="createAccount">Create</div>
                        </div>
                    </div>
                    `;
                    receiveMessage(message);
                    setTimeout(function(){
                        receiveMessage(newMessage);
                        const fullname = document.querySelector('#fullname').value;
                        const phoneNumber = document.querySelector('#phoneNumber').value;
                        const email = document.querySelector('#email').value;
                        const bvn = document.querySelector('#bvn').value;
                        const submit = document.querySelector('#createAccount');
                        submit.onclick = function(){
                        fetch('hackaidan.herokuapp.com/create', {
                            method: 'POST',
                            header: {
                                'authorization': 'Bearer 123'
                            },
                            body: JSON.stringify({
                                fullname: fullname,
                                phone_number: phoneNumber,
                                email: email,
                                bvn: bvn,
                                dob: "16/08/1998"
                            })
                        })
                        .then(response => {
                            response.json();
                        })
                        .then(data => {
                            console.log("response gotten : ", data)
                        })
                        .catch(err => {
                            console.log("DId not create account : ", err);
                        })
                        }
                    }, 500);
                }
                else if(intent.intent == "Location"){
                    console.log("Location gotten");
                    function getLocation() {
                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition(showPosition);
                        } else {
                           console.log("Geolocation is not supported by this browser.");
                        }
                    }
                    function showPosition(position) {
                        console.log("Latitude: " + position.coords.latitude + 
                        "<br>Longitude: " + position.coords.longitude);
                        var latitude = position.coords.latitude;
                        var longitude = position.coords.longitude;
                        var mapMessage = `
                          <div id="mapsBody">
                        <div id="maptitle">Your Location</div>
                        <div id="map"></div>
                    </div>
                    `
                          receiveMessage(mapMessage);
                          //show the map of the current location of the customer
                            showMap(latitude, longitude, document.getElementById('map'));
                          /*
                            // The present location of the customer
                          var hic = {lat: latitude, lng: longitude};
                          // The map, centerered at this location
                          var map = new google.maps.Map(
                              document.getElementById('map'), {zoom: 15, center: hic});
                          // The marker, positioned at this location
                          var marker = new google.maps.Marker({position: hic, map: map});
                          */                          

                        for(i = 0; i < loc.locations.length; i++){
                            var origin1 = new google.maps.LatLng(latitude, longitude);
                            var origin2 = 'lagos';
                            var destinationA = loc.locations[i].branch;
                            var destinationB = new google.maps.LatLng(loc.locations[i].latitude, loc.locations[i].latitude);
                            
                            var service = new google.maps.DistanceMatrixService();
                            service.getDistanceMatrix(
                              {
                                origins: [origin1, origin2],
                                destinations: [destinationA, destinationB],
                                travelMode: 'DRIVING',
                                drivingOptions: {
                                departureTime: new Date(Date.now() + 2000),  // for the time N milliseconds from now.
                                trafficModel: 'optimistic'
                              },
                                unitSystem: google.maps.UnitSystem.METRIC,
                                avoidHighways: true,
                                avoidTolls: true,
                              }, callback);
                            
                            function callback(response, status) {
                              if (status == 'OK') {
                                var origins = response.originAddresses;
                                var destinations = response.destinationAddresses;
                            
                                console.log(response);
                                console.log(response.rows[0].elements[0].distance.text);
                                console.log(response.rows[0].elements[0].duration.text);
                                pushDistance(response.rows[0].elements[0].distance.value, loc.locations.length);
                                pushDuration(response.rows[0].elements[0].duration.text, loc.locations.length);
                                pushDistanceText(response.rows[0].elements[0].distance.text, loc.locations.length);
                                //distances.push(response.rows[0].elements[0].distance.value);
                                //times.push(response.rows[0].elements[0].duration.value);
                              }
                            }
                        }
                    }
                    setTimeout(function(){getLocation()}, 2000);
                }
                else if (intent.intent == "Banking_Transfer_Money"){
                    const message = `I understand that you want to make a <b>TRANSFER</b> but unfortunately, 
                    i am still a working prototype and i am not connected to the bank's database yet. Very soon, 
                    i'll be able to make transfers for you. THANKS.`
                    receiveMessage(message);
                }
                else{
                    receiveMessage(message);
                }
            }
        }
        else{
            //console.log("This message was not meant for me")
        }
    });
});


function checkIntent(intent){
    if(intent !== "Location" || intent !== "General_Connect_to_Agent" || intent !== "Banking_Transfer_Money"){
        return true;
    }
}
function getVal(){
    var input;
    const messageBody = document.querySelector('#input');
    messageBody.addEventListener('keydown', function(event){
        if(event.keyCode == 13 && messageBody.value !== "" && messageBody.value !== " "){
            //Get message to be sent
            input = document.querySelector('#input').value;
        }
    });
    return input;
}
function setStorage(input, name){
    sessionStorage.setItem(name, input);
}


function pushDistance(val, len){
    distances.push(val);
    if(distances.length == len){ //when all distances has been pushed
        setTimeout(function(){getMin(distances)}, 5000); //get the minimum distance
    }
}

function pushDuration(val, len){
    duration.push(val);
}

function pushDistanceText(val, len){
    distanceText.push(val);
}

function getMin(arr){
    Array.min = function( arr ){
        return Math.min.apply( Math, arr );
    };
    var minimum = Array.min(arr); //The minimum distance of a first banl from here
    var minIndex = distances.indexOf(minimum); //Get the index of the minimum index form the array
    //Use the idex to find the longitude and latitude of the nearest first bank
    const address = loc.locations[minIndex].branch;
    const longitude = parseFloat(loc.locations[minIndex].longitude);
    const latitude = parseFloat(loc.locations[minIndex].latitude);

    console.log("longitude is : ", longitude);
    console.log("latitude is : ", latitude);
    console.log("latitude type is : ", typeof(latitude));
    console.log("longitude type is : ", typeof(longitude));
    //Store co ordinates in sessionStorages
    //show the map showing the location of the nearest first bank to the customer
    message = `
    <div id="mapsBody">
        <div id="maptitle">Nearest FirstBank</div>
        <div>${address}</div>
        <div id="map2"></div>
    </div>
    `;
    receiveMessage(message);
    //showMap(latitude, longitude, document.querySelector('#map2'));


    //Get the time taken to reach this distance
    const timeTaken = duration[minIndex];
    const message2 = `
    You are about ${distanceText[minIndex]} from the nearest first bank, and it is located at ${address}. 
    It would take approximately ${timeTaken} to get there if you drive and {x time if you walk.}
    `;
    receiveMessage(message2);
    console.log(minIndex);
    console.log("The distances are : ", distances);
    console.log("The minimum distance is : ", minimum);
    function getLocation2(){
        // The present location of the customer
      var hic = {lat: longitude, lng: latitude};
      // The map, centerered at this location
      var map = new google.maps.Map(document.querySelector("#map2"), {zoom: 20, center: hic});
      // The marker, positioned at this location
      var marker = new google.maps.Marker({position: hic, map: map});
    }
    getLocation2();
}
function showMap(latitude, longitude, element){
      // The present location of the customer
      var hic = {lat: latitude, lng: longitude};
      // The map, centerered at this location
      var map = new google.maps.Map(element, {zoom: 18, center: hic});
      // The marker, positioned at this location
      var marker = new google.maps.Marker({position: hic, map: map});
      return;
}