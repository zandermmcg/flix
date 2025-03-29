import Link from "next/link";

// TODO: Implement

export default function Home () {
  let username: string = "emmetjhoversten";
  let movieid: number = 12345;

  return (
    <div>
      This is the home page
      <br></br>
      <Link href={`/${username}/profile`}>Profile page</Link> <br></br>
      <Link href={`/media/${movieid}`}> Dune part two </Link>
    </div>
  );
}