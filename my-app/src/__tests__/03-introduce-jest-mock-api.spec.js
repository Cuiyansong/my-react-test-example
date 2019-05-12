import axios from 'axios';
// const axios = require('axios')
jest.mock('axios')

describe('Introduce Jest Mock functions: https://jestjs.io/docs/en/mock-functions', function () {
    describe('simply mock a function', function () {
        let fnOriginal
        beforeEach(() => {
            fnOriginal = () => -1
        })

        it('should get value by fnOriginal', () => {
            expect(fnOriginal()).toEqual(-1)
        })

        it('should get value from mock function', () => {
            fnOriginal = jest.fn(() => 999)
            expect(fnOriginal()).toEqual(999)
            // The mock function is called once
            expect(fnOriginal.mock.calls.length).toEqual(1)
            // The first argument of the first call to the function was undefined
            expect(fnOriginal.mock.calls[0][0]).toEqual(undefined)
            // The return value of the first call to the function was 42
            expect(fnOriginal.mock.results[0].value).toBe(999)
        })

        it('should mock returned value', () => {
            fnOriginal = jest.fn()
            fnOriginal
                .mockReturnValueOnce(1)
                .mockReturnValueOnce('x')
                .mockReturnValueOnce(true)

            expect(fnOriginal()).toEqual(1)
            expect(fnOriginal()).toEqual('x')
            expect(fnOriginal()).toEqual(true)
        })
    })

    describe('simply mock a module', () => {
        it('should not exception when api not found', async () => {
            axios.get.mockResolvedValue({data: 'I m a ghost'})
            const data = await axios
                .get('/uri-not-exists')
                .then(response => response.data)
            expect(data).toEqual('I m a ghost')
        })
    })

    describe('simply mock function implement', () => {
        it('should use jest.fn', function () {
            const mockFn = jest.fn(() => 1);
            expect(mockFn()).toEqual(1);
        })

        it('should use mock object', function () {
            const mockFn = jest.fn().mockImplementation(() => 1);
            expect(mockFn()).toEqual(1);
        })
    })
})
