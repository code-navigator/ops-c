import { createLocalVue, mount } from '@vue/test-utils'
import { TestHelpers } from './../testHelpers'
import checkBox from './../../../src/components/controls/checkBox'
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
  const value = false

  beforeEach(() => {
    store = new Vuex.Store({})
    wrapper = mount(checkBox, {
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

  it('should render correctly', () => {
    h.renders()
  })

  it('should display a label', () => {
    h.hasText(label)
  })

  it('should reflect current state of value prop', async () => {
    h.hasDataPropWithValue('value', false)
    await h.click('input')
    h.hasDataPropWithValue('value', false)
  })
})
