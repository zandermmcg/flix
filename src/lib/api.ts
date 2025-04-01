export async function fetchMediaCardData(mediaID: number) {
    switch (mediaID)
    {
        case 11111:
            return {
                id: mediaID,
                title: "Dune: Part Two",
                imageURL: "https://m.media-amazon.com/images/M/MV5BNTc0YmQxMjEtODI5MC00NjFiLTlkMWUtOGQ5NjFmYWUyZGJhXkEyXkFqcGc@._V1_.jpg",
                rating: 4.25
            };
        
        case 22222:
            return {
                id: mediaID,
                title: "Severance",
                imageURL: "https://m.media-amazon.com/images/M/MV5BZDI5YzJhODQtMzQyNy00YWNmLWIxMjUtNDBjNjA5YWRjMzExXkEyXkFqcGc@._V1_.jpg",
                rating: 4.35
            };

        case 33333:
            return {
                id: mediaID,
                title: "Whiplash",
                imageURL: "https://m.media-amazon.com/images/M/MV5BMDFjOWFkYzktYzhhMC00NmYyLTkwY2EtYjViMDhmNzg0OGFkXkEyXkFqcGc@._V1_.jpg",
                rating: 4.25
            };

        case 44444:
            return {
                id: mediaID,
                title: "The Office",
                imageURL: "https://m.media-amazon.com/images/M/MV5BZjQwYzBlYzUtZjhhOS00ZDQ0LWE0NzAtYTk4MjgzZTNkZWEzXkEyXkFqcGc@._V1_.jpg",
                rating: 4.5
            };

        case 55555:
            return {
                id: mediaID,
                title: "Alvin and the Chipmunks",
                imageURL: "https://m.media-amazon.com/images/M/MV5BNDVjMWNkNjEtOGU5YS00Y2Q2LTgwYjMtMTg0YWM2ZGE2MDM3XkEyXkFqcGc@._V1_.jpg",
                rating: 2.65
            };

        case 66666:
            return {
                id: mediaID,
                title: "Yellowjackets",
                imageURL: "https://m.media-amazon.com/images/M/MV5BMDAwMDNiNDAtZjM0Yi00OTEyLWFkMGUtMzIxOGU0NWYzYmM4XkEyXkFqcGc@._V1_.jpg",
                rating: 3.85
            };
    }

    return null;

    // Hopefully we can use some of this code when we get our database running
    // try {
    //     const response = await fetch(`--URL--/${movieId}`);
    //     if (!response.ok) throw new Error("Failed to fetch movie data");

    //     return await response.json();

    // } catch (error) {
    //     console.log(`Error fetching movie data: ${error}`);
    //     return null;
    // }
}

export async function postFavorite(mediaID: number) {
    return;
}

export async function postShare(mediaID: number) {
    return;
}