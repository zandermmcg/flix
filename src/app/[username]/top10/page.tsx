import Link from "next/link";

interface Top10PageProps {
    username: string
}

export default async function Top10Page({ params }: { params: Top10PageProps}) {
    params = await params; // temporary error fix
    
    return (
        <div>
            This is the Top 10 Media List page
            <br/>
            Username: {params.username} <br></br>
            <Link href={`/${params.username}/profile`}>Back to profile</Link>
        </div>
    );
}