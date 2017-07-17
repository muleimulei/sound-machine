"use strict"

var nconf = require('nconf').file("./config.json");

exports.saveSettings = function(key,val){
    nconf.set(key,val);
    nconf.save();
}

exports.readSettings = function(key){
    nconf.load();
    return nconf.get(key);
}