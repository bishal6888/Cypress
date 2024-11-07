describe(
    'BMI Check', () => {
        beforeEach(() => {
            cy.visit('https://practice.expandtesting.com/bmi')
        })

        it('check BMI with age and gender', {tags: 'smoke7'},() => {
            // Set the input values for gender, age, weight, and height
            cy.get('#gender').select('Male') // Assuming a select element for gender
            cy.get('#age').type('25')
            cy.get('#weight').type('60')
            cy.get('#height').type('170')

            // Click on the button to calculate BMI (assuming there's a button to submit the form)
            cy.get('.btn-primary').click()

            // Capture the age, gender, weight, and height, calculate the expected BMI, and compare with the displayed BMI
            cy.get('#weight').invoke('val').then((weightValue) => {
                cy.get('#height').invoke('val').then((heightValue) => {
                    cy.get('#age').invoke('val').then((ageValue) => {
                        cy.get('#gender').invoke('val').then((genderValue) => {
                            const weight = parseFloat(weightValue);
                            const height = parseFloat(heightValue) / 100; // Convert height to meters
                            const age = parseInt(ageValue);
                            const gender = genderValue;

                            // Calculate the expected BMI
                            const expectedBmi = (weight / (height * height)).toFixed(2);

                            // Determine expected BMI range based on age and gender, if applicable
                            // For this example, let’s assume there are different categories or ranges for BMI based on age and gender
                            let expectedRange;
                            if (gender === 'Male') {
                                if (age < 18) {
                                    expectedRange = [18, 24]; // Example BMI range for males under 18
                                } else {
                                    expectedRange = [20, 25]; // Example BMI range for adult males
                                }
                            } else {
                                if (age < 18) {
                                    expectedRange = [17, 23]; // Example BMI range for females under 18
                                } else {
                                    expectedRange = [19, 24]; // Example BMI range for adult females
                                }
                            }

                            // Assert the displayed BMI value dynamically
                            cy.get('#bmi-result').invoke('text').then((displayedBmi) => {
                                const displayedBmiValue = parseFloat(displayedBmi);
                                expect(displayedBmiValue).to.be.closeTo(parseFloat(expectedBmi), 0.01);

                                // Optionally, assert if BMI falls within the expected range
                                expect(displayedBmiValue).to.be.within(expectedRange[0], expectedRange[1]);
                            });
                        });
                    });
                });
            });
        });

    }
    )
