const app = getApp()
import request from '../../utils/request.js'
import getTime from '../../utils/getTime.js'
var that = this;
Page({
  data: {
    issearch:true,
    searchValue: '',
    menulist: []
  },
  onLoad: function() {
    let thistimemenu;
    let date = new Date();
    let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    let strDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let house = date.getHours()
    console.log(house)
    if (house > 4 && house < 11) {
      thistimemenu = '早餐'
    } else if (house > 11 && house < 14) {
      thistimemenu = '午餐'
    } else if (house > 14 && house < 17) {
      thistimemenu = '下午茶'
    } else if (house < 21 && house > 17) {
      thistimemenu = '晚餐'
    } else if (house > 21 || house <4) {
      thistimemenu = '夜宵'
    }
    console.log(thistimemenu)
    request.getReq(`/recipe/search?keyword=${thistimemenu}&num=20&appkey=${request.appkey}`, res => {
      console.log(res)
      this.setData({
        menulist:res.data.result.list
      })
    })
  },
  opensearch(){
    this.setData({
      issearch: false
    })
  },
  cancel(){
    this.setData({
      issearch: true
    })
  },
  inputbind(e) {
    this.setData({
      inputValue: e.detail.value
    })
    console.log('bindInput' + this.data.inputValue)
  },
  send(e) {
    request.getReq(`/recipe/search?keyword=${this.data.inputValue}&num=20&appkey=${request.appkey}`, res => {
      console.log(res)
      console.log(res.data.result.list)
      this.setData({
        menulist: res.data.result.list
      })
    })
  }
})