// pages/user/user.js

Page({
  data: {
    userinfo: '',
    islogin:false
  },
  onLoad() {
    let isuserinfo = JSON.parse(wx.getStorageSync('userinfo'));
    let { userinfo} = this.data;
    let that = this;
    console.log(isuserinfo)
    if (isuserinfo){
      that.setData({
        userinfo: isuserinfo,
        islogin:true
      })
    }
  },
  onGotUserInfo(e) {
    console.log(e)
    if (e.detail.errMsg == "getUserInfo:ok") {
      let userinfo = e.detail.rawData
      this.setData({
        userinfo
      })
      wx.setStorageSync('userinfo', userinfo)
    }
  }
})