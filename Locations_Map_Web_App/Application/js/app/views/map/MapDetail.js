app.views.MapDetail = Ext.extend(Ext.Panel, {
    fullscreen: true,
    floating: true,
    layout: 'card',
    floatingCls: '',
    showSessionData: true,
    activeItem: 'detailPanel',
    initComponent: function(){
    	//Add Detail Button
    	
    	var toolbarButtonItems = [
    			{
	    				text: 'Details',
	    				handler: function(button, event) {
	    	    			this.setActiveItem(this.detailPanel, 'slide');
						},
						scope: this,
	    				pressed:true
	    			}]
	    //Add Image Button if Location has an Image		
		if(this.record.data.images.image != undefined)	{
			toolbarButtonItems.push({
	    				text: 'Images',
	    				handler: function(button, event) {
	    	    			this.setActiveItem(this.detailImage, 'slide');
						},
						scope: this
	    			});
		
		
		}	
	    //Add Map Button
	    toolbarButtonItems.push({
	    				text: 'Map',
	    				handler: function(button, event) {
	    	    			this.setActiveItem(this.detailMap, 'slide');
						},
						scope: this
	    			});
    	
    	
    	
    	
    	
    	
    	var toolbarButtons = [{
    		xtype: 'segmentedbutton',
    		allowDepress:true,
    		centered: true,
    		items:	toolbarButtonItems
    	}]

    	if (Ext.is.Phone) {
    		toolbarButtons.unshift({
                ui: 'back',
                text: 'Back',
                scope: this,
                handler: function(){
                   this.hide( {
                        type: 'slide',
                        reverse: true,
                        scope: this,
                        after: function(){
                            this.destroy();
                        }
                    });
                }
              });
            
    		toolbarButtons.push({
                ui: 'plain',
                iconCls: 'action',
                iconMask: true,
                scope: this,
                handler: function(){
                    
                    Ext.Msg.confirm('External Link', 'Open in Google Maps?', function(res){
                        if (res == 'yes') window.location = 'http://maps.google.com/?q='+ this.record.data.lat + ',' + this.record.data.lng;
                    }, this);
                }
            })
    	this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: toolbarButtons,}
        	];

    		
    	} else {
    	this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            title: this.record.data.title,
            items: [{
                ui: 'back',
                text: 'Back',
                scope: this,
                handler: function(){
                    this.hide( {
                        type: 'slide',
                        reverse: true,
                        scope: this,
                        after: function(){
                            this.destroy();
                        }
                    });
                }
            },
            {xtype: 'spacer', flex: 1}, {
                ui: 'plain',
                iconCls: 'action',
                iconMask: true,
                scope: this,
                handler: function(){
                    
                    Ext.Msg.confirm('External Link', 'Open in Google Maps?', function(res){
                        if (res == 'yes') window.location = 'http://maps.google.com/?q='+ this.record.data.lat + ',' + this.record.data.lng;
                    }, this);
                }
            }
            
            ]
        },	{
        	xtype: 'toolbar',
    		ui: 'light',
    		dock: 'top',
    		layout: { 
    			pack: 'center', align: 'center' },
    		items: toolbarButtons
        }
        
        
        ];
       	}
		var position = new google.maps.LatLng(this.record.data.lat, this.record.data.lng);
		var mapDetailIcon = this.record.data.marker;
		var infowindow = new google.maps.InfoWindow({
            content: this.record.data.address
        });
    	this.detailMap = new Ext.Map({
    		title: 'Details',
    		layout: 'card',
            itemId: 'mapDetailPanel',
        	id: 'MapDetailMap',
        	store: app.stores.LocationsList,
            mapOptions : {
                center : position,  //nearby San Fran
                zoom: detailZoom,
                navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.DEFAULT
                }
            },
            listeners: {
                maprender : function(comp, map){
                   var marker = new google.maps.Marker({
                         position: position,
                         title : '',
                         icon: mapDetailIcon,
                         map: map
                    });
                    google.maps.event.addListener(marker, 'mousedown', function() {
                         infowindow.open(map, marker);
                    });

                                    }
            }

    	});
        
        this.detailPanel = new app.views.LocationPanel({
        	 title: 'Details',
        	 layout: 'card',
        	 itemId: 'detailPanel',
        	 record: this.record.data
            ,listeners: {
                scope: this
                ,record: this.record.data
            }
        
        });
        
        //Check if there are images before rendering the images panel
        if(this.record.data.images.image != undefined){
        this.detailImage = new app.views.LocationImage({
        	 title: 'Images',
        	 itemId: 'detailImage',
        	 itemCls: 'image',
        	 record: this.record.data
            ,listeners: {
                scope: this
                ,record: this.record.data
            }
        
        });
        } else {
        	this.detailImage = '';
        }
        this.items = [
        	this.detailPanel
        ]
		if (this.detailImage != ''){
			this.items.push(this.detailImage);
		}
			this.items.push(this.detailMap);
        
        app.views.MapDetail.superclass.initComponent.call(this);
    }
});

Ext.reg('MapDetail', app.views.MapDetail);