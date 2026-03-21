import { RentingDecorationTheme } from "entities/renting";
import SectionStyled from "features/styledComponents/SectionStyled";
import SectionTitle from "shared/components/sectionTitle/SectionTitle";
import { AppDataGrid } from "shared/components/table";

import { useRentingDecorationThemesEditor } from "./hooks/useRentingDecorationThemesEditor";

interface RentingDecorationThemesEditorProps {
  data: RentingDecorationTheme[];
}

const RentingDecorationThemesEditor = ({
  data,
}: RentingDecorationThemesEditorProps) => {
  const { columns, handleOnUpdate, getNewRow } =
    useRentingDecorationThemesEditor();

  return (
    <SectionStyled component="section">
      <SectionTitle title="Témata dekorací" />
      <AppDataGrid
        data={data}
        columns={columns}
        onUpdate={handleOnUpdate}
        getNewRow={getNewRow}
        idField="idRentingDecorationTheme"
      />
    </SectionStyled>
  );
};

export default RentingDecorationThemesEditor;
