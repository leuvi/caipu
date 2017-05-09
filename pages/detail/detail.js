var api = require('../../utils/api.js')

Page({
  data: {
    res: '',
    msg: ''
  },
  onLoad: function (option) {
    var self = this
    self.setData({
      msg: '正在加载..'
    })
    wx.request({
      url: api.detail,
      data: {
        id: option.id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        if(res.data.status == '0') {
          wx.setNavigationBarTitle({
            title: res.data.result.name
          })
          self.setData({
            res: res.data.result,
            msg: ''
          })
        }
      }
    })
  }
})