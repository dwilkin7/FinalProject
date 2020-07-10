export class Meeting {
  constructor(
    public id: string,
    public conductor: string,
    public openingPrayer: string,
    public closingPrayer: string,
    public speakers: string[],
    public meetingDate: string,
    public topic: string,
    public openingHymn: string,
    public sacramentHymn: string,
    public closingHymn: string,
    public intermediateHymn: string
  ) { }
}
