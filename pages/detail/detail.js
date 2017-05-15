var api = require('../../utils/api.js')

Page({
  data: {
    res: '',
    msg: '',
    content: ''
  },
  onLoad: function (option) {
    var self = this
    self.setData({
      msg: '正在玩命加载..'
    })
    wx.showNavigationBarLoading()
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
        wx.hideNavigationBarLoading()
        if(res.data.status == '0') {
          wx.setNavigationBarTitle({
            title: res.data.result.name
          })
          self.setData({
            res: res.data.result,
            msg: '',
            content: res.data.result.content.replace(/(<br \/>)+/g, '\n')
          })
        }
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: this.data.res ? this.data.res.name : '小熊菜谱',
      path: '/pages/detail/detail?id=' + this.data.res.id,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})