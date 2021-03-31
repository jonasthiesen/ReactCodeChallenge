import axios from "axios"
import { useQuery } from "react-query"

export default function useCompanyHighlightsQuery(companyId) {
  return useQuery(["highlights", companyId], () => {
    return axios
      .get(`/api/company/highlights/${companyId}`)
      .then((res) => res?.data)
  })
}
