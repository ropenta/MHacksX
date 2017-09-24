    
    var link = "http://dev.bionavist.com/bucket/photo.jpg";
    var christinaID = "d4c1d994-ebb1-4e28-9e25-b25c57e30447";
    var christinaArray = ["https://firebasestorage.googleapis.com/v0/b/testproj-e7154.appspot.com/o/1.jpg?alt=media&token=d0708ed4-295d-47bd-809a-81d4c4b6a4e0","https://firebasestorage.googleapis.com/v0/b/testproj-e7154.appspot.com/o/2.jpg?alt=media&token=46857fef-5331-40b9-b15e-11fcbe19abb0","https://firebasestorage.googleapis.com/v0/b/testproj-e7154.appspot.com/o/4.jpg?alt=media&token=96a5ef34-2447-41dd-94f3-b5689c5c2936","https://firebasestorage.googleapis.com/v0/b/testproj-e7154.appspot.com/o/5.jpg?alt=media&token=b49aa3a4-8902-47d1-a0d7-942115176b27"];
    
    
    function populateFaces() {
        var faceIdList = [];
        for(i = 0; i < christinaArray.length; i++) {
            //var data = detectFacesInputted(christinaArray[i]);
            //console.log(data);
            addFaceToFriend(christinaID,christinaArray[i]);
        }
        
    }
    
    function addFaceToFriend(friendID,url) {
        var subscriptionKey = "a4215e25032e4862aa0185fb92aa2a8a";
        var uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/friends/persons/"+friendID+"/persistedFaces";
        var params = {
            //any necessary parameters
            
        };
        $.ajax({
            url: uriBase + "?" + $.param(params),

            // Request headers.
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
            },

            type: "POST",
            data: '{"url": ' + '"' + url + '"}',
        })

        .done(function(data) {
            // Show formatted JSON on webpage.
            $("#responseTextArea").val(JSON.stringify(data, null, 2));
        })

        .fail(function(jqXHR, textStatus, errorThrown) {
            // Display error message.
            var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ? 
                jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
            alert(errorString);
        });
    }
    
    function identifyFriend() {
        var subscriptionKey = "0c6796899d274f52a65d2a95f8c08acd";
        var uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";
        var uriBase2 = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/identify";

        // Request parameters.
        var params = {
            "returnFaceId":"true",
        };

        // Display the image.
        var sourceImageUrl = document.getElementById("inputFace").value;
        document.querySelector("#sourceImage").src = sourceImageUrl;
        /*var faceDetectData = detectFacesInputted(sourceImageUrl);
        var multipleFaces = (typeof faceDetectData.faceId==='object');
        console.log(faceDetectData.faceId);
        console.log(multipleFaces);*/
        
        

        // Perform the REST API call.
        $.ajax({
            url: uriBase + "?"+ $.param(params),

            // Request headers.
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Handle-As","json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
            },

            type: "POST",

            // Request body.
            data: '{"url": "' + sourceImageUrl + '"}',
        })

        .done(function(data) {
            // Show formatted JSON on webpage.
            //$("#responseTextArea").val(JSON.stringify(data, null, 2));
            var faceDetectData = data;
            console.log(data);
            for(var i = 0; i < faceDetectData.length; i++)
            {
                $.ajax({
                    url: uriBase2,

                    // Request headers.
                    beforeSend: function(xhrObj){
                        xhrObj.setRequestHeader("Content-Type","application/json");
                        //xhrObj.setRequestHeader("Handle-As","json");
                        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
                    },

                    type: "POST",

                    data: '{"personGroupId": "friends", "faceIds": ["' + faceDetectData[0].faceId + '"],"maxNumOfCandidatesReturned":1, "confidenceThreshold": 0.3}',

                })
                .done(function(data) {
                    console.log(JSON.stringify(data, null, 2));
                    // Show formatted JSON on webpage.
                    $("#responseTextArea").val(JSON.stringify(data, null, 2));
                    return JSON.stringify(data, null, 2);
                })

                .fail(function(jqXHR, textStatus, errorThrown) {
                    // Display error message.
                    var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
                    errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ? 
                        jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
                    alert(errorString);
                });
            }
        })

        .fail(function(jqXHR, textStatus, errorThrown) {
            // Display error message.
            var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ? 
                jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
            alert(errorString);
        });
    }
    
    function getGroupId() {
        var subscriptionKey = "0c6796899d274f52a65d2a95f8c08acd";
        var uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/friends";
        var params = {
            "personGroupId": "friends",
        };
        $.ajax({
            url: uriBase + $.param(params),
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key",subscriptionKey);
            },
            type: "GET",
            //REQUEST BODY
        })
        .done(function(data) {
            // Show formatted JSON on webpage.
            $("#responseTextArea").val(JSON.stringify(data, null, 2));
            
        })

        .fail(function(jqXHR, textStatus, errorThrown) {
            // Display error message.
            var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ? 
                jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
            alert(errorString);
        });
    }
    
    function getPeople() {
        var subscriptionKey = "a4215e25032e4862aa0185fb92aa2a8a";
        var uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/friends/persons?";
        var params = {
            "top": "1000",
        };
        $.ajax({
            url: uriBase + $.param(params),
            // Request headers.
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
            },
            type: "GET",
            // Request body.
            
        })
        .done(function(data) {
            // Show formatted JSON on webpage.
            $("#responseTextArea").val(JSON.stringify(data, null, 2));
            
        })

        .fail(function(jqXHR, textStatus, errorThrown) {
            // Display error message.
            var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ? 
                jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
            alert(errorString);
        });
    }
    
    function setUpFriends() {
        var subscriptionKey = "a4215e25032e4862aa0185fb92aa2a8a";
        var uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/friends";
        var params = {
            // Request parameters
            //"personGroupId": "friends",
        };
        
        $.ajax({
            url: uriBase + $.param(params),

            // Request headers.
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
            },

            type: "PUT",

            // Request body.
            data: '{"name": "friends"}',
        })
        .done(function(data) {
            // Show formatted JSON on webpage.
            $("#responseTextArea").val(JSON.stringify(data, null, 2));
        })

        .fail(function(jqXHR, textStatus, errorThrown) {
            // Display error message.
            var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ? 
                jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
            alert(errorString);
        });
        
    };
    
    function wipeFriendGroup() {
        var subscriptionKey = "0c6796899d274f52a65d2a95f8c08acd";
        var uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/friends";
        var params = {
            // Request parameters
            "personGroupId" : "friends",
        };
        
        $.ajax({
            url: uriBase + "?"+ $.param(params),

            // Request headers.
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
            },
            type: "DELETE",
    
        })
        .done(function(data) {
            // Show formatted JSON on webpage.
            $("#responseTextArea").val(JSON.stringify(data, null, 2));
        })

        .fail(function(jqXHR, textStatus, errorThrown) {
            // Display error message.
            var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ? 
                jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
            alert(errorString);
        });
        
    };
    
    function createPerson() {
        var person = document.getElementById("inputFriend").value;
        console.log(person);
        var subscriptionKey = "a4215e25032e4862aa0185fb92aa2a8a";
        var uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/friends/persons";
        var params = {
            //any necessary parameters
            
        };
        $.ajax({
            url: uriBase + "?" + $.param(params),

            // Request headers.
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
            },

            type: "POST",
            data: '{"name": ' + '"' + person + '"}',
        })

        .done(function(data) {
            // Show formatted JSON on webpage.
            $("#responseTextArea").val(JSON.stringify(data, null, 2));
        })

        .fail(function(jqXHR, textStatus, errorThrown) {
            // Display error message.
            var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ? 
                jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
            alert(errorString);
        });
        
        
    };
    
    function detectFaces() {
        var subscriptionKey = "0c6796899d274f52a65d2a95f8c08acd";
        var uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";

        // Request parameters.
        var params = {
            "returnFaceId": "true"
            
        };

        // Display the image.
        var sourceImageUrl = document.getElementById("inputImage").value;
        document.querySelector("#sourceImage").src = sourceImageUrl;

        // Perform the REST API call.
        $.ajax({
            url: uriBase + "?"+ $.param(params),

            // Request headers.
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
            },

            type: "POST",

            // Request body.
            data: '{"url": "' + sourceImageUrl + '"}',
        })

        .done(function(data) {
            // Show formatted JSON on webpage.
            $("#responseTextArea").val(JSON.stringify(data, null, 2));
            return JSON.stringify(data, null, 2);
        })

        .fail(function(jqXHR, textStatus, errorThrown) {
            // Display error message.
            var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ? 
                jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
            alert(errorString);
        });
    };
    
    function detectFacesInputted(picURL) {
        var subscriptionKey = "0c6796899d274f52a65d2a95f8c08acd";
        var uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";

        // Request parameters.
        var params = {
            "returnFaceId": "true"
            
        };

        // Perform the REST API call.
        $.ajax({
            url: uriBase + "?"+ $.param(params),

            // Request headers.
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
            },

            type: "POST",

            // Request body.
            data: '{"url": "' + picURL + '"}',
        })

        .done(function(data) {
            // Show formatted JSON on webpage.
            $("#responseTextArea").val(JSON.stringify(data, null, 2));
            return JSON.stringify(data, null, 2);
        })

        .fail(function(jqXHR, textStatus, errorThrown) {
            // Display error message.
            var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ? 
                jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
            alert(errorString);
        });
    };
    
    function trainFriends() {
        var subscriptionKey = "0c6796899d274f52a65d2a95f8c08acd";
        var uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/friends/train";

        // Request parameters.
        var params = {
            
        };
        
        // Perform the REST API call.
        $.ajax({
            url: uriBase + "?"+ $.param(params),

            // Request headers.
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
            },

            type: "POST",
            // Request body.
            
        })

        .done(function(data) {
            // Show formatted JSON on webpage.
            $("#responseTextArea").val(JSON.stringify(data, null, 2));
            return JSON.stringify(data, null, 2);
        })

        .fail(function(jqXHR, textStatus, errorThrown) {
            // Display error message.
            var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ? 
                jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
            alert(errorString);
        });
    }
    