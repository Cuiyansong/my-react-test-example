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
