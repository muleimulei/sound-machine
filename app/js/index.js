'use  strict'

var {ipcRenderer} = require('electron');

var soundButtons = document.querySelectorAll('.button-sound');
var close = document.querySelector('.close');
var setting = document.querySelector('.settings');

for(let i = 0; i< soundButtons.length; i++){
    let soundButton = soundButtons[i];
    let soundName = soundButton.getAttribute("data-sound");
    prepareButton(soundButton,soundName);
}

function prepareButton(buttonEl,soundName){
    buttonEl.querySelector('span').style.backgroundImage = `url('img/icons/${soundName}.png')`;
    let audio = new Audio(__dirname+'/wav/'+soundName+'.wav');
    buttonEl.addEventListener('click',function(){
        audio.currentTime = 0;
        audio.play();
    });
}

close.addEventListener('click',function(){
    ipcRenderer.send('close-main-window');
});

setting.addEventListener('click',function(){
    ipcRenderer.send('open-settings-window');
});