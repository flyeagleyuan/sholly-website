// JavaScript Document
function sendEmail(){
    alert(2);
 var name=$(".name").val(),
  email=$(".email").val(),
  message=$(".sleepcat-message textarea").val(),
  body="My Name is: "+name+"%0a%0d"
   +"My Email Address is: "+email+"%0a%0d"
   +"Message:"+message+"%0a%0d";
 $("#send").attr("href","mailto:sholly1102@163.com?body="+body);
    document.getElementById("send").click();
    console.log(body);

}

window.onload = function () {
    $(".summit").click(sendEmail);

};
