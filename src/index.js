#!/usr/bin/env node

const fs = require("fs");
var inquirer = require("inquirer");
const path = require("path");
const existingConfig = fs.existsSync("Dockerfile");

function buildOS() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "osType",
        message: "What should be your Base OS Image ?",
        choices: [
          "Ubuntu Based",
          "Debain Based",
          "Clear Linux Based",
          "Alpine Based",
        ],
      },
    ])
    .then((answers) => {
      console.log(answers);
      if (answers.osType) {
        //console.log('Working ...')
        buildLang();
      } else {
        console.log("Goodbye 👋");
      }
    });
}

function buildLang() {
  //console.log('Working !!')
  inquirer
    .prompt([
      {
        type: "list",
        name: "appType",
        message: "What is Project's Application Type ?",
        choices: ["Nodejs", "Python", "Php"],
      },
    ])
    .then((answers) => {
      console.log(answers);
      if (answers.appType) {
        console.log("Working ...");
      } else {
        console.log("Goodbye 👋");
      }
    });
}

function buildAppName() {
  inquirer
    .prompt([
      {
        type: "text",
        name: "appName",
        message: "What is Project Name ?",
        default: path.basename(process.cwd()),
      },
    ])
    .then((answers) => {
      console.log(answers);
      if (answers.appName) {
        //console.log('Working ...')
        buildOS();
      } else {
        console.log("Goodbye 👋");
      }
    });
}

const questions = [];
if (existingConfig) {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "existing",
        message:
          "Your Dockerfile already exists !! Do you want to replace it ?",
        default: false,
      },
    ])
    .then((answers) => {
      console.log(answers);
      if (answers.existing) {
        buildAppName();
      } else {
        console.log("Goodbye 👋");
      }
    });
} else {
  buildAppName();
}
