import Link from "next/link";

interface FavoritesProps {
    username: string
}

// TODO: Implement

export default async function Favorites({ params }: { params: FavoritesProps}) {
    params = await params; // temporary error fix

    return (
        <div>
            This is the favorites page
            <br/>
            Username: {params.username} <br></br>
            <Link href={`/${params.username}/profile`}>Back to profile</Link>
        </div>
    );
}