import Image from 'next/image'
import styles from './page.module.css'
import Book from '@/components/book'

async function getBooks() {
  const res = await fetch('http://localhost:8080/v1/rest/book/all');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
 
  return res.json();
}

export default async function Library() {
  const books = await getBooks();

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

      <div className={styles.grid}>
      { 
        books.forEach(b => {
          <Book book={b}/>
        }) 
      }
      </div>
    </main>
  )
}
