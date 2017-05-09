var api = require('../../utils/api.js')

Page({
  data: {
    item: [],
    msg: ''
  },
  onLoad: function (option) {
    var self = this
    wx.setNavigationBarTitle({
      title: option.keyword + '的搜索结果'
    })
    self.setData({
      msg: '正在加载..'
    })
    wx.request({
      url: api.search,
      data: {
        keyword: option.keyword,
        num: 20
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.result == '' || res.data.result.list.length == 0) {
          self.setData({
            msg: '没有对应菜谱哦~'
          })
        } else {
          self.setData({
            item: res.data.result.list,
            msg: ''
          })
        }
      }
    })
  },
  toinfo: function (event) {
    console.log(event.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../detail/detail?id=' + event.currentTarget.dataset.id
    })
  }
})