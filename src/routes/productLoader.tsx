import { queryProductById } from '@/query/product-query'
import { QueryClient } from '@tanstack/react-query'
import { redirect } from 'react-router-dom'

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: { params: { id?: string } }) => {
    if (!params.id) return redirect('/products')
    const query = queryProductById(params.id)

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    )
  }
