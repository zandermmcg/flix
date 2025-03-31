import Link from "next/link";
import MediaCard from "@components/ui/MediaCard.module";
import styles from "./src/styles/pages/homepage.module.css";

// TODO: Implement

export default function Home () {
  let username: string = "emmetjhoversten";
  let movieid: number = 12345;

  return (
    <div>
      This is the home page
      <br></br>
      <div className={styles.medialist}>
        <MediaCard id={12345}></MediaCard>
        <MediaCard id={12345}></MediaCard>
        <MediaCard id={12345}></MediaCard>
        <MediaCard id={12345}></MediaCard>
        <MediaCard id={12345}></MediaCard>
      </div>
    </div>
  );
}