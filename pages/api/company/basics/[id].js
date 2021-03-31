import companies from "@/data/companies.json"

export default (req, res) => {
  const { id } = req.query

  const company = companies.find(
    (company) => company.local_organization_id.id === id,
  )

  res.status(200).json({ data: company })
}
