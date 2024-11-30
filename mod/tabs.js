export let tabs={
    icon:'<svg  class="ck ck-icon ck-button__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 18"><path d="M18 6V4H2v2h16zm0 4H2v6h16v-6zM0 4c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm4 8h4v2H4v-2z"/></svg>',
    disabled:['img','table'],
    tabNUM:0,
    other:function(){
        /** 注册结束后需要删除的节点 */
        this.E.rm_Node=[...this.E.rm_Node,'.tabs-add','.tabs-remove','.tabs-close'];
        this.tabOBJ=new class{
            changeTab(n) {
				const notSelected = n.getAttribute("aria-selected") === "false";
				const positionBefore = n.parentNode.getBoundingClientRect().top;
				const notClosable = !n.parentNode.classList.contains("closeable");
				this.deselectTabList(n);
				if (notSelected || notClosable) {
					this.selectTab(n);
					const name = n.getAttribute("name");
					this.selectNamedTabs(name, this.id);
				}
				const positionAfter = n.parentNode.getBoundingClientRect().top;
				const positionDelta = positionAfter - positionBefore;
				// Scroll to offset content resizing
				window.scrollTo(0, window.scrollY + positionDelta);
            }
            /**
             * Select tab and show associated panel.
             * @param  {Node} tab tab to select
             */
            selectTab(tab) {
				tab.setAttribute("aria-selected", true);
				// Show the associated panel
				document
					.getElementById(tab.getAttribute("aria-controls"))
                	.removeAttribute("hidden");
            }
            /**
             * Hide the panels associated with all tabs within the
             * tablist containing this tab.
             * @param  {Node} tab a tab within the tablist to deselect
             */
            deselectTabList(tab) {
				const parent = tab.parentNode;
				const grandparent = parent.parentNode;
			
				Array.from(parent.children)
				.forEach(t => t.setAttribute("aria-selected", false));
			
				Array.from(grandparent.children)
					.slice(1)  // Skip tablist
					.forEach(panel => panel.setAttribute("hidden", true));
            }
          
            /**
             * Select grouped tabs with the same name, but no the tab
             * with the given id.
             * @param  {Node} name name of grouped tab to be selected
             * @param  {Node} clickedId id of clicked tab
             */
            selectNamedTabs(name, clickedId=null) {
				const groupedTabs = document.querySelectorAll(`.sphinx-tabs-tab[name="${name}"]`);
				const tabLists = Array.from(groupedTabs).map(tab => tab.parentNode);
			
				tabLists
					.forEach(tabList => {
					// Don't want to change the tabList containing the clicked tab
					const clickedTab = tabList.querySelector(`[id="${clickedId}"]`);
					if (clickedTab === null ) {
						// Select first tab with matching name
						const tab = tabList.querySelector(`.sphinx-tabs-tab[name="${name}"]`);
						this.deselectTabList(tab);
						this.selectTab(tab);
					}
                })
            }
        }
        this.rebind=E=>{
			let Tabs=null,allTabs=null;
            Tabs = E.editnode.querySelectorAll('.sphinx-tabs-tab');
            Tabs.forEach(tab=>this.tabIint(tab));
            allTabs = E.editnode.querySelectorAll('.sphinx-tabs');
            allTabs.forEach(tabs=>this.bindUI(tabs))
		}
        this.E.on('render',this.rebind) 
        this.E.on('redo',this.rebind)
    },
    gettablist:function(num,id,i){return [
        `<li aria-controls="panel-${num}-${id}" class="sphinx-tabs-tab group-tab" id="tab-${num}-${id}" name="${id}" role="tab" tabindex="0">${i}</li>`,
        `<div aria-labelledby="tab-${num}-${id}" class="sphinx-tabs-panel group-tab" id="panel-${num}-${id}" name="${id}" role="tabpanel" tabindex="0"><p>${i}</p>`
        ]
    },
    tabIint:function(tab){
		let id=tab.getAttribute('aria-controls'),panel=document.querySelector('#'+id);
		tab.setAttribute('contenteditable',true);
        tab.onclick=e=>this.tabOBJ.changeTab(e.target);
		panel.setAttribute('contenteditable',true);
		this.addCloseNode(panel);
    },
	closeFunc:function(e){
		let panel=e.target.parentNode,id=panel.getAttribute('aria-labelledby'),tab=panel.parentNode.querySelector('#'+id);
		panel&&tab&&(panel.remove(),tab.remove());
        this.E.fire('savechange')
	},
	addCloseNode:function(panel){
		let n=panel.querySelector('.tabs-close')||panel.appendChild(this.E.creatNode('<div class="close tabs-close">x</div>'));
		n.setAttribute('contenteditable',false);
		n.onclick=this.closeFunc.bind(this);
	},
    bindUI:function(tabs){
        let tablist=tabs.querySelector('[role="tablist"]'),
        add=tablist.querySelector('.tabs-add')||tablist.appendChild(this.E.creatNode('<li class="add tabs-add"> + </li>')),
        remove=tablist.querySelector('.tabs-remove')|| tablist.appendChild(this.E.creatNode('<li class="remove tabs-remove"> - </li>'));
        tabs.setAttribute('contenteditable',false);
        remove.onclick=e=>{tabs.parentNode.remove(),this.E.fire('savechange')};
		tabs.onclick=e=>{tabs.parentNode.appendChild(this.E.around_Node);this.E.aroundBindUI(tabs.parentNode)}
        add.onclick=e=>{
            e.stopPropagation();
            let a=this.gettablist(tabs.dataset.num,this.getID(),tablist.childNodes.length-1),
            tab=tablist.insertBefore(this.E.creatNode(a[0]),add);
            tabs.appendChild(this.E.creatNode(a[1]));
            this.tabIint(tab);
            this.tabOBJ.changeTab(tab);
            this.tabOBJ.changeTab(tab);
            this.E.fire('savechange')
        }
    },
    getID:function(){return Math.random().toString(36).slice(-8)},
    command:function(n,e){
        let widget=this.E.creatNode('<div class="ck-widget ck-widget_with-selection-handle" contenteditable="false">'),
        tabs=this.E.creatNode(`<div class="sphinx-tabs docutils container" data-num="${this.E.editnode.querySelectorAll('.sphinx-tabs').length}">`),
        tablist=this.E.creatNode('<ul aria-label="Tabbed content" class="closeable" role="tablist">');
        tabs.appendChild(tablist);
        widget.appendChild(tabs);
        this.bindUI(tabs);
        this.E.lastRange.insertNode(widget),
        this.E.fire('savechange')
    }
}