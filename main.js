const { app, BrowserWindow, Menu, shell, ipcMain } = require('electron');
const path = require('path');

const menuItems = [
	{
		label: 'Menu',
		submenu: [
			{
				label: 'About',
			},
		],
	},
	{
		label: 'File',
		submenu: [
			{
				label: 'Learn More',
				click: async () => {
					await shell.openExternal('https://google.com');
				},
			},
			{
				label: 'Open Camera',
				click: async () => {
					const win2 = new BrowserWindow({
						height: 500,
						width: 800,
						show: false,
						// backgroundColor: '#2e2c29',
						movable: false,
						webPreferences: {
							preload: path.join(__dirname, 'camera-preload.js'),
						},
					});

					ipcMain.on('close-window-2', () => {
						win2.close();
					});

					win2.webContents.openDevTools();
					win2.loadFile('camera.html');
					// win2.loadURL('https://www.google.com');
					win2.once('ready-to-show', () => {
						win2.show();
					});
				},
			},
			{
				type: 'separator',
			},
			{
				label: 'Exit',
				click: () => {
					app.quit();
				},
			},
			// {
			// 	role: 'close',
			// },
		],
	},
	{
		label: 'Window',
		submenu: [
			{
				role: 'close',
			},
			{
				role: 'Minimize',
			},
		],
	},
];

const menu = Menu.buildFromTemplate(menuItems);
Menu.setApplicationMenu(menu);

const createWindow = () => {
	const win = new BrowserWindow({
		height: 500,
		width: 800,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
	});

	win.loadFile('index.html');

	ipcMain.on('set-image', (e, data) => {
		win.webContents.send('get-image', data);
	});
};

app.whenReady().then(() => {
	createWindow();

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});
