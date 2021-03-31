import * as React from "react"
import { useRouter } from "next/router"
import Management from "@/components/Management"
import { companyRelations } from "@/requests"
import useCompanyBasicsQuery from "@/queries/useCompanyBasicsQuery"
import useCompanyHighlightsQuery from "@/queries/useCompanyHighlightsQuery"
import cx from "@/utils/cx"

function classificationNumber(classification) {
  return {
    negative: 0,
    positive: 1,
    neutral: 2,
  }[classification]
}

export default function Company() {
  const router = useRouter()
  const { id } = router.query

  const { data: companyBasicsResponse } = useCompanyBasicsQuery(id)
  const { data: companyHighlightsResponse } = useCompanyHighlightsQuery(id)

  const companyData = companyBasicsResponse?.data
  const highlightsData = Object.entries(companyHighlightsResponse?.data ?? {})
    .map(([key, value]) => {
      return {
        key,
        ...value,
      }
    })
    .sort((a, b) => {
      const classA = classificationNumber(a.classification)
      const classB = classificationNumber(b.classification)

      if (classA === classB) {
        return a.weight - b.weight
      }

      return classA - classB
    })

  const [relations, setRelations] = React.useState(null)

  React.useEffect(() => {
    if (id != null) {
      companyRelations({ id }).then((res) => {
        setRelations(res)
      })
    }
  }, [id])

  return (
    <div>
      <div
        className={cx(
          "p-8",
          ["bg-gray-400", companyData?.risk_assessment_code == null],
          ["bg-green-500", companyData?.risk_assessment_code === "LOW"],
          ["bg-yellow-500", companyData?.risk_assessment_code === "MEDIUM"],
          ["bg-red-500", companyData?.risk_assessment_code === "HIGH"],
        )}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold">{companyData?.company_name}</h2>
          <div className="text-center">
            {companyData?.status_code === "ACTIVE" ? (
              <>
                <p className="text-4xl font-bold">
                  {companyData?.score} <span className="text-sm">/ 10</span>
                </p>
                <p>
                  <span>{companyData?.risk_assessment}</span> <span>risk</span>
                </p>
              </>
            ) : (
              <>
                <p className="text-2xl font-bold">{companyData?.status}</p>
                <p>
                  {companyData?.status_valid_from != null
                    ? Intl.DateTimeFormat("da-DK").format(
                        new Date(companyData?.status_valid_from),
                      )
                    : null}
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-8 mx-8 my-8 max-w-7xl xl:mx-auto">
        <div>
          <h3 className="text-2xl font-medium mb-4">Highlights</h3>
          <div className="flex flex-col space-y-2">
            {highlightsData?.map((highlight) => (
              <div
                key={highlight.key}
                className={cx(
                  "bg-white",
                  "rounded-lg",
                  "p-2",
                  "border-2",
                  ["border-red-500", highlight.classification === "negative"],
                  ["border-gray-500", highlight.classification === "neutral"],
                  ["border-green-500", highlight.classification === "positive"],
                )}
              >
                <h5 className="font-medium">{highlight.title}</h5>
                <p>{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-medium mb-4">
            General company information
          </h3>
          <div className="flex flex-col space-y-4">
            <div>
              <h4 className="font-bold">Local ID (CVR)</h4>
              <p>{companyData?.local_organization_id.id}</p>
            </div>
            <div>
              <h4 className="font-bold">Address</h4>
              {companyData?.address != null ? (
                <p>
                  <span>{companyData?.address?.street}</span>&nbsp;
                  <span>{companyData?.address?.number}</span>
                  <span>,&nbsp;{companyData?.address?.zipcode}</span>&nbsp;
                  <span>{companyData?.address?.postdistrict}</span>
                </p>
              ) : (
                <p>This company does not have an address</p>
              )}
            </div>
            <div>
              <h4 className="font-bold">Phone number</h4>
              {companyData?.phone?.phone_number != null ? (
                <p>{companyData?.phone?.phone_number}</p>
              ) : (
                <p>This company does not have a phone number</p>
              )}
            </div>
            <div>
              <h4 className="font-bold">Email</h4>
              {companyData?.phone?.phone_number != null ? (
                <p>{companyData?.email?.email}</p>
              ) : (
                <p>This company does not have an email</p>
              )}
            </div>
            <div>
              <h4 className="font-bold">Website</h4>
              {companyData?.webpage != null ? (
                <p>{companyData?.webpage}</p>
              ) : (
                <p>This company does not have a website</p>
              )}
            </div>
            <div>
              <h4 className="font-bold">Date of incorporation</h4>
              {companyData?.date_of_incorporation != null ? (
                <p>
                  {Intl.DateTimeFormat("da-DK").format(
                    new Date(companyData?.date_of_incorporation),
                  )}
                </p>
              ) : (
                <p>This company does not have a website</p>
              )}
            </div>
            <div>
              <h4 className="font-bold">Registered for VAT</h4>
              <p>{companyData?.vat ? "Yes" : "No"}</p>
            </div>
            <div>
              <h4 className="font-bold">Advertisement protected</h4>
              <p>{companyData?.advertisement_protection ? "Yes" : "No"}</p>
            </div>
            <div>
              <h4 className="font-bold">Main industry</h4>
              <p>{companyData?.main_industry_code?.description}</p>
              <span className="rounded p-1 font-medium text-sm bg-purple-100">
                {companyData?.main_industry_code?.code}
              </span>
            </div>
            <div>
              <h4 className="font-bold">Company type</h4>
              <p>
                {companyData?.company_type.long} (
                {companyData?.company_type.short})
              </p>
            </div>
            <div>
              <h4 className="font-bold">Status</h4>
              <p>
                {companyData?.status} (since&nbsp;
                {companyData?.status_valid_from != "0001-01-01"
                  ? companyData?.status_valid_from != null
                    ? Intl.DateTimeFormat("da-DK").format(
                        new Date(companyData?.status_valid_from),
                      )
                    : null
                  : "before 1900"}
                )
              </p>
            </div>
            <div>
              <h4 className="font-bold">Powers to bind</h4>
              {companyData?.powers_to_bind != null ? (
                <p>{companyData?.powers_to_bind}</p>
              ) : (
                <p>This company does not have a powers to bind.</p>
              )}
            </div>
            <div>
              <h4 className="font-bold">Registered capital</h4>
              {companyData?.registered_capital != null ? (
                <p>
                  <span>{companyData?.registered_capital.currency} </span>
                  {Intl.NumberFormat("en-US").format(
                    companyData?.registered_capital.value,
                  )}
                </p>
              ) : (
                <p>This company doesn't have any registered capital.</p>
              )}
            </div>
            <div>
              <h4 className="font-bold">Number of employees</h4>
              {companyData?.number_of_employees != null ? (
                <p>
                  {Intl.NumberFormat("en-US").format(
                    companyData?.number_of_employees.specific,
                  )}
                  <span> ({companyData?.number_of_employees.interval})</span>
                </p>
              ) : (
                <p>This company doesn't have any employees.</p>
              )}
            </div>
            <div>
              <h4 className="font-bold">Secondary names</h4>
              {(companyData?.company_secondary_names?.length ?? 0) > 0 ? (
                <ul>
                  {companyData?.company_secondary_names.map((name) => (
                    <li key={name.name} className="list-disc">
                      {name.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>This company doesn't have any secondary names.</p>
              )}
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-medium mb-4">Relations</h3>
          {relations ? <Management relations={relations} /> : null}
        </div>
      </div>
    </div>
  )
}
