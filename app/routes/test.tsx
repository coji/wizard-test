import { useState } from "react"

export default function TestPage() {
  const [isChecked, setIsChecked] = useState(false)

  return (
    <div>
      Test
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>number</th>
          </tr>
        </thead>
        <tbody>
          <tr
            onClick={(e) => {
              console.log("tr clicked")
              setIsChecked((prev) => !prev)
              e.stopPropagation()
            }}
          >
            <td>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => {
                  console.log("input changed", e.currentTarget.value)
                  //                  setIsChecked((prev) => !prev)
                }}
              ></input>
              test
            </td>
            <td>123</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
