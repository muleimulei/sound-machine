"use strict"


var {app, BrowserWindow} = require("electron");

var mainWindow = null;

app.on('ready',function(){
    mainWindow = new BrowserWindow({
        height: 600,
        width: 800
    });

    mainWindow.loadURL("file://"+__dirname+"/app/index.html");
});

