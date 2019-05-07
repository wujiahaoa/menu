import requests from '../../utils/request.js'
Page({
  onLoad(){
    requests.getReq(`/recipe/search?keyword=白菜&num=10&appkey=776be9c732360c9e`,function(res){
      console.log(res)
    })
  }
})