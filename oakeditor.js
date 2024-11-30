/** console.trace()*/
var log=console.log;
var OakEditor = ((editor,path)=>{return{init(cfg){
    return new editor(cfg,path);
}}})(class {
    tool=['heading','|','bold','italic','fontcolor','backgroundColor','textAlign','createlink','outdent','indent','insertunorderedlist','insertorderedlist','createimg','blockquote','table','code','undo','redo','highlight','tabs','pagebreak'];
    around_Node=!1;
    savenode=!1;
    editnode=!1;
    balloon=!1;
    area=document.createElement('textarea');
    lastRange=!1;
    domPath=[];
    _Event=new WeakMap();
    flag={};
    queue=[];
    btnExample=new Map();
    btnWidth=[];
    more={};
    MOD={};
    styles=new Map()
    changeNode=!1;
    is_p=!0;
    noBreak='&NoBreak;&NoBreak;';
    placeholder=!1;
    constructor(cfg,PATH){
        this.CFG=cfg;
        this.path=PATH;
        this.MOD['E']=this;
        this._toRender=e=>this.MOD.res?this.renderer(e.currentTarget,e):this.render(e.currentTarget,e);
        this.CSS=[];
        this.selectorCode=this.CFG.selectorCode||'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code';
    }
    async loadMod(mod,dir='./mod'){
        if(!this.MOD[mod])await import(`./${dir}/${mod}.js`).then(res=>Object.assign(this.MOD,res)).catch(err=>console.error(err))
    }
    _getCss(css){
        if(this.CSS.includes(css)) return;else{
            this.CSS.push(css);
            let cssPath=this.path+css,o = document.querySelector('head')||document.querySelector('body');
            o&&o.appendChild(this.creatNode('<link charset="utf-8" rel="stylesheet"  href="'+cssPath+'">'))
        }
    }

    creatNode(s){ 
        let n = document.createElement("div"); 
        n.innerHTML = s;
        return n.childNodes[0]; 
    }
    start(str){
        let ns=document.querySelectorAll(str);
        this.editList=Array.from(ns),
        this.editList.filter(i=>(i.addEventListener('click',this._toRender),this.deCode(i)))
    }
    async clear(){
        this._removeRendr(),
        this.setAttrALL('[contenteditable]','contenteditable',false);
        this.editList.filter(i=>(i.removeEventListener('click',this._toRender),this.deCode(i))),
        this.savenode=null 
    }
    _removeRendr(){
        this.fire('removeRendr',this),
        this._Event.set(Document,[]),
        this.pop_remove();
        this.around_Node.parentNode&&this.around_Node.remove(),
        this.editnode&&this.savenode&&(
            this.editnode.normalize(),
            //this.savenode.innerHTML=this.editnode.innerHTML,
            this.savenode.innerHTML=this.editnode.innerHTML.replace(/&NoBreak;/g,''),
            this.savenode.querySelectorAll(this.rm_Node.join(',')).forEach(n=>n.remove(true)),
            this.savenode.style.display='block',
            this.editorNode.remove()
        )
    }
    /** 对代码里的HTML标签删除和转为换行 */
    linefeed(s){
        return s.replace(/(<[^>]+>)/g,(m)=>{
            if(m.startsWith("</div")||m.startsWith("</p")||m.startsWith("<br")||m.startsWith("</li")) return'\n';else return'';
        })
    }
    /** 对编辑区里所有的代码里的HTML标签删除和转为换行 */
    deCode(n){this.rmNodeTag(Array.from(n.querySelectorAll(this.selectorCode)))}
    rmNodeTag(ary){ary.filter(i=>i.innerHTML=this.linefeed(i.innerHTML)),ary==null}
    /** 节点是否在编辑器内 */
    inRoot(n,p=!1){return p=p||this.editnode,p.compareDocumentPosition(n)&16}
    /**  编辑内容到 area。  */
    async saveText(n=0){
        n=this.editnode.cloneNode(true);
        n.querySelectorAll(this.rm_Node.join(',')).forEach(n=>n.remove(true));
        n.querySelectorAll('[contenteditable]').forEach(n=>n.removeAttribute('contenteditable'));
        /** 删除空的文本节点 */
        n.normalize();
        this.area.textContent =n.innerHTML.replace(/&NoBreak;/g,'');
    }
    /** 焦点在编辑区内时保存 range 及节点路径 */
    async saveRange(n,e){
        let s=getSelection();
        if((s.focusNode&&this.inRoot(s.focusNode))||this.editnode===s.focusNode){
            this.changeNode=this._getChangeNode();
            this.domPath=this.getdomPath(this.changeNode);
            this.getStyles();
            this.lastRange=s.getRangeAt(0);
        }
    }
   
    /**
     * 根据模板生成节点
     * @param {模板} tp 
     * @param {与模板合并的参数对象} o 
     * @param {节点生成后调用的函数} f 
     */ 
    UI(tp,o={},f=null){
        let t=Object.assign({},tp,o),
        n = document.createElement(t.tag),e = t.attributes||{};
        t.innerHTML?n.innerHTML=t.innerHTML:(t.innerHTML in this.lang)&&(n.innerHTML=this.lang[t.innerHTML])
        t.class&&n.classList.add(...t.class);
        for (let [k,v] of Object.entries(e)){n.setAttribute(k,v)}
        t.listen&&this.DOClisten(n,t.listen);
        t.listenTo&&this.listenTo(...t.listenTo);
        (t=t.children) && (Array.isArray(t)?t.filter(i=>i&&n.appendChild(i.nodeName?i:Array.isArray(i)?this.UI(...i):this.UI(i))):n.appendChild(t.nodeName?t:this.UI(t)));
        f&&f.call(this,n);
        return n;
    }
    /**
     * 设置节点属性，
     * @param {css选择器} c
     * @param {属性} s 
     * @param {值,false 会删除属性} v  
     * @param {.class 数组} l
     */
    setAttrALL(c,s,v,l){this.editnode&&this.editnode.querySelectorAll(c).forEach(n=>{s&&v?n.setAttribute(s,v):n.removeAttribute(s),l&&n.classList.add(...l)})}
    /**
     * 异步加载按钮模块
     * @param {*} n 
     * @param {*} e 
     */
    async render(n,e){
        if(typeof(n) == "string") n= document.querySelector(n);
        let promiseArr = [];
        this._getCss('oakeditor.css');
        this.btnExample.clear();
        this.tool=this.CFG.toolBar||this.tool;
        await import(`./translations/${this.CFG.lang||'zh-cn'}.js`).then(i=>{this.lang=i.lang})
        .then(()=>{
            import(`./mod/resources.js`).then(res=>{
                Object.assign(this.MOD,res);
                this.B=res.btnCalss
            }).then(()=>{this.tool.filter(n=>{
                if(n!='|'&&!this.MOD[n]){
                    let p = new Promise((resolve, reject) => {
                        import(`./mod/${n}.js`).then(res=>resolve(Object.assign(this.MOD,res))).catch(err=>reject(console.error(err)))
                    })
                    promiseArr.push(p)
                }})
                Promise.all(promiseArr).then(() => {
                    this.tool.filter(n=>this.btnExample.set(n,new this.B(this.MOD[n],n,this)));
                    this.around_Node=this.creatNode(this.MOD.res.TP.around(this.lang['around_before'],this.lang['around_after']));
                }).then(()=>this.renderer(n,e)) 
            })
        })
    }
    async renderer(n,e,tmp=!1){
        /** 结束时需要清理的节点,模块可push添加 */
        this.rm_Node=['.ck-widget__type-around'];
        /** 需要清理的 class */
        this.rm_Class=['ck-link_selected','ck-widget_selected'];
        if(typeof(n) == "string") n= document.querySelector(n);
        e&&this._isElement(e.target,'img')&&(this.flag.currentCursor=null)
        if(this._isElement(n, 'textarea')){
            this.area=n;
            n.parentNode.insertBefore(await this._rendertool(),n);
            n.style.display='none';
            this.editnode=this.edit_mian.appendChild(this.UI(this.MOD.res.TP.editnode));
        }else{	
            if(n==this.savenode)return;
            else{
                /** 清除上一次的编辑环境 */
                this.savenode&&this._removeRendr(),
                this.savenode=n,
                n.style.display= 'none',
                n.parentNode.insertBefore(await this._rendertool(),n);
                this.editnode=this.edit_mian.appendChild(this.UI(this.MOD.res.TP.editnode));
            }
        }
        this.editnode.innerHTML=n.innerHTML;
        this.popbody=document.body.appendChild(this.creatNode('<div class="ck ck-reset_all ck-body ck-rounded-corners"></div>')),
        this.editnode.style.minHeight=this.CFG.height||'10rem';
        this.bindUI();
        this.tool.filter(s=>this.tool_items.appendChild(this.btnExample.get(s).getButton()));
        /** 计算工具条按钮累加宽度，折叠工具条所需 */
        this.tool_items.childNodes.forEach(i=>{this.btnWidth.push(i.clientWidth)});
        this.editnode.setAttribute('contenteditable',true);
        /** redo使用 */
        this.changeNode=this.editnode;
        this.editnode.firstChild||(this.editnode.innerHTML='<p><br></p>');
        tmp =this.editnode.firstChild;
        this.reSetRange(tmp,0,tmp,0);
        this.flag.currentCursor=this.saveCursor(this.editnode);
        this.fire('render',this);
        /** 折叠工具条 */
        this.toolbar.appendChild(this.UI(this.MOD.res.TP.separator));
        this.editnode.classList.add('ck-focused');
        this.is_More();
        this.saveRange();
    }
    bindUI(){
        this.on('savechange',this.saveText);
        this.on('redo',this.pop_remove);
        this.DOClisten(this.editnode,{click:(n,e)=>{this.pop_body(n,e)},input:(n,e)=>{this.saveText(),this.mark(e)},mouseup:this.saveRange,keyup:this.saveRange,cut:null,paste:this._paste});
        this.tool_items.hasChildNodes()||this.DOClisten(document,{keydown:this._hotkey,click:()=>this.editnode.classList.remove('ck-focused')});
        this.DOClisten(window,{resize:this.is_More});
        this.DOClisten(document,{pointerup:null,pointermove:null,pointerdown:null});
        /**
        * 工具条滚动
        */
        new IntersectionObserver((e, o)=>{
                if(!e[0].isIntersecting){
                    let n1=this.placeholder.style,n2=this.panel_content;
                    n1.display='block';
                    n1.height=n2.offsetHeight+'px'
                    n2.classList.add('ck-sticky-panel__content_sticky');
                    n2.style.width=this.editnode.offsetWidth+'px';
                }}, {threshold: 1}).observe(this.panel_content);
        new IntersectionObserver((e, o)=>{
                if(e[0].isIntersecting){
                    let n1=this.placeholder.style,n2=this.panel_content;
                    n1.display='none';
                    n1.height=null;
                    n2.classList.remove('ck-sticky-panel__content_sticky');
                    n2.style.width='100%';

                }},{threshold: 1}).observe(this.placeholder);
    }
    aroundBindUI(n=null){
        n||(n=this.editnode);
        if(!(n=n.querySelector('.ck-widget__type-around'))) return;
        let p=n.parentNode;
        p.classList.contains('ck-widget')||n.remove(true)
        n.firstChild.onclick =(e)=>p.parentNode.insertBefore(this.creatNode('<p><br></p>'),p);
        n.lastChild.onclick =(e)=>this.insertAfter(this.creatNode('<p><br></p>'),p);
    }
    mark(e){
        
        //this.domPath[0].innerHTML=this.domPath[0].innerHTML.replace(/^---/,this.MOD.res.TP.horizontal)
        //if(e.target.innerHTML=='---')e.target.innerHTML==this.MOD.res.horizontal;log(e.target.innerHTML)
    }
    /** 工具条生成 */
    async _rendertool() {
        this.editorNode=this.creatNode('<div class="ck ck-reset ck-editor ck-rounded-corners"></div>');
        this.editor_top=this.editorNode.appendChild(this.creatNode('<div class="ck ck-editor__top ck-reset_all" role="presentation"></div>'));
        this.sticky_panel=this.editor_top.appendChild(this.creatNode('<div class="ck ck-sticky-panel"></div>'))
        this.placeholder=this.sticky_panel.appendChild(this.UI({tag:'div',class:['ck','ck-sticky-panel__placeholder'],attributes:{style:'display:none;'}}))
        this.panel_content=this.sticky_panel.appendChild(this.creatNode('<div class="ck ck-sticky-panel__content"></div>'))
        this.edit_mian=this.editorNode.appendChild(this.creatNode('<div class="ck ck-editor__main" role="presentation"></div>'))
        this.toolbar=this.panel_content.appendChild(this.UI(this.MOD.res.TP.toolbar));
        this.tool_items=this.toolbar.appendChild(this.UI(this.MOD.res.TP.toolbar_items));
        return this.editorNode;
    }
   /*** 工具条折叠 */
    async is_More(e){
        let n=this.tool_items.lastChild;
        if(!n||!this.MOD.more)return;
        if(n.offsetLeft+n.offsetWidth>this.panel_content.clientWidth-50){
            if(!this.more.btn){
                this.more.btn=new this.B(this.MOD.more,'more',this);
                this.btnExample.set('more',this.more.btn);
                this.more.bar=this.more.btn.getButton();
                this.more.bar.classList.add('ck-toolbar__grouped-dropdown','ck-toolbar-dropdown')
            }
            this.inRoot(this.more.bar,this.toolbar)||this.toolbar.appendChild(this.more.bar);
        }
        this.more.btn&&this.more.btn.resize(e?true:false)
    }
    /** 热键处理函数 */
    async _hotkey(n,e){
        if(e.ctrlKey){
            if(e.key.toUpperCase()=='A')this.lastRange.selectNodeContents(this.editnode);
            else if(this.is_p&&e.key=='Enter')this.inserEnter();
            else for (let v of this.btnExample.values())e.key.toUpperCase()==v.hotkey&&(e.preventDefault(),v.command(v.name,e))
        }else{/** 删除图片 */
            e.key=='Backspace'&&this.editnode.querySelectorAll('figure').forEach(i=>{
                i.classList.contains('ck-widget_selected')&&(e.preventDefault(),i.remove(),this.balloon.remove())
            });
        }
    }
     /** Enter 输入 <div>,shift+Enter 输入<br> ,ctrl+Enter 输入<p>*/
    inserEnter(n=!1){
        let s=getSelection(),r=s.getRangeAt(0);
        n=this.domPathMap(s.anchorNode).get('p');
        n&&r.setStartAfter(n);
        r.insertNode(n=this.creatNode('<p><br><p>'));
        n=n.lastChild;
        this.reSetRange(n,n.length,n,n.length)
    }
    /** 粘贴回调函数，过滤掉src以外的所有属性，删除不在retain数组之内的所有标签 */
    async _paste(n,e){
        let d=e.clipboardData;
        for (let i=0;i<d.items.length;i++){
            let item=d.items[i];
            if(item.kind==="string"&&item.type==="text/html"){
                e.preventDefault(0);
                let imgTag = ['<img'],
                attr=['src'],
                retain = ['<blockquote','</blockquote','<h','</h','<ol','</ol',
                '<li','</li','<ul','</ul','<code','</code','<div','</div','<p','</p','<t','</t'],
                f =(s,a,t=!1)=>{return a.filter(i=>t|=s.startsWith(i,0)),t};
                item.getAsString((str)=>{
                    str = str.replace(/(<[^>]+>)/g, (match)=>{
                        let isImg = f(match,imgTag),
                        attrsRe=/\s+([a-z]*|data-.*?)\s*=\s*".*?"/ig;
                        if(isImg){
                            return match.replace(attrsRe,(match)=>{
                                return f(match.replace(/(^\s*)/g,''),attr)?match:'';
                            });
                        }else if(f(match,retain)){
                            return match.replace(attrsRe,'')
                        }else return '';
                    })
                    this.insertHTML(str)
                })
            }
        }
        setTimeout(()=>{this.insertQueue()},100);
    }
    /** 把未上传的远程图片加入队列 */
    async insertQueue(){
        let nodes=this.editnode.querySelectorAll('img');
        for(let i=0;i<nodes.length;i++){
            let src=nodes[i].src;
            src.includes(window.location.host)||this.queue.unshift(nodes[i]);
        }
        setTimeout(()=>{this.startUp()},100)
    }
    /** 开始上传 并更新图片地址,firefox 支持本地图片粘贴上传*/
    async startUp(){
        if(this.queue.length&&this.CFG.uploadURL){
            let n=this.queue.pop(),data = new FormData(),postvar=this.CFG.postVarsPerFile,
            init={method:"POST",credentials:"include",cache:"no-cache"};
            if(n.src.match('\^data:image'))
                data.append('Filedata',this.base64toblob(n.src),Date.now()+'.jpg');
            else data.append('url',n.src);
            n.src=this.path+'translations/timg.gif';
            for(let [k,v] of Object.entries(postvar))data.append(k,v);
            init.body=data;
            fetch(this.CFG.uploadURL,init).then((res)=>{return res.json()}).then((o)=>{
                let s='';
                for(let [k,v] of Object.entries(postvar)){s+=k+'='+v+'&';}
                n.src=this.CFG.downURL+'?type=640&'+s+'filename='+o.filename;
                this.startUp();
            }).catch(e =>{n.remove(),console.error(e)}); 
        }
    }
    /** base64转 blob */
    base64toblob(base64String){
        let bytes = window.atob(base64String.split(',')[1]),array = []; 
        for(let i = 0; i < bytes.length; i++){ array.push(bytes.charCodeAt(i)); }
        return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
    }
    /**
     * 节点名字检查
     * @param {节点} el 
     * @param {HTML标签} tag 
     * @returns  bool
     */
    _isElement(el, tag) {
        if(el && el.tagName && (el.tagName.toLowerCase() == tag)){
          return true;
        }
        if(el && el.getAttribute && (el.getAttribute('tag') == tag)){
          return true;
        }
        return false;
    }
     /** 返回焦点节点*/
    _getChangeNode(){
        let sel = getSelection(),range,n=null;
        if(!sel.rangeCount) return false;
        range=sel.getRangeAt(0);
        if (sel.anchorNode && (sel.anchorNode.nodeType == 3)) {/** 如果是文字节点 */
            if (sel.anchorNode.parentNode) { /* next check parentNode */
                n = sel.anchorNode.parentNode;
            }
            if (sel.anchorNode.nextSibling != sel.focusNode.nextSibling) {
                n = sel.anchorNode.nextSibling;
            }
        }
        if (this._isElement(n, 'br')) {n = null;}
        if (!n) {
            n = range.commonAncestorContainer; /* startContainer和endContainer共同的祖先节点在文档树中位置最深的那个 */
            if (!range.collapsed) {
                if (range.startContainer == range.endContainer) { /* 开始节点与结束节点是同一节点 */
                    if (range.startOffset - range.endOffset < 2) {
                        if (range.startContainer.hasChildNodes()) {
                            n = range.startContainer.childNodes[range.startOffset];
                        }
                    }
                }
            }
        }
        return n;
    }
    /** 得到n节点 至 root 节点 的路径 */
    getdomPath(n,root=this.editnode) {
        let domPath = [];
        while(n&&(root.compareDocumentPosition(n)&16)){
            if (n.nodeName && n.nodeType && (n.nodeType === 1)){
                domPath.push(n);
            }
            n=n.parentNode;
        }
        return domPath.reverse();
    }
    /** 把节点路径转换为 以小写tagName 为键的map */
    domPathMap(n=!1,root=this.editnode){
        let m = new Map(),p;
        n?p=this.getdomPath(n,root):p=this.domPath;
        return p.filter(n=>m.set(n.tagName.toLowerCase(),n)),m
    }
    
    async on(s,f,i=!1,str=!1){
        let a,o={},E=this._Event,OBJ=Document;
        E.has(OBJ)||E.set(OBJ,{});
        E.get(OBJ)[s]||(E.get(OBJ)[s]=[]);
        a=E.get(OBJ)[s];
        if(str)for(let i;i<a.length;i++)a[i].name==str&&a.splice(i,1)
        o.callback=f;
        o.one =i;
        o.name=str;
        a.push(o);
    }
    async del(s){delete this._Event.get(Document)[s]}
    
    /**
     * 在事件map里面建立以节点为健的对象，
     *  this._Event[node]:
     * {
     *      _domNode:node,
     *      _domListeners:{
     *          click:{
     *              callback:f
     *              remove:i.removeListener
     *          }
     *      }
     *      _events:{ //由listenTo 添加
     *          click:{callback,'one':one,'tag':tag};
     *      }
     *  }
     * 给节点绑定事件，事件函数指向 this.fire
     * @param {node 注册事件的节点} n 
     * @param {object {系统事件：函数,}} l 
     * @param { bool 可选。指定事件是否在捕获或冒泡阶段执行。} b 
     */
    async DOClisten(n,l,b=!1){
        this._Event.has(n)||this._Event.set(n,{_domNode:n})
        let E=this._Event.get(n);
        for(let [a,f] of Object.entries(l)){
            if (E._domListeners && E._domListeners[a])return;
            const i = this._createDomListener(E,a,b);
            E._domNode.addEventListener(a, i, b),
            E._domListeners || (E._domListeners = {}),
            E._domListeners[a] = {callback:f,remove:i.removeListener},
            E._events={}
        }
    }
   
  /**
   * 
   * @param {绑定事件的节点} el 
   * @param {事件类型} evt 
   * @param {回调函数} callback 
   * @param {调用一次后删除，需要添加延时} one 
   * @param {去除添加的重复事件，tag 使用按钮名称} tag 
   */
    async listenTo(el,evt,callback,one=false,tag=!1){
        let o,E;
        E = this._Event.get(el);
        E||console.error('事件未注册');
        E._events[evt]||(E._events[evt]=[]);
        if(tag){
            for(let [i, v] of E._events[evt].entries()){
                v.tag==tag&&E._events[evt].splice(i,1)
            }
        }
        o={callback,'one':one,'tag':tag};
        one?setTimeout(()=>{E._events[evt].push(o)},100):E._events[evt].push(o)
    }
    /**
     * 创建监听函数
     * 给 fire 增加删除事件绑定的函数，
     * @param {object:{_Event:n,}} E 
     * @param {string 系统事件类型} a 
     * @param {bool 可选。指定事件是否在捕获或冒泡阶段执行。} b 
     */
    _createDomListener(E,a,b){
        const t = e=>{this.fire(E._domNode,e)};
        return t.removeListener = (()=>{
            E._domNode.removeEventListener(a, t, b),
            delete E._domListeners[a],
            delete E._events[a]
        }),t
    }
   
    /**
     * 事件监听函数，事件发生后，遍历在此节点注册的事件类型下的函数并执行。单独使用的时与on及 once函数匹配。
     * @param {发出事件的节点。单独使用时为自定义事件名称} n 
     * @param {事件对象。单独使用时为传递给on或once函数的第二个参数||也可是事件字符串} e 
     */
    async fire(n,e){
          /** 添加回调函数选择性删除事件的功能 */
        let remove=(E,type,i)=>{
            return ()=>E._events[type].splice(i,1)
        }
        if('string' === typeof n){
            let E=this._Event.get(Document),a;E&&E.hasOwnProperty(n)&&(a=E[n]);
            if(a)for(let [i, v] of a.entries()){v&&v.callback&&(v.callback.call(this,e),v.one&&a.splice(i,1))}
        }else{
            let E=this._Event.get(n),b,type=e;
            'string' === typeof e ||(type=e.type);
            b=E._domListeners[type];
            b&&b.callback&&b.callback.call(this,n,e);
            if(E._events[type])for(const [i,obj] of E._events[type].entries())
            {
                setTimeout(()=>{obj.callback.call(this,n,e,remove(E,type,i)),obj.one&&E._events[type].splice(i,1)},50);
            }
        }
    }
     /**
     * 用Range设置选择区
     * @param {Range} r 
     */
    setRange(r){let s=getSelection();return s.removeAllRanges(),this.lastRange=r,s.addRange(r),r}
    /**
     * 用节点及其偏移设置选择区
     * @param {node,startContainer} a 
     * @param {startOffset} s 
     * @param {node,endContainer} f 
     * @param {endOffset} e 
     */
    reSetRange(a,s,f,e){
        let r= new Range();
        return r.setStart(a,s),r.setEnd(f,e),this.setRange(r)
    }
    /**
     * 默认恢复页面
     * @param {保存的光标} t 
     * @param {false 仅恢复光标，不恢复修改前的内容} b 
     */
    reCursor(t,b=!0){
        b&&(this.editnode.innerHTML=t.html||'<p><br></p>');
        if(!t)return this.reSetRange(this.editnode,0,this.editnode,0)
        let e=this.editnode.querySelector('.oak-cursor');
        e||(e=this.editnode);
        if(t.type==3)e=e.childNodes[t.index];
        return this.reSetRange(e,t.end,e,t.end)
    }
    /** 删除光标 */
    removeCursor(root=this.editnode){
        root.querySelectorAll('.oak-cursor').forEach(n =>n.classList.remove('oak-cursor'))
    }
    /** 得到n节点在父节点里的索引 */
    getNodeIndex(n){
        let ns=n.parentNode.childNodes,i;
        for(i=0;i<ns.length;i++){if(ns[i]===n) return i}
        return -1
    }
    /** 
     * 保存光标 
     * @param {root 要保存光标的节点，为了在切换页面时恢复光标新加}  
     */
    saveCursor(root){
        this.removeCursor(root);
        let s=getSelection();
        if(!s.rangeCount)s.selectAllChildren(root);
        let o={},r=s.getRangeAt(0),fn=r.endContainer,
        /** 计算文本节点合并后的光标所在节点与偏移位置*/
        offset=(node)=>{
            let i=0,n=node;
            while(n&&n.nodeType&&n.nodeType==3){
                i+=n.length,node=n;
                n=n.previousSibling;
            }return{i,node}
        };
        o.end=r.endOffset;
        if(fn.nodeType===3){
            let t=offset(fn);o.end+=t.i-fn.length,fn=t.node
            o.index=this.getNodeIndex(fn),
            fn=fn.parentNode,o.type=3;
        }else{
            let n=fn.childNodes[o.end-1];
            if(n&&n.nodeType===3){
                let t=offset(n);o.end=t.i,fn=t.node,
                o.index=this.getNodeIndex(fn),
                fn=fn.parentNode,o.type=3
            }
        }
        (root.compareDocumentPosition(fn)&16)&&fn.classList.add('oak-cursor');
        return o.html=root.innerHTML,o
    }
   /**
    * 
    * @param {DOM节点} n 
    * @param {HTML标签} tag 
    * @param {是否复制属性。默认复制} attr 
    * @returns 
    */
    renametag(n,tag,attr=true){
        let ns=n.attributes,t=document.createElement(tag),
        r=new Range();
        r.selectNodeContents(n);
        t.appendChild(r.extractContents());
        n.parentElement.replaceChild(t,n);
        if(attr){
            for(let i=0;i<ns.length;i++){
                ns[i].value&&t.setAttribute(ns[i].name,ns[i].value)
            }
        }
        return t
    }
    /**
     * 节点打包
     * @param {HTML标签} tag 
     * @param {DOM节点} n 
     * @returns NODE
     */
    wrap(tag,n=!1){
        let b=document.createElement(tag),r;
        n?(r=new Range(),r.selectNode(n)):r=this.lastRange;
        if(r.startContainer===r.endContainer){
            if(r.collapsed&&!n)r.selectNode(r.commonAncestorContainer);
            r.surroundContents(b)
        }else{
            b.appendChild(r.extractContents())
            r.insertNode(b);
        }
        return b
    }
    /**
     * 拆包
     * @param {被拆掉的节点} n 
     */
    unwrap(n){
        this.lastRange.selectNodeContents(n)
        n.parentElement.replaceChild(this.lastRange.extractContents(),n)
    }
    async pop_body(n,e){
        if(e){
            e.stopPropagation();
            this.domPath=this.getdomPath(e.target);
        }
        this.editnode.classList.add('ck-focused');
        this.pop_remove();
        this.domPath.filter(i=>{
            let t='pop_'+i.tagName.toLowerCase();
            this.MOD[t]&&this.MOD[t](this).flip(i,e);
        })
    }
    /**
     * 把气泡移动到 n 节点附近
     * @param {气泡内节点} pop 
     * @param {pop停靠节点|null} berth
     * @param {给光标所在节点添加的css} css
     *      
     */       
    async pop_move(pop,berth,css=!1){
        if(pop){
            this.pop_remove();
            this.balloon=this.popbody.appendChild(this.UI(this.MOD.res.TP.balloon)),
            this.balloon.appendChild(pop)
        }
        let Rect,R={},DE=document.documentElement,N={},P={},top,left,offX=this.balloon.offsetWidth;
        berth?Rect=berth.getBoundingClientRect():Rect=this.lastRange.getBoundingClientRect();
        /** 节点的中心x与y轴 */
        N.x=Math.trunc((Rect.left+Rect.right)/2),N.y=Math.trunc((Rect.top+Rect.bottom)/2),
        //浏览器可视区的 x 3分轴，y中心轴
        R.x=DE.clientWidth/3,R.y=DE.clientHeight/2;       
        if(N.y>R.y)
        { 
            P.y='s';
            top=Math.trunc(Rect.top)+window.scrollY-this.balloon.offsetHeight-11
        }
        else{
            P.y='n';
            top=Math.trunc(Rect.bottom)+window.scrollY+11
        }
        if(N.x<R.x){
            P.x='w',
            left=N.x-25
        }
        else if(N.x>2*R.x){P.x='e',left=N.x-offX+25} 
        else {P.x='',left=N.x-offX/2}
        /** 停靠节点为文字节点父节点为root时的偏移量 */
        if(Rect.left==0)left=this.editnode.offsetLeft;
        if(Rect.top==0){
            top=this.editnode.offsetTop;
            if(this.lastRange.endOffset!=0){
                let i=0,ary=Array.from(this.editnode.childNodes);
                for(;i<this.lastRange.endOffset;i++)
                {
                    ary[i]&&(isNaN(ary[i].offsetHeight)||(top += ary[i].offsetHeight));
                }
            }
            top=top+this.balloon.offsetHeight;
        }
        css&&berth.classList.add(css);
        this.balloon.classList.add(`ck-balloon-panel_arrow_${P.y+P.x}`)
        this.balloon.style.left=left+window.scrollX+'px',
        this.balloon.style.top=top+'px'
    }
   
    /** 气泡删除 */
    async pop_remove(){
        this.balloon&&this.balloon.remove();
        this.rm_Class.filter(s=>{this.editnode.querySelectorAll('.'+s).forEach(n=>{n.classList.remove(s)})})
    }
    insertHTML(v,save=true){
        let r=new Range(),n= document.createElement('div');
        n.innerHTML=v,
        r.selectNodeContents(n),
        getSelection().getRangeAt(0).insertNode(r.extractContents());
        save&&this.fire('savechange');//setTimeout(()=>{this.insertQueue()},100);
    }
    insertAfter(newElement,targetElement){
        var parent = targetElement.parentNode;
        if (parent.lastChild == targetElement) {
            parent.appendChild(newElement);
        } else {
            parent.insertBefore(newElement,targetElement.nextSibling);
        }
    }
    /**
     * DOM路径中的style,
     * @returns Map
     */
    getStyles(){
        this.styles.clear();
        let styles = ['color', 'fontSize', 'fontFamily', 'backgroundColor','fontStyle','fontWeight',
        'textDecoration','textAlign','marginLeft'];
        this.domPath.filter(n=>{
            styles.filter(s=>{
                let o={};
                if(n.style[s]){
                    o.value=n.style[s];
                    o.node=n;
                    this.styles.set(s,o);
                }
            })
        })
        return this.styles;
    }
    /**
     * 
     * @param {指令} cmd 
     * @param {指令类型 tag/list/style} type 
     * @param {值 } v 
     * @param {HTML标签数组数组，对路径中的同名节点更改名称} ary 
     */
    async excCommand(cmd,type,v,ary=!1){// if (/{&\w+&}/.test(rangeData)) {  // 光标在占位符上
        let r=this.lastRange,s=getSelection(),an=s.anchorNode,en=s.focusNode,tmp,
        span=(type=='tag'||type=='list')?document.createElement(v):document.createElement('span'),
        style=this.styles.get(cmd),
        insertNode=(cmd,type,v,an)=>{
            r.insertNode(span);
            let n=span;
            if(type=='list')n=span.appendChild(document.createElement('li'));
            if(type=='style')n.style[cmd]=an.style[cmd]==v?null:v
            n.innerHTML=this.noBreak;
            n=n.lastChild;
            this.reSetRange(n,n.length,n,n.length)
        };
        if(s.isCollapsed){ //如果光标闭合的
            if(an.nodeType==3){ //如果是文字节点
                if(an.length==s.focusOffset){//光标在字符串尾部
                    an=an.parentNode;
                    switch (type) {
                        case 'tag':
                            if(ary){
                                r.setStartAfter(an);
                                insertNode(cmd,type,v,an)
                            }else if(this.domPathMap().has(v))
                            {
                                r.setStartAfter(this.domPathMap().get(v));
                                this.insertHTML(this.noBreak,false);
                            }else  insertNode(cmd,type,v,an) //光标移至an节点后，插入新节点
                            break;
                        case 'list':
                            insertNode(cmd,type,v,an);
                            break;
                        default:
                            this.styles.get(cmd)&&r.setStartAfter(an);
                            insertNode(cmd,type,v,an) //光标移至an节点后，插入新节点
                            break;
                    }
                }else{//在字符串中间
                    let i=s.anchorOffset;
                    switch (type) {
                        case 'tag':
                            let a,t=!1;
                            if(this.domPathMap().has(v))this.unwrap(this.domPathMap().get(v));
                            else if(ary){
                                ary.filter(i=>{
                                    if(this.domPathMap().has(i))t=this.domPathMap().get(i);
                                })
                                if(t)this.renametag(t,v);else this.wrap(v,an);
                            }else this.wrap(v,an);
                            break;
                        case 'list':
                            if(this.domPathMap().has('li')){ 
                                let ul,li=this.domPathMap().get('li');
                                ul=li.parentElement;
                                Array.from(ul.childNodes).filter(n=>this.unwrap(n));
                                this.unwrap(ul);
                            }else{
                                this.wrap(v,an)
                                this.wrap('li',an)
                            }
                            break;
                        default:
                            /** 不确定使用哪一条规则?留后 */
                            //if(style)style.value ===v?style.node.style[cmd]=null:style.node.style[cmd]=v;
                            if(style&&style.value ===v)style.node.style[cmd]=null;
                            else an.parentNode.style[cmd]=v;
                        break;
                    }
                    this.reSetRange(an,i,an,i);
                    this.fire('savechange');
                }
            }else insertNode(cmd,type,v,an) /** 在1型节点内 */
        }else{//光标不是闭合的
            if(an===en&&type!='list'){//如果开始节点与结束节点相同
                if(an.nodeType==3&&an.length==s.toString().length){
                    span=an.parentNode;
                }else{
                    r.surroundContents(span);
                } 
            }else{//如果选中了多个节点
                span.appendChild(r.extractContents()),r.insertNode(span)
                if(type=='list'){
                    Array.from(span.childNodes).filter(n=>this.wrap('li',n))
                }else{
                    Array.from(span.childNodes).filter(n=>
                    {
                        if(this._isElement(v))this.unwrap(n);
                        n.nodeType==1&&(n.style[cmd]=null)
                    })
                }
            }
            type=='style'&&(span.style[cmd]=(style&&style.value==v)?'null':v);
            r.collapse()
            this.fire('savechange');
        }
        this.editnode.normalize();
        this.getStyles();
    }
    /**
        * @static
        * @method FILTER_RGB
        * @param String css The CSS string containing rgb(#,#,#);
        * @description Converts an RGB color string to a hex color, example: rgb(0, 255, 0) converts to #00ff00
        * @return String
        */
    FILTER_RGB(css) {
        if (css.toLowerCase().indexOf('rgb') !== -1) {
            var exp = new RegExp("(.*?)rgb\\s*?\\(\\s*?([0-9]+).*?,\\s*?([0-9]+).*?,\\s*?([0-9]+).*?\\)(.*?)", "gi"),
                rgb = css.replace(exp, "$1,$2,$3,$4,$5").split(','),
                r, g, b;

            if (rgb.length === 5) {
                r = parseInt(rgb[1], 10).toString(16);
                g = parseInt(rgb[2], 10).toString(16);
                b = parseInt(rgb[3], 10).toString(16);

                r = r.length === 1 ? '0' + r : r;
                g = g.length === 1 ? '0' + g : g;
                b = b.length === 1 ? '0' + b : b;

                css = "#" + r + g + b;
            }
        }
        // html = html.replace(/ _yuid="([^>]*)"/g, '');
        return css;
    }
},document.scripts[document.scripts.length - 1].src.substring(0, document.scripts[document.scripts.length - 1].src.lastIndexOf("/") + 1));

