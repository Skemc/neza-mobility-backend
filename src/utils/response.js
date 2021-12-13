export const successResponse = (res, msg) => {
  const data = {
    status: 200,
    message: msg,
  };
  return res.status(200).json(data);
};

export const successResponseWithData = (res, msg, data) => {
  const resData = {
    status: 200,
    message: msg,
    data,
  };
  return res.status(200).json(resData);
};

export const errorResponse = (res, status, msg) => {
  const data = {
    status,
    error: msg,
  };
  return res.status(status).json(data);
};

export const notFoundResponse = (res, msg) => {
  const data = {
    status: 404,
    message: msg,
  };
  return res.status(404).json(data);
};

export const validationError = (res, msg) => {
  const resData = {
    status: 400,
    message: msg,
  };
  return res.status(400).json(resData);
};

export const validationErrorWithData = (res, msg, data) => {
  const resData = {
    status: 400,
    message: msg,
    data,
  };
  return res.status(400).json(resData);
};

export const unauthorizedResponse = (res, msg) => {
  const data = {
    status: 401,
    message: msg,
  };
  return res.status(401).json(data);
};

export const customResponse = (res, status, msg) => {
  const data = {
    status,
    message: msg,
  };
  return res.status(status).json(data);
};

export const customResponseWithData = (res, status, msg, data) => {
  const resData = {
    status,
    message: msg,
    data,
  };
  return res.status(status).json(resData);
};
