// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

const moment = require('moment')
moment.locale('pt-br')

function timeToString (unix) {
  return moment(unix).format('LLLL')
}

function birthday (unix) {
  return (moment(unix).date().toString().padStart(2, '0') + '/' + (moment(unix).month() + 1).toString().padStart(2, '0'))
}

function md (unix) {
  return ((moment(unix).month() + 1).toString().padStart(2, '0') + '/' + moment(unix).date().toString().padStart(2, '0'))
}

function age (unix) {
  if (parseInt(md(unix).replace(/\//gi, '')) > parseInt(md(Date.now()).replace(/\//gi, ''))) {
    return (moment(Date.now()).year() - moment(unix).year() - 1)
  } else {
    return (moment(Date.now()).year() - moment(unix).year())
  }
}

function sinceDays (unix) {
  const a = moment(moment(Date.now()).format('DD/MM/YYYY'), 'DD/MM/YYYY')
  const b = moment(moment(unix).format('DD/MM/YYYY'), 'DD/MM/YYYY')
  return a.diff(b, 'days')
}

function daysToBday (unix, fuso) {
  if (Math.ceil(moment(birthday(unix) + '/' + moment(Date.now()).year(), 'DD/MM/YYYY').diff(Date.now(), 'days', true)) > 0) {
    return Math.ceil(moment(birthday(unix) + '/' + moment(Date.now()).year(), 'DD/MM/YYYY').diff(Date.now(), 'days', true))
  } else {
    return Math.ceil(moment(birthday(unix) + '/' + (moment(Date.now()).year() + 1), 'DD/MM/YYYY').diff(Date.now(), 'days', true))
  }
}

module.exports = {
  timeToString: timeToString,
  birthday: birthday,
  daysToBday: daysToBday,
  age: age,
  sinceDays: sinceDays
}
