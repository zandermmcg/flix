"use client";

import { useEffect, useState } from "react";
import { fetchMediaCardData } from '@lib/api';
//import Link from "next/link";
import Image from "next/image";
import styles from '@styles/components/MediaCard.module.css';

interface MediaCardProps {
    id: number
}

interface MediaCardData {
    id: number,
    title: string,
    imageURL: string,
    rating: number
}

export default function MediaCard({ id }: MediaCardProps) {
    const [media, setMedia] = useState<MediaCardData | null>(null);

    useEffect(() => {
        async function getMovie() {
            const data = await fetchMediaCardData(id);
            setMedia(data);
        }
        getMovie();
    }, [id]);

    if (!media) return (
        <div className={styles.container}>
            Loading...
        </div>
    );

    return (
        <div className={styles.container}>
            <Image
                src={media.imageURL}
                alt={media.title}
                width={120}
                height={180}
            />
            <h3>{media.title}</h3>
            <h3>{media.rating}</h3>
        </div>
    );
    //<Link href={`/media/${movieid}`}> Dune part two </Link>
}