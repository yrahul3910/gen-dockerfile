#!/usr/bin/env node

const fs = require("fs");
var inquirer = require("inquirer");
const path = require("path");
const existingConfig = fs.existsSync("Dockerfile");

var installerSc = null;
var lang = null;

function buildOS() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "osType",
        message: "What should be your Base OS Image ?",
        choices: [
          "Ubuntu Based",
          "Debian Based",
          "Clear Linux Based",
          "Alpine Based",
        ],
      },
    ])
    .then((answers) => {
      console.log(answers);
      if (answers.osType) {
          const os = answers.osType;
          switch(os)
          {
              case 'Ubuntu Based' :
              answers.osType = 'dftechs/ubuntu-dev';
              break;
              case 'Debian Based' :
              answers.osType = 'dftechs/debian-dev';
              break;
              case 'Clear Linux Based' :
              answers.osType = 'dftechs/clearlinux-dev';
              break;
              case 'Alpine Based' :
              answers.osType = 'dftechs/alpine-dev';
              break;
          }
        console.log(answers);
        buildLang();
      } else {
        console.log("Goodbye 👋");
      }
    });
}

function buildLang() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "appType",
        message: "What is Project's Application Type ?",
        choices: ["Nodejs", "Python3"],
      },
    ])
    .then((answers) => {
      console.log(answers);
      lang = answers.appType;
      if (answers.appType) {
          switch(answers.appType){
              case 'Nodejs' :
                installerSc = 'npm install'
                break;
              case 'Python3' :
                installerSc = 'pip3 install -r requirements.txt'  
                break;
          }
        console.log(installerSc);
        enablePort();
      } else {
        console.log("Goodbye 👋");
      }
    });
}

function buildEnvPort() {
  inquirer
    .prompt([
      {
        type: "text",
        name: "envPort",
        message: "What PORT do you want to expose ?",
        default: 5000,
      },
    ])
    .then((answers) => {
      console.log(answers);
      if (answers.envPort) {
        // console.log("Working ... 👋");
        finalCMD();
      } else {
        console.log("Goodbye 👋");
      }
    });
}

function finalCMD() {
  inquirer
    .prompt([
      {
        type: "text",
        name: "entryPoint",
        message: "Which file initiates your app ?",
        default: `index.js`,
      },
    ])
    .then((answers) => {
      var stFile = answers.entryPoint;
          switch(lang){
              case 'Nodejs':
              var starter = "node ";
              break;
              case 'Python3':
              var starter = "python3 ";
              break;
          }
        stFile = starter + stFile;
        answers.entryPoint = stFile;
    console.log(answers);
    console.log("Work in Progress .... 🚀");
    });
}

function enablePort() {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "enbPort",
        message: "Do you want to Expose Ports ?",
      },
    ])
    .then((answers) => {
      console.log(answers);
      if (answers.enbPort) {
        buildEnvPort();
      } else {
        finalCMD();
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
