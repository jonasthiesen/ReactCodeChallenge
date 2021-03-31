import axios from "axios"
import { useQuery } from "react-query"

export default function useCompanyBasicsQuery(companyId) {
  return useQuery(["company", companyId], () => {
    return axios
      .get(`/api/company/basics/${companyId}`)
      .then((res) => res?.data)
  })
}
