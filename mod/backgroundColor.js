export let backgroundColor={
    /** 必须先加载 字体颜色模块 */
    v:'ck-dropdown__arrow',
    disabled:['img','code'],
    icon:'<svg class="ck ck-icon ck-button__icon" viewBox="0 0 20 20"><path d="M4 2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm8.38 9.262H7.62L10 5.506l2.38 5.756zm.532 1.285L14.34 16h1.426L10.804 4H9.196L4.234 16H5.66l1.428-3.453h5.824z"></path></svg>',
    panel:function(){return this.E.MOD.ColorPanel(this).create('backgroundColor','backgroundColor')},
    openBefor:function(){this.E.MOD.ColorPanel(this).open('backgroundColor')}
}