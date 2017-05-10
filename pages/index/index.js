var api = require('../../utils/api.js')

//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 0,
    recommend: '',
    loading: false,
    searchtext: '找菜谱',
    posttext: '',
    hot: []
  },
  onLoad: function () {
    var self = this
    wx.request({
      url: api.detail,
      data: {
        id: ~~(Math.random() * 5000)
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.status == '0') {
          self.setData({
            recommend: res.data.result,
          })
        }
      }
    })
    wx.request({
      url: api.hot,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        self.setData({
          hot: res.data,
        })
      }
    })
  },
  torecommend(event) {
    wx.navigateTo({
      url: '../detail/detail?id=' + event.currentTarget.dataset.id
    })
  },
  tohot(event) {
    wx.navigateTo({
      url: '../detail/detail?id=' + event.currentTarget.dataset.id
    })
  },
  inputhandler(e) {
    this.setData({
      posttext: e.detail.value
    })
  },
  postsearch() {
    if(!this.data.posttext) {
      wx.showModal({
        content: '菜谱名不能为空',
        showCancel: false
      })
    } else {
      wx.navigateTo({
        url: '../list/list?keyword=' + this.data.posttext
      })
    }
  },
  onShareAppMessage: function () {
    return {
      title: '小熊菜谱',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
