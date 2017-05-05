Page({
  data: {
      keyword: ''
  },
  onLoad: function(option){
    console.log(option.keyword)
    wx.setNavigationBarTitle({
        title: option.keyword + '的搜索结果'
    })
    this.setData({
        keyword: option.keyword
    })
  }
})