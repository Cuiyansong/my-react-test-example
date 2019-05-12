import { put, call, select } from 'redux-saga/effects';
import axios from 'axios';

export const verifyColor = color => {
  return axios.get(`/example-of-saga-test/colors/${color}/verify`);
};

export function* changeColor(action) {
  const color = action.color;

  yield put({
    type: 'CHANGE_COLOR_ACTION',
    color
  });
}

export const getCarReducer = state => state.color;

export function* verifyAndChangeColor(action) {
  let color = action.color;
  const response = yield call(verifyColor, color);
  if (!response.isOk) {
    color = 'green';
  }
  yield put({
    type: 'CHANGE_COLOR_ACTION',
    color
  });
}

export function* verifyColorFromStoreData() {
  let color = yield select(getCarReducer);
  const response = yield call(verifyColor, color);
  yield put({
    type: 'CHANGE_COLOR_ACTION',
    color: response.color
  });
}
