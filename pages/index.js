
import styles from '../styles/Home.module.css'
import useSWR from 'swr'


const fetcher = async (...args) => {
  const res = await fetch(...args)
  const data = await res.json()

  if (res.status !== 200) {
    throw new Error(data.message)
  }
  return data
}


export default function Home() {
  const { data: solution, error: error } = useSWR('/api/wordle', fetcher)

  if (!solution) {
    return (
      <div className={styles.container}>
        <p>Loading Word...</p>
      </div>
    )
  } else {
    return (
      <div className={styles.container}>
        <p>The word is... {solution.wordleSolution}</p>
      </div>
    )
  }
}
