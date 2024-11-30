export let highlight={
     /* 文字按钮 */
    label:true,
     /** 带下拉箭头 */
    v:'ck-dropdown__arrow', 
     /** button 节点附加css */
    class:['ck-dropdown__button'],
     /** view 节点附加css */
    view_class:['ck-heading-dropdown'],
    /** 路径中有此标签时，按钮禁用 */
     /** 面板配置信息 */
    strToHtml:function(node){
        let t='';
        node.innerHTML.split('\n').filter(s=>t+=`<div>${s}</div>`);
        node.innerHTML=t;
    },
    panel:{
        get buttons(){
            let a={};
            return ['clear','plain','javascript','html','php','css','xml','python','shell'].filter(i=>{a[i]={},a[i].label=true}), a;
        },
        /** 面板类型 */
        type:'list',
        /** 面板按钮公用css */
        gruop_class:['ck-button_with-text'],
        /** 子按钮执行的命令 */
        command:function(n,e){
            let code=this.E.domPathMap().get('code'),pre=this.E.domPathMap().get('pre');
            n=='clear'?(code&&(this.parentButton.strToHtml(code),this.E.unwrap(code)),pre&&this.E.unwrap(pre)):(
                code= code||this.E.wrap('code'),
                code.setAttribute('brush',n),
                code.className='language-'+n,
                code.innerHTML=this.E.linefeed(code.innerHTML),
                this.E.lastRange.selectNode(code),
                pre=pre||this.E.wrap('pre'),
                pre.setAttribute('brush',n),
                pre.className='code-toolbar',
                code.childNodes.length==0&&(code.innerHTML=this.E.noBreak,this.E.lastRange.selectNode(code.lastChild))
                ),
                this.E.fire('savechange');
        },
        /** 类型(class|style|attr):属性 */
        linkage:'attr:brush',
    },
    linkage:function(n,e){
        let code,p=this.E.domPathMap().get('pre')||this.E.domPathMap().get('code');
        this.bindlableText=p&&(code=p.getAttribute('brush'))?(this.E.lang[code]||code):this.E.lang[this.name]
    },
}