const selectors = {
  itemInfo: state => state.item.itemInfo.data,
  popularItem: state => state.item.popularItem.data.results,
}

export default selectors