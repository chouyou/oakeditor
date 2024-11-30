export let blockquote={
    icon:'<svg class="ck ck-icon ck-button__icon" viewBox="0 0 20 20"><path d="M3 10.423a6.5 6.5 0 0 1 6.056-6.408l.038.67C6.448 5.423 5.354 7.663 5.22 10H9c.552 0 .5.432.5.986v4.511c0 .554-.448.503-1 .503h-5c-.552 0-.5-.449-.5-1.003v-4.574zm8 0a6.5 6.5 0 0 1 6.056-6.408l.038.67c-2.646.739-3.74 2.979-3.873 5.315H17c.552 0 .5.432.5.986v4.511c0 .554-.448.503-1 .503h-5c-.552 0-.5-.449-.5-1.003v-4.574z"></path></svg>',
    state:2,
    disabled:['img','table','code'],
    command:function(n,e){
        n=this.E.domPathMap().get('blockquote');
        if(n){
           this.E.unwrap(n)
        }else {
            this.E.SetRangeToBlock();
            let p=this.E.domPathMap().get('p'),r=this.E.lastRange,l=this.E.domPath[0];
            if(r.startContainer.isSameNode(r.endContainer)&&this.E.inRoot(r.startContainer)){
                p?r.selectNode(p):(!this.E.editnode.isSameNode(l)&&r.selectNode(l))
            }
            this.E.sel.selectAllChildren(this.E.wrap('blockquote'))
        }
        this.E.fire('savechange');
    }
}