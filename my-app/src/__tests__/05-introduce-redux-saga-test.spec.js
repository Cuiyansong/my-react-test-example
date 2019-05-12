import {changeColor} from '../effects/example-of-saga-effects';

describe('Example of Saga Effect Test', () => {
    it('should get change color action when invoke saga effect', () => {
        const color = 'red';
        const gen = changeColor({color});

        expect(gen.next().value).toEqual({
            '@@redux-saga/IO': true,
            combinator: false,
            type: 'PUT',
            payload:
                {
                    channel: undefined,
                    action: {type: 'CHANGE_COLOR_ACTION', color: 'red'}
                }
        });
    });
});
