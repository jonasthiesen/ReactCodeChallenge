import { setManagementData } from "./utils/setManagementData"
const managementRoles = [
  "MANAGEMENT",
  "ADMINISTRATION",
  "CHIEF EXECUTIVE OFFICER",
  "BOARD OF DIRECTORS",
  "CHAIRMAN",
  "DEPUTY CHAIRMAN",
  "DEPUTY",
  "STAKEHOLDER",
]

const Management = ({ relations }) => {
  const { management, boardOfDirectors } = relations

  const managementData = setManagementData(managementRoles, [
    ...management,
    ...boardOfDirectors,
  ])
  const keys = Object.keys(managementData[0])
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="text-left">
        <tr>
          {keys.map((key) => (
            <th
              key={`only keys ${key}`}
              className="py-2 text-left text-xs font-bold uppercase tracking-wider"
            >
              {key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {managementData.map((data, i) => (
          <tr key={i}>
            {keys.map((key) => (
              <td key={key} className="py-2">
                {data[key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Management
