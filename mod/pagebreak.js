export let pagebreak={
    icon:'<svg class="ck ck-icon ck-button__icon" viewBox="0 0 20 20"><path d="M3.598.687h1.5v5h-1.5zm14.5 0h1.5v5h-1.5z"></path><path d="M19.598 4.187v1.5h-16v-1.5zm-16 14.569h1.5v-5h-1.5zm14.5 0h1.5v-5h-1.5z"></path><path d="M19.598 15.256v-1.5h-16v1.5zM5.081 9h6v2h-6zm8 0h6v2h-6zm-9.483 1L0 12.5v-5z"></path></svg>',
    other:function(){this.E.editnode.querySelectorAll('.page-break').forEach(n => n.appendChild(this.E.around_Node))},
    command:function(n,e){
        n=this.E.creatNode(`<div class="page-break ck-widget ck-widget_selected" contenteditable="false"><span class="page-break__label">Page break</span></div>`);
        this.E.lastRange.insertNode(n);
        this.E.fire('savechange');
        n.onclick=n.appendChild(this.E.around_Node);
        this.E.aroundBindUI(n);
    }
}