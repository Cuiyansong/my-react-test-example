import {
    verifyColorFromStoreData,
    verifyColor,
    getCarReducer
} from '../effects/example-of-saga-effects';
import {expectSaga} from 'redux-saga-test-plan';
import {call, select} from 'redux-saga/effects';

/* https://github.com/jfairbank/redux-saga-test-plan#integration-testing */
describe('with redux-saga-test-plan integration testing', () => {
    it('should get color from store and save color when call function', () => {
        const validColor = 'green';
        return expectSaga(verifyColorFromStoreData)
            .provide([[select(getCarReducer), validColor], [call(verifyColor, validColor), {color: validColor}]])
            .put({
                type: 'CHANGE_COLOR_ACTION',
                color: validColor
            })
            .run();
    });
});
