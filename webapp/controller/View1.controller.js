sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/suite/ui/commons/TimelineItem"
], function (Controller, TimelineItem) {
	"use strict";

	return Controller.extend("ovly.holidays.controller.View1", {
		
		endPoint: "https://calendarific.com/api/v2/holidays",
		apiKey: "453f7bd6deb5ac7481a2b52ba8061a6592ed29c3",
		
		onInit: function () {
			this._select = this.byId("select");
			this._datePicker = this.byId("datepicker");
			this._timeline = this.byId("timeline");
		},
		
		onSearch: function(oEvent){
			$.get(this.endPoint, this._getParameters(), function(oResponse){
				this._refreshTimeline(oResponse.response.holidays);
			}.bind(this));
		},
		
		_getParameters: function(){
			return {
				api_key: this.apiKey,
				country: this._select.getSelectedKey(),
				year: this._datePicker.getDateValue().getFullYear()
			}
		},
		
		_refreshTimeline: function(aHolidays){
			this._timeline.removeAllContent();
			
			jQuery.each(aHolidays, function(index, element){
				var oTimelineItem = new TimelineItem({
					dateTime: element.date.iso,
					title: element.name,
					text: element.description,
					icon: "sap-icon://date-time",
				});
				this._timeline.addContent(oTimelineItem);
			}.bind(this));
		}
	});
});