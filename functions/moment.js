const moment = require('moment');
moment.locale('pt-br');

function timeToString(unix, fuso){
  return moment(unix+fuso).format('LLLL');
}

function birthday(unix, fuso){
  return (moment(unix+fuso).date().toString().padStart(2, '0') + "/" + (moment(unix+fuso).month()+1).toString().padStart(2, '0'));
}

function md(unix, fuso){
  return ((moment(unix+fuso).month()+1).toString().padStart(2, '0') + "/" + moment(unix+fuso).date().toString().padStart(2, '0'));
}

function age(unix,  fuso){
  if(parseInt(md(unix, fuso).replace(/\//gi, "")) >= parseInt(md(Date.now(), fuso).replace(/\//gi, ""))){
    return (moment(Date.now()+fuso).year() - moment(unix+fuso).year() - 1);
  } else{
    return (moment(Date.now()+fuso).year() - moment(unix+fuso).year());
  }
}

function sinceDays(unix,  fuso){
  let a = moment(moment(Date.now()+fuso).format('DD/MM/YYYY'), 'DD/MM/YYYY');
  let b = moment(moment(unix+fuso).format('DD/MM/YYYY'), 'DD/MM/YYYY');
  return a.diff(b, "days");
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
    age: age,
    sinceDays: sinceDays,
};