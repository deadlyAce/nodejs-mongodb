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

$("#inputClassNumber").blur(function(){
	isnull($('#inputClassNumber'));
});

$("#inputPassword").blur(function(){
	isnull($('#inputPassword'));
});


$("#cancel").click(function(){
	$("#inputName").parent().parent().removeClass("has-success");
	$("#inputName").parent().parent().removeClass("has-error");
	$("#inputClassNumber").parent().parent().removeClass("has-success");
	$("#inputClassNumber").parent().parent().removeClass("has-error");
	$("#inputPassword").parent().parent().removeClass("has-success");
	$("#inputPassword").parent().parent().removeClass("has-error");
});

//$("#sub").click(function(){
//          var usernames = $("#inputName").val();
//          var classnumber=$("#inputClassNumber").val();
//          var password = $("#inputPassword").val();
//          var email=$("#inputEmail").val();
//          var nation=$("#select").val();
//          var interest=$("#textArea").val();
//          var gender=$("input[name='optionsRadios']:checked").val();
//          var data = {"user":usernames,"num":classnumber,"pass":password,"email":email,"nation":nation,"interest":interest,"gender":gender};
//          $.ajax({ 
//              url:'/register',
//              type:'post',
//              data: data
//      });
//   });