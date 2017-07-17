"use strict"

var {ipcRenderer} = require('electron');
var config = require('../config.js');

let close = document.querySelector('.close');

close.addEventListener('click',function(){
    ipcRenderer.send('close-settings-window');
});

var modifierCheckboxes = document.querySelectorAll('.global-shortcut'),
    len = modifierCheckboxes.length;

for(let i = 0;i< len;i++){
    let shortcutKey = config.readSettings('shortcutKeys');
    let modifierKey = modifierCheckboxes[i].getAttribute('data-modifier-key');
    modifierCheckboxes[i].checked = shortcutKey.indexOf(modifierKey)!==-1;

    modifierCheckboxes[i].addEventListener('click',function(e){
        bindModifierCheckboxes(e);
    });
}

function bindModifierCheckboxes(e){
    let shortcutKeys = config.readSettings('shortcutKeys');
    let modifierKey = e.target.getAttribute('data-modifier-key');
    let r = shortcutKeys.indexOf(modifierKey);
    if(r!==-1){
        shortcutKeys.splice(r,1); 
    }else{
        shortcutKeys.push(modifierKey);
    }
    config.saveSettings('shortcutKeys',shortcutKeys);
    ipcRenderer.send('set-global-shortcuts');
}
