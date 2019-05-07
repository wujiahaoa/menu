import requests from '../../utils/request.js'
var that = this;
Page({
  data: {
    newslist: []
  },
  onLoad() {
    requests.getReq(`/weixinarticle/get?channelid=1&start=0&num=10&appkey=${requests.appkey}`,this.getnewslist)
  },
  getnewslist:function(res){
    console.log(res)
    that.setData({
      newslist:res
    })
  }
})