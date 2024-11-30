export let createlink={
    icon :'<svg class="ck ck-icon ck-button__icon" viewBox="0 0 20 20"><path d="M11.077 15l.991-1.416a.75.75 0 1 1 1.229.86l-1.148 1.64a.748.748 0 0 1-.217.206 5.251 5.251 0 0 1-8.503-5.955.741.741 0 0 1 .12-.274l1.147-1.639a.75.75 0 1 1 1.228.86L4.933 10.7l.006.003a3.75 3.75 0 0 0 6.132 4.294l.006.004zm5.494-5.335a.748.748 0 0 1-.12.274l-1.147 1.639a.75.75 0 1 1-1.228-.86l.86-1.23a3.75 3.75 0 0 0-6.144-4.301l-.86 1.229a.75.75 0 0 1-1.229-.86l1.148-1.64a.748.748 0 0 1 .217-.206 5.251 5.251 0 0 1 8.503 5.955zm-4.563-2.532a.75.75 0 0 1 .184 1.045l-3.155 4.505a.75.75 0 1 1-1.229-.86l3.155-4.506a.75.75 0 0 1 1.045-.184z"></path></svg>',
    linkage:true,
    disabled:['img','code'],
    command:function(s,e,v){this.createlink(e)},//点击按钮时执行的函数。
    createlink:function(e){
        let t=this.E.creatNode('<form class="ck ck-link-form" tabindex="-1"></form>'),
        d=this.E.UI(this.E.MOD.res.TP.input),
        i=d.querySelector('input'),
        n=this.E.domPathMap().get('a'),r=this.E.lastRange.getBoundingClientRect();
        if(n)i.value=n.href;
        t.appendChild(d);
        for(let [k,v] of Object.entries(this.btns)){
            let b=new this.E.B(v,k,this.E);b.INPUT=i;
            t.appendChild(b.getButton())
        }
        this.E.pop_move(t,n)
        this.E.saveRange()
    },
    btns:{
        savelink:{
            icon:'<svg class="ck ck-icon ck-button__icon" viewBox="0 0 20 20"><path d="M6.972 16.615a.997.997 0 0 1-.744-.292l-4.596-4.596a1 1 0 1 1 1.414-1.414l3.926 3.926 9.937-9.937a1 1 0 0 1 1.414 1.415L7.717 16.323a.997.997 0 0 1-.745.292z"></path></svg>',
            class:['ck-button-save'],
            command:function(n,e){
                n=this.E.domPathMap().get('a');
                let i=this.INPUT;
                if(n){
                    n.href=i.value;
                }else{
                    n=this.E.creatNode(`<a href="${i.value}"></a>`);
                    if(this.E.lastRange.collapsed){
                        this.E.lastRange.insertNode(n);
                        n.innerHTML=i.value
                    }else{
                        this.E.lastRange.surroundContents(n);
                    }
                }
                i.value&&this.E.fire('savechange');
                this.E.lastRange.collapse();
                this.E.pop_body();
            },
        },
        closepop:{
            init:(bt,E)=>bt.icon=E.MOD.res.icon.close,
            class:['ck-button-cancel'],
            command:function(n,e){this.E.balloon.remove()},
        },
    }
}
export let pop_a=function(E){
    let btns={
        editlink:{
            icon:'<svg class="ck ck-icon ck-button__icon" viewBox="0 0 20 20"><path d="M7.3 17.37l-.061.088a1.518 1.518 0 0 1-.934.535l-4.178.663-.806-4.153a1.495 1.495 0 0 1 .187-1.058l.056-.086L8.77 2.639c.958-1.351 2.803-1.076 4.296-.03 1.497 1.047 2.387 2.693 1.433 4.055L7.3 17.37zM9.14 4.728l-5.545 8.346 3.277 2.294 5.544-8.346L9.14 4.728zM6.07 16.512l-3.276-2.295.53 2.73 2.746-.435zM9.994 3.506L13.271 5.8c.316-.452-.16-1.333-1.065-1.966-.905-.634-1.895-.78-2.212-.328zM8 18.5L9.375 17H19v1.5H8z"></path></svg>',
            command:function(n,e){this.E.btnExample.get('createlink').command()},
        },
        unlink:{
            icon:'<svg class="ck ck-icon ck-button__icon" viewBox="0 0 20 20"><path d="M11.077 15l.991-1.416a.75.75 0 1 1 1.229.86l-1.148 1.64a.748.748 0 0 1-.217.206 5.251 5.251 0 0 1-8.503-5.955.741.741 0 0 1 .12-.274l1.147-1.639a.75.75 0 1 1 1.228.86L4.933 10.7l.006.003a3.75 3.75 0 0 0 6.132 4.294l.006.004zm5.494-5.335a.748.748 0 0 1-.12.274l-1.147 1.639a.75.75 0 1 1-1.228-.86l.86-1.23a3.75 3.75 0 0 0-6.144-4.301l-.86 1.229a.75.75 0 0 1-1.229-.86l1.148-1.64a.748.748 0 0 1 .217-.206 5.251 5.251 0 0 1 8.503 5.955zm-4.563-2.532a.75.75 0 0 1 .184 1.045l-3.155 4.505a.75.75 0 1 1-1.229-.86l3.155-4.506a.75.75 0 0 1 1.045-.184zm4.919 10.562l-1.414 1.414a.75.75 0 1 1-1.06-1.06l1.414-1.415-1.415-1.414a.75.75 0 0 1 1.061-1.06l1.414 1.414 1.414-1.415a.75.75 0 0 1 1.061 1.061l-1.414 1.414 1.414 1.415a.75.75 0 0 1-1.06 1.06l-1.415-1.414z"></path></svg>',
            command:function(n,e){this.E.unwrap(this.LINK),this.E.fire('savechange'),this.E.balloon.remove()},
        },
    }
    return{
        flip:function(n){
            let t=E.creatNode('<div class="ck ck-link-actions" tabindex="-1"></div>');
            if(n){
                t.appendChild(E.creatNode(`<a class="ck ck-button ck-button_with-text ck-link-actions__preview" type="button" tabindex="-1" target="_blank" href="${n.href}"><span class="ck ck-button__label">${n.href.slice(0,40)}</span></a>`));
                for(let [k,v] of Object.entries(btns)){
                    v.LINK=n;t.appendChild(new E.B(v,k,E).getButton())
                }
                E.pop_move(t,E.domPathMap().get('a'),'ck-link_selected');
            }
        }
    }
}