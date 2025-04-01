import Link from "next/link";
import MediaCard from "@components/ui/MediaCard.module";
import styles from "@styles/pages/homepage.module.css";

// TODO: Implement

export default function Home () {
  let username: string = "emmetjhoversten";

  return (
    <div>
      This is the home page
      <br></br>
      <div className={styles.medialist}>
        <MediaCard id={11111}></MediaCard>
        <MediaCard id={22222}></MediaCard>
        <MediaCard id={33333}></MediaCard>
        <MediaCard id={44444}></MediaCard>
        <MediaCard id={55555}></MediaCard>
        <MediaCard id={66666}></MediaCard>
      </div>
    </div>
  );
}