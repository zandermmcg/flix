import Link from "next/link";

interface ProfileSettingsPageProps {
    username: string
}

// TODO: Implement

export default async function ProfileSettingsPage({ params }: { params: ProfileSettingsPageProps}) {
    params = await params;
    
    return (
        <div>
            This is the profile settings page
            <br></br>
            Username: {params.username} <br></br>
            <Link href={`/${params.username}/profile`}> Back to Profile </Link>
        </div>
    );
}