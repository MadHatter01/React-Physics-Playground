import Image from "next/image";
import styles from "./page.module.css";
import dynamic from "next/dynamic";
const Game = dynamic(() => import('../components/Game'), { ssr: false });

export default function Home() {
  return (
 <main className="container" >
<h1 className="title">Game</h1>
<Game />
  </main>

  )
}