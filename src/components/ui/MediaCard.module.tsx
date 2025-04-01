"use client";

import { useEffect, useState } from "react";
import { fetchMediaCardData, postFavorite, postShare } from '@/lib/api';

import { useRouter } from "next/navigation";
import Image from "next/image";

import { FaHeart, FaShare } from 'react-icons/fa';
import styles from '@styles/components/MediaCard.module.css';
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface MediaCardProps {
    id: number
}

// Recieved from fetchMediaCardData
interface MediaCardData {
    id: number,
    title: string,
    imageURL: string,
    rating: number
}

// Reusable component that can be used anytime we need to display a bunch of movies in a grid/list format
// - Renders as a picture of the movie poster (determined by the "id" prop)
// - When the user hovers on the poster, the title will be displayed on the center and Quick 
//   Favorite/Quick Share buttons will be available.
// - If the user clicks anywhere on the poster that isn't one of the buttons described above,
//   the user will be rerouted to that media's main display page
export default function MediaCard({ id }: MediaCardProps) {
    const [media, setMedia] = useState<MediaCardData | null>(null);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isHoveredButton, setIsHoveredButton] = useState<boolean>(false);

    // Used for redirection to the movie page if the user clicks the movie image
    const router: AppRouterInstance = useRouter();

    const handleClick = () => {
        // Redirect to movie page (if not trying to click Quick Action buttons)
        if (!isHoveredButton)
            router.push(`/media/${id}`);
    }
    
    // Re-fetches data and re-render's component if the "id" prop changes (and on initial render)
    useEffect(() => {
        async function getMedia() {
            const data = await fetchMediaCardData(id);
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

    // Data recieved state
    return (
        <div className={styles.container}
             onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}
             onClick={handleClick}
        >
            <Image
                className={styles.mediaImage}
                src={media.imageURL}
                alt={media.title}
                width={120}
                height={180}
            />
            {isHovered && (
                <div className={styles.overlay}>
                    <h3 className={styles.overlayText}>{media.title}</h3>
                    <div className={styles.overlayButtons}>
                        <button className={styles.quickFavoriteButton}
                                onMouseEnter={() => setIsHoveredButton(true)}
                                onMouseLeave={() => setIsHoveredButton(false)}
                                onClick={() => postFavorite(id)}
                        ><FaHeart/></button>
                        <button className={styles.quickShareButton}
                                onMouseEnter={() => setIsHoveredButton(true)}
                                onMouseLeave={() => setIsHoveredButton(false)}
                                onClick={() => postShare(id)}
                        ><FaShare/></button>
                    </div>
                </div>
            )}
        </div>
    );
}