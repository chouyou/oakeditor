export let fontcolor={
    v:'ck-dropdown__arrow',
    disabled:['img','code'],
    icon:'<svg class="ck ck-icon ck-button__icon" viewBox="0 0 20 20"><path d="M12.4 10.3 10 4.5l-2.4 5.8h4.8zm.5 1.2H7.1L5.7 15H4.2l5-12h1.6l5 12h-1.5L13 11.5zm3.1 7H4a1 1 0 0 1 0-2h12a1 1 0 0 1 0 2z"></path></svg>',
    panel:function(){return this.E.MOD.ColorPanel(this).create('color','color')},
    openBefor:function(){this.E.MOD.ColorPanel(this).open('color')}
}
export let ColorPanel=function(host){
    const color={Black:'rgb(0, 0, 0)', Dim:'rgb(77, 77, 77)', Grey:'rgb(153, 153, 153)',Lightgrey:'rgb(230, 230, 230)',White:'rgb(255, 255, 255)',Red:'rgb(230, 76, 76)',Orange:'rgb(230, 153, 76)',Yellow:'rgb(230, 230, 76)',Lightgreen:'rgb(153, 230, 76)',Green:'rgb(76, 230, 76)',Aquamarine:'rgb(76, 230, 153)',Turquoise:'rgb(76, 230, 230)',Lightblue:'rgb(76, 153, 230)',Blue:'rgb(76, 76, 230)',Purple:'rgb(153, 76, 230)'};
    //const color={Black:'#000000',Dim:'#4d4d4d',Grey:'#999999',Lightgrey:'#e6e6e6',White:'#ffffff',Red:'#e64c4c',Orange:'#e6994c',Yellow:'#e6e64c',Lightgreen:'#99e64c',Green:'#4ce64c',Aquamarine:'#4ce699',Turquoise:'#4ce6e6',Lightblue:'#4c99e6',Blue:'#4c4ce6',Purple:'#994ce6'};
    return{
        create:(style,name)=>{
            let removecolor={
                icon:this.E.MOD.res.icon.removecolor,
                class:['ck-color-table__remove-color','ck-button_with-text'],
                command:()=>this.E.domPath.filter(n=>this.E._isElement(n,'span')?this.E.unwrap(n):n.style[name]=null)
            },
            panel=this.E.creatNode('<div class="ck-color-table">'),
            grid=panel.appendChild(this.E.creatNode('<div class="ck ck-color-grid" style="grid-template-columns: repeat(5, 1fr);">')),
            rm=panel.appendChild(new this.E.B(removecolor,name,this.E).getButton());
            rm.appendChild(this.E.UI(this.E.MOD.res.TP.label,{innerHTML:this.E.lang['removecolor']}))
            for (const [key, value] of Object.entries(color)){
                let bt,info ={
                    icon:this.E.MOD.res.icon.color,
                    class:['ck-color-grid__tile'],
                    command:(name,e)=>this.E.excCommand(style,'style',value)
                }
                key=='White'&&info.class.push('ck-color-table__color-tile_bordered');
                bt=grid.appendChild(new this.E.B(info,key,this.E).getButton());
                bt.style.backgroundColor =value;
                bt.dataset.color=key
            }
            host.data.colorGroup=grid;
            return panel.appendChild(grid),panel
        },
        open:(style)=>{
            host.data.colorGroup.childNodes.forEach(n=>
            {
                let color=this.E.styles.get(style),cl=n.classList;
                color&&color.value==n.style.backgroundColor?cl.add('ck-on'):cl.remove('ck-on');
            })
        }
    }
}