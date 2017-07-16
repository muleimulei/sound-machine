"use strict"

var {app, BrowserWindow, ipcMain} = require("electron");

var mainWindow = null;
var settingsWindow = null;

app.on('ready',function(){
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
  })

    mainWindow.loadURL("file://"+__dirname+"/app/index.html");
});

ipcMain.on('close-main-window',function(){
  app.quit();
});

ipcMain.on('open-settings-window',function(){
    if(settingsWindow){
        return;
    }
    settingsWindow = new BrowserWindow({
        // frame: false,
        height: 200,
        resizable: false,
        width:200
    });

    settingsWindow.loadURL(`file://${__dirname}/app/setting.html`);
    settingsWindow.on('close',function(){
        settingsWindow = null;
    }); 
});