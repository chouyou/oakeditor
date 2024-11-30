export let outdent={
    icon:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 3.75c0 .414.336.75.75.75h14.5a.75.75 0 1 0 0-1.5H2.75a.75.75 0 0 0-.75.75zm5 6c0 .414.336.75.75.75h9.5a.75.75 0 1 0 0-1.5h-9.5a.75.75 0 0 0-.75.75zM2.75 16.5h14.5a.75.75 0 1 0 0-1.5H2.75a.75.75 0 1 0 0 1.5zm1.618-9.55L.98 9.358a.4.4 0 0 0 .013.661l3.39 2.207A.4.4 0 0 0 5 11.892V7.275a.4.4 0 0 0-.632-.326z"></path></svg>',
    linkage:function(){
        let o=this.E.styles.get('marginLeft'),i=!1,s=o?o.value:!1;
        if(s)i=parseInt(s.split('p')[0]);
        i?this.btn_on():this.btn_off();
        if(i>5) this.disabled_on();else this.disabled_off();
    },
    command:function(){
        let o=this.E.styles.get('marginLeft'),
        i=parseInt(o.value.split('p')[0]);
        i=i-40;
        if(i>5)o.node.style.marginLeft=i+'px';else o.node.style.marginLeft=null;
        this.E.fire('savechange')
    }
}
