export class TestHelpers {
  constructor (wrapper, expect) {
    this.wrapper = wrapper
    this.expect = expect
  }

  click (selector) {
    console.log(this.wrapper.find(selector).html())
    this.wrapper.find(selector).trigger('click')
  }

  hasDataPropWithValue (property, value) {
    this.expect(this.wrapper.vm[property]).toBe(value)
  }

  hasSelectorWithText (selector, text) {
    this.expect(
      this.wrapper.find(selector).element.textContent)
      .toBe(text)
  }

  hasText (text) {
    this.expect(this.wrapper.html()).toContain(text)
  }

  isInstance () {
    this.expect(this.wrapper.isVueInstance()).toBeTruthy()
  }

  renders () {
    this.expect(this.wrapper.html()).toMatchSnapshot()
  }
}
