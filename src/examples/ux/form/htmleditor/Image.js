/**
 * @author Shea Frederick - http://www.vinylfox.com
 * @class Ext.ux.form.HtmlEditor.Image
 * @extends Ext.util.Observable
 */
Ext.define('Ext.ux.form.htmleditor.Image', {
    extend: 'Ext.util.Observable',
    langTitle: 'Insert Image',

    basePath: undefined,
    imageUploaderUrl: undefined,

    init: function(cmp) {
        this.cmp = cmp;
        this.cmp.on('render', this.onRender, this);
        this.cmp.on('initialize', this.onInit, this, {delay: 100, single: true});
    },

    onEditorMouseUp: function(e) {
        Ext.get(e.getTarget()).select('img').each(function(el){
            var w = el.getAttribute('width'), h = el.getAttribute('height'), src = el.getAttribute('src')+' ';
            src = src.replace(new RegExp(this.urlSizeVars[0]+'=[0-9]{1,5}([&| ])'), this.urlSizeVars[0]+'='+w+'$1');
            src = src.replace(new RegExp(this.urlSizeVars[1]+'=[0-9]{1,5}([&| ])'), this.urlSizeVars[1]+'='+h+'$1');
            el.set({src:src.replace(/\s+$/,"")});
        }, this);

    },

    onInit: function() {
        Ext.EventManager.on(this.cmp.getDoc(), {
            'mouseup': this.onEditorMouseUp,
            buffer: 100,
            scope: this
        });
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
            closable : true,
            items: [{
                xtype: 'form',
                layout: 'anchor',
                bodyPadding: 5,
                labelAlign: 'right',
                defaults: {
                    anchor: '100%'
                },
                items: [{
                    fieldLabel: 'Upload Image',
                    xtype: 'fileuploadfield',
                    emptyText: 'Select image...',
                    name: 'image',
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
                }],
                buttons: [{
                    text: 'Add',
                    handler: function(button) {
                        var panel = button.up('form'),
                            form = panel.getForm(),
                            fileUploadField = form.findField('image');

                        if(!form.isValid()) {
                            return;
                        }

                        form.submit({
                            url: me.imageUploaderUrl,
                            method: 'GET',
                            success: function(form, response) {
                                var imageName = response.result.imageName;
                                me.cmp.insertAtCursor('<img src="'+ me.basePath +'/'+ imageName + '">');
                                win.close();
                            },
                            failure: function() {
                                win.close();
                            }
                        });
                    }
                }]
            }]
        });
        win.show();
    }
});
