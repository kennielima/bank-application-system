const { HttpStatusCode, ResponseStatus, createResponse } = require("../utils/apiResponses");

const hasSql = (value) => {
  if (value === null || value === undefined) {
    return false;
  }

  // sql regex reference: http://www.symantec.com/connect/articles/detection-sql-injection-and-cross-site-scripting-attacks
  var sql_meta = new RegExp("(%27)|(')|(--)|(%23)", "i");
  if (sql_meta.test(value)) {
    return true;
  }

  var sql_meta2 = new RegExp(
    "((%3D)|(=))[^\n]*((%27)|(')|(--)|(%3B)|(;))",
    "i"
  );
  if (sql_meta2.test(value)) {
    return true;
  }

  var sql_typical = new RegExp(
    "w*((%27)|('))((%6F)|o|(%4F))((%72)|r|(%52))",
    "i"
  );
  if (sql_typical.test(value)) {
    return true;
  }

  var sql_union = new RegExp("((%27)|('))union", "i");
  if (sql_union.test(value)) {
    return true;
  }

  return false;
};

const handleSqlInjection = (req, res, next) => {
  var containsSql = false;
  var body = req.body;
  //check for sql injection in the url. This includes queries
  if (req.originalUrl !== null && req.originalUrl !== undefined) {
    if (hasSql(req.originalUrl) === true) {
      containsSql = true;
    }
  }

  if (containsSql === false) {
    if (body !== null && body !== undefined) {
      if (typeof body !== "string") {
        body = JSON.stringify(body);
      }
      //check for sql injection in the body request if there's a body request
      if (hasSql(body) === true) {
        containsSql = true;
      }
    }

    if (containsSql === true) {
      return createResponse(
        res,
        HttpStatusCode.StatusForbidden,
        ResponseStatus.Error,
        "SQL Detected in Request, Rejected."
      );
    } else {
      next();
    }
  } else {
    return createResponse(
      res,
      HttpStatusCode.StatusForbidden,
      ResponseStatus.Error,
      "SQL Detected in Request, Rejected."
    );
  }
};

module.exports = handleSqlInjection;
