export class Band{
    constructor(
    private id: string,
    private name: string,
    private musicGenre: string,
    private responsible: string,
    ){}

    getId(){
        return this.id;
    }

    getName(){
        return this.name
    }

    getGenre(){
        return this.musicGenre;
    }

    getResponsible(){
        return this.responsible;
    }

    setId(id: string){
        this.id = id;
    }

    setName(name: string){
        this.name = name;
    }

    setGenre (musicGenre: string){
        this.musicGenre = musicGenre;
    }

    setResponsible(responsible: string){
        this.responsible = responsible;
    }
}

export interface bandInputDTO{
    name: string;
    musicGenre: string;
    responsible: string;
}