var app = {
    // debug Test function
    helloWorld: function() {
        console.log("helloWorld")
        document.getElementById('helloWorldTag').innerHTML = 'Customer Java Script Attached';
    },
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
        //app.receivedEvent('deviceready');
        document.getElementById('onDeviceReady').innerHTML = "READY!";
        console.log('device ready');
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
    
    showAccounts: function(){ // accountsOut
        document.getElementById('accountsOut').innerHTML = 'Message sent to phone.';
        wrgClient.accounts(function(accountsList){
            list = "";
            for (var i = 0; i < accountsList.length; i++) {
                if (accountsList[i].validTransferSource) {
                    list += accountsList[i].name + ": "
                    if (accountsList[i].showBalance) {
                        list += "bal-"+accountsList[i].balance + "<br>";
                    } else if (accountsList[i].showAvailableBalance) {
                        list += "avlb-"+accountsList[i].availableBalance + "<br>";
                    } else if (accountsList[i].showAvailableCredit) {
                        list += "avlb-"+accountsList[i].availableFunds + "<br>";
                    } else if (accountsList[i].showDueDate) {
                        list += "due-"+accountsList[i].paymentDueDate + "<br>";
                    } else {
                        list += "<br>"
                    }
                };
            }
            document.getElementById('accountsOut').innerHTML = list;
        },function(error){
            document.getElementById('accountsOut').innerHTML = error;
        });
    },
    testTransfer: function(){ 
        document.getElementById('simpleTransferOut').innerHTML = ' Request transfer of $1 from S09 to S00';
        wrgClient.transfer("S09", "S00", "1.00", function(res){
            if (res) {
                document.getElementById('simpleTransferOut').innerHTML = res + ' Request transfer of $1 from S09 to S00';
            };
        }, function(error){
            document.getElementById('simpleTransferOut').innerHTML = error + ' Request transfer of $1 from S09 to S00';
        });
    },


    loanTransferEUA: function(){
        document.getElementById('loanTransferEuaOut').innerHTML = 'Message sent to phone.';
        wrgClient.staticCommand("LoanTransferEUA", function(res){
           if (res) {
            document.getElementById('loanTransferEuaOut').innerHTML = 'success - truncated String: '+res;
           };
       },   function(error){
        document.getElementById('loanTransferEuaOut').innerHTML = error;
       });
    },
    loanTransferAPR: function(){
        document.getElementById('loanTransferAprOut').innerHTML = 'Message sent to phone.';
        wrgClient.staticCommand("LoanTransferAPR",function(res){
           if (res) {
            document.getElementById('loanTransferAprOut').innerHTML = res;
           };
       },   function(error){
        document.getElementById('loanTransferAprOut').innerHTML = error;
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
        console.log("testAnyMember")

        var fromShare = document.getElementById('fromShare').value; 
        var name = document.getElementById('name').value; 
        var toAccount = document.getElementById('toAccount').value; 
        var toShare = document.getElementById('toShare').value; 
        var recurring = document.getElementById('recurring').value; 
        var amount = document.getElementById('amount').value;
        anyMemberModal.style.display = "none";

        //wrgClient.transferAnyMember("S09", "Italiano", "909971", "00", "false", "1.00", function(res)
        wrgClient.transferAnyMember(fromShare, name, toAccount, toShare, recurring, amount, function(res){
           if (res) {
                document.getElementById('transferAnyMemberOut').innerHTML = res;
           };
       }, function(error){
        document.getElementById('transferAnyMemberOut').innerHTML = error + "  Transfer from "+fromShare+" to "+name+"("+toAccount+") account "+toShare+" for $"+amount;
       });
    },
    testGetConfigs: function(){
        document.getElementById('getConfigOut').innerHTML = 'Message sent to phone.';
        wrgClient.configurationValues(["GatewayTimezone", "BranchTag", "RequestedDisclosureRequired"], function(res){
         if (res) {
             list = ""
             for (var propertyName in res) {
                 list += propertyName+": "+ res[propertyName] + "<br> ";
             }
             document.getElementById('getConfigOut').innerHTML = list;
         }
     }, function(error){
        document.getElementById('getConfigOut').innerHTML = error;
     });
    },
    testGetConfigOptions: function(){ 
        document.getElementById('getConfigOptionsOut').innerHTML = 'Message sent to phone.';
        wrgClient.configurationKeys(function(res){
           if (res) {
            list = ""
               for (var key in res) {
                   list += key+": "+res[key]+"<br>"
               }
               document.getElementById('getConfigOptionsOut').innerHTML = list;
           }
       }, function(error){
           alert(error);
           document.getElementById('getConfigOptionsOut').innerHTML = error;
       });
    },
    testlmfa: function(){
        document.getElementById('lmfaOut').innerHTML = 'Message sent to phone.';
        wrgClient.lmfa(function(res){
            if (res) {
                document.getElementById('lmfaOut').innerHTML = res;
            };
        }, function(error){
            document.getElementById('lmfaOut').innerHTML = error;
        });
    },
    testSetNavigationTitle: function(){
        document.getElementById('changeTitleOut').innerHTML = 'Message sent to phone.';
        wrgClient.setNavigationTitle("Hello World",function(res){
            if (res) {
                document.getElementById('changeTitleOut').innerHTML = "Success setting title to \"Hello World\"";
            };
       },   function(error){
        document.getElementById('changeTitleOut').innerHTML = "Failed to set Title";
       });
    },
    testKeepAlive: function(){
        document.getElementById('keepAliveOut').innerHTML = 'Message sent to phone.';
        wrgClient.keepAlive(function(res){
            if (res) {
                document.getElementById('keepAliveOut').innerHTML = res;
            };
        }, function(error){
            document.getElementById('keepAliveOut').innerHTML = error;
        });
    },
    testDeviceInfo: function(){
        document.getElementById('deviceInfoOut').innerHTML = ' Message sent to phone.';
        wrgClient.deviceInfo(function(res){
            if (res) {
                document.getElementById('deviceInfoOut').innerHTML = 'deviceModel:'+res["deviceModel"]+'<br> deviceId: '+res["deviceId"];
            };
        }, function(error){
            document.getElementById('deviceInfoOut').innerHTML = 'Test Failed';
        });
    },

    takePicture: function(output) {
      wrgClient.getPicture(onSuccess, onFail, { 
        quality: 70,
        targetWidth: 800,
        targetHeight: 1200
      });

      function onSuccess(imageData) {
        document.getElementById('takePictureOut').innerHTML = '<img src="data:image/jpeg;base64,'+imageData+'"  style="width:45px;height:60px;">'
      }

      function onFail(message) {
        if(message == "has no access to assets"){
            document.getElementById('takePictureOut').innerHTML = 'Test Failed';
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
