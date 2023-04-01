import { useState } from "react";
import AnoNeDialog from "shared/dialogs/AnoNeDialog";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";

import CardStyled from "../styledComponents/CardStyled";

const Reservations = () => {
  // State
  const [open, setOpen] = useState<boolean>(false);

  // Other
  const handleTableSettigsOnClick = () => {
    setOpen(true);
  };

  return (
    <>
      <CardStyled>
        <CardHeader
          title='Rezervace'
          action={
            <IconButton aria-label='filter' onClick={handleTableSettigsOnClick}>
              <FilterAltIcon />
            </IconButton>
          }
        />
        <CardContent>sdfghhhsdg</CardContent>
      </CardStyled>

      <AnoNeDialog
        isOpen={open}
        setIsOpen={setOpen}
        onClickAnoButton={() => {}}
        anoButtonTitle='Uložit'
        neButtonTitle='Zavřít'
        title='Filtr'
        content={<></>}
      />
    </>
  );
};

export default Reservations;
