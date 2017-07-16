"use strict"

var {app, BrowserWindow} = require("electron");

var mainWindow = null;

app.on('ready',function(){
    mainWindow = new BrowserWindow({
        height: 600,
        width: 800,
        // frame: false,
        // resizable: false
    });
    mainWindow.webContents.openDevTools("right");
    // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  })

    mainWindow.loadURL("file://"+__dirname+"/app/index.html");
});

