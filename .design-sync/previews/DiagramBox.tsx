import { DiagramBox } from "@joshdavidoff/site-ds";

/**
 * The mustard-bordered `.diagram-box` wrapping the "Object Rules" reference
 * table from the Fluxx/Monday operational-layer case study.
 */
export const RefTable = () => (
  <DiagramBox>
    <table className="ref-table">
      <thead>
        <tr>
          <th>Object</th>
          <th>System of record</th>
          <th>Operational mirror</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="src">Grants / proposals</td>
          <td className="src">Fluxx</td>
          <td className="mirror">Monday, SharePoint, Power BI</td>
          <td className="note">Fluxx is authoritative</td>
        </tr>
        <tr>
          <td className="src">Reports</td>
          <td className="src">Fluxx</td>
          <td className="mirror">Monday</td>
          <td className="note">Team visibility; limited write-back of state and due date</td>
        </tr>
        <tr>
          <td className="src">Agreements</td>
          <td className="src">Fluxx</td>
          <td className="mirror">Monday</td>
          <td className="note">Team visibility</td>
        </tr>
      </tbody>
    </table>
  </DiagramBox>
);
