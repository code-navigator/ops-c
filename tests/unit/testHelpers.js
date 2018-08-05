export class TestHelpers {
  constructor (wrapper, expect) {
    this.wrapper = wrapper
    this.expect = expect
  }

  click (selector) {
    this.wrapper.find(selector).trigger('click')
  }

  emits (event) {
    this.expect(this.wrapper.emitted(event)).toBeTruthy()
  }

  hasDataPropWithValue (property, value) {
    this.expect(this.wrapper.vm[property]).toBe(value)
  }

  hasInputValue (value) {
    this.expect(this.wrapper.find('input').element.value)
      .toBe(value)
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

  noEmits (event) {
    this.expect(this.wrapper.emitted(event)).toBeUndefined()
  }

  renders () {
    this.expect(this.wrapper.html()).toMatchSnapshot()
  }

  setText (selector, text) {
    this.expect(
      this.wrapper.find(selector).setValue(text)
    )
  }

  trigger (selector, event) {
    this.wrapper.find(selector).trigger(event)
  }
}
