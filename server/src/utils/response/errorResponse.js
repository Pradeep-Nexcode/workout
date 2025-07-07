const errorResponse = (message = "Something went wrong", data = null) => ({
  success: false,
  message,
  data,
});

export default errorResponse;
