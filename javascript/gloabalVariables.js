/**
 * Created by victor on 8/20/15.
 */
var RESPONSE_PROJECT_INEXISTENT = 1040,
    RESPONSE_PROJECT_WRONG_NAME_FORMAT = 1041,
    RESPONSE_PROJECT_WITH_NAME_EXISTS = 1042,

    USERNAME_TAKEN = 1003,
    EMAIL_REGISTERED = 1002,
    EMAIL_FORMAT = 1005,
    EMAIL_INEXISTENT = 1006,

    END = -100;

var handleErrorCallback = function (error) {

    var errorStatus = error.status;

    if(errorStatus == USERNAME_TAKEN)
        alert("Username taken");
    else if(errorStatus == EMAIL_REGISTERED)
        alert("Email registered");
    else if(errorStatus == EMAIL_FORMAT)
        alert("Wrong email format");
    else if(errorStatus == EMAIL_INEXISTENT)
        alert("Wrong email or password");
}
