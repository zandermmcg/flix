import MediaPage from "@components/pages/MediaPage.module";

interface MediaPageProps {
    params: {
        id: number
    }
}

export default async function MediaPageRouter({ params }: MediaPageProps) {
    const input = await params;
    const mediaId = Number(input.id);
    return (
        <div>
            <MediaPage id={mediaId}></MediaPage>
        </div>
    )
}