export class Show {
    constructor(
        private id: string,
        private weekDay: string,
        private startTime: number,
        private endTime: number,
        private bandId: string
    ){}

    getId() {
        return this.id;
    }

    getWeekDay() {
        return this.weekDay;
    }

    getStartTime() {
        return this.startTime;
    }

    getEndTime() {
        return this.endTime;
    }

    getBandId() {
        return this.bandId;
    }

    setId(id: string) {
        this.id = id;
    }

    setWeekDay(weekDay: string) {
        this.weekDay = weekDay;
    }

    setStartTime(startTime: number) {
        this.startTime = startTime;
    }

    setEndTime(endTime: number) {
        this.endTime = endTime;
    }

    setBandId(bandId: string) {
        this.bandId = bandId;
    }
}

export interface showInputDTO {
    weekDay: string,
    startTime: number,
    endTime: number,
    bandId: string
}