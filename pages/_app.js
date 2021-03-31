import "tailwindcss/tailwind.css"

import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen min-w-screen bg-gray-50">
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  )
}

export default MyApp
