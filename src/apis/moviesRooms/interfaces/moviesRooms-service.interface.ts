export interface IMovieRoomServiceFindOne {
    roomId: number;
}

export interface IMovieServiceUpdate {
    title?: string;
    time?: string;
    theater?: number;
    price?: number;
    seats?: number;
}
