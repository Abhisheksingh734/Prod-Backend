// Define a higher-order function called asyncHandler that takes a requestHandler function as an argument
const asyncHandler = (requestHandler) => {
  // Return a new function that takes three parameters: res (response), req (request), and next (next middleware function)
  return (res, req, next) => {
    // Use Promise.resolve to ensure that the requestHandler function always returns a promise
    Promise.resolve(requestHandler(res, req, next))
      // Handle any errors that may occur during the execution of the requestHandler function
      .catch((error) => next(error));
  };
};

export { asyncHandler };

//-> same with try catch block

// const asyncHandler2 = (fn) => {
//   async (req, res, next) => {
//     try {
//       await fn(req, res, next);
//     } catch (error) {
//       res.status(error.code || 500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   };
// };

// Usage example:
// Define an asynchronous request handler function
const exampleRequestHandler = async (req, res, next) => {
  // Some asynchronous code here
  try {
    // Example asynchronous operation
    const result = await someAsyncFunction();
    res.status(200).json({ result });
  } catch (error) {
    // If an error occurs, pass it to the next middleware
    next(error);
  }
};

// Wrap the asynchronous request handler with the asyncHandler middleware
const wrappedHandler = asyncHandler(exampleRequestHandler);

// Now you can use the wrappedHandler as middleware in your Express application
// For example:
// app.get('/someRoute', wrappedHandler);
