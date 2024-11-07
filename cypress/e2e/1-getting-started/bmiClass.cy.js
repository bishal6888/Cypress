import { Bmi } from "../../pages/bmi";

describe("BMI Calculator", () => {
    const bmi = new Bmi();
    let bmiData = null;
    beforeEach(() => {
        cy.visit(bmi.bmiUrl);
        cy.fixture("bmiData.json").then((data) => {
            bmiData = data;
        });
    });

    it("should calculate BMI", () => {
        bmi.selectGender(bmiData.gender);
        bmi.enterAge(bmiData.age);
        bmi.enterWeight(bmiData.weight);
        bmi.enterHeight(bmiData.height);
        bmi.calculateBMI();
        bmi.assertBMIReport(bmiData);
    });

    it("should calculate correct BMI", () => {
        const genderData = ["Male", "Female"];
        const randomBMiData = {
            //age between 15 and 70
            age: Math.floor(Math.random() * 55) + 15,
            //weight between 40 and 150
            weight: Math.floor(Math.random() * 110) + 40,
            //height between 140 and 200
            height: Math.floor(Math.random() * 60) + 140,
            // gender male or female
            gender: genderData[Math.floor(Math.random() * 2)],
        };
        bmi.selectGender(randomBMiData.gender);
        bmi.enterAge(randomBMiData.age);
        bmi.enterWeight(randomBMiData.weight);
        bmi.enterHeight(randomBMiData.height);
        bmi.calculateBMI();
        bmi.assertBMIReport(randomBMiData);
        bmi.checkBmiValue(randomBMiData);
    });
});
