// pages/user/user.js
var app = getApp()
Page({
  data: {
    userinfo: '',
    islogin: false,
    mylove:[]
  },
  onLoad() {
    let isuserinfo = wx.getStorageSync('userinfo');
    if (isuserinfo != '') {
      isuserinfo = isuserinfo
    }
    let {
      userinfo
    } = this.data;
    let that = this;
    console.log(isuserinfo)
    if (isuserinfo) {
      that.setData({
        userinfo: isuserinfo,
        islogin: true
      })
    }
  },
  onShow() {
    let { mylove } = this.data;
    let getmylove = wx.getStorageSync('mylove')
    mylove = getmylove ? getmylove : []
    this.setData({
      mylove
    })
  },
  onGotUserInfo(e) {
    console.log(e)
    let {
      userinfo
    } = this.data;
    if (e.detail.errMsg == "getUserInfo:ok") {
      let userInfo = JSON.parse(e.detail.rawData)
      this.setData({
        userinfo: userInfo,
        islogin: true
      })

      wx.setStorageSync('userinfo', userInfo)
    }
  },
  gotodetails(e){
    console.log(e)
    let $id = e.currentTarget.dataset.id;
    console.log($id)
    app.globalData.menulist = this.data.mylove
    wx.navigateTo({
      url: `../details/details?id=${$id}`,
    })
  }
})