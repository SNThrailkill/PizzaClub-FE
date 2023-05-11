import Link from 'next/link'

export default function Book({book}) {
<div>
    <Link
        href={"/book/" + book.id}
        className={styles.card}>
        
        <h2>
            Name <span>-&gt;</span>
        </h2>
        <p>See more details</p>
    </Link>
    <Link
        href={"/book/" + book.id}
        className={styles.card}>
    
        <h2>
            Name <span>-&gt;</span>
        </h2>
        <p>See more details</p>
    </Link>
    <Link
        href={"/book/" + book.id}
        className={styles.card}>
        
        <h2>
            Name <span>-&gt;</span>
        </h2>
        <p>See more details</p>
    </Link>
    <Link
        href={"/book/" + book.id}
        className={styles.card}>
    
        <h2>
            Name <span>-&gt;</span>
        </h2>
        <p>See more details</p>
    </Link>
</div>
}