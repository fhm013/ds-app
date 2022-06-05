var moment = require('moment');
exports.handler = (event, context, callback) => {

  event.response.autoConfirmUser = true;
  if (event.request.userAttributes.hasOwnProperty("email")) {
      event.response.autoVerifyEmail = true;
  }
  
  if (event.request.userAttributes.hasOwnProperty("birthdate")) {
      var dob = event.request.userAttributes.birthdate;
      dob =  moment(dob, "DD-MM-YYYY");
      var age = moment().diff(dob, 'years');
      if (age < 18) {
          var error = new Error("Usia tidak boleh dibawah 18");
          callback(error, event);    
      }
  }
  

  // Return to Amazon Cognito
  callback(null, event);
};
