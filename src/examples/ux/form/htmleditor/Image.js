/**
 * @author Shea Frederick - http://www.vinylfox.com
 * @class Ext.ux.form.HtmlEditor.Image
 * @extends Ext.util.Observable
 */
Ext.define('Ext.ux.form.htmleditor.Image', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.htmleditorimage',
    lockableScope: 'both',
    langTitle: 'Upload Image',

    basePath: undefined,

    init: function(cmp) {
        this.cmp = cmp;
        this.cmp.on('render', this.onRender, this);
    },

    onRender: function() {
        this.cmp.getToolbar().add({
            iconCls: 'x-edit-image',
            handler: this.selectImage,
            scope: this,
            tooltip: this.langTitle,
            overflowText: this.langTitle
        });
    },

    selectImage: function() {
        var me = this;
        var win = Ext.create('Ext.window.Window', {
            title: me.langTitle,
            layout: 'fit',
            width: 360,
            closable : true,
            items: [{
                xtype: 'form',
                layout: 'anchor',
                bodyPadding: 5,
                labelAlign: 'right',
                defaults: {
                    labelSeparator: '',
                    labelAlign: 'top',
                    anchor: '100%'
                },
                items: [{
                    fieldLabel: 'Image',
                    xtype: 'fileuploadfield',
                    emptyText: 'Select an image...',
                    allowBlank: false,
                    name: 'image',
                    itemId: 'image',
                    buttonText: '',
                    buttonConfig: {
                        iconCls: 'x-edit-upload'
                    },
                    listeners: {
                        change: function(f, v) {
                            var node = Ext.DomQuery.selectNode("input[id="+ f.getInputId() +"]");
                            node.value = v.replace("C:\\fakepath\\", "");
                        }
                    }
                }, {
                    xtype: 'displayfield',
                    value: 'Maximun File Size: 50K'
                }],
                buttons: [{
                    text: 'Add',
                    handler: function(button) {
                        var panel = button.up('form');
                        me.addImage(panel, function(errors, imageName) {
                            if (errors === undefined) {
                                me.cmp.insertAtCursor('<img src="'+ me.basePath +'/'+ imageName + '" alt="'+ imageName +'" title="'+ imageName +'">');
                                win.close();

                            } else {
                                panel.getForm().markInvalid({image: errors});
                                win.setLoading(false);
                            }

                        });
                    }
                }]
            }]
        });
        win.show();
    },

    addImage: Ext.emptyFn
});
