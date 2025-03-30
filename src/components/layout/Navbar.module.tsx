import Link from "next/link";
import styles from "@styles/components/NavBar.module.css";

export default function NavBar() {
    const username: string = "emmetjhoversten";
    
    return (
        <nav className={styles.navbar}>
            <div className={`${styles.right_links} ${styles.link_text}`}>
                <Link href="/" className={`${styles.link_text}`}>HOME</Link>
                <Link href="/movies" className={`${styles.link_text}`}>MOVIES</Link>
                <Link href="/tvshows" className={`${styles.link_text}`}>TV SHOWS</Link>
                <Link href="/shorts" className={`${styles.link_text}`}>SHORTS</Link>
                <Link href="/friends" className={`${styles.link_text}`}>FRIENDS</Link>
            </div>
            <Link href={`/${username}/profile`} className={`${styles.link_text}`}>
                MY PROFILE
            </Link>
        </nav>
    );
}