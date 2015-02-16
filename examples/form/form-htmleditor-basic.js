/**
 * @author Shea
 */
Ext.onReady(function(){
    Ext.QuickTips.init();

    Ext.create('Ext.form.Panel', {
        title: 'HtmlEditor Plugins Form',
        renderTo: Ext.getBody(),
        width: 950,
        height: 400,
        items: [{
            name: 'description',
            value: 'The quick brown fox jumps over the fence<br/><img src="training.jpg" width="300" height="200"/>',
            anchor: '100% 100%',
            xtype: 'htmleditor',
            plugins: [
                Ext.create('Ext.ux.form.htmleditor.Table')
            ]
        }],
        buttons: [{
            text: 'Save'
        }]
    });
});
