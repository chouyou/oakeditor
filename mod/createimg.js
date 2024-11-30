export let createimg={
    icon:'<svg class="ck ck-icon ck-button__icon" viewBox="0 0 20 20"><path d="M6.91 10.54c.26-.23.64-.21.88.03l3.36 3.14 2.23-2.06a.64.64 0 0 1 .87 0l2.52 2.97V4.5H3.2v10.12l3.71-4.08zm10.27-7.51c.6 0 1.09.47 1.09 1.05v11.84c0 .59-.49 1.06-1.09 1.06H2.79c-.6 0-1.09-.47-1.09-1.06V4.08c0-.58.49-1.05 1.1-1.05h14.38zm-5.22 5.56a1.96 1.96 0 1 1 3.4-1.96 1.96 1.96 0 0 1-3.4 1.96z"></path></svg>',
    command: function(){
        if(this.upfile){this.upfile.openFileSelectDialog();return}
        Promise.all([
            this.E.loadMod('file-html5','mod/upload'),
            this.E.loadMod('oakupfiles','mod/upload'),
            this.E.loadMod('uploader-queue','mod/upload')])
        .then(()=>{
            let upfile = new this.E.MOD.oakupfiles(Object.assign({
                //selectnode:panel.selectfiles,
                /** 上传后的图片预览位置 */
                bodyNode  :document.querySelector(this.E.CFG.fileView),//||panel.bd,
                FileHTML5:this.E.MOD.FileHTML5,
                UploaderQueue:this.E.MOD.UploaderQueue,
                editor      :this.E
            },this.E.CFG));
            upfile.render().then(i=>(this.upfile=i,i.openFileSelectDialog()));
        })
    }
}
export let pop_img=function(E){
    /** 执行1次的事件 */
    E.listenTo(E.editnode,'click',(n,e,rm)=>{node_resizer.remove()},!0,'createimg')
    E.on('removeRendr',()=>node_resizer.remove())
    
    /**
     * 转为块
     */
    let inlineToFg=()=>{
        if(WGType){
            if(WGType=='figure')rmClass();
            else{
                widget=E.renametag(widget,'figure');
                widget.className='';
            }
        }else{
            widget=E.wrap('figure',imgNode);
        }
        widget.appendChild(E.around_Node);
        node_resizer.parentNode||widget.appendChild(node_resizer);
        widget.classList.add('image',...css);
        WGType='figure'
    },
    /** 转为内联 */
    fgToInline=()=>{ 
        if(WGType){
            widget=E.renametag(widget,'span');
            widget.className='';
            figcaption.remove();
            E.around_Node.remove()
        }else {
            widget=E.wrap('span',imgNode);
        }
        node_resizer.parentNode||widget.appendChild(node_resizer);
        widget.classList.add('image-inline', ...css);
        WGType='inline'
    },
    css=['ck-widget','image_resized','ck-widget_with-resizer'],
    rmClass=()=>['inlineAC','blockAC'].filter(s=>{
        Object.values(btns[s].panel.buttons).filter(i=>widget.classList.remove(i.index))
    }),
    
   /** 改变按钮显示 */
    getStatus=()=>{
        let pcList=widget.classList,t,p;
        popBar.querySelectorAll('button').forEach(el =>el.classList.remove('ck-on'));
        if(pcList&&pcList.contains('ck-widget')){
            ['inlineAC','blockAC'].filter(s=>{
                let bt=E.btnExample.get(s);bt.childButtons.filter(o=>{if(pcList.contains(o.index)){t=o;p=bt}})
            })
            p=p&&p.view.querySelector('.ck-splitbutton');
            if(t){
                t.btn_on();
                let t2=Object.create(t).getButton();
                t2.classList.add('ck-on');
                p.replaceChild(t2,p.firstChild)
            }else WGType=='inline'&&E.btnExample.get('inline').btn_on();
            let tg=E.btnExample.get('toggle'),lang;
            widget.querySelector('figcaption')?(tg.btn_on(),lang=E.lang['caption_off']):(lang=E.lang['caption_on']);
            tg.bindtipText=lang;
            E.pop_move(popBar,widget,'ck-widget_selected');
        }
    },
    figcaption=E.UI(E.MOD.res.TP.figcaption),
    node_resizer=E.creatNode( 
        `<div class="ck ck-reset_all ck-widget__resizer" style="">
            <div class="ck-widget__resizer__handle ck-widget__resizer__handle-top-left"></div>
            <div class="ck-widget__resizer__handle ck-widget__resizer__handle-top-right"></div>
            <div class="ck-widget__resizer__handle ck-widget__resizer__handle-bottom-right"></div>
            <div class="ck-widget__resizer__handle ck-widget__resizer__handle-bottom-left"></div>
            <div class="ck ck-size-view ck-orientation-bottom-right" style="display: none;"></div>
        </div>`),
    popBar=!1,imgNode=!1,widget=!1,WGType=!1,Rect=!1,
    btns={
        toggle:{
            icon:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 16h9a1 1 0 0 1 0 2H2a1 1 0 0 1 0-2z"></path><path d="M17 1a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h14zm0 1.5H3a.5.5 0 0 0-.492.41L2.5 3v9a.5.5 0 0 0 .41.492L3 12.5h14a.5.5 0 0 0 .492-.41L17.5 12V3a.5.5 0 0 0-.41-.492L17 2.5z" fill-opacity=".6"></path></svg>',
            command:(n,e)=>{
                WGType=='figure'||inlineToFg();
                figcaption.parentNode?figcaption.remove():(E.insertAfter(figcaption,imgNode),figcaption.focus())
                getStatus()
                this.E.fire('savechange')
            },
        },
        inline:{
            icon:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path opacity=".5" d="M2 3h16v1.5H2zm11.5 9H18v1.5h-4.5zM2 15h16v1.5H2z"></path><path d="M12.003 7v5.5a1 1 0 0 1-1 1H2.996a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h8.007a1 1 0 0 1 1 1zm-1.506.5H3.5V12h6.997V7.5z"></path></svg>',
            command:function(name){
                fgToInline();
                getStatus()
                this.E.fire('savechange')
            },
        },
        inlineAC:{
            /** 下拉箭头图标 */
            v:'ck-dropdown__arrow',
            /** 给button 节点添加css类 */
            class:['ck-splitbutton__arrow'],
            view_class:['ck-list-styles-dropdown', 'ck-toolbar-dropdown'],
            /** 更改view 形态选择器 */
            viewType:'splitbutton',
            /**
             * 必须使用function() 模式，this指向btnCalss实例，不能使用()=>{}模式，this 指向不同。
             * @returns DOM 节点
             */
            panel:{
                /** panel所需模板 [父->子->孙] */
                tp:['toolbar','toolbar_items'],
                /** 面板按钮公用css */
                //gruop_class:['ck-button_with-text'],
                /** 面板按钮组 */
                buttons:{//alignleft
                    inlineleft :{icon:this.E.MOD.res.icon.leftF,index:'image-style-align-left'},
                    inlineright:{icon:this.E.MOD.res.icon.rightF,index:'image-style-align-right'},
                },
                command:function(name){
                    if(!WGType)fgToInline();
                    rmClass();
                    widget.classList.add(this.index);
                    getStatus();
                    this.E.fire('savechange');
                },
                //linkage:'class:index'
            },
        },
        /** 此KEY仅作为标记 */
        blockAC:{
            v:'ck-dropdown__arrow',
            /** 给button 节点添加css类 */
            class:['ck-splitbutton__arrow'],
            view_class:['ck-list-styles-dropdown', 'ck-toolbar-dropdown'],
            /** 更改view 形态选择器 */
            viewType:'splitbutton',
            panel:{
                /** panel所需模板 [父->子->孙] */
                tp:['toolbar','toolbar_items'],
                /** 面板按钮共用css */
                //gruop_class:['ck-button_with-text'],
                /** 面板按钮组 */
                buttons:{
                    blockleft  :{icon:this.E.MOD.res.icon.picleft,index:'image-style-block-align-left'},
                    blockmiddle:{icon:this.E.MOD.res.icon.picmiddle,index:'image-style-block-align-middle'},
                    blockright :{icon:this.E.MOD.res.icon.picright,index:'image-style-block-align-right'}
                },
                command:function(name){
                    inlineToFg();
                    widget.classList.add(this.index);
                    getStatus();
                    this.E.fire('savechange');
                },
            },
        }
    }
  
    let isMove = false, x = 0, y = 0,remove=null,dirX=1,dirY=1,
    down=(e)=>{
        let cl=e.target.classList;isMove=true;x = e.clientX;y = e.clientY;
        if(cl.contains('ck-widget__resizer__handle-top-left'))dirX=-1,dirY=-1;
        if(cl.contains('ck-widget__resizer__handle-top-right'))dirY=-1;
        if(cl.contains('ck-widget__resizer__handle-bottom-left'))dirX=-1;
        E.balloon.remove();
        E.listenTo(document,'pointermove',(n,e,rm)=>{e.preventDefault();move.call(this,n,e);remove=rm})
    },
    move=(n,e)=>{
        if(isMove=== true){ 
            let xx=e.clientX-x,width,height,
            yy=e.clientY-y;
            let st=node_resizer.style,scale=Rect.height/Rect.width;
            Math.abs(yy)>Math.abs(xx)?xx=yy*dirY:xx=xx*dirX;
            width=Rect.width+xx;
            height=width*scale;
            widget.style.width=width+'px';
            st.height=height+'px';
            st.width=width+'px'; 
            node_resizer.lastChild.innerHTML=Math.trunc(width/document.documentElement.clientWidth*100)+'%';
        }
    };
    E.listenTo(document,'pointerup',(n,e,rm)=>{
        if (isMove === true){
            widget.style.width=node_resizer.lastChild.innerHTML;
            isMove = false;
            remove&&remove();
        }
    })
    node_resizer.childNodes.forEach(n=>n.onpointerdown=down);
    return{
        flip:function(imgN,e){
            E.flag.imggetStatusAry=[];
            imgNode=imgN;
            popBar=E.UI(E.MOD.res.TP.toolbar);
            let pcList=imgNode.parentNode.classList,
            item=popBar.appendChild(E.UI(E.MOD.res.TP.toolbar_items));
            for(let [k,v] of Object.entries(btns)){
                let bt=new E.B(v,k,E);
                E.btnExample.set(k,bt);
                item.appendChild(bt.getButton());
            }
            if(pcList.contains('ck-widget')){
                widget=imgNode.parentNode;
                let resizer=widget.querySelector('.ck-widget__resizer');
                resizer&&resizer.remove();
                E.inRoot(node_resizer)||(widget.appendChild(node_resizer))
                if(pcList.contains('image-inline')){
                    WGType='inline';
                }else if(E.domPathMap(imgNode).has('figure')){
                    figcaption=widget.querySelector('figcaption')||figcaption;
                    figcaption.setAttribute('contenteditable',true);
                    widget.appendChild(E.around_Node);
                    E.aroundBindUI(widget);
                    WGType='figure';
                }
                imgN=widget;
                Rect=imgNode.getBoundingClientRect();
                let st=node_resizer.style;
                st.top=st.left='0px';
                st.height=Rect.height+'px';
                st.width=Rect.width+'px';  
            }
            getStatus();
            E.pop_move(popBar,imgN,'ck-widget_selected')
        }
        
    }
}