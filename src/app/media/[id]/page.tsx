"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchMediaPageData, postFavorite, postShare } from '@/lib/api';
import Image from "next/image";
import { FaHeart, FaShare } from 'react-icons/fa';
import styles from '@styles/components/MediaCard.module.css';
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

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

export default function MediaPage({ params }: { params: MediaPageProps }) {
    const [media, setMedia] = useState<MediaPageData | null>(null);

    // Re-fetches data and re-render's component if the "id" prop changes (and on initial render)
    useEffect(() => {
        async function getMedia() {
            console.log("hello");
            const data = await fetchMediaPageData(params.id);
            setMedia(data);
        }
        getMedia();
    }, [params]);

    // Loading state, can be prettied up later
    if (!media) return (
        <div className={styles.container}>
            Loading...
        </div>
    );


    return (
        <div className={styles.mediapage}>
            Media page <br></br>
            Media Id: {params.id} <br></br>
            Title: [Get from ID] <br /> <br /> <br />
            <div className={styles.overlayButtons}>
                <button className={styles.quickFavoriteButton}
                        // could reuse the functionality of hovering to make the buttons change color slightly like dim or something
                        // onMouseEnter={() => setIsHoveredButton(true)}
                        // onMouseLeave={() => setIsHoveredButton(false)}
                        onClick={() => postFavorite(params.id)}
                ><FaHeart/></button>
                <button className={styles.quickShareButton}
                        // onMouseEnter={() => setIsHoveredButton(true)}
                        // onMouseLeave={() => setIsHoveredButton(false)}
                        onClick={() => postShare(params.id)}
                ><FaShare/></button>
            </div>
        </div>
    );
}