/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function calculateWHP(){
    var crankHP = document.getElementById("crankHP").value;
    var checkedAuto = document.getElementById("auto");
    var checkedManu = document.getElementById("manual");
    var estWHP = document.getElementById("estWHP");
    var whp = 0;
    var checkedFWD = document.getElementById("fwd");
    var checkedRWD = document.getElementById("rwd");
    var checkedAWD = document.getElementById("awd");

    if(checkedFWD.checked){
        if(checkedAuto.checked){
            whp = Math.round(crankHP * 0.88);
            console.log(whp);
        }else if(checkedManu.checked){      
            whp = Math.round(crankHP * 0.93);
        }
    }else if(checkedRWD.checked){
        if(checkedAuto.checked){
        whp = Math.round(crankHP * 0.83);
        }else if(checkedManu.checked){      
            whp = Math.round(crankHP * 0.88);
        }
    }else if(checkedAWD.checked){
        if(checkedAuto.checked){
        whp = Math.round(crankHP * 0.78);
        }else if(checkedManu.checked){      
            whp = Math.round(crankHP * 0.83);
        }
    }   

    estWHP.innerText = whp;
}


var elevation = 0;
var seaWHP = 0;

function calculateAltLoss() {
    elevation = document.getElementById("altitude").value;
    seaWHP = document.getElementById("whp").value;

    whpLoss = (elevation * 0.03 * seaWHP)/1000;
    whpLoss = Math.round(whpLoss);

    var whpLossSpan = document.getElementById("whpLoss");
    whpLossSpan.innerText = whpLoss;

    var altWHPSpan = document.getElementById("altWHP");
    altWHPSpan.innerText = seaWHP - whpLoss;
}

function getAltitude(){
    var options={
        enableHighAccuracy: true,
        maximumAge: 3600000
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
    navigator.notification.beep(1);
    function onSuccess(position) {
    var element = document.getElementById('altitude');
    var altFeet = Math.floor(position.coords.altitude * 3.28084);
    element.value = altFeet;
//     element.innerHTML = '';
//     element.innerHTML = 'Current Altitude: ' + altFeet + ' feet<br />' +
// '<hr />' + element.innerHTML;
}
function onError(error) {
alert('code: ' + error.code + 'n' +
'message: ' + error.message + 'n');
}
}