export async function fetchMediaCardData(mediaID: number) {
    if (mediaID == 12345)
    {
        return {
            id: mediaID,
            title: "Dune: Part Two",
            imageURL: "https://m.media-amazon.com/images/M/MV5BNTc0YmQxMjEtODI5MC00NjFiLTlkMWUtOGQ5NjFmYWUyZGJhXkEyXkFqcGc@._V1_.jpg",
            rating: 4.25
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