// pages/user/user.js

Page({
  data: {
    userinfo: '',
    islogin: false
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
  }
})