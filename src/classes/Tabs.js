import Tab from '@Classes/Tab'

export default class Tabs {
  constructor () {
    this.tabs = []
  }

  addNewTab (tab) {
    this.tabs.push(
      new Tab(
        tab.title,
        tab.url
      )
    )
  }
}
