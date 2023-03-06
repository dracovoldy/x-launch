sap.ui.define([
	"sap/ui/core/mvc/XMLView",
	"sap/ui/core/routing/HashChanger"
], function (XMLView, HashChanger) {
	"use strict";

	XMLView.create({ viewName: "Quickstart.App" }).then(function (oView) {
		oView.placeAt("content");

		var oHashChanger = new HashChanger({
			id: "hasChanger",
			hashSet: function (oEvent) {
				debugger;
			}
		});

		oView().addContent(oHashChanger);
		oHashChanger.init()
	});

	



});