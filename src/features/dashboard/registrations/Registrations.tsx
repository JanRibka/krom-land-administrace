import SectionStyled from "features/styledComponents/SectionStyled";
import { useState } from "react";
import SectionTitle from "shared/components/sectionTitle/SectionTitle";
import AnoNeDialog from "shared/dialogs/AnoNeDialog";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";

import CardStyled from "../styledComponents/CardStyled";
import RegistrationsTable from "./table/RegistrationsTable";

const Registrations = () => {
  // State
  const [open, setOpen] = useState<boolean>(false);

  // Other
  const handleTableSettigsOnClick = () => {
    setOpen(true);
  };

  return (
    <ErrorBoundary>
      <SectionStyled component='section'>
        <SectionTitle title='Rezervace' />
        <RegistrationsTable />
      </SectionStyled>

      {/* <CardStyled>
        <CardHeader
          title='Rezervace'
          action={
            <IconButton aria-label='filter' onClick={handleTableSettigsOnClick}>
              <FilterAltIcon />
            </IconButton>
          }
        />
        <CardContent>sdfghhhsdg</CardContent>
      </CardStyled> */}

      <AnoNeDialog
        isOpen={open}
        setIsOpen={setOpen}
        onClickAnoButton={() => {}}
        anoButtonTitle='Uložit'
        neButtonTitle='Zavřít'
        title='Filtr'
        content={<></>}
      />
    </ErrorBoundary>
  );
};

export default Registrations;
