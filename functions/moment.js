const moment = require('moment');
moment.locale('pt-br');

function timeToString(unix, fuso){
  return moment(unix+fuso).format('LLLL');
}

function birthday(unix, fuso){
  return (moment(unix+fuso).date().toString().padStart(2, '0') + "/" + (moment(unix+fuso).month()+1).toString().padStart(2, '0'));
}

function age(unix,  fuso){
  return (moment(Date.now()+fuso).year() - moment(unix+fuso).year());
}

function daysToBday(unix, fuso){
    if(Math.ceil(moment(birthday(unix, fuso)+"/"+moment(Date.now()+fuso).year(), "DD/MM/YYYY").diff(Date.now()+fuso, 'days', true)) > 0 ){
      return Math.ceil(moment(birthday(unix, fuso)+"/"+moment(Date.now()+fuso).year(), "DD/MM/YYYY").diff(Date.now()+fuso, 'days', true));
    } else{
      return Math.ceil(moment(birthday(unix, fuso)+"/"+(moment(Date.now()+fuso).year()+1), "DD/MM/YYYY").diff(Date.now()+fuso, 'days', true));
    }
 }

module.exports = {
    timeToString: timeToString,
    birthday: birthday,
    daysToBday: daysToBday,
    age: age
};