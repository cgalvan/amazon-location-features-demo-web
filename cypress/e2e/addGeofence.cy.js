/* Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved. */
/* SPDX-License-Identifier: MIT-0 */
/// <reference types="cypress" />

// STR
// 1-Go to https://qa.amazonlocation.services/demo
// 2-I click on Geofence icon on the top right corner beneath map styles icon
// 3-I click on add button
// 4-I select a place on the map for adding geofence
// 5-I enter a unique name for the geofence
// 6-I click on save
// 7-Verify User is able add Geofence

describe("Add Geofence", () => {
	it("authentication", () => {
		cy.visit(Cypress.env("URL"), {
			auth: {
				username: Cypress.env("USERNAME"),
				password: Cypress.env("PASSWORD")
			}
		});
		cy.wait(15000);
		cy.get('[id="Icon"]').click();
		cy.wait(2000);
		cy.contains("Settings").click();
		cy.wait(2000);
		cy.contains("Connect AWS Account").click();
		cy.wait(2000);
		cy.get('[placeholder="Enter IdentityPoolId"]').type(Cypress.env("IDENTITY_POOL_ID"));
		cy.wait(2000);
		cy.get('[placeholder="Enter UserDomain"]').type(Cypress.env("USER_DOMAIN"));
		cy.wait(2000);
		cy.get('[placeholder="Enter UserPoolClientId"]').type(Cypress.env("USER_POOL_CLIENT_ID"));
		cy.wait(2000);
		cy.get('[placeholder="Enter UserPoolId"]').type(Cypress.env("USER_POOL_ID"));
		cy.wait(2000);
		cy.get('[placeholder="Enter WebSocketUrl"]').type(Cypress.env("WEB_SOCKET_URL"));
		cy.wait(2000);
		cy.get('[type="button"]').eq(3).click();
		cy.wait(6000);
		cy.contains("Connect AWS Account").click();
		cy.wait(2000);
		cy.get('[type="button"]').eq(3).click();
		cy.wait(2000);
		cy.origin(Cypress.env("ORIGIN_WEB"), () => {
			cy.get(Cypress.env("GET_WEB")).then(els => {
				[...els].forEach(el => {
					cy.wrap(el).find("#signInFormUsername").type(Cypress.env("EMAIL"));
					cy.wrap(el).find("#signInFormPassword").type(Cypress.env("EMAIL_PASS"));
					cy.wrap(el).find('[name="signInSubmitButton"]').click();
				});
			});
		});
		cy.wait(10000);
		cy.get('[id="Icon"]').click();
		cy.contains("Sign out").should("exist");
		cy.wait(5000);
		cy.get('[class="amplify-flex geofence-button"]').click();
		cy.wait(2000);
		cy.get('[class="mapboxgl-user-location-dot mapboxgl-marker mapboxgl-marker-anchor-center"]').click();
		cy.wait(2000);
		cy.get('[placeholder="Type unique Geofence Name"]').type("Geofence1");
		cy.wait(2000);
		cy.contains("Save").click();
		cy.wait(2000);
		cy.get("div").should("contain", "Geofence1");
		cy.wait(2000);
		cy.get('[id="Icon/trash"]').click({ force: true });
		cy.wait(2000);
	});
});
