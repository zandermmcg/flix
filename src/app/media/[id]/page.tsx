import MediaPage from "@components/pages/MediaPage.module";

interface MediaPageProps {
    params: {
        id: number
    }
}

export default function MediaPageRouter({ params }: MediaPageProps ) {
    const id = Number(params.id);
    return (
        <div>
            <MediaPage id={id}></MediaPage>
        </div>
    )
}