import LoginPage from "@components/pages/LoginPage.module";

interface LoginPageProps {
    params: {
        id: number
    }
}

export default async function MediaPageRouter({ params }: LoginPageProps) {
    const input = await params;
    const mediaId = Number(input.id);
    return (
        <div>
            <LoginPage/>
        </div>
    )
}