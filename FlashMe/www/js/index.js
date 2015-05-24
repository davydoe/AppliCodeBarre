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

var resultDiv;

document.addEventListener("deviceready", init, false);
function init() {
    document.querySelector("#startScan").addEventListener("touchend", startScan, false);
    resultDiv = document.querySelector("#results");
}

function startScan() {

    cordova.plugins.barcodeScanner.scan(
        function (result) {
            if(result.cancelled == true) {
                 
                var xmlhttp = new XMLHttpRequest();
                var url = "http://fr.openfoodfacts.org/api/v0/produit/3029330003533.json";

                xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        var myArr = JSON.parse(xmlhttp.responseText);
                        myFunction(myArr);
                    }
                }
                xmlhttp.open("GET", url, true);
                xmlhttp.send();

                
            }

            var s = "Result: " + result.text + "<br/>" +
            "Format: " + result.format + "<br/>" +
            "Cancelled: " + result.cancelled;
            resultDiv.innerHTML = s;
        }, 
        function (error) {
            alert("Scanning failed: " + error);
        }
    );

}

function myFunction(arr) {


// URL du Json mais je ne sais pas comment récup' le code barre scanné pour remplacer celui dans l'url



var out = "";

    out +="Le produit est "+arr.product.product_name+", de la marque "+arr.product.brands+", le code barre est "+arr.code;

    out+= '<img src="'+arr.product.image_url+'" alt="" />'; 
    resultDiv.innerHTML = out;
}
