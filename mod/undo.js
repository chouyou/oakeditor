export let undo={
    icon:'<svg class="ck ck-icon ck-button__icon" viewBox="0 0 20 20"><path d="M5.042 9.367l2.189 1.837a.75.75 0 0 1-.965 1.149l-3.788-3.18a.747.747 0 0 1-.21-.284.75.75 0 0 1 .17-.945L6.23 4.762a.75.75 0 1 1 .964 1.15L4.863 7.866h8.917A.75.75 0 0 1 14 7.9a4 4 0 1 1-1.477 7.718l.344-1.489a2.5 2.5 0 1 0 1.094-4.73l.008-.032H5.042z"></path></svg>',
    hotkey:'Z',
    switch:true,
    other:function(n){
        this.E.flag.undo=[];
        let up=()=>{this.E.flag.undo.push(this.E.flag.currentCursor),
            this.E.flag.currentCursor=this.E.saveCursor(this.E.editnode),
            this.E.flag.redo=[],
            onoff();
            //this.E.fire('redo',this.E);
        },
        onoff=()=>this.E.flag.undo.length>0?this.disabled_on():this.disabled_off();
        
        this.E.listenTo(this.E.editnode,'keyup',(n,e)=>{
            let k=e.keyCode;
            if(e.ctrlKey||e.shiftKey||e.altKey)return;
            if(k==8||(k>218&&k<223)||(k>185&&k<192)||(k>64&&k<91)||(k>47&&k<58)||k==13||k==32||k==229||k==46)up()
        })
        this.E.listenTo(this.E.editnode,'cut','paste',up);
        this.E.listenTo(this.E.editnode,'cut',up);
        this.E.listenTo(this.E.editnode,'mouseup',onoff)
        this.E.on('savechange',up);
        this.E.on('redo',onoff);
    },
    command:function(n,e){
        let t=this.E.flag.undo.pop();
        t&&(this.E.flag.redo.push(this.E.flag.currentCursor),this.E.flag.currentCursor=t,this.E.reCursor(t));
        this.E.fire('redo',this.E)
    }
}