'use  strict'

var soundButtons = document.querySelectorAll('.button-sound');

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
