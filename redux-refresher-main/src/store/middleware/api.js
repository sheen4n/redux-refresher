import axios from 'axios';
import { apiCallBegan, apiCallFailed, apiCallSuccess } from '../api';

const api = ({ dispatch, store }) => (next) => async (action) => {
  next(action);

  if (action.type !== apiCallBegan.type) return;

  const { url, method, data, onSuccess, onError } = action.payload;

  try {
    const response = await axios.request({
      baseURL: 'http://localhost:9001/api',
      url,
      method,
      data,
    });

    // General Success Scenario, do not need to specify when calling the api
    dispatch(apiCallSuccess(response.data));

    // Specific Success Handling
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    // General Error Handling
    dispatch(apiCallFailed(error));

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
