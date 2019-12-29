window.addEventListener('load', function () {
  // 获取左箭头
  var arrow_l = document.querySelector(".arrow-l")
  // 获取右箭头
  var arrow_r = document.querySelector(".arrow-r")
  // 整个容器
  var swiper_slider = document.querySelector(".swiper-slider")
  // 所有图片列表
  var lis = document.querySelectorAll(".swiper-slider li")
  // 获取盛放小点的列表
  var ol = document.querySelector('.circle')
  var swiper_container = document.querySelector('.swiper-container')
  var pause_btn = document.querySelector('.pause-btn')
  // 定义计数器
  var index = 0
  // 循环的方式为每一个li添加自定义属性
  for (var i = 0; i < lis.length; i++) {
    lis[i].setAttribute("index", i)
    // 循环创建对应数量的小点 并追加到ol中
    var li = document.createElement("li")
    li.innerHTML = ('<p></p><a href="javascript:;"><span></span></a>')
    ol.appendChild(li)
  }
  // 获取到所有创建的小圆点    
  var ollis = ol.getElementsByTagName('li')
  ollis[0].children[0].prepend('三星w20 5G')
  ollis[1].children[0].prepend('Galaxy')
  ollis[2].children[0].prepend('画境系列融入屏')
  ollis[3].children[0].prepend('三星生活家电')
  ollis[4].children[0].prepend('三星体验店')
  var m = 0
  progress(ollis[m].children[1])
  function progress(obj) {
    clearInterval(obj.timer)
    obj.timer = setInterval(function () {
      obj.style.width = obj.getBoundingClientRect().width + ollis[m].getBoundingClientRect().width / 100 + 'px'
      if (obj.offsetWidth >= ollis[m].getBoundingClientRect().width) {
        clearInterval(obj.timer)
        obj.style.width = 0 + 'px'
        arrow_r.click()
        progress(ollis[m].children[1])
      }
    }, 40)
  }
  swiper_container.onmouseenter = function () {
    clearInterval(ollis[m].children[1].timer)
    pause_btn.children[0].style.backgroundImage = 'url(images/new-home-ico-play-black.svg)'
  }
  swiper_container.onmouseleave = function () {
    progress(ollis[m].children[1])
    pause_btn.children[0].style.backgroundImage = 'url(images/new-home-ico-pause-black.svg)'
  }
  pause_btn.onmouseenter = function () {
    progress(ollis[m].children[1])
    pause_btn.children[0].style.backgroundImage = 'url(images/new-home-ico-pause-black.svg)'
  }
  pause_btn.onmouseleave = function () {
    clearInterval(ollis[m].children[1].timer)
    pause_btn.children[0].style.backgroundImage = 'url(images/new-home-ico-play-black.svg)'
  }
  // 遍历的方式绑定点击事件 并添加自定义属性
  for (var i = 0; i < ollis.length; i++) {
    // 添加自定义属性
    ollis[i].setAttribute("minindex", i)
    // 绑定点击事件
    ollis[i].addEventListener("click", function () {
      // 获取到点击的小圆点存储的属性
      var minindex = this.getAttribute("minindex")
      // 并修改全局的index计数器
      index = minindex
      m = index
      // 排他完成小圆点
      for (var i = 0; i < ollis.length; i++) {
        clearInterval(ollis[i].children[1].timer)
        ollis[i].children[1].style.width = 0 + 'px'
      }
      // 排他显示唯一一张广告图
      for (var k = 0; k < lis.length; k++) {
        lis[k].className = ""
        lis[k].style.transition = "all .8s"
      }
      lis[minindex].className = "active"
    })
  }
  // 点击右按钮
  arrow_r.addEventListener("click", function () {
    // 让计数器自增
    index++
    // 如果超过了图片的个数就归零
    if (index == lis.length) {
      index = 0
    }
    m = index
    // 调用封装的排他方法
    paita()
  })
  //点击左侧按钮
  arrow_l.addEventListener("click", function () {
    // 如果到了第一张回退到最后一张
    if (index == 0) {
      index = lis.length // 此处长度是4
    }
    index-- //但是减完就会变为3
    m = index
    // 调用排他函数
    paita()
  })
  // 排他函数封装
  function paita() {
    // 此处代码是将所有的图片的opacity先变为0 为当前激活的添加active类名(opacity:1)  current类是小点点的激活类样式
    for (var i = 0; i < lis.length; i++) {
      lis[i].className = ""
      ol.children[i].className = ""
      lis[i].style.transition = "opacity .8s"
      clearInterval(ollis[i].children[0].timer)
      ollis[i].children[1].style.width = 0 + 'px'
    }
    lis[index].className = "active"
  }
})
$(function () {
  $('.dropdown').on('click', function () {
    $(this).siblings('.nav').stop().fadeToggle()
  })
  $('.circle').on('mouseenter', 'li', function () {
    $(this).find('p').stop().animate({ "bottom": "-10%" })
  })
  $('.circle').on('mouseleave', 'li', function () {
    $(this).find('p').stop().animate({ "bottom": "-90%" })
  })
})