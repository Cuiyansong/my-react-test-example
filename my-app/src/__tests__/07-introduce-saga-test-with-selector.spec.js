import {
    verifyColor,
    verifyColorFromStoreData,
    getCarReducer
} from '../effects/example-of-saga-effects';
import {put, call, select} from 'redux-saga/effects';

/* https://github.com/redux-saga/redux-saga/blob/master/examples/shopping-cart/src/sagas/index.js */
describe('Example of Saga Effect Test', () => {
    it('should get color from store and save color when call function', () => {
        const validColor = 'green';
        const gen = verifyColorFromStoreData();

        let next = gen.next();
        expect(next.value).toEqual(select(getCarReducer));

        next = gen.next(validColor);
        expect(next.value).toEqual(call(verifyColor, validColor));

        next = gen.next({color: validColor});
        expect(next.value).toEqual(
            put({
                type: 'CHANGE_COLOR_ACTION',
                color: validColor
            })
        );
    });
});
