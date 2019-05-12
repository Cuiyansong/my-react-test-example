describe('This is Jest Framework API Document from office site ```https://jestjs.io/docs/en/api```', () => {
  describe('test lifecycle', function() {
    beforeAll(() => console.error('beforeAll'));
    beforeEach(() => console.error('beforeEach'));
    afterEach(() => console.error('afterEach'));
    afterAll(() => console.error('afterAll'));

    it('should print logs.', () => {
      expect(true).toBeTruthy();
    });
  });

  describe.each`
    a    | b    | expected
    ${1} | ${1} | ${2}
    ${1} | ${2} | ${3}
    ${2} | ${1} | ${3}
  `('test $a  $b to equal $expected', ({ a, b, expected }) => {
    test(`returns ${expected}`, () => {
      expect(a + b).toBe(expected);
    });

    test(`returned value not be greater than ${expected}`, () => {
      expect(a + b).not.toBeGreaterThan(expected);
    });

    test(`returned value not be less than ${expected}`, () => {
      expect(a + b).not.toBeLessThan(expected);
    });
  });

  describe('test keyword `skip`', () => {
    test('it is raining', () => {
      expect(true).toBeTruthy();
    });

    test.skip('it is not snowing', () => {
      expect(false).toBeTruthy();
    });
  });

  // describe('use keyword `only`', () => {
  //   test.only('it is raining', () => {
  //     expect(true).toBeTruthy()
  //   })
  //
  //   test('it is not snowing', () => {
  //     expect(false).toBeTruthy()
  //   })
  // })

  describe('test exception', () => {
    function compileAndroidCode() {
      throw new Error('you are using the wrong JDK');
    }

    test('compiling android goes as expected', () => {
      expect(compileAndroidCode).toThrow();
      expect(compileAndroidCode).toThrow(Error);

      // You can also use the exact error message or a regexp
      expect(compileAndroidCode).toThrow('you are using the wrong JDK');
      expect(compileAndroidCode).toThrow(/JDK/);
    });
  });

  describe('test async function', () => {
    const fetchApi = (response, callbackFn) => {
      return Promise.resolve(response).then(callbackFn);
    };

    it('should success but not intended when not used async mode to test', () => {
      fetchApi(999, response => {
        expect(response).toEqual(0);
      });
    });

    it('should success intended when use callback mode', done => {
      fetchApi(999, response => {
        expect(response).toEqual(999);
        done();
      });
    });

    it('should success intended when use promise mode', () => {
      return fetchApi(999).then(response => {
        expect(response).toEqual(999);
      });
    });

    it('should success intended when use resolve mode', () => {
      return expect(fetchApi(999)).resolves.toBe(999);
    });

    it('should success intended when use async/await mode', async () => {
      await expect(fetchApi(999)).resolves.toBe(999);
    });
  });
});
