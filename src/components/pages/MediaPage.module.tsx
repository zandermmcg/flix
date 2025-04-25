"use client";

import Link from "next/link";
import { fetchMediaPageData, postFavorite, postShare } from '@/lib/api';
import Image from "next/image";
import { FaHeart, FaShare, FaStar } from 'react-icons/fa';
import styles from '@styles/components/MediaPage.module.css';
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useState, useEffect } from "react";

interface MediaPageProps {
    id: number
}

// Recieved from fetchMediaCardData
interface MediaPageData {
    id: number,
    title: string,
    imageURL: string,
    rating: number,
    bio: string,
    trailer_link: string,
    where_to_watch: string // should probably create separate type for where to watch to store different streaming services and stuff
}

function StarRating({ rating }: { rating: number }) {
    const percentage = Math.round((rating / 5) * 100);

    return (
        <div style={{ position: 'relative', fontSize: '24px' }}>
            {/* Base grey stars */}
            <div style={{ color: '#ccc' }}>
                {Array(5).fill(0).map((_, i) => <FaStar key={i} />)}
            </div>
            {/* Gold stars */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                width: `${percentage}%`,
                color: '#ffc107',
                pointerEvents: 'none',
            }}>
                {Array(5).fill(0).map((_, i) => <FaStar key={i} />)}
            </div>
        </div>
    );
}

export default function MediaPage({ id }: MediaPageProps) {
    const [media, setMedia] = useState<MediaPageData | null>(null);


    // Re-fetches data and re-render's component if the "id" prop changes (and on initial render)
    useEffect(() => {
        async function getMedia() {
            const data = await fetchMediaPageData(id);
            setMedia(data);
        }
        getMedia();
    }, [id]);

    // Loading state, can be prettied up later
    if (!media) return (
        <div className={styles.container}>
            Loading...
        </div>
    );

    return (
        <div className={styles.mediaPage}>
            <Image className={styles.mediaImage} src={media.imageURL} alt={media.title} width={300} height={450} />
            <div className={styles.mediaInfo}>
                <h1>{media.title}</h1>
                <p>{media.bio}</p>
                <div className={styles.overlayButtons}>
                    <button className={styles.quickFavoriteButton} onClick={() => postFavorite(id)}>
                        <FaHeart />
                    </button>
                    <button className={styles.quickShareButton} onClick={() => postShare(id)}>
                        <FaShare />
                    </button>
                </div>
                <div className={styles.rating}>
                    <StarRating rating={media.rating} />
                    <p className="starRating">{media.rating} / 5</p>
                </div>
                <p><strong>Where to watch:</strong> {media.where_to_watch}</p>
            </div>
        </div>
    );

}