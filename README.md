# React Test Framework Study & Practise 
[![Build Status](https://travis-ci.com/Cuiyansong/my-react-test-example.svg?branch=master)](https://travis-ci.com/Cuiyansong/my-react-test-example)

## 不是这里讨论的问题 :anger:

- 为何要写测试，写测试的目的是什么？
- 应该如何取舍单元测试与集成测试？
- 测试覆盖率多少性价比最高？
- Saga 理论的细节
- ...

## 尝试找出答案的问题 :smirk:

- 一个最简单测试从开始到结束都经历了些什么
- 什么是测试框架，如何使用 Jest 框架
- 什么是 react-enzyme，如何使用？
- 如何测试 Saga Effects？
- 如何使用 Redux-Saga-test-plan 测试 effects？

---

## 01. 一个简单的测试都经历了什么

```javascript
function add(left, right) {
  return left + right;
}

it('1 + 1 = 2', () => {
  expect(add(1, 1)).toEqual(2);
});
```

```
    Start
      |
package.json                   --- 项目启动入口、包含pacage依赖
      |
`npm run test`                 --- npm提供的运行脚本API，可指定测试框架，例如`test: "jest"`或者`test: "nodescripts/test.js"`
      |
search test file               --- 可以指定扫描文件夹以及扫面文件的类型如spec.js或者test.js, 可以在测试框架的配置文件中指定，如jest.config.js
      |
comiple test file              --- 有的时候需要借助Babel进行编译，可以使用更高级的语法特性
      |
   run test                    --- 运行测试，可以指定浏览器如Chrome（默认），IE等
      |
  assert test                  --- Jest测试框架集成了expect.js断言库，如test、expect
      |
collect test results           --- 收集测试结果，可进行代码覆盖率、圈复杂度等检测
      |
     End
```

### 流行的测试框架
1. JestJS, Facebook 出品，集成了 expect 断言库，React 标配
2. KarmaJS, AngularJS 团队推荐，不是一个大而全的框架，可以自由集成 Mocha、Jasmine、QUnit 等插件
3. MochaJS, 基于NodeJS的库
4. ChaiJS, 基于node的BDD或TDD测试框架, 例如bc.should.equal('a') or expect(foo).to.have.lengthOf(3)

### 非主流测试框架
1. GruntJS - 
2. GulpJS - 

## 02. Jest API 介绍 
```javascript
describe('This is Jest Framework API Document from office site ```https://jestjs.io/docs/en/api```', () => {
    describe('test lifecycle', function () {
        beforeAll(() => console.error('beforeAll'))
        beforeEach(() => console.error('beforeEach'))
        afterEach(() => console.error('afterEach'))
        afterAll(() => console.error('afterAll'))

        it('should print logs.', () => {
            expect(true).toBeTruthy()
        })
    })

    describe.each`
    a    | b    | expected
    ${1} | ${1} | ${2}
    ${1} | ${2} | ${3}
    ${2} | ${1} | ${3}
  `('test $a  $b to equal $expected', ({a, b, expected}) => {
        test(`returns ${expected}`, () => {
            expect(a + b).toBe(expected)
        })

        test(`returned value not be greater than ${expected}`, () => {
            expect(a + b).not.toBeGreaterThan(expected)
        })

        test(`returned value not be less than ${expected}`, () => {
            expect(a + b).not.toBeLessThan(expected)
        })
    })

    describe('test keyword `skip`', () => {
        test('it is raining', () => {
            expect(true).toBeTruthy()
        })

        test.skip('it is not snowing', () => {
            expect(false).toBeTruthy()
        })
    })

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
            throw new Error('you are using the wrong JDK')
        }

        test('compiling android goes as expected', () => {
            expect(compileAndroidCode).toThrow()
            expect(compileAndroidCode).toThrow(Error)

            // You can also use the exact error message or a regexp
            expect(compileAndroidCode).toThrow('you are using the wrong JDK')
            expect(compileAndroidCode).toThrow(/JDK/)
        })
    })

    describe('test async function', () => {
        const fetchApi = (response, callbackFn) => {
            return Promise.resolve(response).then(callbackFn)
        }

        it('should success but not intended when not used async mode to test', () => {
            fetchApi(999, response => {
                expect(response).toEqual(0)
            })
        })

        it('should success intended when use callback mode', done => {
            fetchApi(999, response => {
                expect(response).toEqual(999)
                done()
            })
        })

        it('should success intended when use promise mode', () => {
            return fetchApi(999).then(response => {
                expect(response).toEqual(999)
            })
        })

        it('should success intended when use resolve mode', () => {
            return expect(fetchApi(999)).resolves.toBe(999)
        })

        it('should success intended when use async/await mode', async () => {
            await expect(fetchApi(999)).resolves.toBe(999)
        })
    })
}
```
```javascript
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
```

## 03. 使用React-enzyme测试
```javascript
import React from 'react';

export class Button extends React.Component {
    render() {
        return (
            <div>This is a button</div>
        )
    }
}
```
```javascript
import React from 'react';
import {Button} from '../Button/button';

export class Page extends React.Component {
    render() {
        return (
            <div className="my-class">
                <div>Page</div>
                {this.props.children ? this.props.children : <Button/>}
            </div>
        )
    }
}
```
```javascript
import React from 'react'
import {shallow, mount} from 'enzyme'
import { Page } from '../components/Page/page'
import { Button } from '../components/Button/button'

// TODO: Official Doc: https://github.com/airbnb/enzyme/blob/master/docs/api/shallow.md
describe('Component tests', () => {
    describe('when use shallow dom render', () => {
        it('should return corrected value', () => {
            const wrapper = shallow(<Page/>)
            expect(wrapper).toHaveLength(1)
        })

        it('should find child component Loader by component mode', () => {
            const props = {loading: true}
            const wrapper = shallow(<Page {...props} />)
            expect(wrapper.find(Button)).toHaveLength(1)
        })

        it('should find child component Loader by css class mode', () => {
            const props = {loading: true, className: 'my-class'}
            const wrapper = shallow(<Page {...props} />)
            expect(wrapper.find('.my-class')).toHaveLength(1)
        })

        it('should click button', () => {
            let buttonClicked = false
            const props = {
                loading: true,
                className: 'my-class',
                children: [<Button key="" onClick={() => (buttonClicked = true)}/>],
            }
            const wrapper = shallow(<Page {...props} />)
            wrapper.find(Button).simulate('click')

            expect(buttonClicked).toBeTruthy()
        })

        it('should get div content', () => {
            const wrapper1 = shallow(
                <div>
                    <b>important</b>
                </div>
            )
            const wrapper2 = shallow(
                <div>
                    <Page/>
                    <b>important</b>
                </div>
            )

            expect(wrapper1.text()).toEqual('important')
            expect(wrapper2.text()).toEqual('<Page />important')
        })

        it('should get component functions', () => {
            const props = {loading: true}
            const wrapper = shallow(<Page {...props} />)
            expect(wrapper.instance()).not.toBeNull()
        })
    })

    describe('when use full dom render', () => {
        it('should allows us to set props', () => {
            const wrapper = mount(<Page bar="baz"/>)
            expect(wrapper.props().bar).toEqual('baz')
            wrapper.setProps({bar: 'foo'})
            expect(wrapper.props().bar).toEqual('foo')
        })
    })
})
```

## 04. 一个简单的Saga测试
```javascript
import {put} from 'redux-saga/effects';

export function* changeColor(action) {
    const color = action.color;

    yield put({
        type: 'CHANGE_COLOR_ACTION',
        color
    });
}
```
```javascript
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
```

## 05. 优化后的Saga测试
[详情1](https://github.com/Cuiyansong/my-react-test-example/commit/5ae0ebbba64ec43ae5bef6bd3e593a76e3462962)
[详情2](https://github.com/Cuiyansong/my-react-test-example/commit/39475d88fd239df0092e17a799f770e3fc72fb30)

## 06. React-saga-test-plan UT
[Unit Test](https://github.com/Cuiyansong/my-react-test-example/commit/6b19e7cd9a6d4b0445a733d3ec0b4526fe1fd1c6)

## 07. React-saga-test-plan Integration Test
[Integration Test](https://github.com/Cuiyansong/my-react-test-example/commit/e3a40053fade5e2c146e6a093526d8e0df56bb01)

## 08. 复杂一些的Saga Effects测试
[Effect with Effects](https://github.com/Cuiyansong/my-react-test-example/commit/58a7906eb3ace801998ae55323aa0bc409756a26)
[Test Matcher](https://github.com/Cuiyansong/my-react-test-example/commit/3a1d63f863232322f197b2cb40370b12c1dcdc33)
[Effect with Returned Value](https://github.com/Cuiyansong/my-react-test-example/commit/a2df1f92f75da037f46b8dd879ad3b512f65b1e9)
[Another Way to Test](https://github.com/Cuiyansong/my-react-test-example/commit/4633cd79124b3222682a34985516eb4602851514)

