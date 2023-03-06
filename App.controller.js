sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/Component",
	"sap/ui/core/ComponentContainer",
	"sap/ui/core/library"
], function (Controller, MessageToast, JSONModel, Component, ComponentContainer, coreLibrary) {
	"use strict";

	return Controller.extend("Quickstart.App", {
		onPress: function () {
			MessageToast.show("Hello UI5!");
			this.byId("app").to(this.byId("intro"));
		},

		onInit: function () {
			this.getView().setModel(new JSONModel({
				launchpadTitle: "Launchpad",
				activeAppTitle: "<App Title>",
				features: [
					"Enterprise-Ready Web Toolkit",
					"Powerful Development Concepts",
					"Feature-Rich UI Controls",
					"Consistent User Experience",
					"Free and Open Source",
					"Responsive Across Browsers and Devices"
				],
				tiles: [
					{
						title: "test tile",
						subtitle: "subtitle",
						state: "Loaded",
					},
					{
						title: "test tile",
						subtitle: "subtitle",
						state: "Loaded",
					},
					{
						title: "test tile",
						subtitle: "subtitle",
						state: "Loaded",
					},
				]
			}));
		},

		onChange: function (oEvent) {
			var bState = oEvent.getParameter("state");
			this.byId("ready").setVisible(bState);
		},

		onHomePress: function (oEvent) {
			// location.replace(location.href);
			// location.reload();

			var navCon = this.byId("x-app");
			var target = "tc-page";

			this.handleNav(navCon, target, "show");

			var page = this.byId("x-page");
			page.destroyContent();

		},

		onpressTile: function (oEvent) {
			var that = this;
			var navCon = this.byId("x-app");
			var target = "x-page";

			this.handleNav(navCon, target);

			this.getView().byId("x-page")
				.addContent(new ComponentContainer({
					height: "100%",
					url: "./repository/ButtonWithBadge",
					name: "sap.m.sample.ButtonWithBadge",
					lifecycle: coreLibrary.ComponentLifecycle.Container,
					componentCreated: function (evt) {
						// debugger;
						var oManifest = evt.getParameter("component").getManifest();
						console.log(oManifest);
						var oModel = that.getView().getModel();
						oModel.setProperty("/activeAppTitle", oManifest["sap.app"]["title"]);
					}
				}));
		},

		handleNav: function (navCon, target, animation) {

			// var target = evt.getSource().data("target");
			debugger;
			// this.oHashChanger.setHash("Launchpad-openFLP");
			if (target) {
				navCon.to(this.byId(target), animation ? animation : "fade");
			} else {
				navCon.back();
			}
		}
	});

});