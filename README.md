# oakeditor
网页在线编辑器，css用的ck的，ck的编辑器太臃肿了，就按组自己的需求用原生js重写了。

<script src="./js/oakeditor/oakeditor.js" charset="utf-8"></script>
<link rel="stylesheet" type="text/css" href="./js/oakeditor/oakeditor.css">

<div class="edit_text_body ">***</div>


upInit = {
	method: "POST",
  	credentials: "include",
  	//	headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
  	cache: "no-cache"   
};
/* 页面编辑开关 */
isEdit=0;
/* 需要调用编辑器的所有节点，依据需求编写*/
upkey = document.querySelector('.edit_text_keyword');
function txtedit(e)
{
	isEdit=!isEdit;
	if(isEdit){
		upkey.innerHTML=document.querySelector('meta[name="keywords"]').getAttribute('content');
		Editor.start('[class^="edit_text_"]')
		e.innerHTML=' 保存 ';
	
	}else{
		Editor.clear();
		e.innerHTML=' 编辑 ';
		upInit.body = new FormData();
		upInit.body.append('title',document.querySelector('.edit_text_title').textContent);
		upInit.body.append('keyword',document.querySelector('.edit_text_keyword').textContent);
		upInit.body.append('body',document.querySelector('.edit_text_body').innerHTML);
		fetch(e.href,upInit).then((response) => {return response.text();}).then((text) => {
			//location.reload();
		});
	   upkey.innerHTML='';	
	}
};
