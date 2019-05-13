import { verifySelectedColors, verifyColor } from '../effects/example-of-saga-effects';
import { expectSaga } from 'redux-saga-test-plan';
import { call, put } from 'redux-saga/effects';

describe('with saga effects within effects', () => {
  it('should verify colors with saga effects', () => {
    const threePrimaryColors = ['Red', 'Blue', 'Green', 'Yellow'].map(c => {
      return { color: c };
    });

    return expectSaga(verifySelectedColors, { colors: threePrimaryColors })
      .provide([
        [call(verifyColor, threePrimaryColors[0].color), { isOK: true }],
        [call(verifyColor, threePrimaryColors[1].color), { isOK: true }],
        [call(verifyColor, threePrimaryColors[2].color), { isOK: true }],
        [call(verifyColor, threePrimaryColors[3].color), { isOK: false }]
      ])
      .call.like({ fn: verifyColor })
      .put.like({
        action: {
          type: 'CHANGE_COLOR_ACTION'
        }
      })
      .put({
        type: 'CHANGE_COLOR_ACTION',
        color: threePrimaryColors[1].color
      })
      .put({
        type: 'CHANGE_COLOR_ACTION',
        color: threePrimaryColors[2].color
      })
      .not.put({
        type: 'CHANGE_COLOR_ACTION',
        color: threePrimaryColors[3].color
      })
      .returns('hello world')
      .run();
  });
});
