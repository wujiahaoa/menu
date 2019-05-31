import {
  typeList
} from '../../utils/menu.js'
import request from '../../utils/request.js'
Page({
  data: {
    typeList: '',
    itemlist: '',
    currentTab:0
  },
  onLoad() {
    this.setData({
      typeList: typeList.result,
      itemlist: typeList.result[0].list
    })
  },
  changeMenu(e) {
    this.setData({
      itemlist: this.data.typeList[e.currentTarget.dataset.current].list,
      currentTab: e.currentTarget.dataset.current
    })
  },
  navtomenu(e){
    let $id = e.currentTarget.dataset.id
    let $name = e.currentTarget.dataset.name
    wx.navigateTo({
      url: `../menu/menu?id=${$id}&name=${$name}`,
    })
  }
})