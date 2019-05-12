import {put} from 'redux-saga/effects';

export function* changeColor(action) {
    const color = action.color;

    yield put({
        type: 'CHANGE_COLOR_ACTION',
        color
    });
}
