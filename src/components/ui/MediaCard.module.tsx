import styles from '@styles/components/MediaCard.module.css';

interface MediaCardProps {
    id: number
}

// TODO: Implement

export default function MediaCard({ props }: {props: MediaCardProps}) {
    return (
        <div className={styles.container}>
            MediaCard component <br></br>
            Media Id: {props.id}
        </div>
    )
}