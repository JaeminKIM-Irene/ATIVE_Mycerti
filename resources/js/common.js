$(function(){ 
    // popup
    $(document).on('click','.open_pop',function(){
        var btnIndex = $('.open_pop').index(this);
        var ww = $(window).width();
        
        popupOpen();
        $('.popup').eq(btnIndex).addClass('on');    
    });
    $(document).on('click','.exit_pop',function(){
        popupClose();
    });
    
    // 약관동의 팝업
    $(document).on('click','.terms_open',function(){
        var btnIndex = $('.terms_open').index(this);
        var ww = $(window).width();
        
        termsOpen();
        $('.terms_popup').eq(btnIndex).addClass('on');    
    });
    $(document).on('click','.terms_exit',function(){
        termsClose();
    });
    
    $(document).on('click','.toast_open',function(){
        var btnIndex = $('.toast_open').index(this);
        
        $('.toast_popup_wrap').addClass('active');
        $('.toast_popup').removeClass('on');
        $('.toast_popup').eq(btnIndex).addClass('on');
        $('body').css("overflow","hidden");
    });
    
    $(document).on('click','.toast_next',function(){
        var btnIndex = $('.toast_next').index(this);
        $(this).parents('.toast_popup_wrap').removeClass('active');
        $('.fake_dim').addClass('on');
        setTimeout(function(){
            $('.toast_popup').removeClass('on');
            $('.toast_popup_wrap').addClass('active');
            $('.toast_popup').eq(btnIndex).next('.toast_popup').addClass('on');
        },300);
        setTimeout(function(){
            $('.fake_dim').removeClass('on');
        },500);
    });
    
    $(document).on('click','.toast_exit',function(){
        $('.toast_popup_wrap').removeClass('active');
        $('body').removeAttr("style");
    });
    
    
    $(document).on('click','.footer_pop_btn',function(){
        var btnIndex = $('.footer_pop_btn').index(this);
        var ww = $(window).width();
        
        footerPopOpen();
        $('.footer_popup_wrap .popup').eq(btnIndex).addClass('on');    
    });
    $(document).on('click','.exit_footer_pop',function(){
        footerPopClose();
    });
    
    // Crose Browsing
    // iOS Mobile Web
    whSet();
    $(window).on('resize',function(){
        whSet();
        var hasChk = $('#wrap').find('.inner_scroll_contents').length;
        if(hasChk>0){
            srcollSet();
        }
        footerSet();
    });
    
    $('html, body').scroll(function(){
        var top = $(this).scrollTop();
        $('.gnb_area').css('top',top+"px");
    });
    
    
    // GNB
    $(document).on('click','.open_gnb',function(){
        $('.gnb_area').addClass('on');
        $('body').css("overflow-y","hidden");
    });
    $(document).on('click','.gnb_exit',function(){
        $('.gnb_area').removeClass('on');
        $('body').removeAttr("style");
    });
    
    // IE 호환성
    var agent = navigator.userAgent.toLowerCase();
    if ( (navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1)) {
         $(document).on('focus','.input_box input',function(){
             $(this).removeAttr('style');
             $(this).removeClass('valid');
             $(this).addClass('focus');
         });
         $(document).on('focusout','.input_box input',function(){
             var valLth = $(this).val().length;
             if(valLth!=0){
                $(this).addClass('valid');
             }
             else {
                 $(this).removeClass('valid');
             }
             $(this).removeClass('focus');
         });
    }
    
    // Input
    $('.input_box.type02 input').eq(1).on('focus',function(){
        var fInput = $(this).siblings('input');
        
        if(fInput.val()==''){
            fInput.focus();
        }
        else { 
            $(this).prev().prev('label').addClass('focus');
        }
    });
    $('.input_box.type02 input').eq(1).on('focusout',function(){
        $(this).siblings('label').removeClass('focus');
    });
    $('.input_box.type02 input').eq(0).on('keydown keyup',function(e){
        var valLth = $(this).val().length;
        var keyCode = e.keyCode;
        if(valLth == 6 && keyCode != '46' && keyCode != '8'){
            $(this).siblings('input').focus();
        }
    });
    
    $('.input_box.type03 select').on('change',function(){
        $(this).siblings('label').addClass('focus');
        $(this).siblings('input').focus();
    });
    $('.select_box.type01 select').on('change',function(){
        var selectVal = $(this).val();
        if(selectVal != 'default'){
            $(this).addClass('valid');
        }
        else {
            $(this).removeClass('valid');
        }
    });
    
    $('.input_box.type03 select').on('focusout',function(){
        var selectVal = $(this).val();
        
        $(this).siblings('label').removeClass('focus');
        if(selectVal != 'default') {
            $(this).siblings('label').addClass('valid');
        }
    });
    $('.input_box.type03 select').on('click',function(){
        $(this).siblings('label').addClass('focus');
    });
    
    $('.input_box.type03 input').on('focusout',function(){
        var valLth = $(this).val().length;
        
        $(this).siblings('label').removeClass('focus');
        
        if(valLth != 0){
            $(this).siblings('label').addClass('valid');
        }
    });
    $('.input_box .clear').on('mousedown', function () {
        $(this).siblings('input').val('').change();
    });
    $('.input_box input').each(function(){
        var thisVal = $(this).val();
        
        if(thisVal != ""){
            $(this).addClass('valid');
        }
    });
    // tooltip
    $('.tooltip i').on('click',function(){
        var onChk = $(this).parent().hasClass('on');
        var iconTop = $(this).parent().position().top;
        
        $(this).siblings('span').css('top',(iconTop+20)+'px');
        if(!onChk){
            $('.tooltip').removeClass('on');
            $(this).parent().addClass('on');
        }
        else{
            $(this).parent().removeClass('on');
        }
    });
    $('.tooltip .exit').on('click',function(){
        $(this).parents('.tooltip').removeClass('on');
    });
    
    // Tap Menu
    $(document).on('click','.tab_title_area > li',function(){
        var index = $(this).index();
        $('.tab_title_area > li').removeClass('on');
        $(this).addClass('on');
        $(this).parent('.tab_title_area').siblings('.tab_contents_area').children('.contents').removeClass('on');
        $(this).parent('.tab_title_area').siblings('.tab_contents_area').children('.contents').eq(index).addClass('on');
    });
    
    // Drop Down Q&A
    $(document).on('click','.tab_click_area',function(){
        var textHi = 0;
        var answerChk = $(this).siblings('.bot_area').children('.inner_bot_text').length;
        var onChk = $(this).children('.top_area').hasClass('on');
        
        if(!onChk){
            $(this).parent().siblings().find('.bot_area').css('height','0px');
            $(this).parent().siblings().find('.top_area').removeClass('on');
            textHi += $(this).siblings('.bot_area').children('.bot_text_wrap').outerHeight(true);
            $(this).siblings('.bot_area').css('height',textHi);
        }
        else {
            $(this).siblings('.bot_area').css('height','0px');
        }
        $(this).children('.top_area').toggleClass('on');
        
    });
    
    // 브라우저 체크, 알림 추가
    var ww = $(window).innerWidth();
    var userAgent = window.navigator.userAgent.toLowerCase();
    var isChrome = userAgent.indexOf('chrome'); 
    var isEdge = userAgent.indexOf('edge');


    if(isChrome <= -1 && isEdge <= -1 && ww > 512){
        $('.browser_chk_area').addClass('on');
    }


    $('.browser_chk_area .exit_btn').on('click', function(){
        $('.browser_chk_area').removeClass('on');
    });


    $(window).scroll(function(){
        $('.browser_chk_area').removeClass('on');
        
        // 메인 프로팅 버튼 - 20220228
        floatBtnSet();
        mainFloatBtnSet();
        footerSet();
    });
    
    
    // 메인 드롭다운
    $(document).on('click','.box.drop_type .title_area',function(){
        var activeChk = $(this).parent().hasClass('active');
        var areaHi = $(this).siblings('.drop_area').outerHeight(true);
        
        if(!activeChk){
            $(this).parent().addClass('active');
            $(this).parent().css('height',(areaHi+66)+'px');
        }
        else {
            $(this).parent().removeClass('active');
            $(this).parent().css('height','66px');
        }
    });
    
    // 필그램 헤더 광고 영역 드롭다운
    $(document).on('click','header .pillgram_ad_btn',function(){
        var onChk = $(this).hasClass('on');
        var adLinkHi = $('.pillgram_ad_area img').outerHeight();
        var tabLth = $('.contents_area .tab_fixed_area').length;
        
        if(!onChk && tabLth > 0){
            $('.contents_area .tab_fixed_area').css('top',(60+adLinkHi)+'px');
        }
        else {
            $('.contents_area .tab_fixed_area').css('top','60px');
        }
        
        if(!onChk){
            $('.pillgram_ad_area').css('height',adLinkHi+'px');
            $('.contents_area').css('padding-top',(60+adLinkHi)+'px');
            $(this).addClass('on');
        }
        else {
            $('.pillgram_ad_area').css('height','0px');
            $('.contents_area').css('padding-top','60px');
            $(this).removeClass('on');
        }
    });
    $(document).on('click','.pillgram_ad_area .exit_pillgram_ad',function(){
        $('.pillgram_ad_area').css('height','0px');
        $('.contents_area').css('padding-top','60px');
        $('.contents_area .tab_fixed_area').css('top','60px');
        $('header .pillgram_ad_btn').removeClass('on');
    });
});

window.onload = function(){
    var hasChk = $('#wrap').find('.inner_scroll_contents').length;
    if(hasChk>0){        
        srcollSet();
    }
    // 메인 프로팅 버튼 - 20220228
    floatBtnSet();
    mainFloatBtnSet();
    footerSet();
    
    var agent = navigator.userAgent.toLowerCase();
    if ( (navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1)) {
         $('.input_box input').each(function(){
             var valLth = $(this).val().length;
             if(valLth!=0){
                 $(this).addClass('focus');
                 $(this).css('padding-top','4px');
             }
         });
    }
}

function footerSet() {
    var top = $(this).scrollTop();
    var wh = $(window).innerHeight();
    var conHi = $('.contents_area').outerHeight(true);

    if( (top + wh + 96) > conHi){
        $('.bot_btn_area.posF').addClass('footerSet');
    }
    else{
        $('.bot_btn_area.posF').removeClass('footerSet');
    }
}

//Main Popup
function popupOpen() {
    $(".pc_pop_wrap").addClass("on");
    $(".pc_pop_wrap .dim").addClass("on");
    $('.popup_wrap').addClass('on');
    $('body').css("overflow","hidden");
}
function popupClose() {
    $(".pc_pop_wrap").removeClass("on");
    $(".pc_pop_wrap .dim").removeClass("on");

    $('.popup_wrap').removeClass('on');
    $('body').removeAttr("style");
    $('.popup').removeClass('on');
}
function termsOpen() {
    $('.terms_wrap').addClass("on");
    $('body').css("overflow","hidden");
}
function termsClose() {
    $('.terms_wrap').removeClass('on');
    $('body').removeAttr("style");
    setTimeout(function(){
        $('.terms_popup').removeClass('on');
    },500);
}

function whSet(){
    var wh = $(window).innerHeight();
    var btnChk_posA = $('.bot_btn_area').hasClass('posA');
    var btnChk_posF = $('.bot_btn_area').hasClass('posF');
    var innerChk = $('.inner_scroll_contents').length;
    if(innerChk>0){
        $('.contents_area').css('min-height',wh+'px');
    }
    else {
        $('.contents_area').css('min-height',wh+'px');
        if( wh<565 && btnChk_posA){
            $('.contents_area').css('min-height','640px');
        }else{
            $('.contents_area').css('min-height',wh+'px');
        }
    }
}
function srcollSet(){
    var calcHi = $('header').outerHeight(true) + $('.fix_type_title').outerHeight(true) + $('.bot_btn_area').outerHeight(true);
    var ww = $(window).innerWidth();
    var wh = $(window).innerHeight();
    
    if(ww<512 && wh<580){
        $('.inner_scroll_contents').not('.hi_typeS').css('height','278px');
        
        $('.bot_btn_area.posA').css('position','static');
    }
    else {
        $('.inner_scroll_contents').not('.hi_typeS').css('height','calc('+ wh +'px - '+ calcHi +'px)');
        $('.bot_btn_area.posA').css('position','absolute');
    }
}

// 서브페이지 프로팅 버튼 - 20220228
function floatBtnSet() { 
    var floatChk = $('.bot_btn_area').hasClass('type_floating');
    var scrollTop = $(window).scrollTop();
    var totalHi = $('.contents_area').outerHeight();
    var wh = $(window).innerHeight();
    var botHi = 113+40+24;
    // 113(다운로드 영역)+40(다운로드 상단 여백)+24(페이지 하단 여백)
    if(!!floatChk){
        if((wh+scrollTop+botHi)>totalHi){
            $('.bot_btn_area.type_floating').addClass('fix');
        }
        else {
            $('.bot_btn_area.type_floating').removeClass('fix');
        }
    }
}
// 메인페이지 프로팅 버튼 - 20220308
function mainFloatBtnSet() { 
    var floatChk = $('.main_btn_area').hasClass('type_floating');
    var scrollTop = $(window).scrollTop();
    var totalHi = $('.contents_area').outerHeight();
    var wh = $(window).innerHeight();
    var botHi = 124+40;
    // 124(푸터 영역)+40(하단 여백)
    if(!!floatChk){
        if((wh+scrollTop+botHi)>totalHi){
            $('.main_btn_area.type_floating').addClass('fix');
        }
        else {
            $('.main_btn_area.type_floating').removeClass('fix');
        }
    }
    
}


var bannerEye = bodymovin.loadAnimation({
    container: document.getElementById('icon_eye'), // Required
    path: '../resources/lottie/icon_eye.json', // Required
    renderer: 'svg', // Required
    loop: true,
    autoplay: true
});
var bannerFish = bodymovin.loadAnimation({
    container: document.getElementById('icon_fish'), // Required
    path: '../resources/lottie/icon_fish.json', // Required
    renderer: 'svg', // Required
    loop: true,
    autoplay: true
});
var bannerEgg = bodymovin.loadAnimation({
    container: document.getElementById('icon_egg'), // Required
    path: '../resources/lottie/icon_egg.json', // Required
    renderer: 'svg', // Required
    loop: true,
    autoplay: true
});