import requests from '../../utils/request.js'
import { tyepList } from '../../utils/menu.js'
var app = getApp()
Page({
  data:{
    $id:'',
    menulist:[],
    page:1,
    size:20
  },
  onLoad(option){
    let { page, size, $id } = this.data;
    $id = option.id
    let $name = option.name

    wx.setNavigationBarTitle({
      title: $name,
    })
    requests.getReq(`/recipe/byclass?classid=${$id}&start=${page}&num=${size}&appkey=${requests.appkey}`, res => {
      console.log(res)
      this.setData({
        menulist: res.data.result.list,
        $id
      })
      console.log(app)
      app.globalData.menulist = res.data.result.list
    })
  },
  gotodetails(e){
    console.log(e)
    let $id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../details/details?id=${$id}`,
    })
  },
  onReachBottom: function () {
    let { page, size, $id, menulist } = this.data;
    var that = this;
    wx.showLoading({
      title: '玩命加载中',
    })
    page = page + size;
    console.log(page)
    requests.getReq(`/recipe/byclass?classid=${$id}&start=${page}&num=${size}&appkey=${requests.appkey}`, res => {
      console.log(res)
      if(res.data.status == 0){
        this.setData({
          menulist: [...menulist, ...res.data.result.list],
          page
        })
        app.globalData.menulist = [...menulist, ...res.data.result.list]
      }else{
        wx.showToast({
          title: res.data.msg,
          icon:'none'
        })
      }
      
    })
  },
})