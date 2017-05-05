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
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  onPullDownRefresh() {
    this.setData({
      motto: this.data.motto + 10
    })
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
