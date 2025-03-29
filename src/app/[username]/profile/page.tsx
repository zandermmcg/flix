import Link from "next/link";

interface ProfilePageProps {
    username: string
}

// TODO: Implement

export default async function ProfilePage({ params }: { params: ProfilePageProps }) {
    params = await params; // tempory error fix

    return (
        <div>
            This is the profile page
            <br/>
            Username: {params.username} <br></br>
            <Link href={`/${params.username}/favorites`}>Favorites</Link> <br></br>
            <Link href={`/${params.username}/top10`}>Top 10 List</Link> <br></br>
            <Link href={`/${params.username}/profile/settings`}>Profile settings</Link> <br></br>
            <Link href={`/`}>Back to Home</Link>
        </div>
    );
}