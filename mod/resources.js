export const res={
        /** 节点模板 */
        TP:{
            //dropdown:{tag: "div",class:['ck','ck-dropdown'],children:{tag: "div",class:['ck','ck-splitbutton','ck-dropdown__button']}},//'ck-blurred'
            editnode:{tag:'div',class:['ck','ck-content','ck-editor__editable','ck-rounded-corners', 'ck-editor__editable_inline', ],attributes:{'dir':'ltr',role:'textbox'}},
            panel_se:{tag:'div',class:['ck','ck-reset','ck-dropdown__panel']},
            button:{tag: "button",attributes: {type:"button",tabindex:"-1"},class: ["ck","ck-button"]},
            splitbutton:{tag: "div",class:['ck','ck-splitbutton','ck-dropdown__button']},
            tip_text:{tag: "span",class: ["ck","ck-tooltip__text"]},
            label:{tag: "span",class: ["ck","ck-button__label"]},
            separator:{tag:'span',class: ["ck","ck-toolbar__separator"]},
            balloon:{tag:'div', class: ["ck", "ck-balloon-panel","ck-balloon-panel_with-arrow","ck-balloon-panel_visible","ck-toolbar-container"]},
            figcaption:{tag:'figcaption',class:['ck-editor__editable','ck-editor__nested-editable','image__caption_highlighted'],attributes:{'contenteditable':true},children:{tag:'br'}},
            tooltip:{tag: "span",class: ["ck", "ck-tooltip","ck-tooltip_s"]},
            toolbar:{tag: "div",class: ["ck", "ck-toolbar",'ck-toolbar_grouping', 'ck-reset_all', 'ck-rounded-corners'],attributes:{'dir':'ltr'}},
            toolbar_vertical:{tag: "div",class: ["ck", "ck-toolbar",'ck-toolbar_vertical']},
            toolbar_items:{tag: "div",class: ["ck", "ck-toolbar__items"]},
            toggle:{tag:"span",class:[,"ck-button__toggle"],children:{tag:"span",class:["ck","ck-button__toggle__inner"]}},
            td:{tag:"td",class:['ck-editor__editable','ck-editor__nested-editable'],children:{tag:"br"}},
            figure:{tag:"figure",class:["ck-widget"]},
            table:{tag:'table',children:{tag:'thead'}},
            input:{tag:'div',class:['ck','ck-labeled-input'],children:{tag:'input',attributes:{type:'text'},class:['ck','ck-input','ck-input-text']}},
            around:function(before,after){return  `<div class="ck ck-reset_all ck-widget__type-around"><div class="ck ck-widget__type-around__button ck-widget__type-around__button_before" title="${before}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 8"><path d="M9.055.263v3.972h-6.77M1 4.216l2-2.038m-2 2 2 2.038"></path></svg></div>
                <div class="ck ck-widget__type-around__button ck-widget__type-around__button_after" title="${after}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 8"><path d="M9.055.263v3.972h-6.77M1 4.216l2-2.038m-2 2 2 2.038"></path></svg></div></div>`},
            horizontal:'<div class="ck-horizontal-line ck-widget" contenteditable="false"><hr></div>',
        },
        icon:{
            /**下箭头图标 ck-dropdown__arrow */
            v:'<svg class="ck ck-icon " viewBox="0 0 10 10"><path d="M.941 4.523a.75.75 0 1 1 1.06-1.06l3.006 3.005 3.005-3.005a.75.75 0 1 1 1.06 1.06l-3.549 3.55a.75.75 0 0 1-1.168-.136L.941 4.523z"></path></svg>',
            leftF:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path opacity=".5" d="M2 3h16v1.5H2zm11.5 9H18v1.5h-4.5zm0-3H18v1.5h-4.5zm0-3H18v1.5h-4.5zM2 15h16v1.5H2z"></path><path d="M12.003 7v5.5a1 1 0 0 1-1 1H2.996a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h8.007a1 1 0 0 1 1 1zm-1.506.5H3.5V12h6.997V7.5z"></path></svg>',
            rightF:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path opacity=".5" d="M2 3h16v1.5H2zm0 12h16v1.5H2zm0-9h5v1.5H2zm0 3h5v1.5H2zm0 3h5v1.5H2z"></path><path d="M18.003 7v5.5a1 1 0 0 1-1 1H8.996a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h8.007a1 1 0 0 1 1 1zm-1.506.5H9.5V12h6.997V7.5z"></path></svg>',
            center:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path opacity=".5" d="M2 3h16v1.5H2zm0 12h16v1.5H2z"></path><path d="M15.003 7v5.5a1 1 0 0 1-1 1H5.996a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h8.007a1 1 0 0 1 1 1zm-1.506.5H6.5V12h6.997V7.5z"></path></svg>',
            close:'<svg viewBox="0 0 20 20"><path d="M11.591 10.177l4.243 4.242a1 1 0 0 1-1.415 1.415l-4.242-4.243-4.243 4.243a1 1 0 0 1-1.414-1.415l4.243-4.242L4.52 5.934A1 1 0 0 1 5.934 4.52l4.243 4.243 4.242-4.243a1 1 0 1 1 1.415 1.414l-4.243 4.243z"></path></svg>',
            picleft:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path opacity=".5" d="M2 3h16v1.5H2zm0 12h16v1.5H2z"></path><path d="M12.003 7v5.5a1 1 0 0 1-1 1H2.996a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h8.007a1 1 0 0 1 1 1zm-1.506.5H3.5V12h6.997V7.5z"></path></svg>',
            picmiddle:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path opacity=".5" d="M2 3h16v1.5H2zm0 12h16v1.5H2z"></path><path d="M15.003 7v5.5a1 1 0 0 1-1 1H5.996a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h8.007a1 1 0 0 1 1 1zm-1.506.5H6.5V12h6.997V7.5z"></path></svg>',
            picright:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path opacity=".5" d="M2 3h16v1.5H2zm0 12h16v1.5H2z"></path><path d="M18.003 7v5.5a1 1 0 0 1-1 1H8.996a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h8.007a1 1 0 0 1 1 1zm-1.506.5H9.5V12h6.997V7.5z"></path></svg>',
            color:'<svg class="ck ck-icon ck-button__icon" viewBox="0 0 20 20"><path class="ck-icon__fill" d="M16.935 5.328a2 2 0 0 1 0 2.829l-7.778 7.778a2 2 0 0 1-2.829 0L3.5 13.107a1.999 1.999 0 1 1 2.828-2.829l.707.707a1 1 0 0 0 1.414 0l5.658-5.657a2 2 0 0 1 2.828 0z" style="fill: rgb(255, 255, 255);"></path><path d="M14.814 6.035 8.448 12.4a1 1 0 0 1-1.414 0l-1.413-1.415A1 1 0 1 0 4.207 12.4l2.829 2.829a1 1 0 0 0 1.414 0l7.778-7.778a1 1 0 1 0-1.414-1.415z"></path></svg>',
            removecolor:'<svg class="ck ck-icon ck-button__icon" viewBox="0 0 20 20"><path d="m8.636 9.531-2.758 3.94a.5.5 0 0 0 .122.696l3.224 2.284h1.314l2.636-3.736L8.636 9.53zm.288 8.451L5.14 15.396a2 2 0 0 1-.491-2.786l6.673-9.53a2 2 0 0 1 2.785-.49l3.742 2.62a2 2 0 0 1 .491 2.785l-7.269 10.053-2.147-.066z"></path><path d="M4 18h5.523v-1H4zm-2 0h1v-1H2z"></path></svg>',
        },
        tag2cmd: {
            'b': 'bold',
            'strong': 'bold',
            'i': 'italic',
            'em': 'italic',
            'u': 'underline',
            'sup': 'superscript',
            'sub': 'subscript',
            'img': 'insertimage',
            'a' : 'createlink',
            'ul' : 'insertunorderedlist',
            'ol' : 'insertorderedlist'
        },
        remove_css:['ck-link_selected','ck-widget_selected',]
    }
export class btnCalss{
    tp_dropdown={tag: "div",class:['ck','ck-dropdown']};
    class=[];
    view_class=[];
    panel_se=!1;
    hotkey=!1;
    button=!1;
    data={};
    name=!1;
    view=!1;
    iconNode=!1;
    bindlableText=!1;
    bindtipText=!1;
    tooltip=!1;
    children=[];
    /** 子菜单按钮实例 */
    childButtons=[]; 
    onChildButton=!1;
    /** 指向父按钮，如果有的话 */
    parentButton=!1;
    /** 是否关闭panel */
    noClosePanle=!1;
    //disabled=[];
    /**
     * 
     * @param {按钮模块} o 
     * @param {按钮名称} s 
     * @param {编辑器实例} e 
     */
    constructor(o,s,e){
        s&&(this.name=s);
        this.E=e;
        Object.assign(this,o);
        this.init&&this.init(this,e);
    }
    createButton(){
        let n={},i=!1,tip= Object.assign({},this.E.MOD.res.TP.tooltip),textNode=this.E.UI(this.E.MOD.res.TP.tip_text),
        labelNode=this.E.UI(this.E.MOD.res.TP.label),btnTp=this.E.MOD.res.TP.button;
        this.bindVar('bindlableText',labelNode);
        this.bindVar('bindtipText',textNode);
        if(this.name&&this.E.lang[this.name]){
            this.bindlableText=this.bindtipText=this.E.lang[this.name];
            this.hotkey&&(this.bindtipText=this.E.lang[this.name]+` (CTRL+${this.hotkey})`);
            tip.children=[textNode];
        }else{
            this.bindlableText=this.name;
            tip.children=[]
        }
        this.tooltip=this.E.UI(tip);
        
        n= Object.assign({},btnTp,{children:[],class:[...this.class,...btnTp.class]});
        this.label&&n.children.push(labelNode);
        this.icon&&(n.children.push(i=this.iconNode=this.E.creatNode(this.icon)),i.classList.add('ck','ck-icon','ck-button__icon'));
        this.label||n.children.push(this.tooltip);
        this.v&&(n.children.push(i=this.E.creatNode(this.E.MOD.res.icon['v'])),i.classList.add('ck','ck-icon','ck-button__icon',this.v));
        this.children.filter(t=>n.children.push(this.E.MOD.res.TP[t]));
        return this.E.UI(n)
    }
    bindVar(i,o){Object.defineProperty(this,i,{set:(v)=>{o.innerHTML=v},get(){return o.innerHTML},configurable: true})}
    getButton(){
        if(this.name=='|')this.view=this.button=this.E.UI(this.E.MOD.res.TP.separator);else
        {
            this.view=this.button=this.createButton();
            this.E.DOClisten(this.button,{click:(n,e)=>{
                e.stopPropagation();
                if(this.button.classList.contains('ck-disabled')) return;
                this.E.btnExample.forEach(btn=>{
                    if(btn.panel){
                        if(btn.name==this.name)return;
                        if(this.E.inRoot(this.button,btn.panel_se)&&this.panel)return;
                        this.noClosePanle||btn.close()
                    }
                });
                this.E.lastRange&&this.E.setRange(this.E.lastRange);//classList.contains('ck-on')
                this.panel?this.open():this.command&&getSelection().focusNode&&this.command(this.name,e);//按键名，事件
                /** 供各按钮改变状态使用， switch为redo与undo 专用开关，避免其自身的点击被加入redo undo队列 */
                this.switch||this.E.fire(this.E.editnode,'mouseup');
            }})
        }
       
        return this.viewType&&this[this.viewType](this.view),
            this.other&&this.other(this.button),
            this.panel&&this.add_Panel(this.view),  
            
            this.disabled&&this.changeDisabled(this.button),
            this.bind_state(this.button),this.view
    }
    splitbutton(n){
        let name=Object.keys(this.panel.buttons)[0],bt = this.panel.buttons[name];
        bt.command||(bt.command=this.panel.command);
        this.view =this.E.UI(this.E.MOD.res.TP.splitbutton);
        this.view.appendChild(new btnCalss(bt,name,this.E).getButton());
        this.view.appendChild(this.button);
    }
    changeDisabled(n){
        this.E.listenTo(this.E.editnode,'click',(n,e)=>{
            let ary,mixed=[];;
            e&&e.target&&(ary=[...this.E.domPathMap(e.target).keys()]);
            this.disabled.filter(v =>ary.includes(v)&&mixed.push(v))
            mixed.length?this.disabled_off():this.disabled_on()
        },!1,this.name)
    }
    changeState(n){
        let func=function(n,e){
            let a =[];
            [...this.E.domPathMap().keys()].filter(i=>{
                this.E.MOD.res.tag2cmd.hasOwnProperty(i)?a.push(this.E.MOD.res.tag2cmd[i]):a.push(i)
            })
            a.includes(this.name)?this.btn_on():this.btn_off()
        }
        this.bind_Event(func);
    }
    bind_state(n){
        if(!this.linkage)return;
        if(typeof this.linkage == 'function')this.bind_Event(this.linkage);else
        if(typeof this.linkage == 'string'){  
           /** 类型(class|style|attr):属性 */
            let [k,v]=this.linkage.split(':');
            this.bind_Event(function(n,e){
                let attr=!1,path=this.E.getdomPath(this.E.changeNode);
                if(k=='style'){
                    path.filter(n=>{n.style[v]&&(attr=n.style[v])});
                    (v+'_'+attr)==this.name?(this.btn_on(),this.parentButton.onChildButton=this):this.btn_off();
                }else
                if(k=='class'){
                    path.filter(n=>n.classList.contains(this[v])&&(attr=!0))
                    attr?(this.btn_on(),this.parentButton.onChildButton=this):this.btn_off();
                }else
                if(k=='attr'){
                    path.filter(n=>{n.hasAttribute(v)&&(attr=n.getAttribute(v))});
                    attr==this.name?(this.btn_on(),this.parentButton.onChildButton=this):this.btn_off();
                }
            })
        }else this.changeState(n);
    }
    
    bind_Event(func){
        this.E.listenTo(this.E.editnode,'mouseup',func.bind(this),!1,this.name);
        this.E.listenTo(this.E.editnode,'keyup',func.bind(this),!1,this.name)
        this.E.on('savechange',func.bind(this),true,this.name);
        this.E.on('upstatus',func.bind(this),true,this.name);
    }
    add_Panel(){
        let TP=this.tp_dropdown;
        this.panel_bindUI(this.button);
        this.create_Panel(this.view);
        this.view=this.E.UI(TP,{children:[this.view,this.panel_se],class:[...TP.class,...this.view_class]});
    }
    panel_bindUI(){
        this.panel_se=this.E.UI(this.E.MOD.res.TP.panel_se,{listenTo:[this.E.editnode,'click',()=>{ 
            //this.noClosePanle||
            this.close()
        },!1,this.name]});
        this.panel_se.onmouseleave=()=>this.close();
    }
    create_Panel(n){
        let body=document.createDocumentFragment(),li,btn,item,tmp,obj,
        initBtn=(btn,name,E)=>{
            btn=new btnCalss(btn,name,E);
            btn.getButton();
            this.panel.gruop_class&&btn.button.classList.add(...this.panel.gruop_class);
            E.btnExample.set(name,btn);
            btn.command||(btn.command=this.panel.command);
            this.childButtons.push(btn);
            btn.parentButton=this;
            if(this.panel.linkage){
                btn.linkage=this.panel.linkage;
                btn.bind_state(btn.button);
            }
            return btn;
        };
        if(typeof this.panel == 'function')
            body=this.panel(n);
        else if(this.panel.type=='list'){
            body=this.E.creatNode('<ul class="ck ck-reset ck-list">');
            for (let [k,v] of Object.entries(this.panel.buttons)){
                if(k=='-')li=this.E.creatNode('<li class="ck ck-list__separator">');
                else{
                    btn=initBtn(v,k,this.E);
                    li=this.E.creatNode('<li class="ck ck-list__item">');
                    li.appendChild(btn.button);
                }
                body.appendChild(li);
            }
        }else if(this.panel.tp&&Array.isArray(this.panel.tp)){
            let fm=document.createDocumentFragment(),tp=this.panel.tp;
            this.panel.tp.filter(t=>{
                this.data[t]=fm=fm.appendChild(this.E.UI(this.gettp(t)));
            })
            item=this.data[tp[tp.length-1]];
            body=this.data[tp[0]];
            for(let [k,v] of Object.entries(this.panel.buttons)){
                btn=initBtn(v,k,this.E);
                item.appendChild(btn.button);
            }
        }
        this.panel_se.appendChild(body)
    }
    gettp(tp){return this.E.MOD.res.TP[tp]}
    geticon(icon){return this.E.MOD.res.icon[icon]}
   
    open(dir=!1){
        this.openBefor&&this.openBefor();
        this.view.offsetLeft>(document.body.clientWidth/2)?dir='w':dir='e';
        this.panel_se.classList.add(`ck-dropdown__panel_s${dir}`);
        this.data['panel']?this.close():(this.btn_on(),this.panel_se.classList.add('ck-dropdown__panel-visible'),this.data['panel']=!0)
    }
    close(){//console.trace()
        this.btn_off();
        this.data['panel']=!1;
        ['w','e'].filter(i=>this.panel_se.classList.remove(`ck-dropdown__panel_s${i}`));
        this.panel_se.classList.remove('ck-dropdown__panel-visible')
    }
    btn_on(n=!1){n=n||this.button;let c=n.classList;c.remove('ck-off'),c.add('ck-on')}
    btn_off(n=!1){n=n||this.button;let c=n.classList;c.remove('ck-on'),c.add('ck-off')}
    onoff(n=!1){
        n=n||this.button;
        if(n.classList.contains('ck-on')){
            return this.btn_off(n),false
        }else{
            return this.btn_on(n),true
        }     
    }
    disabled_on(n){n=n||this.button;n.classList.remove('ck-disabled')}
    disabled_off(n){n=n||this.button;n.classList.add('ck-disabled')}
    getID(t=null){
        t = t||'e';
        for (let e = 0; e < 8; e++)
            t += Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
        return t
    }
}
export let more={
    icon:'<svg class="ck ck-icon ck-button__icon" viewBox="0 0 20 20"><circle cx="9.5" cy="4.5" r="1.5"></circle><circle cx="9.5" cy="10.5" r="1.5"></circle><circle cx="9.5" cy="16.5" r="1.5"></circle></svg>',
    panel:function(n){
        this.more_bar=this.E.creatNode('<div class="ck ck-toolbar" role="toolbar" aria-label="Dropdown toolbar">');
        this.more_items=this.more_bar.appendChild(this.E.UI(this.E.MOD.res.TP.toolbar_items));
        return this.more_bar;
    },
    class:['ck-dropdown__button'],
    resize:function(e){
        let leftWidth=0,n;
        if(!e)this.more_items.innerHTML=null;
        while(n=this.E.tool_items.lastChild,n&&n.offsetLeft+n.offsetWidth>this.E.panel_content.clientWidth-45){
            let i = this.E.tool_items.childNodes.length;
            if(i){
                if(this.more_items.childNodes.length>0)
                this.more_items.insertBefore(this.E.tool_items.lastChild,this.more_items.firstChild)
                else
                this.more_items.appendChild(this.E.tool_items.lastChild)
            }
        }
        for(let i=0;i<this.E.tool_items.childNodes.length;i++)leftWidth+=this.E.btnWidth[i];
        leftWidth+=this.E.tool_items.childNodes.length*5;
        while(this.more_items.childNodes.length>0&&(this.E.toolbar.clientWidth-leftWidth-60>this.E.btnWidth[this.E.tool_items.childNodes.length]))
        {
            this.E.tool_items.appendChild(this.more_items.firstChild);
            leftWidth+=this.E.btnWidth[this.E.tool_items.childNodes.length]+3;
        }
    }
}
export let bold={
    icon  :'<svg class="ck ck-icon ck-button__icon" viewBox="0 0 20 20"><path d="M10.187 17H5.773c-.637 0-1.092-.138-1.364-.415-.273-.277-.409-.718-.409-1.323V4.738c0-.617.14-1.062.419-1.332.279-.27.73-.406 1.354-.406h4.68c.69 0 1.288.041 1.793.124.506.083.96.242 1.36.478.341.197.644.447.906.75a3.262 3.262 0 0 1 .808 2.162c0 1.401-.722 2.426-2.167 3.075C15.05 10.175 16 11.315 16 13.01a3.756 3.756 0 0 1-2.296 3.504 6.1 6.1 0 0 1-1.517.377c-.571.073-1.238.11-2 .11zm-.217-6.217H7v4.087h3.069c1.977 0 2.965-.69 2.965-2.072 0-.707-.256-1.22-.768-1.537-.512-.319-1.277-.478-2.296-.478zM7 5.13v3.619h2.606c.729 0 1.292-.067 1.69-.2a1.6 1.6 0 0 0 .91-.765c.165-.267.247-.566.247-.897 0-.707-.26-1.176-.778-1.409-.519-.232-1.31-.348-2.375-.348H7z"></path></svg>',
    hotkey:'B',//热键
    linkage:!0,//跟随焦点(鼠标点击)位置，显示按键状态。
    disabled:['img','code'],
    command:function(n,e,v){
        /*** type=tag/style/list */
        this.E.excCommand('fontWeight','tag','b')
    }
}
export let italic={
    icon:'<svg class="ck ck-icon ck-button__icon" viewBox="0 0 20 20"><path d="M9.586 14.633l.021.004c-.036.335.095.655.393.962.082.083.173.15.274.201h1.474a.6.6 0 1 1 0 1.2H5.304a.6.6 0 0 1 0-1.2h1.15c.474-.07.809-.182 1.005-.334.157-.122.291-.32.404-.597l2.416-9.55a1.053 1.053 0 0 0-.281-.823 1.12 1.12 0 0 0-.442-.296H8.15a.6.6 0 0 1 0-1.2h6.443a.6.6 0 1 1 0 1.2h-1.195c-.376.056-.65.155-.823.296-.215.175-.423.439-.623.79l-2.366 9.347z"></path></svg>',
    hotkey:'I',
    linkage:!0,
    disabled:['img','code'],
    command:function(n,e,v){this.E.excCommand('fontStyle','tag','i')}
}
export let insertunorderedlist={
    icon:'<svg class="ck ck-icon ck-button__icon" viewBox="0 0 20 20"><path d="M7 5.75c0 .414.336.75.75.75h9.5a.75.75 0 1 0 0-1.5h-9.5a.75.75 0 0 0-.75.75zm-6 0C1 4.784 1.777 4 2.75 4c.966 0 1.75.777 1.75 1.75 0 .966-.777 1.75-1.75 1.75C1.784 7.5 1 6.723 1 5.75zm6 9c0 .414.336.75.75.75h9.5a.75.75 0 1 0 0-1.5h-9.5a.75.75 0 0 0-.75.75zm-6 0c0-.966.777-1.75 1.75-1.75.966 0 1.75.777 1.75 1.75 0 .966-.777 1.75-1.75 1.75-.966 0-1.75-.777-1.75-1.75z"></path></svg>',
    linkage:!0,
    disabled:['img','table','code'],
    command:function(n,e,v){this.E.excCommand('insertunorderedlist','list','ul')}
}
export let insertorderedlist={
    icon:'<svg class="ck ck-icon ck-button__icon" viewBox="0 0 20 20"><path d="M7 5.75c0 .414.336.75.75.75h9.5a.75.75 0 1 0 0-1.5h-9.5a.75.75 0 0 0-.75.75zM3.5 3v5H2V3.7H1v-1h2.5V3zM.343 17.857l2.59-3.257H2.92a.6.6 0 1 0-1.04 0H.302a2 2 0 1 1 3.995 0h-.001c-.048.405-.16.734-.333.988-.175.254-.59.692-1.244 1.312H4.3v1h-4l.043-.043zM7 14.75a.75.75 0 0 1 .75-.75h9.5a.75.75 0 1 1 0 1.5h-9.5a.75.75 0 0 1-.75-.75z"></path></svg>',
    linkage:!0,
    disabled:['img','table','code'],
    command:function(n,e,v){ this.E.excCommand('insertorderedlist','list','ol')}
}
export let blockquote={
    icon:'<svg class="ck ck-icon ck-button__icon" viewBox="0 0 20 20"><path d="M3 10.423a6.5 6.5 0 0 1 6.056-6.408l.038.67C6.448 5.423 5.354 7.663 5.22 10H9c.552 0 .5.432.5.986v4.511c0 .554-.448.503-1 .503h-5c-.552 0-.5-.449-.5-1.003v-4.574zm8 0a6.5 6.5 0 0 1 6.056-6.408l.038.67c-2.646.739-3.74 2.979-3.873 5.315H17c.552 0 .5.432.5.986v4.511c0 .554-.448.503-1 .503h-5c-.552 0-.5-.449-.5-1.003v-4.574z"></path></svg>',
    linkage:!0,
    disabled:['img','table','code'],
    command:function(n,e,v){ this.E.excCommand('blockquote','tag','blockquote')}
}
export let code={
    icon:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M.7 9.3l4.8-4.8 1.4 1.42L2.84 10l4.07 4.07-1.41 1.42L0 10l.7-.7zm18.6 1.4l.7-.7-5.49-5.49-1.4 1.42L17.16 10l-4.07 4.07 1.41 1.42 4.78-4.78z"/></svg>',
    hotkey:'Q',
    linkage:!0,
    disabled:['img','table'],
    command:function(n,e,v){ this.E.excCommand('code','tag','code')}
}