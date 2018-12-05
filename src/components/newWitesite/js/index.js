$(".header").hover(function () {
        if($(document).scrollTop()<=100) {
            $(this).addClass("on");
        }
    },
    function () {
        if($(document).scrollTop()<=100) {
            $(this).removeClass("on");
        }
    }
);

$(window).scroll(function(){
    if($(document).scrollTop()>=100){
        // $("#nav").fadeIn("slow");
        $("header").addClass("on");
    }else{
        // $("#nav").fadeOut("slow");
        $("header").removeClass("on");
    }

});

//如果登录了后台，返回工作台按钮显示，可直接返回后台
let id = $.cookie("enterpriseId");
if(id !=null){
    $(".goToWorkbench").css("display","inline-block").prev().hide();
}
