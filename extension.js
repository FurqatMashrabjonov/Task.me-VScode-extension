// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const axios = require('axios');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Congratulations, your extension "fura" is now active!');


	let disposable = vscode.commands.registerCommand('fura.helloWorld', function () {
		//open prompt to get the url
		vscode.window.showInputBox({
			placeHolder: 'Enter the url of the file to be translated',
			prompt: 'Enter the url of the file to be translated'
		}).then(function (url) {
			console.log(url);
			if (url) {
				vscode.workspace.getConfiguration().update('fura.apiKey', url, true);
				// console.log(vscode.workspace.getConfiguration().get('fura.url'));
				
				
			}
		});
		//save url to environment variable
		

		// setInterval(() => {
		// 	// @ts-ignore
		// axios.get('http://task.me/api/vscode').then(res => {
		// 	console.log(res.data);
		// });
		// }, 1000)
		vscode.window.showInformationMessage('Hello World from furaaaaaaaaaaaaaaaa!');
	});

	let disposable2 = vscode.commands.registerCommand('fura.getUrl', function () {
		let url = vscode.workspace.getConfiguration().get('fura.apiKey');
		// @ts-ignore
		axios.get(`http://task.me/api/vscode/${url}`).then(res => {
		vscode.window.showInformationMessage(res.data);
		}).catch(err => {console.log(err);})
		console.log(url);
	});


	context.subscriptions.push(disposable);

	context.subscriptions.push(disposable2);
}

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
