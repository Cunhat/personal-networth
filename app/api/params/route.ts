import { type NextRequest } from 'next/server'
 
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')
  console.log(query)
  return query
  // query is "hello" for /api/search?query=hello
}