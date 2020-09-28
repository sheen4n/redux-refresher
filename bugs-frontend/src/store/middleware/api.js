import axios from 'axios';
import { apiCallBegan, apiCallFailed, apiCallSuccess } from '../api';

const api = ({ dispatch, store }) => (next) => async (action) => {
  if (action.type !== apiCallBegan.type) return next(action);
  const { url, method, data, onSuccess, onStart, onError } = action.payload;

  if (onStart) dispatch({ type: onStart });

  next(action); // Still goes to next even if is apiCall or Not

  try {
    const response = await axios.request({
      baseURL: 'http://localhost:9001/api', // should put this in a configuratio file
      url,
      method,
      data,
    });

    // General Success Scenario, do not need to specify when calling the api
    dispatch(apiCallSuccess(response.data)); // Not attached to any reducers

    // Specific Success Handling
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    // General Error Handling
    dispatch(apiCallFailed(error.message)); // Not attached to any reducers

    // Specific Error Handling
    if (onError) dispatch({ type: onError, payload: error });
  }
};

export default api;

// Example API needs to handle the following:
// const action = {
//   type: 'apiCallBegan', // apiRequest
//   payload: {
//     url: '/bugs',
//     method: 'get',
//     data: {},
//     onSuccess: 'bugsReceived',
//     onError: 'apiRequestFailed'
//   }
// }
