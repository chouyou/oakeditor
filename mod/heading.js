export let heading={
    /* 文字按钮 */
    label:true,
    /** 带下拉箭头 */
    v:'ck-dropdown__arrow', 
    /** button 节点附加css */
    class:['ck-dropdown__button'],
    /** view 节点附加css */
    view_class:['ck-heading-dropdown'],
    /** 面板配置信息 */
    panel:{
        /** 面板类型 */
        type:'list',
        /** 面板按钮公用css */
        gruop_class:['ck-button_with-text'],
        /** 面板按钮组 */
        get buttons(){
            let a={};
            return ['p','h2','h3','h4'].filter(i=>{a[i]={},a[i].label=true,a[i].class=[`ck-heading_${i}`]}),a;
        },
        linkage:true,
        /** 按钮组共同执行的函数，如需分别执行，需在按钮配置内添加command 属性 */
        command:function(name,v){this.E.excCommand('formatBlock','tag',name,Object.keys(this.parentButton.panel.buttons))} //点击菜单执行的命令this.gruop指向panel
    },
    linkage:function(){
        let i;this.childButtons.filter(o=>{o.button.classList.contains('ck-on')&&(i=o)});
        this.bindlableText=i?i.bindlableText:this.E.lang[this.name]
    },
    disabled:['img','code'],//如domPath中有数组中的把标签，本按钮被禁用
}