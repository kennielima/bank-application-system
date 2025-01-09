
const HttpStatusCode = {
  StatusOk: 200,
  StatusCreated: 201,
  StatusBadRequest: 400,
  StatusUnauthorized: 401,
  StatusNotFound: 404,
  StatusInternalServerError: 500,
  StatusForbidden: 403,
};

const ResponseStatus = {
  Success: true,
  Failure: false
}

const createResponse = (res, statusCode, status, data) => {
  let responseObject;

  if (status.Failure) {
    responseObject = {
      status: status,
      message: data.message
    }
  }
  else {
    responseObject = {
      status: status,
      message: data.message,
      data: data.data
    }
  }

  return res.status(statusCode).json({ responseObject })
}

module.exports = { 
  HttpStatusCode,
  ResponseStatus,
  createResponse
}