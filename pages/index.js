import * as React from "react"
import Link from "next/link"
import useSearchQuery from "@/queries/useSearchQuery"

export default function Home() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const { data: searchResponse } = useSearchQuery(searchTerm)

  return (
    <div className="flex flex-col space-y-4 p-4 mx-auto max-w-xl">
      <div className="flex flex-col">
        <h1 className="font-medium text-lg">Search for a company</h1>
        <input
          placeholder="Try searching for 'risika'"
          className="px-3 py-2 rounded-lg shadow"
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      <div className="flex flex-col space-y-4">
        {searchResponse?.data.map((company) => (
          <div
            className="bg-white rounded-lg overflow-hidden shadow"
            key={company.local_organization_id.id}
          >
            <Link href={`/company/${company.local_organization_id.id}`}>
              <div className="p-4 cursor-pointer font-bold hover:text-purple-500">
                {company.company_name}
              </div>
            </Link>
            <div className="bg-gray-200 px-4 py-2">
              {company.phone.phone_number}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
