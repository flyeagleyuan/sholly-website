// JavaScript Document

var zIndex=1;

var oLightBox=document.getElementById('send-form');
	var oBtn=document.getElementById('send');
	var oClose=document.getElementById('close');
	var oSend=document.getElementById('send-btn');
	var oUser=document.getElementById('username');
	var oContent=document.getElementById('content');
	var oMain=document.getElementById('main');
	
	oBtn.onclick=function(){
		oLightBox.style.display='block';	
	};
	oClose.onclick=function(){
		oLightBox.style.display='none';	
	};
	
	//发布一条愿望
	oSend.onclick=function(){
		oLightBox.style.display='none';	
		//wish.php?act=add&username=xxx&content=xxx
		ajax({
			url:	'wish.php',
			data:	{
				act:'add',
				username:oUser.value,
				content:oContent.value
			},
			success:function(str){
				//{error:1, msg:xxx, id: 心愿ID, time: 1435567718}
				//No.00001		
				var json=eval('('+str+')');
				if(json.error==0){
					createMsg(json.id,oUser.value,oContent.value,json.time);
				}
			}	
		});
	};
	function createMsg(id,user,content,time){
		var oDl=document.createElement('dl');
		oDl.className='paper a'+ rnd(1,6);
		oDl.innerHTML=
'<dt>\
<span class="username">'+user+'</span>\
<span class="num">'+fillZero(id)+'</span>\
</dt>\
<dd class="content">'+content+'</dd>\
<dd class="bottom">\
<span class="time">'+time+'</span>\
<a href="javascript:;" class="close"></a>\
</dd>';
		var oRemove=oDl.getElementsByTagName('a')[0];
		oRemove.onclick=function(){
			//wish.php?act=delete&id=0;
			var oFm=window.confirm('是否删除');
			if(oFm){
				ajax({
				url:	'wish.php',
				data:	{act:'delete',id:id},
				success:function(str){
					//{error:1, msg:xxx}
					var json=eval('('+str+')');
					if(json.error==0){
						oMain.removeChild(oDl);
						//oRemove.parentNode.parentNode.parentNode.removeChild(oRemove.parentNode.parentNode);
					}
				}	
			});	
			}
			
		};
		oMain.appendChild(oDl);

		//随机定位
		oDl.style.left=rnd(0,oMain.offsetWidth-oDl.offsetWidth)+'px';
		oDl.style.top=rnd(0,document.documentElement.clientHeight-126-oDl.offsetHeight)+'px';
		
		//添加拖拽
		drag(oDl.children[0]);	
	}
	
	//获取所有愿望
	getWish();
	
	function getWish(){
		//wish.php?act=get
		
		ajax({
			url:	'wish.php',
			data:	{act:'get'},
			success:function(str){
				
				//{error:0, msg:[{'id':1, 'username':'xxx', 'content':'xxx', time: 1435567718},{},{},{}.......]}
				var json=eval('('+str+')');
				if(json.error==0){
					var arr = json.msg;
					for(var i=0;i<arr.length;i++){
						createMsg(arr[i].id,arr[i].username,arr[i].content,arr[i].time);	
					}	
				}
			}	
		});	
		
		
	}
	
	
	function drag(obj){
	obj.onmousedown=function(ev){
		obj.parentNode.style.zIndex=zIndex++;
		obj.parentNode.style.opacity=.5;
		var e=ev||event;
		var disX=e.clientX-obj.parentNode.offsetLeft;
		var disY=e.clientY-obj.parentNode.offsetTop;	
		document.onmousemove=function(ev){
			var e=ev||event;
			obj.parentNode.style.left=e.clientX-disX+'px';
			obj.parentNode.style.top=e.clientY-disY+'px';
		};
		document.onmouseup=function(){
			document.onmousemove=document.onmouseup=null;
			obj.parentNode.style.opacity=1;	
		};
		return false;
	};	
}
function rnd(n,m){return parseInt(n+Math.random()*(m-n))}
function fillZero(n){
	//No.00019
	if(n<10){
		return 'No.0000'+n;	
	}else if(n<100 && n>=10){
		return 'No.000' +n;	
	}else if(n<1000 && n>=100){
		return 	'No.00' +n;	
	}else if(n<10000 && n>=1000){
		return 'No.0'+n;
	}else if(n<100000 && n>=10000){
		return 'No.'+n;
	}
}
