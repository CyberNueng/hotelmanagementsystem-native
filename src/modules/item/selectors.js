const selectors = {
  itemInfo: state => state.item.itemInfo.data,
  popularItem: state => state.item.popularItem.data.results,
  newItem: state => state.item.newItem.data.results,
  allItem: state => state.item.allItem.data.results,
}

export default selectors