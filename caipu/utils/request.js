var rootDocment = 'https://api.jisuapi.com';
var appkey = '776be9c732360c9e'
var header = {
  'Accept': 'application/json',
  'content-type': 'application/json',
}

function getReq(url, cb) {
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: rootDocment + url,
    method: 'GET',
    header: header,
    success: res => {
      wx.hideLoading();
      cb(res)
    },
    fail: function() {
      wx.hideLoading();
      wx.showModal({
        title: '网络错误',
        content: '网络出错，请刷新重试',
        showCancel: false
      })
      cb(false)
    }
  })
}

function postReq(url, data, cb) {
  wx.showLoading({
    title: '加载中',
  })
  console.log("header=="),
    console.log(header),
    wx.request({
      url: rootDocment + url,
      // header: header,
      data: data,
      method: 'post',
      success: function(res) {
        wx.hideLoading();
        cb(res)
      },
      fail: function() {
        wx.hideLoading();
        wx.showModal({
          title: '网络错误',
          content: '网络出错，请刷新重试',
          showCancel: false
        })
        cb(false)
      }
    })

}
module.exports = {
  getReq: getReq,
  postReq,
  header,
  appkey
}