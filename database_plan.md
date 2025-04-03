User = {
    PK userID: number,
    username: string,
    password: string,
    email: string,
    phone_number: number,
    favorites: [mediaID, ...],
    following: [userID, ...],
    followers: [userID, ...],
    lists: [listID, ...]
}

Media = {
    PK mediaID: number,
    mediaType: string,
    title: string,
    description: string,
    cast = [actorID, ...],
    director = [directorID, ...],
    episodes = [episodeID, ...]
}

List = {
    listID: number
}

Episode = {
    episodeID: number
}

Actor = {
    actorID: number
}

Director = {
    directorID: number
}