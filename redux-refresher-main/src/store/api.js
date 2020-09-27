import { createAction } from '@reduxjs/toolkit';

const apiCallBegan = createAction('api/callBegan');
const apiCallSuccess = createAction('api/callSuccess');
const apiCallFailed = createAction('api/callFailed');

export { apiCallBegan, apiCallSuccess, apiCallFailed };
