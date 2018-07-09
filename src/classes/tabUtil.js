export default class TabUtil {
  addNewTab (tabs, tab) {
    tabs.push(
      {
        title: tab.title,
        url: tab.url
      }
    )
  }
}
