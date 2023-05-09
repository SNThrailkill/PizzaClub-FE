import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div>
          By Sean Thrailkill
        </div>
        <div>
          <Image
            className={styles.logo}
            src="/bookclub_logo.svg"
            alt="BookClub Logo"
            width={180}
            height={37}
            priority
          />
        </div>
      </div>

      <div className={styles.center}>
        
      </div>

      <div className={styles.grid}>
        <Link
          href="/add"
          className={styles.card}
        >
          <h2>
            Checkout <span>-&gt;</span>
          </h2>
          <p>Add New Books!</p>
        </Link>

        <Link
          href="update"
          className={styles.card}
        >
          <h2>
            Expound <span>-&gt;</span>
          </h2>
          <p>Update your books!</p>
        </Link>

        <Link
          href="get"
          className={styles.card}
        >
          <h2>
            Find <span>-&gt;</span>
          </h2>
          <p>Explore your books!</p>
        </Link>

        <Link
          href="delete"
          className={styles.card}
        >
          <h2>
            Burn <span>-&gt;</span>
          </h2>
          <p>
            Say good-bye to your books!
          </p>
        </Link>
      </div>
    </main>
  )
}
