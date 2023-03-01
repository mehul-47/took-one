const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./Custom-Api");

class BadrequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadrequestError;
