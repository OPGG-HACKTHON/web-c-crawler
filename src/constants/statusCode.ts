enum StatusCode {
  OK = 200,
  CLIENT_ERROR = 403,
  SERVER_ERROR = 500,
  UPSTREAM_ERROR = 502,
  TIMEOUT_ERROR = 504,
}

export default StatusCode;
