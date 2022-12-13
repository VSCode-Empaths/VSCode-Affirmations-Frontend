// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const { fetchAffirmations, fetchCategories } = require("./fetch-utils.js");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "VSCCode-Error-Affirmations" is now active!'
  );

  // TODO FETCH ALL Affirmations by category.id (1 - Daily)
  const affirmations = await fetchAffirmations();
  const dailyAffirmations = affirmations.filter((row) => row.category_id == 1);
  const randomNumber = Math.floor(Math.random() * dailyAffirmations.length);
  vscode.window.showInformationMessage(dailyAffirmations[randomNumber].text);

  // TODO FETCH ALL Affirmations by category.id (2 - Error)
  let disposable = await vscode.commands.registerCommand(
    "error_affirmations.getAffirmation(error)",
    async function () {
      const errorAffirmations = affirmations.filter(
        (row) => row.category_id == 2
      );
      const randomNumber = Math.floor(Math.random() * errorAffirmations.length);
      vscode.window.showInformationMessage(
        errorAffirmations[randomNumber].text
      );
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
