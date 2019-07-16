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
    },
    
    showAccounts: function(){
        wrgClient.accounts(function(accountsList){
            for (var i = 0; i < accountsList.length; i++) {
                if (accountsList[i].validTransferSource) {
                    var newItem = "<li><div class='ach_container'>";
                    newItem += "<h4>" + accountsList[i].name + "</h4>";
                    if (accountsList[i].showBalance) {
                        newItem += "<div class='ach_left'><strong>balance</strong></div><div class='ach_right'>" + accountsList[i].balance + "</div></p>";
                    };
                    if (accountsList[i].showAvailableBalance) {
                        newItem += "<div class='ach_left'><strong>Available Balance</strong></div><div class='ach_right'>" + accountsList[i].availableBalance + "</div></p>";
                    };
                    if (accountsList[i].showAvailableCredit) {
                        newItem += "<div class='ach_left'><strong>Available Credit</strong></div><div class='ach_right'>" + accountsList[i].availableFunds + "</div></p>";
                    };
                    if (accountsList[i].showDueDate) {
                        newItem += "<div class='ach_left'><strong>Available Credit</strong></div><div class='ach_right'>" + accountsList[i].paymentDueDate + "</div></p>";
                    };
                    newItem += "</div></li>";
                    console.log(newItem);
                    $("#list").append(newItem);
                };
            }
            $("#list").listview("refresh");
        },function(error){
            alert(error);
        });
    },
    testTransfer: function(){
        wrgClient.transfer("S09", "S00", "1.00", function(res){
            if (res) {
                alert(res);
            };
            alert("Successfully transfered some money");
        }, function(error){
            alert(error);
        });
    },


    loanTransferEUA: function(){
        wrgClient.staticCommand("LoanTransferEUA", function(res){
           if (res) {
               $("#lblEUA").html(res);
           };
       },   function(error){
           alert(error);
       });
    },
    loanTransferAPR: function(){
        wrgClient.staticCommand("LoanTransferAPR",function(res){
           if (res) {
               $("#lblAPR").html(res);
           };
       },   function(error){
           alert(error);
       });
    },
    loanTransferCompletedMessage: function(){
        wrgClient.staticCommand("LoanTransferCompletedMessage",function(res){
           if (res) {
               $("#lblConfirmation").html(res);
           };
       },   function(error){
           alert(error);
       });
    },
    testAnyMember: function(){
        wrgClient.transferAnyMember("S09", "Italiano", "909971", "00", "false", "1.00", function(res){
           if (res) {
               alert(res);
           };
           alert("Successfully transfered some money");
       }, function(error){
           alert(error);
       });
    },
    testGetConfigs: function(){
        wrgClient.configurationValues(["GatewayTimezone", "BranchTag", "RequestedDisclosureRequired"], function(res){
         if (res) {
             for (var propertyName in res) {
                 var newItem = "<li><div class='ach_container'>";
                 newItem += "<div class='ach_left'><strong>"+propertyName+"</strong></div><div class='ach_right'>" + res[propertyName] + "</div></p>";
                 newItem += "</div></li>";
                 
                 console.log(newItem);
                 $("#list").append(newItem);
             }
             $("#list").listview("refresh");
             console.log($("#list").listview);
         }
     }, function(error){
         alert(error);
     });
    },
    testGetConfigOptions: function(){
        wrgClient.configurationKeys(function(res){
           if (res) {
               for (var key in res) {
                   console.log(res[key]);
                   var newItem = "<li><div class='ach_container'>";
                   newItem += "<div class='ach_left'><strong>"+res[key]+"</strong></div>";
                   newItem += "</div></li>";
                   
                   console.log(newItem);
                   $("#list").append(newItem);
               }
           }
       }, function(error){
           alert(error);
       });
    },
    testlmfa: function(){
        wrgClient.lmfa(function(res){
            if (res) {
                alert(res);
            };
            alert("Susccessful LMFA");
        }, function(error){
            alert(error);
        });
    },
    testKeepAlive: function(){
        wrgClient.keepAlive(function(res){
            if (res) {
                alert(res);
            };
            alert("Susccessful keep alive");
        }, function(error){
            alert(error);
        });
    },
    testContacts: function(){
        wrgClient.contacts(function(res){
            if (res) {
                alert(res);
            };
            alert("Susccessful got contacts");
        }, function(error){
            alert(error);
        });
    },

    takePicture: function(output) {
      wrgClient.getPicture(onSuccess, onFail, { 
        quality: 70,
        targetWidth: 800,
        targetHeight: 1200
      });

      function onSuccess(imageData) {
        output.attr('src',"data:image/jpeg;base64," + imageData);
      }

      function onFail(message) {
        if(message == "has no access to assets"){
          output.attr('src', 'img/camera_help.png');
        }
      }
      
    },

    complete:function(){
      var frontImage = $("#FrontImagePicture").attr('src');
      var insuranceImage =  $("#BackImagePicture").attr('src');

      var parameterDictionary = {
        "FrontImage":"FrontImage",
        "BackImage":"BackImage"
      };
      var contentArray = [frontImage,insuranceImage];
      wrgClient.upload("acceptoffer&LoanTransfer", parameterDictionary, contentArray, function(res){
        alert("successful upload")
      }, function(error){
        alert(error);
      });
    },

    closeWebApp:function(){
      wrgClient.closeWebApp();
    }

};