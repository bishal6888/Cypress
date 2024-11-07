// const { defineConfig } = require("cypress");
//
// const fs =require('fs');
// const path = require('path');
// const xlsx = require('xlsx');
// const { merge } = require('mochawesome-merge');
// const generator = require('mochawesome-report-generator');
//
// module.exports = defineConfig({
//   projectId: "jxcx27",
//   reporter: "mochawesome",
//   reporterOptions: {
//     reportDir: "cypress/reports/mocha",
//     overwrite: false,
//     html: true,
//     json: true,
//   },
//
//   e2e: {
//     setupNodeEvents(on, config) {
//       on("after:run", async () => {
//         const jsonReport = await merge({
//           files: ["cypress/reports/mocha/*.json"],
//         });
//         await generator.create(jsonReport, {
//           reportDir: "cypress/reports/mochawesome-report",
//         });
//       });
//       on("task", {
//         deleteFile(filePath) {
//           console.log("deleteFile");
//           const fullPath = path.resolve(filePath);
//           if (fs.existsSync(fullPath)) {
//             fs.readdirSync(fullPath).forEach((file) => {
//               const originalPath = path.join(fullPath, file);
//               try {
//                 fs.unlinkSync(originalPath);
//               } catch (error) {
//                 throw new Error(`Unable to delete file ${originalPath}`);
//               }
//             });
//             return null;
//           } else {
//             return false;
//           }
//         },
//       });
//
//
//       on("task",
//           {
//             readExcel(filePath) {
//               const fullPath = path.resolve(filePath);
//               const workbook = xlsx.readFile(fullPath);
//               const sheetName = workbook.SheetNames[0];
//               const sheet = workbook.Sheets[sheetName];
//
//               const jsonData = xlsx.utils.sheet_to_json(sheet, {header: 1});
//
//               jsonData.shift();
//
//               const formattedData = jsonData.map(
//                   row => {
//                     row[3] = `$${parseFloat(row[3]).toFixed(2)}`;
//                     return row;
//                   }
//               );
//             }
//             ,
//           });
//     }
//   }
// });
const { defineConfig } = require("cypress");
const fs = require("fs");
const xlsx = require("xlsx");
const { merge } = require("mochawesome-merge");
const generator = require("mochawesome-report-generator");

module.exports = defineConfig({
  projectId: "wyudpc",
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports/mocha",
    overwrite: false,
    html: true,
    json: true,
  },
  env: {
    grepFilterSpecs: true
  },
  e2e: {
    setupNodeEvents(on, config) {

      require('@cypress/grep/src/plugin')(config); //;add grep plugin
      on("after:run", async () => {
        const jsonReport = await merge({
          files: ["cypress/reports/mocha/*.json"],
        });
        await generator.create(jsonReport, {
          reportDir: "cypress/reports/mochawesome-report",
        });
      });
      on("task", {
        deleteFile(filePath) {
          console.log("deleteFile");
          const fullPath = path.resolve(filePath);
          if (fs.existsSync(fullPath)) {
            fs.readdirSync(fullPath).forEach((file) => {
              const originalPath = path.join(fullPath, file);
              try {
                fs.unlinkSync(originalPath);
              } catch (error) {
                throw new Error(
                    `Unable to delete file ${originalPath}`
                );
              }
            });
            return null;
          } else {
            return false;
          }
        },
      });

      on("task", {
        readExcel(filepath) {
          const workbook = xlsx.readFile(filepath);
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];

          const jsonData = xlsx.utils.sheet_to_json(sheet, {
            header: 1,
          });

          jsonData.shift();

          const formattedData = jsonData.map((row) => {
            row[3] = `$${parseFloat(row[3]).toFixed(2)}`;
            return row;
          });
        },
      });

      on("task", {
        async queryDatabase(query) {
          const client = new Client({
            user: "postgres",
            host: "localhost",
            database: "learn-cypress",
            password: "1234",
            port: 5432,
          });

          await client.connect();
          const result = await client.query(query);
          await client.end();
          return result.rows;
        },
      });
      return config;
    },
  },
});
