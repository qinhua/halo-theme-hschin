"use strict";

/*******************************
 * 右下角按钮相关
 */
function smoothBack2Top() {
  window.scroll({
    top: 0,
    behavior: 'smooth'
  });
}

function smoothBack2Bottom() {
  var offsetHeight = document.documentElement.offsetHeight;
  var scrollHeight = document.documentElement.scrollHeight;
  window.scroll({
    top: scrollHeight - offsetHeight,
    behavior: 'smooth'
  });
}

function ckBack2Top() {
  $('#moonToc').removeClass('mm-active');
  smoothBack2Top();
}

function ckBack2Bottom() {
  $('#moonToc').removeClass('mm-active');
  smoothBack2Bottom();
}

function ckShowContent() {
  toggleSmallToc(); // 模拟点击事件

  $('.moon-menu-button').trigger("click");
}

function toggleSmallToc() {
  var moonContent = $('#moonToc');
  moonContent.toggleClass('mm-active');

  if (moonContent.hasClass('mm-active')) {
    moonContent.show();
  } else {
    moonContent.hide();
  }
}

function initMoonToc() {
  var headerEl = 'h1,h2,h3,h4,h5,h6',
      //headers
  content = '.md-content'; //文章容器

  tocbot.init({
    tocSelector: '#moonToc',
    contentSelector: content,
    headingSelector: headerEl,
    scrollSmooth: true,
    isCollapsedClass: '',
    headingsOffset: 0 - ($('#postHeader').height() + 58),
    scrollSmoothOffset: -60,
    hasInnerContainers: false
  });
  var moonToc = $('#moonToc'); // 没有生成目录

  if (moonToc && moonToc.children().length === 0) {
    $('.icon-toc').addClass('hidden');
  }
}

function toggleSearchBox() {
  $('#searchBox').toggleClass('hidden');
}

function toggleCircle() {
  var $moonDot = $('g.moon-dot');
  var firstCircle = $moonDot.children('circle:first');
  var lastCircle = $moonDot.children('circle:last');
  var cy = $(firstCircle).attr('cy');

  if (cy === '0') {
    $(firstCircle).attr('cx', '0');
    $(firstCircle).attr('cy', '-.8rem');
    $(lastCircle).attr('cx', '0');
    $(lastCircle).attr('cy', '.8rem');
  } else {
    $(firstCircle).attr('cx', '-.8rem');
    $(firstCircle).attr('cy', '0');
    $(lastCircle).attr('cx', '.8rem');
    $(lastCircle).attr('cy', '0');
  }
}

function ckMoonButton() {
  // 右下角的小点
  toggleCircle();
  $('.moon-menu-items').toggleClass('item-ani');
}