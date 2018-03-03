// JavaScript Document
window.onload=function(){
	
	function collespNav(navHeight){
		var eleFix = document.getElementsByClassName("nav-box")[0];
		window.onscroll = function() {
		  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		  if(scrollTop > navHeight){
			  eleFix.setAttribute('class','position-fix');
		  }else{
			  eleFix.setAttribute('class','nav-box');
		  }
		}
	}
	
	collespNav(80);
};