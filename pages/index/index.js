//index.js
//获取应用实例
const app = getApp()
var t1 = 0;
var t2 = 0;
var t3 = 0;
var t4 = 0;
var flag = false;
var count = 0;
var j;
var result = ["一步两步,是卡布奇诺的步伐,恭喜你,送上一杯卡布,快来喝吧~",
              "想喝拿铁还是牛奶？随你选一款哦~",
              "送一杯甜甜的牛奶给你,祝你天天开心~",
              "哎呀呀,又见面了老盆友,送张买二送一优惠券,快带上小伙伴来买吧~",
              "恭喜你,任意买三杯再送你一杯哦~",
              "送给君上一张5元优惠券哦~",
              "恭喜你,被8折优惠券砸中啦~",
              "送给你下午茶福利：一份蛋糕+一杯饮品 减5元哟~",
              "恭喜你,被买五送一优惠券砸中咯~",
              "转圈圈,转圈圈,转到一张2元券给亲哦~"];
var result_s = ["卡布奇诺券",
                "牛奶/拿铁 二选一",
                "牛奶券",
                "买二送一券",
                "买三送一券",
                "5元优惠券",
                "8折优惠券",
                "一份饮品+一份蛋糕 减5元",
                "买五送一券",
                "2元优惠券"];

Page({
  data: {
    init: false,
    scan_result: false,
    time: 0.0,
    award_flag: false,
    award:'',
    img: '../../img/ant.png',
  },

  scan:function(){
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res);
        if(res.result == "manjukafei"){
          wx.showToast({
            title: '数据加载中',
            icon: 'loading',
            duration: 1000
          });
          this.setData({
            scan_result: true
          });
        }else{
          wx.showModal({
            title: '提示',
            content: '非法二维码',
            confirmText: "确定",
            cancelText: "取消",
            success: function (res) {
              console.log(res);
              if (res.confirm) {
                console.log('确定')
              } else {
                console.log('取消')
              }
            }
          });
        }
      }
    });
    this.setData({
      award_flag: false,
      award: '',
    });
  },

  startTime: function (e) {
    console.log(e);
    t1 = e.timeStamp;
    this.setData({
      init: true
    });

  },
  endTime: function (e) {
    count++;
    console.log(e);
    t2 = e.timeStamp;
    t3 = t2 - t1;
    if (t3 > 950 && t3 < 1050) {
      flag = true;
      t3 = 1000;
    }
    else {
      flag = false;
    }
    this.setData({
      time: Math.floor(t3 / 10) / 100
    });
    if(flag){
      for (var i = 300000000; i > 1; i--);
      if(count == 1){
        j = Math.floor(Math.random() * 3);
      }else if(count == 2){
        j = Math.floor(Math.random() * 4) + 3;
      }else{
        j = Math.floor(Math.random() * 4) + 7;
      }
      
      wx.showModal({
        title: '恭喜你',
        content: result[j],
        confirmText: "确定",
        cancelText: "取消",
        success: function (res) {
          console.log(res);
          if (res.confirm) {
            console.log('确定')
          } else {
            console.log('取消')
          }
        }
      });
      this.setData({
        init: false,
        scan_result: false,
        award_flag: true,
        award: result_s[j], 
        time:0.0
      });
      count = 0;
    }else{
      if (count == 3) {
        for(var i=300000000; i>1; i--);
        wx.showModal({
          title: '很遗憾，你没有中奖',
          content: "再接再厉哦，欢迎下次再来",
          confirmText: "确定",
          cancelText: "取消",
          success: function (res) {
            console.log(res);
            if (res.confirm) {
              console.log('确定')
            } else {
              console.log('取消')
            }
          }
        });
        this.setData({
          init: false,
          scan_result: false,
          time: 0.0
        });
        count = 0;
      }
    }
  },
  onLoad: function () {
  
  }
})
