import Vuetify from 'vuetify'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import test from './../../../src/components/controls/hello'

describe('test.vue', () => {
  let localVue

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(Vuetify)
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('should include a message', () => {
    const wrapper = shallowMount(test)
    expect(wrapper.html()).toContain('Hello Mark')
  })

  it('should render correctly', () => {
    const wrapper = shallowMount(test)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should trigger click event', () => {
    const onClick = jest.fn()
    const wrapper = shallowMount(test,
      {
        propsData: {onClick}
      })
    wrapper.find('button').trigger('click')
    let output = wrapper.find('#output').element.textContent
    expect(output).toBe('1')
    wrapper.find('button').trigger('click')
    // output = wrapper.find('#output').element.textContent
    expect(wrapper.vm.number).toBe(2)
  })
})
