import {
    verifyColor,
    verifyColorFromStoreData,
    getCarReducer
} from '../effects/example-of-saga-effects';
import {testSaga} from 'redux-saga-test-plan';

/* https://blog.scottlogic.com/2018/01/16/evaluating-redux-saga-test-libraries.html */
describe('with redux-saga-test-plan unit testing', () => {
    it('should get color from store and save color when call function', () => {
        const validColor = 'green';
        testSaga(verifyColorFromStoreData)
            .next()
            .select(getCarReducer)
            .next(validColor)
            .call(verifyColor, validColor)
            .next({color: validColor})
            .put({
                type: 'CHANGE_COLOR_ACTION',
                color: validColor
            })
            .next()
            .isDone();
    });
});
