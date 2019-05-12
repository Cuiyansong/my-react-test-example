import { verifyAndChangeColor, verifyColor } from '../effects/example-of-saga-effects';
import { put, call } from 'redux-saga/effects';

describe('Example of Saga Effect Test', () => {
  it('should get verify and save color when call verifyAndChangeColor function', () => {
    const color = 'red';
    const gen = verifyAndChangeColor({ color });

    const firstYieldValue = gen.next().value;
    expect(firstYieldValue).toEqual(call(verifyColor, color));

    const secondYieldValue = gen.next({ isOk: false }).value;
    expect(secondYieldValue).toEqual(
      put({
        type: 'CHANGE_COLOR_ACTION',
        color: 'green'
      })
    );
  });
});
