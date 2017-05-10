var api = require('../../utils/api.js')

Page({
  data: {
    keyword: '',
    item: [],
    msg: '',
    start: 0,
    loaded: false
  },
  onLoad: function (option) {
    var self = this
    self.setData({
      msg: '正在玩命加载..',
      keyword: option.keyword
    })
    wx.showNavigationBarLoading()
    wx.request({
      url: api.search,
      data: {
        keyword: option.keyword,
        num: 20,
        start: self.data.start
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        wx.hideNavigationBarLoading()
        wx.setNavigationBarTitle({
          title: option.keyword + '的搜索结果'
        })
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
      },
      fail: function() {
        self.setData({
          msg: '搜索失败，请检查您的网络~'
        })
      }
    })
  },
  toinfo: function (event) {
    console.log(event.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../detail/detail?id=' + event.currentTarget.dataset.id
    })
  },
  lower(e) {
    var self = this
    if (this.data.loaded) {
      return
    }
    self.setData({
      loaded: true,
      start: self.data.start + 5
    })
    console.log(self.data.start)
    wx.request({
      url: api.search,
      data: {
        keyword: self.data.keyword,
        num: 5,
        start: self.data.start
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.result != '') {
          self.setData({
            item: self.data.item.concat(res.data.result.list),
          })
        }
        self.setData({
          loaded: false
        })
      }
    })
  }
})