# oakeditor
网页在线编辑器，css用的ck的，ck的编辑器太臃肿了，就按组自己的需求用原生js重写了。

![image](https://github.com/chouyou/oakeditor/blob/main/img/13.jpg)

![image](https://github.com/chouyou/oakeditor/blob/main/img/12.jpg)
# 新建
```
script src="./js/oakeditor/oakeditor.js" charset="utf-8"></script>
<link rel="stylesheet" type="text/css" href="./js/oakeditor/oakeditor.css">
    <form id="form1" name="form1" method="post" action="<?php echo $_SERVER['PHP_SELF']?>" onsubmit="return data_check()">
    <p><input type="text" name="title" autocomplete="off" placeholder='标 题' style='width:100%;' /></p>
    <p><input type="text" name="keyword" autocomplete="off" value='关键字' style='width:100%;' /></p>
    <input name="id" type="hidden" value="<?php echo $this->id;?>" />
    <input name="pid" type="hidden" value="<?php echo $this->pid;?>" />
    <textarea  rows="20" cols ="60" id="editor" name="body"></textarea>
    
    <input type="submit" name="Submit" value="提交" />
    </form>
    <div id ="image_output"></div>
<script>
window.onload=function(){
    /* 配置富文本编辑器 */
    oakedit=OakEditor.init({
        postVarsPerFile:{'id':form1.id.value,'pid':form1.pid.value},
        height:"20rem", //document.body.offsetHeight+'px',
        uploadURL:document.baseURI+'index.php/upload/write',
        downURL:'getfile.php',
        delURL   :document.baseURI+'index.php/upload/del',
        listURL  :document.baseURI+'index.php/upload/ls',
        fileView :"#image_output",
        submit:document.form1.Submit
    });
    oakedit.render('#editor');
};

/*  */
function data_check(e){
    document.form1.querySelectorAll('input,textarea').forEach(i=>{if(i.value.length<1)return false})
    return true;
}
/* 删除上传的无用文件及目录 */
function delfile(e){
    //let form1data = new FormData(document.form1);
    let form1data = new FormData();
    form1data.append('file_check','1');
    form1data.append('id',document.form1.id.value);
    form1data.append('pid',document.form1.pid.value);
    let ajaxInit = {
	        method: "POST",
  			credentials: "include",	
  			body: form1data,
    };
    setTimeout(fetch(document.URL,ajaxInit),100);
}
//window.addEventListener('beforeunload',delfile);
window.addEventListener('unload',delfile);
</script>
```
# 编辑
```
<script src="./js/oakeditor/oakeditor.js" charset="utf-8"></script>
<link rel="stylesheet" type="text/css" href="./js/oakeditor/oakeditor.css">

<h4 class="edit_text_title "><?php echo $this->res['0']['TITLE']; ?><--/h4>
<!-- 本页关键字编辑部分 ，js更新 -->
<h4 class="edit_text_keyword "></h4>
<div class="edit_text_body ">***</div>

/* 富文本编辑器配置及调用 
* toolBar:['heading','|','bold','italic','createlink','insertunorderedlist','insertorderedlist','createimg','blockquote',
* 'table','undo','redo','code'],
*/

Editor=OakEditor.init({
	height:'2em',
	postVarsPerFile:{'id':'<?php echo $this->res['0']['ID']?>','pid':'<?php echo $this->res['0']['PID']?>'},
	uploadURL:document.baseURI+'index.php/upload/write',
	downURL:document.baseURI+'getfile.php',
	delURL   :document.baseURI+'index.php/upload/del',
	listURL  :document.baseURI+'index.php/upload/ls',
	fileView :"#image_output",
	//toolBar:['bold','italic','insertunorderedlist','insertorderedlist',],
})

upInit = {
	method: "POST",
  	credentials: "include",
  	headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
  	cache: "no-cache"   
};
/*   页面编辑开关 */
isEdit=0;
/*   需要调用编辑器的所有节点 */
upkey = document.querySelector('.edit_text_keyword');

function txtedit(e)
{
	isEdit=!isEdit;
	if(isEdit){
		upkey.innerHTML=document.querySelector('meta[name="keywords"]').getAttribute('content');
		Editor.start('[class^="edit_text_"]');
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
```
