document.body.onselectstart = function () { 
    return false; 
};

function isnull(id){
	if(id.val()){
		id.parent().parent().removeClass("has-error");
		id.parent().parent().addClass("has-success");
	}
	else{
		id.parent().parent().removeClass("has-success");
		id.parent().parent().addClass("has-error");
	}
};

$("#inputName").blur(function(){
	isnull($('#inputName'));
});

$("#inputPassword").blur(function(){
	isnull($('#inputPassword'));
});

$("#inputCode").blur(function(){
	isnull($('#inputCode'));
});

$("#cancel").click(function(){
	$("#inputName").parent().parent().removeClass("has-success");
	$("#inputName").parent().parent().removeClass("has-error");
	$("#inputPassword").parent().parent().removeClass("has-success");
	$("#inputPassword").parent().parent().removeClass("has-error");
	$("#inputCode").parent().parent().removeClass("has-success");
	$("#inputCode").parent().parent().removeClass("has-error");
});

$('.change').click(function(){codeNum=codeNumber()});

 
 
/*改变change区域的鼠标光标样式*/
 $('.change').hover(  
    function() {  
         this.style.cursor = 'pointer';  
    }  
);
 
function codeNumber(){
	for(var i in $('.img-code')){
		$('.img-code')[i].src="/images/"+parseInt(Math.random() * (9 - 1 + 1) + 1)+".svg";
	}
};




$('.btn-primary').click(function(){
	if($('#count').text()>2){
		if($("#inputName").val() && $("#inputPassword").val() && $('#inputCode').val()){
			if($('#inputCode').val()==$("#one").attr("src").replace(/[^0-9]/ig,"")+$("#two").attr("src").replace(/[^0-9]/ig,"")+$("#three").attr("src").replace(/[^0-9]/ig,"")+$("#four").attr("src").replace(/[^0-9]/ig,"")){
				return true;
			}else{
				$(".message").text("您输入的验证码有错，请重新输入！");
				
				return false;
			}
			
		}else{
			isnull($('#inputName'));
			isnull($('#inputPassword'));
			isnull($('#inputCode'));
			return false;
		}
	}else{
		if($("#inputName").val() && $("#inputPassword").val()){
			return true;
		}else{
			isnull($('#inputName'));
			isnull($('#inputPassword'));
			return false;
		}
	}
});



$(window).load(function(){
	if($(".message").text()){
		$('.alert-dismissible').show(500);
	}else{
		$('.alert-dismissible').hide();
	}
	codeNumber();
	if($('#count').text()>2){
		$('#code').show();
	}else{
		$('#code').hide();
	}
});