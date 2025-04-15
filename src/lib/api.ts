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

export async function fetchMediaPageData(mediaID: number) {
    switch (mediaID)
    {
        case 11111:
            return {
                id: mediaID,
                title: "Dune: Part Two",
                imageURL: "https://m.media-amazon.com/images/M/MV5BNTc0YmQxMjEtODI5MC00NjFiLTlkMWUtOGQ5NjFmYWUyZGJhXkEyXkFqcGc@._V1_.jpg",
                rating: 4.25,
                bio: "Paul Atreides unites with the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he endeavors to prevent a terrible future.",
                trailer_link: "https://www.youtube.com/watch?v=Way9Dexny3w&pp=ygUeZHVuZSBwYXJ0IHR3byBvZmZpY2lhbCB0cmFpbGVy",
                where_to_watch: "Netflix"

            };
        
        case 22222:
            return {
                id: mediaID,
                title: "Severance",
                imageURL: "https://m.media-amazon.com/images/M/MV5BZDI5YzJhODQtMzQyNy00YWNmLWIxMjUtNDBjNjA5YWRjMzExXkEyXkFqcGc@._V1_.jpg",
                rating: 4.35,
                bio: "Mark leads a team of office workers whose memories have been surgically divided between their work and personal lives. When a mysterious colleague appears outside of work, it begins a journey to discover the truth about their jobs.",
                trailer_link: "https://www.youtube.com/watch?v=xEQP4VVuyrY&pp=ygUac2V2ZXJhbmNlIG9mZmljaWFsIHRyYWlsZXI%3D",
                where_to_watch: "Apple TV+"
            };

        case 33333:
            return {
                id: mediaID,
                title: "Whiplash",
                imageURL: "https://m.media-amazon.com/images/M/MV5BMDFjOWFkYzktYzhhMC00NmYyLTkwY2EtYjViMDhmNzg0OGFkXkEyXkFqcGc@._V1_.jpg",
                rating: 4.25,
                bio: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.",
                trailer_link: "https://www.youtube.com/watch?v=7d_jQycdQGo&pp=ygUZd2hpcGxhc2ggb2ZmaWNpYWwgdHJhaWxlcg%3D%3D",
                where_to_watch: "Netflix"
            };

        case 44444:
            return {
                id: mediaID,
                title: "The Office",
                imageURL: "https://m.media-amazon.com/images/M/MV5BZjQwYzBlYzUtZjhhOS00ZDQ0LWE0NzAtYTk4MjgzZTNkZWEzXkEyXkFqcGc@._V1_.jpg",
                rating: 4.5,
                bio: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.",
                trailer_link: "https://www.youtube.com/watch?v=uNFtjvNofEQ&pp=ygUgIHRoZSBvZmZpY2UgYmx1ZSByYXkgZHZkIHRyYWlsZXI%3D",
                where_to_watch: "Peacock"
            };

        case 55555:
            return {
                id: mediaID,
                title: "Alvin and the Chipmunks",
                imageURL: "https://m.media-amazon.com/images/M/MV5BNDVjMWNkNjEtOGU5YS00Y2Q2LTgwYjMtMTg0YWM2ZGE2MDM3XkEyXkFqcGc@._V1_.jpg",
                rating: 2.65,
                bio: "Three musical chipmunks are discovered by an aspiring songwriter who wants to use their amazing singing abilities to become famous.",
                trailer_link: "https://www.youtube.com/watch?v=sc-C8uumMkw&pp=ygUoYWx2aW4gYW5kIHRoZSBjaGlwbXVua3Mgb2ZmaWNpYWwgdHJhaWxlcg%3D%3D",
                where_to_watch: "Hulu"
            };

        case 66666:
            return {
                id: mediaID,
                title: "Yellowjackets",
                imageURL: "https://m.media-amazon.com/images/M/MV5BMDAwMDNiNDAtZjM0Yi00OTEyLWFkMGUtMzIxOGU0NWYzYmM4XkEyXkFqcGc@._V1_.jpg",
                rating: 3.85,
                bio: "A wildly talented girls high school soccer team become the unlucky survivors of a plane crash deep in the Canadian wilderness.",
                trailer_link: "https://www.youtube.com/watch?v=mX22D65TqAs&pp=ygUeeWVsbG93amFja2V0cyBvZmZpY2lhbCB0cmFpbGVy",
                where_to_watch: "Sling TV"
            };
    }

    return null;    
}

export async function postFavorite(mediaID: number) {
    return;
}

export async function postShare(mediaID: number) {
    return;
}