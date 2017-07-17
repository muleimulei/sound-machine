"use strict"

var {ipcRenderer} = require('electron');

let close = document.querySelector('.close');

close.addEventListener('click',function(){
    ipcRenderer.send('close-settings-window');
});

