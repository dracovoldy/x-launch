sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/Component",
	"sap/ui/core/ComponentContainer",
	"sap/ui/core/library",
	"sap/ui/core/routing/HashChanger"
], function (Controller, MessageToast, JSONModel, Component, ComponentContainer, coreLibrary, HashChanger) {
	"use strict";

	return Controller.extend("Quickstart.App", {

		onInit: function () {
			this.getView().addStyleClass("sapUiSizeCompact");

			this.getView().setModel(new JSONModel({
				launchpadTitle: "Launchpad",
				activeAppTitle: "<App Title>",
				tiles: [
					{
						title: "Button Sample",
						subtitle: "Official UI5 sample",
						state: "Loaded",
						targetMapping: "ZSemanticObj-action",
						url: "./repository/ButtonWithBadge",
						componentId: "sap.m.sample.ButtonWithBadge",
					},
					{
						title: "Object Page Sample",
						subtitle: "Header Content Priorities",
						state: "Loaded",
						targetMapping: "ZObjPage-headercontent",
						url: "./repository/sap.uxap.sample.ObjectPageHeaderContentPriorities",
						componentId: "sap.uxap.sample.ObjectPageHeaderContentPriorities",
					},
				]
			}));


			this.oHashChanger = new HashChanger({
				id: "hashChanger",
				hashSet: function (oEvent) {
					debugger;
				}
			});

			this.oHashChanger.init()
		},

		onAfterRendering: function () {

			// Handle intial load hash
			var that = this;
			var navCon = this.byId("x-app");
			var sViewport = "x-page";
			var sHash = this.oHashChanger.getHash();

			if (sHash) {

				var aTiles = this.getView().getModel().getProperty("/tiles");

				var oTileMatched = aTiles.find(function (oTile) {
					if (oTile.targetMapping === sHash) {
						return true;
					}
					return false;
				});

				this.handleNav(navCon, sViewport, null, oTileMatched.targetMapping);

				this.getView().byId("x-page")
					.addContent(new ComponentContainer({
						height: "100%",
						url: oTileMatched.url,
						name: oTileMatched.componentId,
						lifecycle: coreLibrary.ComponentLifecycle.Container,
						componentCreated: function (evt) {
							// debugger;
							var oManifest = evt.getParameter("component").getManifest();
							console.log(oManifest);
							var oModel = that.getView().getModel();
							oModel.setProperty("/activeAppTitle", oManifest["sap.app"]["title"]);
						}
					}));

			}

		},

		onHomePress: function (oEvent) {
			// location.replace(location.href);
			// location.reload();

			var navCon = this.byId("x-app");
			var sViewport = "tc-page";

			this.handleNav(navCon, sViewport, "show", null);

			var page = this.byId("x-page");
			page.destroyContent();

		},

		onTilePress: function (oEvent) {
			var that = this;
			var navCon = this.byId("x-app");
			var sViewport = "x-page";

			var oTile = oEvent.getSource().getBindingContext().getObject();
			console.log(oTile);

			this.handleNav(navCon, sViewport, null, oTile.targetMapping);

			this.getView().byId("x-page")
				.addContent(new ComponentContainer({
					height: "100%",
					url: oTile.url,
					name: oTile.componentId,
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

		handleNav: function (navCon, sViewport, animation, sHash) {

			// var sViewport = evt.getSource().data("sViewport");
			this.oHashChanger.setHash(sHash);
			if (sViewport) {
				navCon.to(this.byId(sViewport), animation ? animation : "fade");
			} else {
				navCon.back();
			}
		}
	});

});