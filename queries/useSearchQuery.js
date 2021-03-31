import axios from "axios"
import { useQuery } from "react-query"

export default function useSearchQuery(query) {
  return useQuery(["search", query], () => {
    return axios.get(`/api/search?query=${query}`).then((res) => res?.data)
  })
}
