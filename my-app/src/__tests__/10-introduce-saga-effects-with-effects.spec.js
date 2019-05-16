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
      .run()
      .then(result => {
        const { effects, returnValue } = result;

        expect(returnValue).toEqual('hello world');
        expect(effects.put.length).toEqual(3);

        expect(effects.put[0]).toEqual(
          put({
            type: 'CHANGE_COLOR_ACTION',
            color: threePrimaryColors[0].color
          })
        );
        expect(effects.put[1]).toEqual(
          put({
            type: 'CHANGE_COLOR_ACTION',
            color: threePrimaryColors[1].color
          })
        );
        expect(effects.put[2]).toEqual(
          put({
            type: 'CHANGE_COLOR_ACTION',
            color: threePrimaryColors[2].color
          })
        );
      });
  });

  it('should verify colors with saga effects with less assertions and not guarantee sequence', () => {
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
      .put({
        type: 'CHANGE_COLOR_ACTION',
        color: threePrimaryColors[2].color
      })
      .put({
        type: 'CHANGE_COLOR_ACTION',
        color: threePrimaryColors[1].color
      })
      .not.put({
        type: 'CHANGE_COLOR_ACTION',
        color: threePrimaryColors[3].color
      })
      .returns('hello world')
      .run();
  });
});
