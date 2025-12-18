/// <reference types="cypress" />
import "cypress-mailosaur";
describe("GOS Account Creation", { testIsolation: false }, () => {
  before(() => {
    cy.task('connectToDb').then((result) => {
      if (result) throw new Error(`DB connection error: ${result}`);
    });
    cy.viewport("macbook-16");
    cy.visit("https://develop.admin.stablestakesiq.com/");
    cy.wait(2000);
    cy.get("body").then(($body) => {
      if ($body.find(".break-all", { timeout: 40000 }).length > 0) {
        cy.get(".break-all").click({ force: true });
        // cy.get("flex py-3").eq(1).click({ force: true });
        cy.xpath("(//div[contains(@class,'flex text-[#FFFFFF]')])[2]").click();
        cy.get(".chakra-spinner", { timeout: 40000 }).should("not.exist", { timeout: 40000 });
      } else {
        return;
      }
    });
  });
  beforeEach(() => {
    cy.viewport("macbook-16");
    cy.wait(2000);
  });
  const randomNumber = Math.floor(100000 + crypto.randomInt(50) * 900000);
  let emailAddress ;
  let password ;
  let formattedFutureDate = "";
  let seasonName = formattedFutureDate + "-" + "Gulftest" + "-" + randomNumber;
  let contestName = seasonName + "Contest";

  describe("User Story 1: As an admin, I want to add multiple horse pools with tiers and associate them with a contest so that all users can have the same cards in their stable while selecting a lineup.",
    { testIslation: true },
    () => {
      it("Admin login", () => {
        cy.get("#email").type(emailAddress);
        cy.get("#password").type(password);
        cy.get(".p-3").click();
        cy.log("Admin login is completed successfully")
        cy.get(".chakra-spinner", { timeout: 40000 }).should("not.exist", { timeout: 40000 });
      });

      it("Season Creation", () => {
        cy.window().then((win) => {
          const currentDate = new Date(win.Date.now());
          const futureDate = new Date(currentDate);
          const futureEndDate = new Date(currentDate);
          futureDate.setDate(currentDate.getDate() + 5);
          futureEndDate.setDate(currentDate.getDate() + 11);
          const futureDay = String(futureDate.getDate()).padStart(2, '0');
          const formattedFutureDate = `${futureDay}`;
          const futureEndDay = String(futureEndDate.getDate()).padStart(2, '0');
          const formattedFutureEndDate = `${futureEndDay}`;
          const year = currentDate.getFullYear();
          const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // month is zero-indexed
          const day = String(currentDate.getDate()).padStart(2, '0');
          
          cy.xpath("//button[contains(@class,'p-3 primary-btn')]").click();
          cy.get("#name").clear().type(seasonName)
          cy.get(':nth-child(3) > .ant-picker > .ant-picker-input > input').click();
          cy.get("div.ant-picker-cell-inner").contains(formattedFutureDate).click();
          cy.get(':nth-child(5) > .ant-picker > .ant-picker-input > input').click();
          cy.get('[aria-label="next-year"]').eq(1).click().click().click().click();
          cy.get("table.ant-picker-content").eq(1).find("div.ant-picker-cell-inner").contains(formattedFutureEndDate).click({ force: true });
          cy.xpath("(//button[contains(@class,'p-3 primary-btn')])[2]").click();
          cy.contains("New season successfully created");
          cy.get(".chakra-spinner", { timeout: 40000 }).should("not.exist", { timeout: 40000 });
        });
      });

      it("Contest Creation", () => {
        // Fetch specific fields from the first record in the sorted collection
        cy.task('fetchFirstSortedRecord', {
          collectionName: 'equibase_entries',
          sortField: 'createdAt',
          sortOrder: -1, // Descending order
          fields: ['postTime', 'raceDate', 'trackId'], // Fields to fetch
        }).then((record) => {
          // Assert the record exists and store the values
          expect(record).to.not.be.null;
          expect(record).to.have.property('postTime');
          expect(record).to.have.property('raceDate');
          expect(record).to.have.property('trackId');

          // Log the values for reference
          console.log('Fetched Record:', record);

          const { postTime, raceDate, trackId } = record;
          cy.wrap(postTime).as('postTime');
          cy.wrap(raceDate).as('raceDate');
          cy.wrap(trackId).as('trackId');

          // Parse the date strings into Date objects
          const postTimeDate = new Date(postTime);
          const raceDateDate = new Date(raceDate);

          // Retrieve hours and minutes from postTime
          const postTimeHours = postTimeDate.getUTCHours(); // Use getHours() for local time
          const postTimeMinutes = postTimeDate.getUTCMinutes(); // Use getMinutes() for local time

          // Retrieve year, month, and date from raceDate
          const raceDateYear = raceDateDate.getUTCFullYear(); // Use getFullYear() for year
          const raceDateMonth = raceDateDate.getUTCMonth() + 1; // Add 1 since getUTCMonth() is zero-based
          const raceDateDateDay = raceDateDate.getUTCDate(); // Get the day of the month

          // Log the results
          console.log(`Post Time - Hours: ${postTimeHours}, Minutes: ${postTimeMinutes}`);
          console.log(`Race Date - Year: ${raceDateYear}, Month: ${raceDateMonth}, Day: ${raceDateDateDay}`);
          console.log(`Track ID: ${trackId}`);

          //Expanding Season
          cy.get(".normal-btn").click();
          cy.wait(1500)
          cy.get(".chakra-spinner", { timeout: 40000 }).should("not.exist", { timeout: 40000 });
          cy.get("table > tbody", { timeout: 40000 }).contains(seasonName).click();
          cy.wait(2000);

          //selecting Tracks
          cy.get('button.p-3').eq(2).click();
          cy.get('tr th.py-2.px-4 label.chakra-checkbox').click();
          cy.get('.col-span-2 > .p-3').click();
          cy.get(".chakra-spinner", { timeout: 40000 }).should("not.exist", { timeout: 40000 });

          //Creating new Contest
          //Contest Name
          cy.get("button.p-3.primary-btn").click();
          cy.get('#name').type(contestName);

          //Adding Num lineups
          cy.get('#numLineups').type("5");

          //selecting contest type
          cy.get('.ant-select-selector').click();
          cy.xpath("(//div[contains(@class,'ant-select-item ant-select-item-option')])[3]").click();

          //selecting status
          cy.get('.relative > .mb-2').click();
          cy.get('input.h-4[type="checkbox"]').should('be.visible');
          cy.get('input.h-4[type="checkbox"]').eq(0).click();
          cy.get('input.h-4[type="checkbox"]').eq(2).click();
          cy.get('.relative > .mb-2').click();

          //lineup registration
          cy.window().then((win) => {
            const currentDate = new Date(win.Date.now());
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // month is zero-indexed
            const day = String(currentDate.getDate()).padStart(2, '0');

            const formattedDate = `${year}-${month}-${day}`;

            cy.get(':nth-child(8) > :nth-child(1) > .relative > .ant-picker').type(formattedDate).then(() => {
              cy.get('body').click();
            });
            cy.get(":nth-child(8) > :nth-child(2) > .relative > .ant-picker").click();
            cy.get('[data-type="hour"]').children('li').eq(0).click();
            cy.get("div.ant-picker-footer button.ant-btn").click();

            cy.get(':nth-child(9) > :nth-child(1) > .relative > .ant-picker').type(formattedDate).then(() => {
              cy.get('body').click();
            });
            cy.get(":nth-child(9) > :nth-child(2) > .relative > .ant-picker").click();
            cy.get('[data-type="hour"]').eq(1).children('li').then(() => {
              cy.get(`[data-value="${postTimeHours}"]`).eq(2).click().then(() => {
                cy.get('[data-type="minute"]').eq(1).children('li').then(() => {
                  cy.get(`[data-value="${postTimeMinutes - 5}"]`).eq(1).click();
                });
              });
            })
            cy.get("div.ant-picker-footer button.ant-btn").eq(1).click();


            // Contest registration
            cy.get(':nth-child(11) > :nth-child(1) > .relative > .ant-picker > .ant-picker-input > input').type(formattedDate).then(() => {
              cy.get('body').click();
            });
            cy.get(":nth-child(11) > :nth-child(2) > .relative > .ant-picker > .ant-picker-input > input").click();
            cy.get('[data-type="hour"]').eq(1).children('li').then(() => {
              cy.get(`[data-value="${postTimeHours}"]`).eq(4).click().then(() => {
                cy.get('[data-type="minute"]').eq(1).children('li').then(() => {
                  cy.get(`[data-value="${postTimeMinutes - 2}"]`).eq(2).click();
                });
              });
            })
            cy.get("div.ant-picker-footer button.ant-btn").eq(2).click();

            cy.get(':nth-child(12) > :nth-child(1) > .relative > .ant-picker > .ant-picker-input > input').type(formattedDate).then(() => {
              cy.get('body').click();
            });
            cy.get(":nth-child(12) > :nth-child(2) > .relative > .ant-picker > .ant-picker-input > input").click();
            cy.get('[data-type="hour"]').eq(1).children('li').then(() => {
              cy.get(`[data-value="${postTimeHours + 3}"]`).eq(6).click().then(() => {
                cy.get('[data-type="minute"]').eq(1).children('li').then(() => {
                  cy.get(`[data-value="${postTimeMinutes}"]`).eq(3).click();
                });
              });
            })
            cy.get("div.ant-picker-footer button.ant-btn").eq(3).click();
          });
          cy.get('button.p-3.primary-btn').eq(1).click();

          //Entry Requirements
          cy.get('#fee').type('2000');
          cy.get('#totalEntries').type('100');
          cy.get('#minimumEntries').type('2');
          cy.get('button.p-3.primary-btn').eq(1).click();

          //Prize Distribution
          cy.get('#totalPrizeValue').type('30000');
          cy.get('.justify-end > .p-3').click();
          cy.get(':nth-child(1) > :nth-child(4) > div.w-full > .flex > #value').type("15000");
          cy.get('.justify-end > .p-3').click();
          cy.get(':nth-child(2) > :nth-child(4) > div.w-full > .flex > #value').type("10000");
          cy.get('.justify-end > .p-3').click();
          cy.get(':nth-child(3) > :nth-child(4) > div.w-full > .flex > #value').type("5000");
          // cy.get('button.p-3.primary-btn').eq(1).click();
          cy.get('.mx-auto > :nth-child(2)').click();


          //Connection weightage
          cy.get('#jockey').type(".1")
          cy.get('#sire').type(".1");
          cy.get('#broodsmareSire').type(".1");
          cy.get('#trainer').type(".1");
          cy.get('.mx-auto > :nth-child(2)').click();
        });
      });
    });
});
