"use strict";

var tocId = "#toc",
    flagId = "#tocFlag",
    post = {
  appreciateModel: function appreciateModel() {
    $(".appreciate-btn").on("click", function (t) {
      $(".qr-code-wrap").velocity("transition.expandIn", {
        duration: 300
      }), $(document).one("click", function () {
        $(".qr-code-wrap").velocity("transition.expandOut", {
          duration: 300
        });
      }), t.stopPropagation();
    });
  },
  toggleSocialShare: function toggleSocialShare() {
    $(".share-btn").on("click", function (t) {
      var o = $("#socialShare");
      o.hasClass("show") ? $("#socialShare").velocity("transition.slideUpOut", {
        duration: 300
      }) : $("#socialShare").velocity("transition.slideDownIn", {
        duration: 300
      }), o.toggleClass("show");
    });
  },
  appreciate: function appreciate() {
    $(".qr-code").on("click", function (t) {
      t.stopPropagation();
    }), $(".closinglayer").on("click", function (t) {
      $(".qr-code-wrap").velocity("transition.expandOut", {
        duration: 300
      });
    }), $(".zfb-btn").on("click", function (t) {
      $(".qr_code_zfb").css("height", "300px"), $(".qr_code_wx").css("height", "0");
    }), $(".wx-btn").on("click", function (t) {
      $(".qr_code_wx").css("height", "300px"), $(".qr_code_zfb").css("height", "0");
    });
  },
  removeFirstUL: function removeFirstUL() {
    var t = document.getElementById("post-content");

    if (t) {
      var o = t.firstElementChild.nodeName;
      "UL" === o && $(t.firstElementChild).hide();
    }
  },
  getScrollTop: function getScrollTop() {
    return document.documentElement.scrollTop || document.body.scrollTop;
  },
  tocScroll: function tocScroll(t) {
    var o = $(flagId);
    if (1 !== o.length) return !1;
    var e = $(tocId),
        n = o.offset().top - .5 * $(window).height(),
        i = post.getScrollTop(),
        c = $("#postHeader").height();
    i > c ? e.show() : e.hide();
    var r = document.querySelector(tocId);

    if (r && r.getBoundingClientRect()) {
      var a = r.getBoundingClientRect().height;
      i > n - .5 * a ? e.addClass("right-fixed") : e.removeClass("right-fixed"), post.tocParentActive(), t.preventDefault();
    }
  },
  scrollTocFixed: function scrollTocFixed() {
    window.addEventListener("scroll", post.tocScroll, !1);
  },
  initToc: function initToc() {
    var t = "h1,h2,h3,h4,h5,h6",
        o = ".post-content";
    tocbot.init({
      tocSelector: "#toc",
      contentSelector: o,
      headingSelector: t,
      scrollSmooth: !0,
      headingsOffset: 0 - $("#postHeader").height(),
      hasInnerContainers: !1
    });
    var e = $(".toc-link");
    if (e) for (var n = 0; n < e.length; n++) {
      var i = e[n];
      i.after(document.createElement("span"));
    }
  },
  readProgress: function readProgress() {
    var t = $("#main"),
        o = $("#readProgress .read-progress-bar"),
        e = function e() {
      var e = t.height() - window.innerHeight;

      if (!(e <= 0)) {
        var n = window.pageYOffset - t.offset().top,
            i = n / e * 100 + "%";
        o.width(i);
      }
    };

    displayReadProgress && e(), $(window).on("scroll", function () {
      displayReadProgress && e();
    });
  },
  initViewer: function initViewer() {
    document.getElementById("post-content") && new Viewer(document.getElementById("post-content"), {
      toolbar: !1
    });
  },
  loadHighlight: function loadHighlight() {
    for (var t = document.querySelectorAll("pre code"), o = !!hljs.lineNumbersBlock, e = 0; e < t.length; e++) {
      var n = t[e];
      hljs.highlightBlock(n), o && $("code.hljs").each(function (t, o) {
        hljs.lineNumbersBlock(o);
      });
    }
  },
  tocHover: function tocHover() {
    $(".toc-list-item span").hover(function () {
      $(this).parent().find("a.toc-link:first").addClass("toc-hover");
    }, function () {
      $(this).parent().find("a.toc-link:first").removeClass("toc-hover");
    });
  },
  tocParentActive: function tocParentActive() {
    var t = $(".is-active-li").parents("ol.toc-list.is-collapsible");
    t && t.each(function () {
      $(this).parent().find("a.toc-link:first").addClass("toc-hover");
    });
    var o = $("ol.toc-list.is-collapsible.is-collapsed");
    o && o.each(function () {
      $(this).parent().find("a.toc-link:first").removeClass("toc-hover");
    });
  },
  shareIcon: function shareIcon() {
    var t = {
      sites: ["google", "twitter", "facebook", "weibo", "qq", "tencent", "qzone", "linkedin", "wechat", "douban", "diandian"],
      disabled: socialDisabled.split(",")
    };
    socialShare(".social-share", t);
  }
};
$(function () {
  post.appreciate(), post.initToc(), post.removeFirstUL(), post.scrollTocFixed(), post.readProgress(), post.loadHighlight(), post.appreciateModel(), post.toggleSocialShare(), post.initViewer(), post.tocHover();
});