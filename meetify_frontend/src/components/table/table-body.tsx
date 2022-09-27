import {
  KeyRendererCallableType,
  KeyRendererType,
  RoomDTO,
} from "../../assets/sass/shared-interface";

interface TableBodyComponent {
  className?: string;
  data?: { [key: string]: string | boolean }[];
  dataKeys: string[];
  keyRenderer?: KeyRendererType;
  deleteFromDb: any;
}

const TableBody = (props: TableBodyComponent) => {
  const { data, keyRenderer, dataKeys } = props;

  if (!data?.length) return <div />;

  return data?.map((item) => (
    <tr>
      {dataKeys.map((dataRow) =>
        (keyRenderer as { [key: string]: string })[dataRow] ? (
          dataRow === "action" ? (
            <td className="last-td">
              {(keyRenderer as KeyRendererCallableType)[dataRow](
                //@ts-ignore
                item as RoomDTO
              )}
            </td>
          ) : (
            (keyRenderer as { [key: string]: string })[dataRow] && (
              <td>
                {(keyRenderer as KeyRendererCallableType)[dataRow](
                  //@ts-ignore
                  item as RoomDTO
                )}
              </td>
            )
          )
        ) : (
          <td>{item[dataRow]}</td>
        )
      )}
    </tr>
  ));
};

export default TableBody;
