import TableBody from "./table-body";
import { KeyRendererType } from "../../assets/sass/shared-interface";

import "./table.scss";

interface TableComponent {
  data?: { [key: string]: any }[];
  dataKeys?: string[];
  userKeys?: string[];
  keyRenderer?: KeyRendererType;
  headerColumns: { key: string; value: string }[];
}

export interface DataInterface {
  id?: string;
  name: string;
  status?: string;
  capacity: number;
  activeMeetings?: string;
}

const Table = (props: TableComponent) => {
  const { data, keyRenderer, dataKeys, headerColumns } = props;

  return (
    <div className="table-container">
      <table className="meetify-table">
        <tr>
          {headerColumns.map((item) => (
            <th>{item.value}</th>
          ))}
        </tr>

        {
          //@ts-ignore}
          <TableBody
            data={data}
            keyRenderer={keyRenderer}
            dataKeys={dataKeys as any}
          />
        }
      </table>
    </div>
  );
};

export default Table;
