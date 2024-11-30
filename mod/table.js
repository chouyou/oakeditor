export let table={
    v:'ck-dropdown__arrow',
    disabled:['img','table','code'],
    icon:'<svg  viewBox="0 0 20 20"><path d="M3 6v3h4V6H3zm0 4v3h4v-3H3zm0 4v3h4v-3H3zm5 3h4v-3H8v3zm5 0h4v-3h-4v3zm4-4v-3h-4v3h4zm0-4V6h-4v3h4zm1.5 8a1.5 1.5 0 0 1-1.5 1.5H3A1.5 1.5 0 0 1 1.5 17V4c.222-.863 1.068-1.5 2-1.5h13c.932 0 1.778.637 2 1.5v13zM12 13v-3H8v3h4zm0-4V6H8v3h4z"></path></svg>',
    panel:function(){
        let panel=this.E.creatNode('<div class="ck"></div>'),a=[],b,index,row,cell,
        grid=panel.appendChild(this.E.creatNode('<div class="ck-insert-table-dropdown__grid">')),
        box=this.E.creatNode('<div class="ck-insert-table-dropdown-grid-box"></div>'),
        p=this.E.creatNode('<div class="ck-insert-table-dropdown__label">0 x 0</div>');
        for(let i=0;i<100;i++){
            b=grid.appendChild(box.cloneNode(true)),a.push(b),
            b.onmouseover=(e)=>{
                index=a.findIndex((t)=>e.target==t);
                cell=index%10;
                row=Math.ceil((index+1)/10)-1;
                p.innerHTML=`${row+1} x ${cell+1}`;
                for(let j=0;j<100;j++){
                    ((j%10<=cell)&&((Math.ceil((j+1)/10)-1<row+1)))?this.btn_on(a[j]):this.btn_off(a[j])
                }
            }
            b.onmousedown=()=>{
                this.close(),
                this.create_table(row,cell)
            }
        }
        return panel.appendChild(p),panel
    },
    create_table:function(row,cell){
        let figure=this.E.UI(this.E.MOD.res.TP.figure),
            table =figure.appendChild(this.E.UI(this.E.MOD.res.TP.table)),
            tbody=table.appendChild(document.createElement('tbody')),
            tr=document.createElement('tr'),
            td=this.E.UI(this.E.MOD.res.TP.td);
        figure.classList.add('table');
        td.setAttribute('contenteditable',true),
        figure.setAttribute('contenteditable',false);
        for(let i=0;i<=cell;i++){tr.innerHTML+=td.outerHTML}
        for(let i=0;i<=row;i++){tbody.innerHTML+=tr.innerHTML}
        this.E.lastRange.insertNode(figure);
        figure.appendChild(this.E.around_Node);
        table.rows[0].cells[0].focus();
        this.E.fire('savechange')
    },
    other:function(n){
        this.E.on('render',E=>{
            E.setAttrALL('td,th','contenteditable',true,['ck-editor__editable','ck-editor__nested-editable']),
            E.setAttrALL('figure','contenteditable',"false")
        })
        this.E.on('removeRendr',E=>E.setAttrALL('[contenteditable]','contenteditable',false))
    }
}
export let pop_table=function(E){
    let i,btn={
        column:{
            v:'ck-dropdown__arrow',
            icon:'<svg viewBox="0 0 20 20"><g><path opacity="0.6" d="M 2.5 1 h 15 A 1.5 1.5 0 0 1 19 2.5 v 15 a 1.5 1.5 0 0 1 -1.5 1.5 h -15 A 1.5 1.5 0 0 1 1 17.5 v -15 A 1.5 1.5 0 0 1 2.5 1 Z M 2 2 v 16 h 16 V 2 H 2 Z" /><path opacity="0.6" d="M 18 7 v 1 H 2 V 7 h 16 Z m 0 5 v 1 H 2 v -1 h 16 Z" /><path d="M 14 1 v 18 a 1 1 0 0 1 -1 1 H 7 a 1 1 0 0 1 -1 -1 V 1 a 1 1 0 0 1 1 -1 h 6 a 1 1 0 0 1 1 1 Z m -2 1 H 8 v 4 h 4 V 2 Z m 0 6 H 8 v 4 h 4 V 8 Z m 0 6 H 8 v 4 h 4 v -4 Z" /></g></svg>',
            panel:{
                type:'list',
                gruop_class:['ck-button_with-text'],
                buttons:{
                    titlecol:{label:true,class:['ck-switchbutton'],children:['toggle'],noClosePanle:!0},
                    '-':{},
                    incellleft:{label:true},
                    incellright:{label:true},
                    rmcell:{label:true}
                },
                command:function(n,e){
                    let path=this.E.domPathMap(),tb=path.get('table'),td=path.get('td')||path.get('th'),handle=handle_table(tb);
                    n=='titlecol'?handle[n](td,this.E.btnExample.get(n).onoff()):handle[n](td);
                    this.E.saveRange();
                    this.E.fire('savechange')
                }
            },
            openBefor:function(){
                let path=this.E.domPathMap(),tb=path.get('table'),tr=tb.tBodies[0].firstChild,td=path.get('td')||path.get('th');
                path.get('th')&&tr&&this.E._isElement(tr.cells[td.cellIndex],'th')&&this.E.btnExample.get('titlecol').btn_on();
            }
        },
        row:{
            v:'ck-dropdown__arrow',
            icon:'<svg viewBox="0 0 20 20"><g><path opacity="0.6" d="M 2.5 1 h 15 A 1.5 1.5 0 0 1 19 2.5 v 15 a 1.5 1.5 0 0 1 -1.5 1.5 h -15 A 1.5 1.5 0 0 1 1 17.5 v -15 A 1.5 1.5 0 0 1 2.5 1 Z M 2 2 v 16 h 16 V 2 H 2 Z" /><path opacity="0.6" d="M 7 2 h 1 v 16 H 7 V 2 Z m 5 0 h 1 v 16 h -1 V 2 Z" /><path d="M 1 6 h 18 a 1 1 0 0 1 1 1 v 6 a 1 1 0 0 1 -1 1 H 1 a 1 1 0 0 1 -1 -1 V 7 a 1 1 0 0 1 1 -1 Z m 1 2 v 4 h 4 V 8 H 2 Z m 6 0 v 4 h 4 V 8 H 8 Z m 6 0 v 4 h 4 V 8 h -4 Z" /></g></svg>',
            panel:{
                type:'list',
                gruop_class:['ck-button_with-text'],
                buttons:{
                    titlerow:{label:true,class:['ck-switchbutton'],children:['toggle'],noClosePanle:!0},
                    '-':{},
                    inrowup:{label:true},
                    inrowbelow:{label:true},
                    rmrow:{label:true}
                },
                command:function(n,e){
                    let path=this.E.domPathMap(),tb=path.get('table'),handle=handle_table(tb),td=path.get('td')||path.get('th');
                    n=='titlerow'?handle[n](td,this.E.btnExample.get(n).onoff()):handle[n](td);
                    this.E.saveRange();
                    this.E.fire('savechange')
                }
            },
            openBefor:function(n,cmd){
                this.E.domPathMap().get('thead')&&this.E.btnExample.get('titlerow').btn_on(n)
            }
        },
        merge:{
            v:'ck-dropdown__arrow',
            icon:'<svg  viewBox="0 0 20 20"><g><path opacity="0.6" d="M 2.5 1 h 15 A 1.5 1.5 0 0 1 19 2.5 v 15 a 1.5 1.5 0 0 1 -1.5 1.5 h -15 A 1.5 1.5 0 0 1 1 17.5 v -15 A 1.5 1.5 0 0 1 2.5 1 Z M 2 2 v 16 h 16 V 2 H 2 Z" /><path opacity="0.6" d="M 7 2 h 1 v 16 H 7 V 2 Z m 5 0 h 1 v 7 h -1 V 2 Z m 6 5 v 1 H 2 V 7 h 16 Z M 8 12 v 1 H 2 v -1 h 6 Z" /><path d="M 7 7 h 12 a 1 1 0 0 1 1 1 v 11 a 1 1 0 0 1 -1 1 H 7 a 1 1 0 0 1 -1 -1 V 8 a 1 1 0 0 1 1 -1 Z m 1 2 v 9 h 10 V 9 H 8 Z" /></g></svg>',
            panel:{
                type:'list',
                list:['mergeup','mergedown','mergeleft','mergeright','-','splithorizon','splitvertical'],
                gruop_class:['ck-button_with-text'],
                get buttons(){
                    let a={};
                    return this.list.filter(i=>{
                        a[i]={},a[i].label=true}),a;
                },
                command:function(n,e){
                    let path=this.E.domPathMap(),tb=path.get('table'),node=path.get('td')||path.get('th'),
                    i=handle_table(tb)[n](node).exec();
                    i&&this.E.reSetRange(i,0,i,0);
                    this.E.fire('savechange')
                }
            },
            openBefor:function(){
                let path=this.E.domPathMap(),tb=path.get('table'),td=path.get('td')||path.get('th'),n
                this.panel.list.filter(cmd=>{
                    cmd=='-'||(n=this.E.btnExample.get(cmd))&&td&&(handle_table(tb)[cmd](td).is?n.disabled_on():n.disabled_off())
                })
                
                
            },
        },
        selectdel:{
            icon:'<svg  viewBox="0 0 16 16"><path d="M4 0v1H1v3H0V.5A.5.5 0 0 1 .5 0H4zm8 0h3.5a.5.5 0 0 1 .5.5V4h-1V1h-3V0zM4 16H.5a.5.5 0 0 1-.5-.5V12h1v3h3v1zm8 0v-1h3v-3h1v3.5a.5.5 0 0 1-.5.5H12z"></path></svg>',
            command:function(n,e){
                let figure=this.E.domPathMap().get('figure');
                figure&&figure.classList.add('ck-widget_selected');
                this.E.fire('savechange')
            }
        },
        attribute:{
            icon:'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M0 0h9v9H0V0zm2 2v5h5V2H2zm-2 9h9v9H0v-9zm2 2v5h5v-5H2zm9-13h9v9h-9V0zm2 2v5h5V2h-5zm-2 9h9v9h-9v-9zm2 2v5h5v-5h-5z"/></svg>',
            getpop:function(){
                let path=this.E.domPathMap(),tb=path.get('table'),td=path.get('td')||path.get('th'),figure=path.get('figure'),
                change=(b)=>{
                    for(let [k,v] of Object.entries(btns))this.E.btnExample.get(k).btn_off();
                    this.E.btnExample.get(`float_${figure.style.float||'center'}`).btn_on();
                    E.pop_move(!1,E.domPathMap().get('figure'));
                    b||this.E.fire('savechange')
                },
                btns={
                    float_left:{
                        icon:this.E.MOD.res.icon.leftF,
                        command:()=>{figure.style.float='left',change()}
                    },
                    float_center:{
                        name:'clear',
                        icon:this.E.MOD.res.icon.center,
                        command:()=>{figure.style.float=null,change()}
                    },
                    float_right:{
                        icon:this.E.MOD.res.icon.rightF,
                        command:()=>{figure.style.float='right',change()}
                    }
                },
                closeBt={
                    icon:this.E.MOD.res.icon.close,
                    class:['ck-button-cancel'],
                    command:()=>this.E.pop_remove()
                },
                closeNode=new this.E.B(closeBt,'close',this.E).getButton(),
                getRowNode=function(ns=[],n=null){
                    return n=n||E.creatNode('<div class="ck ck-form__row">'),ns.filter(i=>n.appendChild(i)),n
                },
                form=this.E.creatNode('<form class="ck ck-form ck-table-form" tabindex="-1"></form>'),
                btInput=this.E.UI(this.E.MOD.res.TP.input),
                input=btInput.querySelector('input'),
                btItem=this.E.creatNode('<div class="ck ck-toolbar__items">'),
                r1=getRowNode([btInput]),
                r2=getRowNode([btItem]),r3;
                closeNode.appendChild(E.creatNode(`<span class="ck ck-button__label">${E.lang['close']}</span>`))
                r3=getRowNode([closeNode]);
                form=getRowNode([r1,r2,r3],form);
                input.style='min-width:100%;width:0';
                td&&td.style.width?input.value=td.style.width:input.setAttribute('placeholder',E.lang['cellwidth']);
                input.addEventListener('input',e=>{for(let i=0;i<tb.rows.length;i++)tb.rows[i].cells[td.cellIndex].style.width=input.value;})
                for(let [k,v] of Object.entries(btns)){
                    let b=new this.E.B(v,k,this.E);b.INPUT=input;
                    btItem.appendChild(b.getButton())
                    this.E.btnExample.set(k,b);
                }
                change(1);
                return form;
            },
            command:function(n,v){
                E.pop_move(this.getpop(),E.domPathMap().get('figure'))
            }            
        },
    },
    handle_table=(tb)=>{
        /** cells 最大列数 ，offset被合并掉的偏移*/
        let cells=0,data=[],offset=new Array(tb.rows.length).fill(0);
        for(let i=0,temp=tb.rows[0];i<temp.cells.length;i++){cells+=temp.cells[i].colSpan};
        for(let i=0;i<tb.rows.length*cells;i++){
            let r=Math.ceil((i+1)/cells)-1,c=i%cells;
            let n=tb.rows[r].cells[c-offset[r]];
            if(data[i]){
                offset[r]++;
            }else{
                let tol=n.rowSpan*n.colSpan;
                for(let y=0;y<tol;y++){
                    let cell =y%n.colSpan,
                    row=Math.ceil((y+1)/n.colSpan)-1;
                    data[(row+r)*cells+cell+c]=n;
                }
            }
        }
        let isTag=function(el,tag){
            if(el&&el.tagName&&(el.tagName.toLowerCase()==tag))return true;
            return false;
        }
        let renametag=function(n,v){
            let t=document.createElement(v),ns=n.attributes;
            t.innerHTML=n.innerHTML;
            for(let i=0;i<ns.length;i++){
                ns[i].value&&t.setAttribute(ns[i].name,ns[i].value)
            }
            n.parentNode.replaceChild(t,n);
            return t
        }
        let inrow=function(node,bool){
            let index=data.indexOf(node),rowIndex=Math.ceil((index+1)/cells)-1,t,toi=0,rowi,
            tr=node.parentNode,pn=tr.parentNode,inrow=tb.insertRow(rowIndex+bool),rdi=rowIndex*cells,note=null;
            for(let i=0;i<cells;i++){
                bool?toi=rdi+i+cells:toi=rdi+i-cells;bool?rowi=pn.children.length-2:rowi=1;
                let td=data[rdi+i],totd=data[toi];
                if(tr==pn.children[rowi]||td.rowSpan==1||td!=totd){
                    t=inrow.insertCell();deploy(t,td)
                }else{
                    td==note||td.rowSpan++;note=td;
                }
            }
        }
        let incell=function(node,bool){
            let index,cell=data.indexOf(node)%cells,t,note=null;
            for(let i=0;i<tb.rows.length;i++){
                let tdi=cells*i+cell;
                if((bool&&data[tdi]==data[tdi+1])||(!bool&&data[tdi]==data[tdi-1])){
                    data[tdi]==note||data[tdi].colSpan++;note=data[tdi];
                }else{
                    let ctd=data[tdi];
                    for(let j=tdi;ctd==data[j-cells]&&j>i*cells;--j,ctd=data[j]);
                    index=ctd.cellIndex+bool;
                    if(ctd==data[tdi-cells])index=ctd.cellIndex+bool-1;
                    t=tb.rows[i].insertCell(index),deploy(t,data[tdi])
                }
            }
        }
        /** t:插入的节点，td：本行节点 */
        let deploy=function(t,td){
            t.innerHTML='<br>';
            t.setAttribute('contenteditable',true);
            t.classList.add('ck-editor__editable','ck-editor__nested-editable');
            (isTag(t.parentNode.parentNode,'thead')||isTag(td,'th'))&&renametag(t,'th')
        }
        /**
         * 对rowSpan>1节点，水平拆分,标题行使用
         * @param {节点所在行} row 
         * @param {准备拆分的节点} node 
         * @param {0 从行上部拆，1 从行下部拆} i 
         * @param {拆分偏移位置} x 
         */
        let horizon=function(row,node,i,f){
            let frow=(row+i)*cells,tdi=frow+data.indexOf(node)%cells,ctd=data[tdi],nd;
            for(let j=tdi;ctd==data[j-cells]&&j>frow;--j,ctd=data[j]);
            nd=tb.rows[row+i].insertCell(ctd.cellIndex+1);
            nd.colSpan=node.colSpan,nd.rowSpan=node.rowSpan-f,
            node.rowSpan=f;
            return deploy(nd,node),nd
        }
        return {
            setcellstyle:(node,k,v)=>{
                let index=node.cellIndex;
            },
            /** 在上方插入行 */ 
            inrowup:(node)=>inrow(node,0),
            /** 在下方插入行 */ 
            inrowbelow:(node)=>inrow(node,1),
            /** 删除行 */ 
            rmrow:(node)=>{
                let index=data.indexOf(node),rowIndex=Math.ceil((index+1)/cells)-1,rdi=rowIndex*cells,upi=rdi-cells,t,note=null,tr=node.parentNode;
                for(let i=0;i<cells;i++){
                    let td =data[rdi+i];
                    if(td.rowSpan>1){
                        if(td!=data[upi+i]){
                            td==note||(t=tr.nextSibling.insertCell(data[rdi+i].cellIndex),deploy(t,td),t.rowSpan=td.rowSpan-1,t.colSpan=td.colSpan);
                        }else{
                            td==note||td.rowSpan--;
                        }note=td;
                    }
                }tr.remove(true)
            },
            /** 在左面插入列 */ 
            incellleft:(node)=>{
                incell(node,0)
            },
            /** 在右面插入列 */ 
            incellright:(node)=>{
                incell(node,1)
            },
            /** 删除列 */ 
            rmcell:(node)=>{
                let index=data.indexOf(node),cellIndex=index%cells,note=null;
                for(let i=0;i<tb.rows.length;i++){
                    let td =data[i*cells+cellIndex];
                    if(td.colSpan>1){
                        td==note||td.colSpan--;note=td;
                    }else{
                        td.remove(true)
                    }
                }
            },
            /** 标题列 */
            titlecol:(node,state)=>{
                let index=node.cellIndex,row=node.parentNode.rowIndex,t,n=0,nd;
                state?(t='th'):(t='td');
                if(state){
                    for(i=0;i<tb.rows.length;i++){
                        for(let j=0;j<=index;j++){
                            nd=data[i*cells+j];
                            isTag(tb.rows[i].parentNode,'tbody')&&nd!=data[i*cells+j-1] &&renametag(nd,'th')
                        }
                    }
                }else{
                    for(i=row*cells+index;i<(row+1)*cells&&isTag(data[i],'th');++i,++n);
                    for(i=0;i<tb.rows.length;i++){
                        for(let j=0;j<n;j++){
                            nd=data[i*cells+j+index];
                            isTag(tb.rows[i].parentNode,'tbody')&&nd!=data[i*cells+j+index-1]&&renametag(nd,'td')
                        } 
                    }
                }
                tb.rows[row].cells[index].focus()
            },
            /** 标题行 */
            titlerow:(node,state)=>{
                let tbody=tb.tBodies[0],tr=node.parentNode,thead=tb.tHead,n=tbody.firstChild,row=tr.rowIndex,index=node.cellIndex,nd=null;
                for(i=row*cells;i<row*cells+cells;i++){
                    if(state){
                        if(data[i]==data[i+cells]){
                            let f=row-data[i].parentNode.rowIndex+1;
                            horizon(row,data[i],1,f)
                        }
                    }else{
                        if(data[i]==data[i-cells]){
                            let f=row-data[i].parentNode.rowIndex;
                            horizon(row,data[i],0,f)
                        }
                    }
                }
                if(state){
                    for(;nd!=tr;){
                        nd=thead.appendChild(tbody.firstChild);
                        for(i=0;i<nd.cells.length;i++){
                            renametag(nd.cells[i],'th')
                        }
                    }
                }else{
                    for(;nd!=tr;){
                        nd=tbody.insertBefore(thead.lastChild,tbody.firstChild);
                        for(i=0;i<nd.cells.length;i++){
                            n?(isTag( n.cells[i],'td')&&renametag(nd.cells[i],'td')):renametag(nd.cells[i],'td')
                        }
                    }
                }
                //td=tb.rows[row].cells[index];
                
                tb.rows[row].cells[index].focus()
            },
            /** 向上合并 */     
            mergeup:(node)=>{
                let tag=false,tg=null,index=data.indexOf(node);
                tg=data[index-cells];
                tg&&(tg.parentNode.parentNode==node.parentNode.parentNode)&&(tg.colSpan==node.colSpan)&&(tag=true)
                return {
                    is:tag,
                    exec:()=>{if(tag){tg.rowSpan=tg.rowSpan+node.rowSpan,node.remove(true);return tg}else return !1}
                }
            },
            /** 向下合并 */ 
            mergedown:(node)=>{
                let tag=false,tg=null,index=data.indexOf(node);
                tg=data[index+node.rowSpan*cells];
                tg&&(tg.parentNode.parentNode==node.parentNode.parentNode)&&(tg.colSpan==node.colSpan)&&(tag=true)
                return {
                    is:tag,
                    exec:()=>{if(tag){node.rowSpan=tg.rowSpan+node.rowSpan,tg.remove(true);return node}else return !1}
                }
            },
            /** 向左合并 */ 
            mergeleft:(node)=>{
                let tag=false,tg=null,index=data.indexOf(node);
                tg=data[index-1];
                tg&&(tg.rowSpan==node.rowSpan)&&(tg.tagName==node.tagName)&&(index%cells)>0&&(tag=true);
                return {
                    is:tag,
                    exec:()=>{if(tag){tg.colSpan=tg.colSpan+node.colSpan,node.remove(true);return tg}else return !1}
                }
            },
            /** 向右合并 */ 
            mergeright:(node)=>{
                let tag=false,tg=null,index=data.indexOf(node);
                tg=data[index+node.colSpan];
                tg&&tg.rowSpan==node.rowSpan&&(tg.tagName==node.tagName)&&(index+node.colSpan)%cells!=0&&(tag=true);
                return {
                    is:tag,
                    exec:()=>{if(tag){node.colSpan=tg.colSpan+node.colSpan,tg.remove(true);return node}else return !1}
                }
            },
            /** 水平拆分 */ 
            splithorizon:(node)=>{
                let row=node.parentNode.rowIndex,one=[],nd;
                 nd= data.slice(row*cells,row*cells+cells);
                 nd.filter(i=>one.includes(i)||one.push(i));
                return {
                    is:true,
                    exec:()=>{
                        if(node.rowSpan==1){
                            one.filter(i=>i.rowSpan+=1);
                            nd=tb.insertRow(row+1).insertCell(0);
                            node.rowSpan-=1;
                        }else{
                            let c= Math.ceil(node.rowSpan/2);
                            let frow=(row+c)*cells,tdi=frow+data.indexOf(node)%cells,ctd=data[tdi];
                            for(let j=tdi;ctd==data[j-cells]&&j>frow;--j,ctd=data[j]);
                            nd=tb.rows[row+c].insertCell(ctd.cellIndex+1);
                            nd.rowSpan=node.rowSpan-c;
                            node.rowSpan=c;
                        }
                        nd.colSpan=node.colSpan,
                        deploy(nd,node);
                    }
                }
            },
            /** 垂直拆分 */ 
            splitvertical:(node)=>{
                let index=data.indexOf(node),tm=[],one=[];
                for(let i=0;i<tb.rows.length;i++)tm.push(data[i*cells+index%cells]);
                tm.filter(i=>one.includes(i)||one.push(i));
                return {
                    is:true,
                    exec:()=>{
                        if(node.colSpan==1){
                            one.filter(i=>i&&(i.colSpan+=1)),
                            tm=node.parentNode.insertCell(node.cellIndex+1),
                            node.colSpan-=1;
                        }else{
                            let c= Math.ceil(node.colSpan/2);
                            tm=node.parentNode.insertCell(node.cellIndex+1),
                            tm.colSpan=node.colSpan-c;
                            node.colSpan=c;
                        }
                        tm.rowSpan=node.rowSpan,
                        deploy(tm,node);
                    }
                }
            },
        }
    }
    return{
        flip:function(n){
            let fe;
            n.tHead||n.insertBefore(document.createElement('thead'),n.firstChild);
            if(!E._isElement(n.parentNode,'figure')){
                fe=E.wrap('figure',n);
                fe.classList.add('ck-widget','ck-widget_with-selection-handle','table');
                fe.setAttribute('contenteditable',false)
            }
            let widget=E.domPathMap(n).get('figure')||fe;
            widget.querySelector('ck-widget__type-around')||widget.appendChild(E.around_Node);
            E.aroundBindUI(widget);
            let t=E.UI(E.MOD.res.TP.toolbar),
            item=t.appendChild(E.UI(E.MOD.res.TP.toolbar_items));
            for(let [k,v] of Object.entries(btn)){
                let bt=new E.B(v,k,E);E.btnExample.set(v,bt);
                item.appendChild(bt.getButton());
            }
            E.pop_move(t,widget);
        }
    }
    
}
