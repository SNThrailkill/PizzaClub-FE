import styles from '../../page.module.css'

export default function PizzaItemLayout({ children }) {
  return (
    <div className={styles.contents}>{children}</div>
  )
}
