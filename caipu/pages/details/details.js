// pages/details/details.
const app = getApp()
Page({


  data: {
    $id: '',
    details: '',
    iscollection: true,
  },

  onLoad(option) {
    let that = this;
    let mylovelist = wx.getStorageSync('mylove')
    for (let i in mylovelist) {
      if (mylovelist[i].id == option.id) {
        that.setData({
          iscollection: false
        })
      }
    }
    var menulist = app.globalData.menulist
    let _id = option.id
    this.setData({
      $id: _id
    })
    for (let i in menulist) {
      if (menulist[i].id == _id) {
        console.log(menulist[i])
        that.setData({
          details: menulist[i]
        })
      }
    }
  },
  collection() {
    console.log(this.data.$id)
    let that = this;
    let mylovelist = wx.getStorageSync('mylove')
    let $mylove = mylovelist ? mylovelist : []
    let { details, iscollection} = this.data;
    console.log(iscollection)
    if (iscollection ){
      $mylove.push(details)
      $mylove = Array.from(new Set($mylove))
      wx.setStorageSync('mylove', $mylove)
      that.setData({
        iscollection: false
      })
      wx.showToast({
        title: '收藏成功',
      })
    } else {
      for (let i in $mylove){
        console.log(details)
        if ($mylove[i].id == details.id){
          $mylove.splice(i,1)
          wx.setStorageSync('mylove', $mylove)
          that.setData({
            iscollection: true
          })
          wx.showToast({
            title: '已经取消收藏',
          })
        }
      }
    }
    
  },
  onShareAppMessage:function(e){
    console.log('000')
    console.log(e)
  }
})