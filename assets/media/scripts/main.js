/**
 * Main JS file for Subtle behaviours
 */
// Responsive video embeds
var videoEmbeds = [
  'iframe[src*="youtube.com"]',
  'iframe[src*="vimeo.com"]',
]
reframe(videoEmbeds.join(','))

var katex_config = {
  delimiters: [{
      left: "$$",
      right: "$$",
      display: true
    },
    {
      left: "$",
      right: "$",
      display: false
    },
    {
      left: "\\(",
      right: "\\)",
      display: false
    },
    {
      left: "\\[",
      right: "\\]",
      display: true
    },
  ]
};

// Sidebar toggle
var sidebarToggle = document.querySelectorAll('.sidebar-toggle')
if (sidebarToggle)
  for (var i = 0; i < sidebarToggle.length; i++)
    sidebarToggle[i].addEventListener(
      'click',
      function (e) {
        var headCtrl = $('#headerCtrl')
        var menuCtrl = $('#sidebarToggle')
        if (headCtrl)
          headCtrl.toggleClass('no-show')
        if (menuCtrl)
          menuCtrl.toggleClass('menu-ctrl-on')
        var scrollMenu = $('#scrollMenu')
        if (scrollMenu)
          scrollMenu.toggleClass('scroll-menu-show')
        var siteHeader = $('#siteHeader')
        if (siteHeader)
          siteHeader.toggleClass('site-header-scroll')
        siteHeader.toggleClass('site-header-bg')
        var sideBar = $('#sidebar')
        if (sideBar)
          sideBar.toggleClass('sidebar-show')
        e.preventDefault()

        // 滚动条
        $(document.body).toggleClass('cancel-scroll')
      }, {
        passive: false,
      })

var oldScrollTop;
var han = {
  lazyLoad: function () {
    $("#page").velocity("transition.slideDownBigIn", {
      stagger: 200
    });
  },

  initLazyLoad: function () {
    $('#page').removeClass('transform-none');
  },

  refreshLazyLoad: function () {
    $('#page').addClass('transform-none');
  },

  lazyLoadCardItem: function () {
    $(".card-item-vel").velocity("transition.slideUpIn", {
      stagger: 200,
      display: "flex"
    });
  },

  linksAddBlank: function () {
    var links = $('.post-content a')
    if (links)
      for (var i = 0; i < links.length; i++)
        $(links[i]).attr('target', '_blank')
  },


  // 获取滚动条距离顶部位置
  getScrollTop: function () {
    var scrollTop = 0
    if (document.documentElement && document.documentElement.scrollTop)
      scrollTop = document.documentElement.scrollTop
    else if (document.body)
      scrollTop = document.body.scrollTop
    return scrollTop
  },

  scollHeader: function () {
    window.addEventListener(
      'scroll',
      function () {
        var siteHeader = $('#siteHeader')
        var scrollMenu = $('#scrollMenu')
        var sidebarToggle = $('#sidebarToggle')
        var scrollTop = han.getScrollTop()
        if (siteHeader && scrollTop > 0) {
          siteHeader.addClass('site-header-scroll')
          scrollMenu.addClass('scroll-menu-show')
          sidebarToggle.hide()
        } else {
          siteHeader.removeClass('site-header-scroll')
          scrollMenu.removeClass('scroll-menu-show')
          sidebarToggle.show()
        }
        oldScrollTop = scrollTop
      },
      false)
  },

  toggleSearch: function () {
    // 搜索框
    $('.js-toggle-search').on('click', function () {
      openSearchPanel()
      $('.searchbox-input').focus()
      this.makeMenuInvisible()
    })
  },

  makeMenuInvisible: function () {
    $('#sidebar').removeClass('sidebar-show')
    $('#sidebarToggle').removeClass('menu-ctrl-on')
    $(document.body).removeClass('sidebar-opened')
    $(document.body).removeClass('cancel-scroll')
    $(".side-bar-val").velocity("transition.slideUpOut", {
      stagger: 200
    });
  },

  // 当前菜单菜单高亮
  highlightMenu: function () {
    var nav = document.getElementById('scrollMenu')
    var links = nav.getElementsByTagName('a')
    var currenturl = document.location.href
    var last = 0
    for (var i = 0; i < links.length; i++) {
      var linkurl = links[i].getAttribute('href')
      if (currenturl.indexOf(linkurl) !== -1)
        last = i
    }
    $(links[last]).addClass('active-current')
    for (var i = 0; i < links.length; i++) {
      if (last !== i) {
        $(links[i]).removeClass('active-current')
      }
    }
    var currentLinks = links[last]
    if ($(currentLinks).parents('.sub-menu')) {
      var subMenu = $(currentLinks).parents('.sub-menu')
      $(subMenu[0]).siblings('a').addClass('active-current')
    }
  },

  // 展开子菜单
  foldSubMenu: function () {
    $(".nav-menu-link").click(function (e) {
      var angle = $(this).children('.fa')[0];
      $(angle).toggleClass('angle-transform');
      var subMenu = $(this).siblings('.nav-sub-menu');
      if (subMenu && !$(this).siblings('.nav-sub-menu').hasClass('nav-menu-show')) {
        subMenu.velocity("transition.slideDownIn", {
          duration: 300
        });
        subMenu.addClass('nav-menu-show')
      } else if (subMenu && $(this).siblings('.nav-sub-menu').hasClass('nav-menu-show')) {
        subMenu.velocity("transition.slideUpOut", {
          duration: 300
        });
        subMenu.removeClass('nav-menu-show')
      }
    });
  },

  pagination: function () {
    $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
    $('body').on('click', '#pagination a', function () {
      var pageContent = $('#pagination');
      pageContent.html("")
      pageContent.append('<div class="loader-inner ball-pulse"><div/><div/><div/></div>');
      $.ajax({
        type: "GET",
        url: $(this).attr("href"),
        success: function (data) {
          result = $(data).find("#post-list .postItem");
          pageInner = $(data).find("#pagination .inner");
          // In the new content
          $("#post-list").html(result.fadeIn(500));
          pageContent.empty();
          pageContent.append(pageInner);
          document.getElementById("postContainer").scrollIntoView()
        }
      });
      return false;
    });
  },
  initCodeCopy: function () {
    if (!ClipboardJS) return
    // 为文章页面下的code标签，加复制按钮
    var codes = document.querySelectorAll('.post-content pre code');
    if (codes.length) {
      for (var i = 0; i < codes.length; i++) {
        var code_id = "code_id_" + i;
        var btn = document.createElement("button");
        btn.setAttribute("class", "hljs-copy-btn");
        btn.setAttribute("data-clipboard-target", "#" + code_id);
        codes[i].setAttribute("id", code_id);
        btn.innerHTML = '复制代码';
        codes[i].parentNode.insertBefore(btn, codes[i]);
      }
      var cop = new ClipboardJS('.hljs-copy-btn');
      cop.on('success', function (e) {
        alert("复制成功");
        e.clearSelection();
      });
      cop.on('error', function (e) {
        alert("矮油，复制失败了，但是已经全选了惹...手动复制吧勇士！");
      });
    }
  },
  initBackToTop: function () {
    var $backTop = $('#js-go_top')
    if (!$backTop.length) return
    $backTop.gotoTop({
      offset: 500, //距离顶部的位置
      speed: 300, //移动到顶部的速度
      /*     iconSpeed : 300, //icon动画样式的速度*/
      animationShow: {
        'opacity': 1,
        '-webkit-transform': 'translate3d(0,0,0) rotate(360deg)',
        'transform': 'translate3d(0,0,0) rotate(360deg)'
      }, //icon动画样式显示时
      animationHide: {
        'opacity': 0,
        '-webkit-transform': 'translate3d(80px,0,0) rotate(0deg)',
        'transform': 'translate3d(80px,0,0) rotate(0deg)'
      } //icon动画样式隐藏时
    });
  }
}

$(function () {
  // han.lazyLoad()

  han.lazyLoadCardItem()

  han.linksAddBlank()

  // 头部菜单滚动时间
  han.scollHeader()

  han.toggleSearch()

  // 当前目录菜单高亮
  han.highlightMenu()

  // 菜单点击事件
  han.foldSubMenu()

  // 分页
  // han.pagination()

  han.getScrollTop()

  han.initBackToTop()

  han.initCodeCopy()

})

// 删除日志中的空元素
$(document).ready(
  function () {
    var treeHoleBoxs = document.querySelectorAll('.tree-hole-box')
    if (treeHoleBoxs)
      for (var i = 0; i < treeHoleBoxs.length; i++) {
        var childrens = $(treeHoleBoxs[i]).children('p:empty')
        for (var j = 0; j < childrens.length; j++)
          childrens[j].remove()
      }
  });