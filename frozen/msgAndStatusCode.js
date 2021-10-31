// Http response
exports.RFC = {
    // OK
    H200 : 200,
    // Created
    H201 : 201,
    // Not Found
    H302 : 302,
    //Unauthorize
    H401 : 401,
    // Not Found
    H404 : 404,
    // Forbidden
    H403 : 403,
    // Conflict
    H409 : 409,
    // Precondition Failed
    H412 : 412,
    // Unsupported media type
    H415 : 415,
    // Internal Server Error
    H500 : 500,
}

// Success Messages
exports.CREATED = "Created successfully!";
exports.UPDATED = "Updation successfully!";
exports.LOGIN_SUCCESS = "Logged in successfully!";
exports.DATA_FOUND = "Data successfully found";
exports.DELETE_DATA = "Data delete successfully";
exports.ALREADY = "already exist";
// Errors Messages
exports.VALIDATION_ERROR = "Validation error!";
exports.INTERNAL_ERROR = "Internal server error!";
exports.UNAUTHORIZED_ACCESS = "Unauthorized access!";
exports.JWT_NOT_FOUND = "token not found!";
exports.INVALID_USER = "Invalid username or password!";

// Validation Messages
exports.USER_EXISTS = "User already exists!";

// Successfull listing Messages
exports.COMMON_SUCCESS = "successfully executed!";
exports.COMMON_ERROR = "Something went wrong. Please check your params.";
