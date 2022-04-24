// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import moment from 'moment'
moment.locale('pt-br')

export function timeToString (unix: number): string {
  return moment(unix).format('LLLL')
}

export function birthday (unix: number): string {
  return (moment(unix).date().toString().padStart(2, '0') + '/' + (moment(unix).month() + 1).toString().padStart(2, '0'))
}

function md (unix: number): string {
  return ((moment(unix).month() + 1).toString().padStart(2, '0') + '/' + moment(unix).date().toString().padStart(2, '0'))
}

export function age (unix: number): number {
  if (parseInt(md(unix).replace(/\//gi, '')) > parseInt(md(Date.now()).replace(/\//gi, ''))) {
    return (moment(Date.now()).year() - moment(unix).year() - 1)
  } else {
    return (moment(Date.now()).year() - moment(unix).year())
  }
}

export function sinceDays (unix: number): number {
  const a = moment(moment(Date.now()).format('DD/MM/YYYY'), 'DD/MM/YYYY')
  const b = moment(moment(unix).format('DD/MM/YYYY'), 'DD/MM/YYYY')
  return a.diff(b, 'days')
}

export function daysToBday (unix: number): number {
  if (Math.ceil(moment(birthday(unix) + '/' + moment(Date.now()).year(), 'DD/MM/YYYY').diff(Date.now(), 'days', true)) > 0) {
    return Math.ceil(moment(birthday(unix) + '/' + moment(Date.now()).year(), 'DD/MM/YYYY').diff(Date.now(), 'days', true))
  } else {
    return Math.ceil(moment(birthday(unix) + '/' + (moment(Date.now()).year() + 1), 'DD/MM/YYYY').diff(Date.now(), 'days', true))
  }
}
