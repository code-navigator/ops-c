import { createLocalVue, mount } from '@vue/test-utils'
import { TestHelpers } from './../testHelpers'
import checkBox from './../../../src/components/controls/dropdownlist'
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
  const items = ['item 1']
  const value = ''

  beforeEach(() => {
    store = new Vuex.Store({})
    wrapper = mount(checkBox, {
      localVue,
      store,
      propsData: {
        items,
        label,
        value
      }
    })
    h = new TestHelpers(wrapper, expect)
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('should have a name', () => {
    h.hasName('dropdownList')
  })

  it('should mount without errors', () => {
    h.isInstance()
  })

  it('should display a label', () => {
    h.hasText(label)
  })

  // it('should emit a "keyup" event when clicked', () => {
  //   const app = document.createElement('div')
  //   app.setAttribute('data-app', true)
  //   document.body.appendChild(app)
  //   h.noEmits('keyup')
  //   h.click('input')
  //   h.emits('keyup')
  // })

  it('should render correctly', () => {
    h.renders()
  })
})
