export class Bmi {
    bmiUrl = "https://practice.expandtesting.com/bmi";
    genderInput = "#gender";
    ageInput = "#age";
    weightInput = "#weight";
    heightInput = "#height";
    calculateButton = ".btn-primary";
    resetButton = ".btn-secondary";
    profileData = "b";
    bmiText = "#BMI";
    bodyFatText = "#bfat";

    selectGender = (gender) => {
        cy.get(this.genderInput).select(gender);
    };
    enterAge = (age) => {
        cy.get(this.ageInput).clear().type(age);
    };
    enterWeight = (weight) => {
        cy.get(this.weightInput).clear().type(weight);
    };
    enterHeight = (height) => {
        cy.get(this.heightInput).clear().type(height);
    };
    calculateBMI = () => {
        cy.get(this.calculateButton).click();
    };

    getBmiText = () => {
        return cy.get(this.bmiText);
    };
    getBodyFatText = () => {
        return cy.get(this.bodyFatText);
    };

    // Assertions
    assertBMIReport = (bmiData) => {
        const profileText = `${bmiData.gender}, ${bmiData.age} (yr), ${bmiData.height} (cm), ${bmiData.weight} (kg)`;
        cy.get(this.profileData).should("contain.text", profileText);
    };

    checkBmiValue = (bmiData) => {
        const bmiValue = (bmiData.weight / (bmiData.height / 100) ** 2).toFixed(1);
        const expectedBmiText = `Your BMI is ${bmiValue} kg/m2`;
        this.getBmiText().should("contain.text", expectedBmiText);
    };
}
