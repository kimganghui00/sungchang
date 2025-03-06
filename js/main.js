$(document).ready(function(){

  //네비게이션
  $("#header, #header .nav-bg").mouseenter(function(){
    $("#header .depth, #header .nav-bg ").stop().slideDown(300);
    $("#header,.nav-bg").addClass("active");
  });
  $("#header .gnb").mouseleave(function(){
    $("#header .depth, #header .nav-bg ").stop().slideUp(100);
    $("#header").removeClass("active");
  });

  //네비게이션 테블릿 사이즈 안보이게
  $(window).on("resize", medianav);
  function medianav() {
    const headerWidth = $("#header").width();
    if (headerWidth < 1024) {
      $(".nav-bg").addClass("close");
    }else{
      $(".nav-bg").removeClass("close");
    }
  }

  //언어 버튼
  $("#header .option .language .lang_select").click(function(){
    $(this).toggleClass("acitve");
    $("#header .option .language .lang-list li a").toggleClass("active");
  });

  //메인비쥬얼
  let listArray = ["01. Sungchang","02. Technology ","03. Product"];

  let mv = new Swiper(".mv", {
    loop: true,
    watchSlidesProgress: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },

    //페이지네이션
    pagination: {
    el: '.swiper-pagination',
    clickable: 'true',
    type: 'bullets',
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + '<em>'+ listArray[index]+'</em>' + '<i></i>' + '<b></b>'  + '</span>';
      },
    },
    //textbox
    on: {
      slideChange : function(){
        $('.swiper-pagination-bullet').eq(this.realIndex).addClass('active').siblings().removeClass('active on');
        $('.holding span').eq(this.realIndex).addClass('active').siblings().removeClass('active');
        $('.holding span').eq(this.realIndex).addClass('on').siblings().removeClass('on');
      },
      slideChangeTransitionEnd : function(){
        $('.swiper-pagination-bullet').eq(this.realIndex).addClass('on');
      },
    }
  });

  let pagingSwiper = new Swiper(".mv", {
    loop: true,
    pagination: {
      el: ".swiper-pagination2",
      type: "bullets",
    },
  });

  mv.controller.control = pagingSwiper;

  //count

  $(function () {
    const $counters = $(".counting");
    const exposurePercentage = 100;
    const duration = 1500;
    const addCommas = true;
    function updateCounter($el, start, end) {
      let startTime;
      function animateCounter(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / duration;
        const current = Math.round(start + progress * (end - start)) / 10.0;
        const formattedNumber = addCommas ? current.toLocaleString() : current;
        $el.text(formattedNumber);
  
        if (progress < 1) {
          requestAnimationFrame(animateCounter);
        } else {
          $el.text(addCommas ? end.toLocaleString() : end);
        }
      }
      requestAnimationFrame(animateCounter);
    }
  
    $(window).on('scroll', function () {
      $counters.each(function () {
        const $el = $(this);
        if (!$el.data('scrolled')) {
          const rect = $el[0].getBoundingClientRect();
          const winHeight = window.innerHeight;
          const contentHeight = rect.bottom - rect.top;
  
          if (rect.top <= winHeight - (contentHeight * exposurePercentage / 100) && rect.bottom >= (contentHeight * exposurePercentage / 100)) {
            const start = parseInt($el.data("start"));
            const end = parseInt($el.data("end"));
            updateCounter($el, start, end);
            $el.data('scrolled', true);
          }
        }
      });
    }).scroll();
  });


  // 뉴스
  $("#news .tab-list li:not(:first-child)").hide();

  $(".tab-name li").click(function () {
    $(this).addClass("active").siblings().removeClass("active");
    let idx = $(this).index();
    $(".tab-list li").eq(idx).fadeIn(500).siblings().fadeOut(0);
  });

  //패밀리사이트
  $(".family-site button").click(function(){
    $(this).toggleClass("active");
    $("#footer .footer-top .family-site .family-list").toggleClass("active");
  });


  //탑버튼
  $(window).scroll(function(){
    
    if( $(this).scrollTop() > 100 ){
      $("#top-btn").addClass("on");
    }
    else{
      $("#top-btn").removeClass("on");
    }
    
  });
    
  $("#top-btn").click(function(){
    window.scrollTo({top : 0, behavior: 'smooth'}); 
  });

  //ham 버튼
  $("#header .ham-btn").click(function(){
    $("body").toggleClass("scrollhidden");
    $(this).toggleClass("active");
    $("#header .mgnb-wrap").toggleClass("active");
  });

  //mgnb
  $(".mdepth").hide();

  $(".mgnb > li").click(function () {
    $(this).find(".mdepth").slideToggle();
    $(this).siblings().find(".mdepth").slideUp();
    $(this).find("a").toggleClass("active");
    $(this).siblings().find("a").removeClass();
  });



  // 모바일 path 슬라이드 토글
  $(window).on("resize", path);
  function path() {
    const headerWidth = $("#header").width();
    if (headerWidth < 768) {
      $(".path-wrap .path-list li").click(function(){
        $(this).siblings().stop().slideToggle();
      });
    }else{

    }
  }

  //연혁 스크롤바
  window.onscroll = function () { scrollProgress() };
  function scrollProgress() { // 현재 스크롤된 양
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    // 전체 페이지 높이에서 화면 높이를 뺀 값 (스크롤 가능한 범위)
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    // 스크롤된 비율 계산
    var scrolled = (winScroll / height) * 100;
    // progressBar의 높이를 스크롤 비율에 맞게 설정
    document.getElementById("scrollbar").style.height = scrolled + "%";
  }












});