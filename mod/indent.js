export let indent={
    icon:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 3.75c0 .414.336.75.75.75h14.5a.75.75 0 1 0 0-1.5H2.75a.75.75 0 0 0-.75.75zm5 6c0 .414.336.75.75.75h9.5a.75.75 0 1 0 0-1.5h-9.5a.75.75 0 0 0-.75.75zM2.75 16.5h14.5a.75.75 0 1 0 0-1.5H2.75a.75.75 0 1 0 0 1.5zM1.632 6.95 5.02 9.358a.4.4 0 0 1-.013.661l-3.39 2.207A.4.4 0 0 1 1 11.892V7.275a.4.4 0 0 1 .632-.326z"></path></svg>',
    command:function(){
        let n,s=getSelection(),r=this.E.lastRange,
        add=(n)=>{
            if(n.style.marginLeft){
                let i=n.style.marginLeft.split('p')[0];
                n.style.marginLeft=parseInt(i)+40+'px';
            }else n.style.marginLeft='40px'
        };
        if(s.isCollapsed){
            n=this.E.changeNode;
            if(this.E.editnode===n)n=this.E.wrap('span',s.anchorNode);
            this.E.inRoot(n)&&add(n)           
        }else{
            let ns=this.E.lastRange.extractContents();
            ns.childNodes.forEach(el =>add(el));
            this.E.lastRange.insertNode(ns)
        }
        this.E.fire('savechange')
    }
}