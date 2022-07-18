const vscode = require('vscode');
const axios = require('axios');

let time_interval = null

function startTime(){
	time_interval = setInterval(() => {
		let editor = vscode.window.activeTextEditor;
		let token = vscode.workspace.getConfiguration().get('Taskme.token');
		let data = {
			languageId: editor.document.languageId,
			// text: editor.document.getText(),
			project: vscode.workspace.name,
			file: editor.document.fileName,
			line: editor.selection.active.line,
			column: editor.selection.active.character,
			time: new Date().getTime()
		}
			
		// @ts-ignore
		axios.post(`http://task.me/api/vscode/${token}`, data).then(res => {
			console.log(res.data);
		}).catch(err => {console.log(err);})
	}, 1000 * 60)



}


/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let get_or_update_token = vscode.commands.registerCommand('Taskme.tokenni_kiritish', function () {
		//open prompt to get the url
		vscode.window.showInputBox({
			placeHolder: 'taskme.uz dan olgan tokeningizni kiriting',
			prompt: 'Tokenni kiriting'
		}).then(function (token) {
			if (token) {
				vscode.workspace.getConfiguration().update('Taskme.token', token, true);
				
			}
		});

		// setInterval(() => {
		// 	// @ts-ignore
		// axios.get('http://task.me/api/vscode').then(res => {
		// 	console.log(res.data);
		// });
		// }, 1000)
		vscode.window.showInformationMessage('Token muvaffaqiyatli saqlandi.');
	});

	let start_time = vscode.commands.registerCommand('Taskme.boshlash', function () {
		// let url = vscode.workspace.getConfiguration().get('fura.apiKey');
		// // @ts-ignore
		// axios.get(`http://task.me/api/vscode/${url}`).then(res => {
		// vscode.window.showInformationMessage(res.data);
		// }).catch(err => {console.log(err);})
		// console.log(url);
		
		startTime()
		

	});

	let stop_time = vscode.commands.registerCommand('Taskme.tugatish', function () {	
		clearInterval(time_interval)
	});



	context.subscriptions.push(get_or_update_token);
	context.subscriptions.push(start_time);
	context.subscriptions.push(stop_time);
}

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
