/* 
* @Author: Marte
* @Date:   2017-04-17 17:40:30
* @Last Modified by:   Marte
* @Last Modified time: 2017-04-17 21:04:12
*/


$("#info").click(function(){
   if($(".arrow").attr("src")=="/images/left.svg")
   {
    $(".arrow").attr("src","/images/down.svg");
    $("#info").addClass("action");
   }
   else
   {
    $(".arrow").attr("src","/images/left.svg");
    $("#info").removeClass('action');
   }
   $(".info-ul").toggle(500); 
  });


 function clientPost(url,data){ $.ajax({  url:url , type:'post' , data:data });}

 function Getajax(url,fn){$.ajax({ type: "get",  url: url,  data: {}, dataType: "json",   success: function(data){ fn(data);}});}
 

 	$(function() {
 		getSession();
 	var data={"page":1};
	$.ajax({ 
                url:'/page',
                type:'get',
                data: data,
                success:function(data){
                	$('#question-content').empty();
				  	 for (var i in data) {
				       $("#question-content").append('<table border="0" class="content-table"><tr><td width="550px"><img src="/images/piture.svg"  align="left"/><text class="font">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+data[i].question+'</text> </td></tr><tr><td width="50%">发表者：<span>'+data[0].username+'</span> <span style="float: right;">发表日期：'+data[0].time+'</span></td></tr></table>');
				     }
                }
      });
 	});

	function getSession(){
		    $.ajax({ 
                url:'/session',
                type:'get',
                data: {},
                success:function then(data){
 			if(data.user==undefined){
       	    $(".user-name").text("Login your account");
       }
       else{
       		$(".user-name").text(data.user);
       } 
 		}
        });
 		
	};
	
	 $("#question").click(function(){ 
	 	if($(".user-name").text()!="Login your account"){
	        var content = $("#content").val();
            var tTime=new Date  ().toLocaleString()+' 星期'+'日一二三四五六'.charAt(new Date().getDay  ());
            var data= {"content":content,"time":tTime};  
            clientPost('/question',data);
	   		}else{
	   			alert("Login your account");
	   		}
        });  
        
        
    $('#information').click(function(){
    	if($(".user-name").text()!="Login your account"){
    		$('#context').hide();
    		$('#Modify').hide();
    		$('#userinfo').show();
    		Getajax("/userinfo",then);
    		function then(data){
    		$('#inputName').val(data[0].username);
    		$('#inputClassNumber').val(data[0].classnumber);
    		$('#inputPassword').val(data[0].password);
    		$('#inputEmail').val(data[0].email);
    		$('#select').val(data[0].nation);
    		$('#textArea').val(data[0].interest);
    		if(data[0].gender=="man"){
    			$("input[name=optionsRadios][value=man]").attr("checked",true);
    		}else{
    			$("input[name=optionsRadios][value=woman]").attr("checked",true);
    		}
    	};
    	}else{
    		alert("Login your account");
    	}
    	
    });
    
    $('#sub').click(function(){
            var usernames = $("#inputName").val();
            var classnumber=$("#inputClassNumber").val();
            var password = $("#inputPassword").val();
            var email=$("#inputEmail").val();
            var nation=$("#select").val();
            var interest=$("#textArea").val();
            var gender=$("input[name='optionsRadios']:checked").val();
            var data = {"user":usernames,"num":classnumber,"pass":password,"email":email,"nation":nation,"interest":interest,"gender":gender};
            $.ajax({ 
                url:'/userinfoUpdate',
                type:'post',
                data: data
        });
        $('.content').hide();
    	$('#context').show();
    	
    });
    
$('#information').hover(  
    function() {  
         this.style.cursor = 'pointer';  
    }  
);
$('#image-li').hover(  
    function() {  
         this.style.cursor = 'pointer';  
    }  
);
$('#modify-pass').hover(  
    function() {  
         this.style.cursor = 'pointer';  
    }  
);
$('#My-content').hover(  
    function() {  
         this.style.cursor = 'pointer';  
    }  
);

$('#info').hover(  
    function() {  
         this.style.cursor = 'pointer';  
    }  
);
$('.pagination li').hover(  
    function() {  
         this.style.cursor = 'pointer';  
    }  
);


$('#modify-pass').click(  function(){
	if($(".user-name").text()!="Login your account"){
	    $('.content').hide();
   		$('#Modify').show();
   }else{
   		alert("Login your account");
   }		 
}

);
   $('#image-li').click(  function(){
   		$('.content').hide();
    	$('#context').show();
    	
    }  
);


$('#find').click(function(){
		var content=$("#content").val();  
        var data = {"content":content};
		$.ajax({ 
                url:'/find',
                type:'get',
                data: data,
                success:function then(data){
                	 var hasProp = false;  
				    for (var prop in data){  
				        hasProp = true;  
				        break;  
				    }
				    if (hasProp){
				    		$("#result").empty();
             				for (var i in data) {
             				$("#result").append(
             				'<table border="0" class="content-table"><tr><td width="550px"><img src="/images/piture.svg"  align="left"/><text class="font">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+data[i].question+'</text> </td></tr><tr><td width="50%">发表者：<span>'+data[0].username+'</span> <span style="float: right;">发表日期：'+data[0].time+'</span></td></tr></table>');
             		}
		     	  }
		       		else{
		       			$("#result").empty();
		       			$("#result").append("<p class='lead content-p'>"+"问题不存在</p>");
		       	
		      	 } 
 		}
        });
        $('.content').hide();
    	$('#result').show();
});


$('#My-content').click(function(){
	 Getajax( "/Myquestion",then)
         function then(data){
         	if(data!=""){
             		$("#result").empty();
             		for (var i in data) {
             		$("#result").append(
             		'<table border="0" class="content-table"><tr><td width="550px"><img src="/images/piture.svg"  align="left"/><text class="font">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+data[i].question+'</text> </td></tr><tr><td width="50%">发表者：<span>'+data[0].username+'</span> <span style="float: right;">发表日期：'+data[0].time+'</span></td></tr></table>');
             		}
             	}
             	else{
             		$("#result").empty();
             		$("#result").append("<p class='lead content-p'>"+"你还没有提问任何问题，欢迎来加入我们吧！</p>");
             	}
         };
	$('.content').hide();
    $('#result').show();
});


$('#updatePass').click(function(){
	var oldpass=$('#inputPass-modify').val();
	var newpass=$('#checkPass-modify').val();
	var data={"oldpass":oldpass,"newpass":newpass};
	$.ajax({ 
                url:'/update-pass',
                type:'post',
                data: data,
                success:function then(data){
                	if(data[0].messege=="输入的密码错误!"){
                		alert(data.messege); 
                	}else{
                		window.location.href='./login.html'; 
                	}
 			}
       });
});


$(".pagination li").click(function () {
    var index = $("ul li").index(this)-14;
    var data={"page":index};
	$.ajax({ 
                url:'/page',
                type:'get',
                data: data,
                success:function(data){
                	$('#question-content').empty();
				  	 for (var i in data) {
				       $("#question-content").append('<table border="0" class="content-table"><tr><td width="550px"><img src="/images/piture.svg"  align="left"/><text class="font">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+data[i].question+'</text> </td></tr><tr><td width="50%">发表者：<span>'+data[0].username+'</span> <span style="float: right;">发表日期：'+data[0].time+'</span></td></tr></table>');
				     }
                }
      });
 });
 



