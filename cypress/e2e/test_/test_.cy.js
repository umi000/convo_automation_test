/// <reference types="cypress" />
import "cypress-mailosaur";
import 'cypress-mochawesome-reporter/register';
// cypress/support/commands.js
import 'cypress-file-upload';
describe("", { testIsolation: false }, () => {
  before(() => {
    // cy.task('connectToDb').then((result) => {
    //   if (result) throw new Error(`DB connection error: ${result}`);
    // });
    cy.viewport("macbook-16");
    cy.visit("https://the-internet.herokuapp.com/login");
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
  // after(() => {
  //   cy.get(".mb-4 > .nav-item").click();
  // });
  let emailAddress = "rawleigh2@yopmail.com";
  let password = "Aa1@VpgD6Equ8XVi";
  describe("User Story 1: As an admin, I want to login via creds.", { testIslation: false }, () => {
    it('should display the login form', () => {
        cy.get('div#content>div>h2').should('be.visible');
        cy.get(`input#username`).should('exist');
        cy.get(`input#password`).should('exist');
        cy.get('button.radius').should('exist');
    });
    
    it('should require email and password fields to log in', () => {
        cy.get('button.radius').click();
        cy.get('#flash').should('contain', 'Your username is invalid!');
    });
    
    it('should not log in with invalid credentials', () => {
        cy.get(`input#username`).type('wrong_email@yopmail.com');
        cy.get(`input#password`).type('WrongPassword');
        cy.get('button.radius').click();
        cy.get('#flash').should('contain', 'Your username is invalid!');
    });
    
    it('should toggle password visibility', () => {
        cy.get(`input#password`).type('Aa1@VpgD6Equ8XVi');        
        cy.get(`input#password`).should('have.attr', 'type', 'password');
        cy.get(`input#password`).should('have.attr', 'type', 'text');
    });

    it('should disable login button when fields are empty', () => {
        cy.get('button.radius').should('be.disabled');
    });

    it('should show error message when username is empty', () => {
        cy.get(`input#password`).type('SomePassword');
        cy.get('button.radius').click();
        cy.get('#flash').should('contain', 'Your username is invalid!');
    });

    it('should show error message when password is empty', () => {
        cy.get(`input#username`).type('valid_email@example.com');
        cy.get('button.radius').click();
        cy.get('#flash').should('contain', 'Your password is invalid!');
    });

    it('should display password strength indicators', () => {
        const weakPassword = '12345';
        const mediumPassword = 'Abcdefg1';
        const strongPassword = 'Aa@1StrongPassw0rd';

        // Test Weak Password
        cy.get(`input#password`).clear().type(weakPassword);
        cy.get('span.password-strength').should('contain', 'Weak'); // Adjust selector as per your app

        // Test Medium Password
        cy.get(`input#password`).clear().type(mediumPassword);
        cy.get('span.password-strength').should('contain', 'Medium'); // Adjust selector as per your app

        // Test Strong Password
        cy.get(`input#password`).clear().type(strongPassword);
        cy.get('span.password-strength').should('contain', 'Strong'); // Adjust selector as per your app
    });

    it('should successfully log in with valid credentials (UI)', () => {
        cy.get(`input#username`).clear().type(emailAddress);
        cy.get(`input#password`).clear().type(password);
        cy.get('button.radius').click();
        cy.url().should('include', '/dashboard');
    });

});
});

describe("User Story 2: Table.",
  { testIsolation: false },  // Note: Corrected 'testIslation' to 'testIsolation'
  () => {
  
    beforeEach(() => {
      cy.visit("https://the-internet.herokuapp.com/tables");
      cy.wait(2000); // Explicit wait to allow the table to load
    });
  
    it("should extract and validate table data", () => {
      const expectedData = [
          { lastName: 'Smith', firstName: 'John', email: 'jsmith@gmail.com', due: '$50.00', website: 'http://www.jsmith.com' },
          { lastName: 'Bach', firstName: 'Frank', email: 'fbach@yahoo.com', due: '$51.00', website: 'http://www.frank.com' },
          { lastName: 'Doe', firstName: 'Jason', email: 'jdoe@hotmail.com', due: '$100.00', website: 'http://www.jdoe.com' },
          { lastName: 'Conway', firstName: 'Tim', email: 'tconway@earthlink.net', due: '$50.00', website: 'http://www.timconway.com' }
      ];

      // Extract the table rows
      cy.get('#table1 tbody tr').each((row, index) => {
          // Extract cells from the current row
          cy.wrap(row).find('td').then(cells => {
              const rowData = {
                  lastName: cells[0].innerText,
                  firstName: cells[1].innerText,
                  email: cells[2].innerText,
                  due: cells[3].innerText,
                  website: cells[4].innerText
              };

              // Validate that the extracted data matches the expected data
              expect(rowData).to.deep.equal(expectedData[index]);
          });
      });
    });

    it("should check for specific user entry", () => {
      const userEmailToCheck = 'jdoe@hotmail.com';
      // Looking for the row where the email matches
      cy.get('#table1 tbody tr').each((row) => {
          cy.wrap(row).find('td').then(cells => {
              const email = cells[2].innerText;

              if (email === userEmailToCheck) {
                  // If it matches, check other related data
                  const lastName = cells[0].innerText;
                  const firstName = cells[1].innerText;
                  const due = cells[3].innerText;
                  const website = cells[4].innerText;

                  // Assertions related to the matching entry
                  expect(lastName).to.equal('Doe');
                  expect(firstName).to.equal('Jason');
                  expect(due).to.equal('$100.00');
                  expect(website).to.equal('http://www.jdoe.com');
              }
          });
      });
    });

    it("should check for the number of rows in the table", () => {
      cy.get('#table1 tbody tr').should('have.length', 4); // Change number based on expected rows
    });

    it("should verify that action buttons are present for each user", () => {
      cy.get('#table1 tbody tr').each((row) => {
          // Check for existence of edit and delete buttons
          cy.wrap(row).find('td').last().within(() => {
              cy.get('button.edit').should('exist');
              cy.get('button.delete').should('exist');
          });
      });
    });

    it("should prevent deletion action by confirming prompt", () => {
      cy.on('window:confirm', () => true); // Automatically confirm any confirmation dialogue
      cy.get('#table1 tbody tr').first().within(() => {
          cy.get('button.delete').click();
      });
      // Optionally verify the number of rows again after deletion, assuming the row was deleted
      cy.get('#table1 tbody tr').should('have.length', 3); // Adjust based on your initial state
    });

    it("should contain valid URLs in the website column", () => {
      cy.get('#table1 tbody tr').each((row) => {
          cy.wrap(row).find('td').then(cells => {
              const website = cells[4].innerText;

              // Validate the URL format (basic check)
              expect(website).to.match(/^https?:\/\/.+$/);
          });
      });
    });

    it("should check for proper email formats in the email column", () => {
      cy.get('#table1 tbody tr').each((row) => {
          cy.wrap(row).find('td').then(cells => {
              const email = cells[2].innerText;

              // Validate the email format (basic check)
              expect(email).to.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
          });
      });
    });

    it("should check for consistent due amounts", () => {
      cy.get('#table1 tbody tr').each((row) => {
          cy.wrap(row).find('td').then(cells => {
              const dueAmount = cells[3].innerText;

              // Ensure all due amounts are in valid currency format
              expect(dueAmount).to.match(/^\$\d+\.\d{2}$/); // Match $xx.xx format
          });
      });
    });

});

describe("Task 3: JavaScript Alerts & Pop-ups", () => {
  beforeEach(() => {
      // Visit the JavaScript Alerts page
      cy.visit("https://the-internet.herokuapp.com/javascript_alerts");
  });

  it("should handle JS Alert", () => {
      // Click on the JS Alert button
      cy.contains('Click for JS Alert').click();

      // Validate the alert message and click OK
      cy.on('window:alert', (text) => {
          expect(text).to.equal('I am a JS Alert');
      });
      
      // Check the result after the alert
      cy.get('#result').should('contain', 'You successfully clicked an alert');
  });

  it("should handle JS Confirm", () => {
      // Click on the JS Confirm button
      cy.contains('Click for JS Confirm').click();

      // Validate the confirm alert message
      cy.on('window:confirm', (text) => {
          expect(text).to.equal('I am a JS Confirm');
      });

      // Confirming
      cy.on('window:confirm', () => true); // Simulate clicking OK
  });

  
  it("should handle JS Prompt", () => {
    // Stub the prompt before triggering the event that causes it
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('Umair aSLAM rAJPUT');
    });
  
    // Now trigger the prompt
    cy.contains('Click for JS Prompt').click();
  
    // Assert the result
    cy.get('#result').should('contain', 'You entered: Umair aSLAM rAJPUT');
  });
  
});
describe("File Upload Automation", () => {
  beforeEach(() => {
      // Step 1: Visit the file upload page
      cy.visit("https://the-internet.herokuapp.com/upload");
  });

  it("should upload a file successfully", () => {
      // Step 2: Select the file input and upload a file from fixtures
      const fileName =`FILE.txt`; // Assuming this file is in the cypress/fixtures directory

      // Step 3: Upload the file by setting the input value to the file
      cy.get('#file-upload').attachFile(fileName);

      // Step 4: Click the upload button
      cy.get('#file-submit').click();

      // Step 5: Verify that the uploaded file name appears on the page
      cy.get('#uploaded-files').should('contain', fileName);
  });
});









