export interface IMemberData {
  id: string,
  user: string,
  noob: boolean,
  bot: boolean,
  birthday: string,
  lastBdayMsg: string | null,
  age: number,
  memberSinceDays: number,
  memberSincePlusTime: number
  daysToBday: number,
  joinTimeUnix: number,
  joinDate: string,
  joinTime: string,
  joinString: string,
  authorized: boolean | null,
  authorizedTimeUnix: number,
  authorizedById: string,
  authorizedByName: string,
  pointsMax: number,
  points: number,
  pointsLastDayUpdate: string | null,
  legacyMember: boolean,
  avatarUrl: string,
  msgId: string
}

export interface IData {
  memberList: {
    [discordUserId: string]: IMemberData,
  },
  memberCounter: {
    membersNow: number,
    membersInList: number
  },
  lastUpdate: string,
  lastUpdateUnix: number
}
