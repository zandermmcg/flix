import Link from "next/link";

interface MediaPageProps {
    id: number
}

// TODO: Implement

export default async function MediaPage({ params }: { params: MediaPageProps}) {
    params = await params;

    return (
        <div>
            Media page <br></br>
            Media Id: {params.id} <br></br>
            Title: Dune, Part Two <br/> <br/> <br/>
            <Link href={`/`}> Back to Home </Link>
        </div>
    );
}