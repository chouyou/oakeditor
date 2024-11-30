export let redo={
    icon:'<svg class="ck ck-icon ck-button__icon" viewBox="0 0 20 20"><path d="M14.958 9.367l-2.189 1.837a.75.75 0 0 0 .965 1.149l3.788-3.18a.747.747 0 0 0 .21-.284.75.75 0 0 0-.17-.945L13.77 4.762a.75.75 0 1 0-.964 1.15l2.331 1.955H6.22A.75.75 0 0 0 6 7.9a4 4 0 1 0 1.477 7.718l-.344-1.489A2.5 2.5 0 1 1 6.039 9.4l-.008-.032h8.927z"></path></svg>',
    hotkey:'Y',
    switch:true,/** redo与undo 专用，避免自身的点击被保存 */
    other:function(n){
        this.E.flag.redo=[];
        let onoff=()=>this.E.flag.redo.length>0?this.disabled_on(n):this.disabled_off(n);
        this.E.listenTo(this.E.editnode,'mouseup',onoff);
        this.E.on('redo',e=>onoff());
    },
    command:function(n,e){
        let t=this.E.flag.redo.pop();
        t&&(this.E.flag.undo.push(this.E.flag.currentCursor),this.E.flag.currentCursor=t,this.E.reCursor(t));
        this.E.fire('redo',this.E)
    }
}