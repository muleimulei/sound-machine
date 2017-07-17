"use strict"

var {
    app,
    BrowserWindow,
    ipcMain,
    globalShortcut
} = require("electron");
var config = require('./config.js');
var mainWindow = null;
var settingsWindow = null;

app.on('ready', function () {
    mainWindow = new BrowserWindow({
        height: 600,
        width: 373,
        // frame: false,
        resizable: false
    });
    // mainWindow.webContents.openDevTools();
    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });



    mainWindow.loadURL("file://" + __dirname + "/app/index.html");

    if (!config.readSettings('shortcutKeys')) {
        config.saveSettings("shortcutKeys", ['ctrl', 'shift']);
    }

    setGlobalShortcuts(mainWindow);
});

function setGlobalShortcuts(mainWindow) {
    globalShortcut.unregisterAll();
    var shortcutKeysSettings = config.readSettings('shortcutKeys');
    var prefix = shortcutKeysSettings.length == 0 ? '' : shortcutKeysSettings.join('+') + '+';
    globalShortcut.register(prefix+'1', function () {
        mainWindow.webContents.send('global-shortcut', 0);
    });
    globalShortcut.register(prefix+'2', function () {
        mainWindow.webContents.send('global-shortcut', 1);
    });
}


ipcMain.on('close-main-window', function () {
    app.quit();
});
ipcMain.on('set-global-shortcuts',function(){
    setGlobalShortcuts();
});
ipcMain.on('open-settings-window', function () {
    if (settingsWindow) {
        return;
    }
    settingsWindow = new BrowserWindow({
        // frame: false,
        height: 250,
        resizable: false,
        width: 200
    });

    settingsWindow.loadURL(`file://${__dirname}/app/setting.html`);
    settingsWindow.on('close', function () {
        settingsWindow = null;
    });
});

ipcMain.on('close-settings-window', function () {
    if (settingsWindow) {
        settingsWindow.close();
    }
});