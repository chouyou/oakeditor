export class oakupfiles {
    constructor(o) {
        this.editor=null,
        this.bodyNode=null,
        this.footNode=null,
        this.selectnode=null,	
        this.uploadURL="./upload/upload.php/write",
        this.delURL="./upload/upload.php/del",
        this.listURL="./upload/upload.php/list",
        this.downURL="./upload/getfile.php",               
        this.simLimit = 5,                                      
        this.fileFilters=  ['php','pl'],                            
        this.fileFilterFunction= null,                            
        this.fileFieldName="Filedata",                           
        this.appendNewFiles =  false,                            
        this.uploadHeaders={},                            
        /* _POST额外的数据 */
        this.postVarsPerFile={},                            
        this.withCredentials= true,                                 
        this.retryCount= 3,
        this.body=null,
        this.foot=null,
        this._fileInputField= null,
        this._buttonBinding= null,
        this.queue= null,
        this.fileList=[],
        this.id='dsfwe-wfawef-trgtr-jyklo-luiasd',
        this.HTML5FILEFIELD_TEMPLATE= "<input id='oakupfile' type='file' style='visibility:hidden; width:0px; height: 0px;'>",
        this.IMGHTML_TM = "<div style='float:left;border:1px solid #CCCCCC;'><img /><div><button style='float: left;' name='__del'>删除"+
                    "</button><button name='__insert' style='float: right;'>插入</button></div></div>",
        this.oInit = {
            method: "POST",
            credentials: "include",
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
      		cache: "no-cache"   
        },
        Object.assign(this,o);
    }

    /**触发事件*/
    fire(s,o={},n=document){
        let evt = new Event(s);
        Object.assign(evt,o);
        n.dispatchEvent(evt);
    }
    _footFn(e){
        e.stopPropagation()
        let t=e.target.getAttribute('name');
		try{ 
			if(t && typeof(this[t])=="function"){ 
 				this[t].call(this,e);
			}else{ } 
		}catch(e){ } 
    }
    updata(){
		this.body.innerHTML = '';
		this.oInit.body = this._postSTR();
		fetch(this.listURL,this.oInit).then((response) => {return response.json();}).then((o) => {
			this.body.appendChild(this._Refresh(o.url,o.files,o.path));	
    	});  
    }
	__del(e){
		this.oInit.body = this._postSTR()+'filename='+e.target.getAttribute('data-fname');
		fetch(this.delURL,this.oInit).then((response) => {return response.text();}).then((text) => {
			if(text == 1) e.target.parentNode.parentNode.remove(true);
    	});         
    }
	__insert(e){
		let mime,n = e.target,s,t,d;
		mime = n.dataset.mime;
        t = this._postSTR()+'filename='+n.getAttribute('data-fname');
        d = this.downURL+'?type=albums&'+t;
        t = this.downURL+'?type=640&'+t;
        if (mime.indexOf('image')!= -1)
        {
            s=`<img  src="${t}" data-src="${t}" />`;
        }else if(mime.indexOf('audio')!= -1)
        {
            s=`<audio src="${d}" controls="controls"></audio>`;
		}else if(mime.indexOf('video')!= -1)
        {
            s=`<video src="'${d}" controls="controls"></video>`;
		}else
        {
            s=`<a href="${d}">${n.n.dataset.fname}</a>`
        }
        this.editor.insertHTML(s+'<br>');
    }
    _postSTR(){
		let o = this.postVarsPerFile,s='';
        for(let[k,v] of Object.entries(o)){
            s+=`${k}=${v}&`
        }
		return s;
    }
    renderUI(){
        this._fileInputField = this.creatNode(this.HTML5FILEFIELD_TEMPLATE);
        this._fileInputField.setAttribute("multiple", "multiple");
		this.body=this.bodyNode;
        this.foot=this.footNode;
        this.selectnode?this.selectnode.appendChild(this._fileInputField):this.bodyNode.appendChild(this._fileInputField);
    }
    bindUI(){
        this._bindSelectButton();
        this._setFileFilters();       
        this.uploadcomplete=this._uploadcomplete.bind(this);
        this.uploadprogress=this._uploadprogress.bind(this);
        this.uploadEventHandler=this._uploadEventHandler.bind(this);
        this.fileselect=this._upView.bind(this);
       	this._fileInputField.addEventListener("change", this._updateFileList.bind(this));
        //this._fileInputField.addEventListener("click", e=>e.stopPropagation());
        document.addEventListener("fileselect",this.fileselect);
        /** 独立面板时使用 */
		this.body&&this.body.addEventListener('click',this._footFn.bind(this));
        document.addEventListener("uploadcomplete", this.uploadcomplete);
        document.addEventListener("uploadprogress", this.uploadprogress);
        document.addEventListener("uploadstart", this.uploadEventHandler);
        document.addEventListener("totaluploadprogress", this.uploadEventHandler);
        document.addEventListener("alluploadscomplete", this.uploadEventHandler);
        document.addEventListener("uploadcancel", this.uploadEventHandler);
        document.addEventListener("uploaderror", this.uploadEventHandler);
    }
    _upView(e,o){
        e.fileList.filter(file=>{
			let n=this.creatNode(`<progress id="${file.id}"></progress>`);
            this.body.appendChild(n);
       	});
       	this.uploadAll();
    }     
    _uploadprogress(e){
		    this.body.querySelector('#'+e.file.id).setAttribute("value", e.originEvent.percentLoaded);
	  }

    _uploadcomplete(e){
		let t = this.body.querySelector("#"+e.file.id),o;
        try{o=JSON.parse(e.originEvent.data);}catch(error){console.log('错误：'+error.message+e.originEvent.data)};
        t.parentNode.replaceChild(this._Refresh(o.url,o.files,o.path),t);
	  }
    _Refresh(url,files,path=null){
            let t,n,nl,nb,ns=document.createDocumentFragment();
            
		    for(let f in files){
			    n = this.creatNode(this.IMGHTML_TM);
			    if (files[f].indexOf('image')!= -1){
				    n.querySelector('img').src= `${this.downURL}?type=64&${this._postSTR()}filename=${f}`;
			    }else{
				    t = this.creatNode(`<span><img src="${path}/upload/img/file.png"/><div style="width:5rem;">${f}</div></span>`);
				    nb=n.querySelector('img');
                    nb.parentNode.replaceChild(t,nb);
			    }
                nl = n.querySelectorAll('button');
                nl.forEach(el => {
                    el.dataset.fname=f;
                    el.dataset.path=path;
                    el.dataset.mime=files[f];
                });
			    ns.appendChild(n);
		    }
		return ns;
	  }
	  _rebindFileField() {
        this._fileInputField.remove();
        this._fileInputField = this.creatNode(this.HTML5FILEFIELD_TEMPLATE);
        this._fileInputField.setAttribute("multiple", "multiple");
        this.selectnode?this.selectnode.appendChild(this._fileInputField):this.bodyNode.appendChild(this._fileInputField);
        this._fileInputField.addEventListener("change", this._updateFileList.bind(this));
        this._setFileFilters();
    }
    /**打开系统文件选择，文件上传入口*/
    _bindSelectButton() {
        if(this.selectnode)this._buttonBinding = this.selectnode.addEventListener("click", this.openFileSelectDialog.bind(this));
    }
    _setFileFilters() {
        if (this.fileFilters.length > 0) {
            this._fileInputField.setAttribute("accept", this.fileFilters.join(","));
        }
        else {
            this._fileInputField.setAttribute("accept", "");
        }
    }
    openFileSelectDialog() {
        if (this._fileInputField.click) {
            this._fileInputField.click();
        }
    }
    /** 过滤函数遍历文件，并返回FileHTML5 实例数组，如果this.appendNewFiles 为真，加入上次上传的队列 */
    _updateFileList(e) {
        let newfiles = e.target.files,
            parsedFiles = [],
            filterFunc = this.fileFilterFunction,
            oldfiles;
        if (filterFunc) {
            Array.from(newfiles).filter(value=>{
                let newfile = new this.FileHTML5(value);
                if (filterFunc(newfile)) {
                    parsedFiles.push(newfile);
                }
            });
        }
        else {
            Array.from(newfiles).filter(value=>{
                parsedFiles.push(new this.FileHTML5(value));
            });
        }
        if (parsedFiles.length > 0) {
            oldfiles = this.fileList;

            this.fileList = this.appendNewFiles ? oldfiles.concat(parsedFiles) : parsedFiles ;
            
            this.fire("fileselect",{fileList: parsedFiles});
        }
        this._rebindFileField();
    }
    uploadAll(url, postvars) {
        this.uploadThese(this.fileList, url, postvars);
    }
    uploadThese(files, url, postvars) {
        if (!this.queue) {
            let uploadURL = url || this.uploadURL,
                postVars = postvars || this.postVarsPerFile;
                this.queue = new this.UploaderQueue({
                simUploads: this.simLimit,
                fileFieldName: this.fileFieldName,
                fileList: files,
                uploadURL: uploadURL,
                perFileParameters: postVars,
                retryCount: this.retryCount,
                uploadHeaders: this.uploadHeaders,
                withCredentials: this.withCredentials
            });
            this.queue.startUpload();
            this.fire("uploadstart");
        }
        else if (this.queue._currentState === UploaderQueue.UPLOADING) {
            this.queue.perFileParameters=this.postVarsPerFile;
            Array.from(files).filter((file=>{
                this.queue.addToQueueBottom(file);
            }).bind(this));
        }
    }
    _uploadEventHandler(event) {
        switch (event.type) {                
            case "alluploadscomplete":
                this.queue = null;
                break;
        }
    }
	async render(parentNode) {
        if(window[this.id])return window[this.id];else window[this.id]=this;
        await this.renderUI();
        await this.bindUI();       
        this.fire('render', {parentNode: (parentNode) ?(parentNode) : null});
	    this.updata();
        return this;
    }
    creatNode (s) { 
　　 	let o = document.createElement("div"); 
　　 	o.innerHTML = s; 
　　 	return o.childNodes[0]; 
	}
}
