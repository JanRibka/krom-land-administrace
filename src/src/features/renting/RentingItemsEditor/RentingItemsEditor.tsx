import Alert from "@mui/material/Alert";

import { RentingItem } from "entities/renting";
import SectionStyled from "features/styledComponents/SectionStyled";
import SectionTitle from "shared/components/sectionTitle/SectionTitle";
import { AppDataGrid } from "shared/components/table";

import { useRentingItemsEditor } from "./hooks/useRentingItemsEditor";

interface RentingItemsEditorProps {
  data: RentingItem[];
}

const RentingItemsEditor = ({ data }: RentingItemsEditorProps) => {
  const { columns, handleOnUpdate, getNewRow } = useRentingItemsEditor();

  return (
    <SectionStyled component="section">
      <SectionTitle title="Položky k zapůjčení" />

      <Alert severity="info" sx={{ mb: 2 }}>
        Aby bylo možné vybrat témata dekorací, musí jedna z položek obsahovat kód{" "}
        <strong>DECORATION</strong>.
      </Alert>

      <AppDataGrid
        data={data}
        columns={columns}
        onUpdate={handleOnUpdate}
        getNewRow={getNewRow}
        idField="idRentingItem"
      />
    </SectionStyled>
  );
};

export default RentingItemsEditor;
