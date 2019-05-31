var app = getApp()
import request from '../../utils/request.js'
import getTime from '../../utils/getTime.js'
import tips from '../../utils/msg.js'
var that = this;
Page({
  data: {
    issearch: true,
    searchValue: '',
    menulist: [],
    popularserch: [],
    page:1,
    size:20,
    keyword:''
  },
  onLoad() {
    console.log(this.data.popularserch)
    let { page, size, keyword } = this.data
    let recommendlist = tips.recommendlist
    keyword = recommendlist[Math.floor((Math.random() * recommendlist.length))]
    request.getReq(`/recipe/search?keyword=${keyword}&start=1&num=20&appkey=${request.appkey}`, res => {
      this.setData({
        menulist: res.data.result.list,
        keyword
      })
      app.globalData.menulist = res.data.result.list
    })
  },
  onShow: function() {
    app.globalData.menulist = this.data.menulist
  },
  opensearch() {
    let popularserch = this.data.popularserch
    let storage = wx.getStorageSync('popularserch')
    let $popularserch = storage ? storage : []
    this.setData({
      popularserch: $popularserch,
      issearch: false
    })
  },
  cancel() {
    this.setData({
      issearch: true
    })
  },
  inputbind(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  send(e) {
    let issearch = this.data.issearch;
    let popularserch = this.data.popularserch;
    let keyword = this.data.keyword;
    let val = this.data.inputValue
    let that = this;
    that.setData({
      keyword: val
    })
    popularserch.push(val)
    popularserch = Array.from(new Set(popularserch))
    wx.setStorageSync('popularserch', popularserch)
    request.getReq(`/recipe/search?keyword=${val}&start=1&num=20&appkey=${request.appkey}`, res => {
      if (res.data.status == 0){
        that.setData({
          menulist: res.data.result.list,
          issearch: true
        })
        app.globalData.menulist = res.data.result.list
      }else{
        wx.showToast({
          title: res.data.msg,
          icon:'none'
        })
      }
     
    })
  },
  gotodetails(e) {
    let $id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../details/details?id=${$id}`,
    })
  },
  searchthisitem(e) {
    let val = e.currentTarget.dataset.val
    let keyword = this.data.keyword;
    request.getReq(`/recipe/search?keyword=${val}&num=20&appkey=${request.appkey}`, res => {
      this.setData({
        menulist: res.data.result.list,
        issearch: true,
        keyword:val
      })
      app.globalData.menulist = res.data.result.list
    })
  },
  del(){
    wx.removeStorageSync('popularserch')
    this.setData({
      popularserch:[]
    })
  },
  onReachBottom: function () {
    let { page, size, keyword, menulist} = this.data;
    var that = this;
    wx.showLoading({
      title: '玩命加载中',
    })
    page = page + size;
    request.getReq(`/recipe/search?keyword=${keyword}&start=${page}&num=${size}&appkey=${request.appkey}`, res => {
      console.log(res)
      if(res.data.status == 0){
        this.setData({
          menulist: [...menulist, ...res.data.result.list],
          keyword,
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