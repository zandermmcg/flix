"use client";
import Link from "next/link";
import { fetchMediaPageData, postFavorite, postShare } from '@/lib/api';
import Image from "next/image";
import { FaHeart, FaShare } from 'react-icons/fa';
import styles from '@styles/components/MediaCard.module.css';
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

// TODO: Implement

export default function MediaPage({ id }: MediaPageProps ) {
    const [media, setMedia] = useState<MediaPageData | null>(null);

    console.log(id);

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
        <div className={styles.mediapage}>
            {media.title} <br></br>
            <div className={styles.overlayButtons}>
                <button className={styles.quickFavoriteButton}
                        // could reuse the functionality of hovering to make the buttons change color slightly like dim or something
                        // onMouseEnter={() => setIsHoveredButton(true)}
                        // onMouseLeave={() => setIsHoveredButton(false)}
                        onClick={() => postFavorite(id)}
                ><FaHeart/></button>
                <button className={styles.quickShareButton}
                        // onMouseEnter={() => setIsHoveredButton(true)}
                        // onMouseLeave={() => setIsHoveredButton(false)}
                        onClick={() => postShare(id)}
                ><FaShare/></button>
            </div>
        </div>
    );
}