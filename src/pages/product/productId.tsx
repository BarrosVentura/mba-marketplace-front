import { useParams } from 'react-router-dom'

export function ProductPage() {
  const { id } = useParams()

  return <div>{id}</div>
}
