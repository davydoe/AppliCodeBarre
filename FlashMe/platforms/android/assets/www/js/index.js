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
var s ;

document.addEventListener("deviceready", init, false);
function init() {
    document.querySelector("#startScan").addEventListener("touchend", startScan, false);
    resultDiv = document.querySelector("#results");
}

function startScan() {


    

    cordova.plugins.barcodeScanner.scan(
        function (result) {
            var myArr ;

            var httpReq = new plugin.HttpRequest();
            httpReq.getJSON("http://fr.openfoodfacts.org/api/v0/produit/"+result.text+".json", function(status, data) {
               
               myArr = JSON.stringify(data);
               myArr = JSON.parse(myArr);
               var out = "";

                out +="Le produit est "+myArr.product.product_name+", de la marque "+myArr.product.brands+", le code barre est "+myArr.code;

                out+= '\n<img src="'+myArr.product.image_url+'" alt="" />'; 
                resultDiv.innerHTML = out;
                alert(out);
            
            });
            



              

        }, 
        function (error) {
            alert("Scanning failed: " + error);
        }
    );
    delay(2000);

}
