function myFunction() {
    

    var url = "http://example.com";
    
    var recipient = "youremailaddress@gmail.com";
    
    var down_subject = "down :" + url;
    
    var down_message = "Your website url :" + url + " is down rightnow";
    
    var up_subject = "up :" + url;
    
    var up_message = "Your website url :" + url + " is working rightnow";
    
    var scriptProperties = PropertiesService.getScriptProperties();
    
    if (!scriptProperties.getProperty("last_status")) {
        scriptProperties.setProperty("last_status", "up");
    }
    
    
    var last_status = scriptProperties.getProperty("last_status");
    try {
        var response = UrlFetchApp.fetch(url);
        var response_code = response.getResponseCode();
        Logger.log(response_code);
        if (response_code == 200 ) {
            
            if (last_status == "down") {
                scriptProperties.setProperty("last_status", "up");
                MailApp.sendEmail(recipient, up_subject, up_message);
            }
        }
        else {

            if (last_status == "up") {
                scriptProperties.setProperty("last_status", "down");
                MailApp.sendEmail(recipient, down_subject, down_message);
            }
        }
    }
    catch (error) 
    {
        Logger.log(error);
        if (last_status == "up") {
            scriptProperties.setProperty("last_status", "down");
            MailApp.sendEmail(recipient, down_subject, up_message);
        }
        return;
    }
    
}
