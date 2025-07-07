const successResponse = (message = "Success", data = null) => ({
  success: true,
  message,
  data,
});

export default successResponse;
