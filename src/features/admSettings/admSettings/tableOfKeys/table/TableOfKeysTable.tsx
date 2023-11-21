import mapFromDropDownsDataDTO from "features/admSettings/save/mapFromDropDownsDataDTO";
import { useSelector } from "react-redux";
import AppNotification from "shared/components/notification/AppNotification";
import SectionSubTitle from "shared/components/sectionSubTitle/SectionSubTitle";
import { useRequest } from "shared/dataAccess/useRequest";
import JsonResulObjectDataDTO from "shared/DTOs/JsonResulObjectDataDTO";
import { selectAdmSettings } from "shared/infrastructure/store/admSettings/admSettingsSlice";
import { useAdmSettingsSlice } from "shared/infrastructure/store/admSettings/useAdmSettingsSlice";
import TableOfKeysModel from "shared/models/TableOfKeysModel";

import Box from "@mui/material/Box";

import Table from "./Table";

const TableOfKeysTable = () => {
  // Store
  const admSettings = useSelector(selectAdmSettings);

  // Constants
  const { handleAdmSettingsUpdate } = useAdmSettingsSlice();

  // Get data
  const { isLoading } = useRequest<JsonResulObjectDataDTO<TableOfKeysModel[]>>(
    {
      url: (process.env.REACT_APP_API_URL ?? "") + "AdmSettingsController.php",
      params: new URLSearchParams({
        function: "getDropDownsData",
      }),
    },
    {
      Success: false,
      ErrMsg: "",
      Data: [],
    },
    [],
    {
      apply: true,
      condition: () => admSettings._admSettingsLoaded === false,
    },
    (data) => {
      const dataType = typeof data;

      if (dataType === "string") {
        AppNotification("Chyba", String(data), "danger");
      } else {
        if (data.Success) {
          handleAdmSettingsUpdate(mapFromDropDownsDataDTO(data?.Data ?? null));
        } else {
          AppNotification("Chyba", data.ErrMsg ?? "", "danger");
        }
      }
    }
  );

  return (
    <Box>
      {Object.keys(admSettings.DropDownsData).map((key, index) => (
        <Box
          sx={{
            "&:not(:first-of-type)": {
              marginTop: "32px",
            },
          }}
        >
          <SectionSubTitle title={key} />
          <Table
            key={`drop_downs_data_table_${key}_${index}`}
            isLoading={isLoading}
            groupKey={key}
            data={admSettings.DropDownsData?.[key]}
          />
        </Box>
      ))}
    </Box>
  );
};

export default TableOfKeysTable;
