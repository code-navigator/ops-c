import { createLocalVue, mount } from '@vue/test-utils'
import { TestHelpers } from './../testHelpers'
import textBox from './../../../src/components/controls/textBox'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

describe('test.vue', () => {
  let h
  let store
  let wrapper
  const label = 'some label'
  const value = 'some text'

  beforeEach(() => {
    store = new Vuex.Store({})
    wrapper = mount(textBox, {
      localVue,
      store,
      propsData: {
        label,
        value
      }
    })
    h = new TestHelpers(wrapper, expect)
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('should mount without errors', () => {
    h.isInstance()
  })

  it('should display a label', () => {
    h.hasText(label)
  })

  it('should display the text', () => {
    h.hasInputValue(value)
    h.setText('input', 'new text')
    h.hasInputValue('new text')
  })

  it('should change emit a keyup event when the input changes', () => {
    h.trigger('input', 'input')
    h.emits('keyup')
  })

  it('should render correctly', () => {
    h.renders()
  })
})
