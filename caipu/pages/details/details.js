// pages/details/details.
const app = getApp()
Page({


  data: {
    $id: '',
    details:''
  },

  onLoad(option) {
    var menulist = app.globalData.menulist
    let that = this;
    let _id = option.id
    this.setData({
      $id: _id
    })
    for (let i in menulist){
      if (menulist[i].id == _id ){
        console.log(menulist[i])
        that.setData({
          details: menulist[i]
        })
      }
    }
  }
})