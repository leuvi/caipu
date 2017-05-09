var api = require('../../utils/api.js')

//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 0,
    userInfo: {},
    loading: false,
    searchtext: '搜索',
    posttext: ''
  },
  onLoad: function () {
    var that = this
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo
      })
    })
  },
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
  },
  inputhandler(e) {
    this.setData({
      posttext: e.detail.value
    })
  },
  postsearch() {
    if(!this.data.posttext) {
      console.log(1)
      wx.showModal({
        content: '菜谱名不能为空',
        showCancel: false
      })
    } else {
      wx.navigateTo({
        url: '../list/list?keyword=' + this.data.posttext
      })
    }
  }
})
