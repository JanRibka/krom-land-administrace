import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";

import UserInputDialogProps from "./UserInputDialogProps";

interface Props extends UserInputDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  anoButtonTitle?: string;
  anoButtonDisable?: boolean;
  neButtonTitle?: string;
  content: JSX.Element;
  isClosable?: boolean;
  isLoading?: boolean;
  onClickAnoButton: () => void;
  onClickNeButton?: () => void;
}

const AnoNeDialog = (props: Props) => {
  const handleOnClickNeButton = () => {
    props.setIsOpen(false);
    props.onClickNeButton?.();
  };

  const handleOnClickAnoButton = () => {
    props.onClickAnoButton();
  };

  return (
    <Dialog open={props.isOpen}>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ alignSelf: "center" }}>{props.title}</Box>

        {props.isClosable && (
          <Box>
            <IconButton
              aria-label='close'
              onClick={() => props.setIsOpen(false)}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        )}
      </DialogTitle>

      <DialogContent>
        <Box sx={{ marginTop: "1rem" }}>{props.content}</Box>
      </DialogContent>

      <DialogActions>
        <Button
          variant='outlined'
          color='secondary'
          onClick={handleOnClickNeButton}
        >
          {props.neButtonTitle ?? "Ne"}
        </Button>

        <LoadingButton
          variant='contained'
          color='secondary'
          loading={props.isLoading}
          onClick={handleOnClickAnoButton}
          disabled={props.anoButtonDisable}
        >
          {props.anoButtonTitle ?? "Ano"}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default AnoNeDialog;
