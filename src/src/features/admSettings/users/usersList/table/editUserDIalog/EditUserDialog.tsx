import AdmSettingsService from "features/admSettings/AdmSettingsService";
import UserEditModel from "features/admSettings/models/UserEditModel";
import { mapFromUserEditDTO } from "features/admSettings/save/mapFromUserEditDTO";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import AppLoader from "shared/components/loader/AppLoader";
import AppNotification from "shared/components/notification/AppNotification";
import { useRequest } from "shared/dataAccess/useRequest";
import AnoNeDialog from "shared/dialogs/AnoNeDialog";
import JsonResulObjectDataDTO from "shared/DTOs/JsonResulObjectDataDTO";
import UserEditDTO from "shared/DTOs/UserEditDTO";
import { useAdmSettingsSlice } from "shared/infrastructure/store/admSettings/useAdmSettingsSlice";
import { selectAuthentication } from "shared/infrastructure/store/authentication/authenticationSlice";

import CloseIcon from "@mui/icons-material/Close";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";

import DialogContentForm from "./dialogContent/DialogContentForm";
import ActionUserDialogStyled from "./styledComponents/ActionUserDialogStyled";
import DialogActionsStyled from "./styledComponents/DialogActionsStyled";

interface IProps {
  open: boolean;
  id: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const EditUserDialog = (props: IProps) => {
  // References
  const refForm = useRef<HTMLFormElement>(null);

  // Store
  const authentication = useSelector(selectAuthentication);

  // State
  const [deleting, setDeleting] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);
  const [delConfirmDialogOpn, setDelConfirmDialogOpn] =
    useState<boolean>(false);
  const [userLoaded, setUserLoaded] = useState<boolean>(false);
  const [userEdit, setUserEdit] = useState<UserEditModel>(new UserEditModel());

  // Constants
  const _admSettingsService = new AdmSettingsService();
  const { handleAdmSettingsUpdate } = useAdmSettingsSlice();

  // Other

  /**
   * Get data
   */
  const { isLoading } = useRequest<JsonResulObjectDataDTO<UserEditDTO>>(
    {
      baseUrl: process.env.REACT_APP_API_BASE_URL ?? "",
      url: (process.env.REACT_APP_API_URL ?? "") + "AdmSettingsController.php",
      params: new URLSearchParams({
        function: "getUserForEdit",
        id: props.id.toString(),
      }),
    },
    {
      Success: false,
      ErrMsg: "",
      Data: new UserEditDTO(),
    },
    [props.open],
    {
      apply: true,
      condition: () => userLoaded === false && props.open,
    },
    (data) => {
      const dataType = typeof data;

      if (dataType === "string") {
        AppNotification("Chyba", String(data), "danger");
      } else {
        if (data.Success) {
          setUserEdit(mapFromUserEditDTO(data?.Data));
          setUserLoaded(true);
        } else {
          AppNotification("Chyba", data.ErrMsg ?? "", "danger");
        }
      }
    }
  );

  const handleTextFieldOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name: string = e.target.name;
    const value: string = e.target.value;

    const data: UserEditModel = {
      ...userEdit,
      User: {
        ...userEdit.User,
        [name]: value,
      },
    };

    setUserEdit(data);
  };

  const handleNumericFieldOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name: string = e.target.name;
    const value: number = Number(e.target.value);

    const data: UserEditModel = {
      ...userEdit,
      User: {
        ...userEdit.User,
        [name]: value,
      },
    };

    setUserEdit(data);
  };

  const handleOnChangeSelect = (e: SelectChangeEvent<number>) => {
    const name: string = e.target.name;
    let value: number = e.target.value as number;

    const data: UserEditModel = {
      ...userEdit,
      User: {
        ...userEdit.User,
        [name]: value,
      },
    };

    setUserEdit(data);
  };

  const handleOnClickDelete = () => {
    setDelConfirmDialogOpn(true);
  };

  const handleDeleteConfirm = async () => {
    if (deleting) return;

    setDelConfirmDialogOpn(false);
    setDeleting(true);

    const response = await _admSettingsService.userDelete(props.id);

    if (response) {
      setUserLoaded(false);
      setDeleting(false);
      handleAdmSettingsUpdate({ _usersLoaded: false });
      props.setOpen(false);
    } else {
      setDeleting(false);
    }
  };

  const handleOnClickSave = () => {
    const submitButton = document.getElementsByClassName("user-submit-button");

    if (submitButton.length > 0) {
      const button = submitButton[0] as HTMLButtonElement;
      button.click();
    }
  };

  const handleFormOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.reset();
    handleOnAfterFormSubmit();
  };

  const handleOnAfterFormSubmit = async () => {
    if (updating) return;

    setUpdating(true);

    const result = await _admSettingsService.userUpdate(userEdit.User);
    if (result) {
      setUserEdit(new UserEditModel());
      setUpdating(false);
      setUserLoaded(false);
      handleAdmSettingsUpdate({ _usersLoaded: false });
      props.setOpen(false);

      if (userEdit.User.Id === authentication.UserId) {
        window.location.reload();
      }
    } else {
      setUpdating(false);
    }
  };

  const handleCloseDialogOnClick = () => {
    setUserLoaded(false);
    props.setOpen(false);
  };

  return (
    <>
      <ActionUserDialogStyled
        open={props.open}
        onClose={() => {
          handleCloseDialogOnClick();
        }}
      >
        <Box className="title-wrapper">
          <DialogTitle>
            Editace uživatele
            <IconButton
              aria-label="close"
              onClick={() => {
                handleCloseDialogOnClick();
              }}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[900],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
        </Box>
        <DialogContent>
          <DialogContentForm
            ref={refForm}
            userEdit={userEdit}
            handleTextFieldOnChange={handleTextFieldOnChange}
            handleNumericFieldOnChange={handleNumericFieldOnChange}
            handleOnChangeSelect={handleOnChangeSelect}
            handleFormOnSubmit={handleFormOnSubmit}
          />

          {/* Loader */}
          {(isLoading || deleting || updating) && (
            <Box className="loader-wrapper">
              <Box>
                <AppLoader />
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActionsStyled>
          <Box className="buttons-wrapper">
            <Box className="left-buttons">
              <LoadingButton
                variant="contained"
                color="secondary"
                loading={deleting}
                disabled={userEdit.User.Id === authentication.UserId}
                onClick={handleOnClickDelete}
              >
                Smazat
              </LoadingButton>
            </Box>
            <Box className="right-buttons">
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  handleCloseDialogOnClick();
                }}
              >
                Zavřít
              </Button>
              <LoadingButton
                variant="contained"
                color="secondary"
                loading={updating}
                onClick={handleOnClickSave}
              >
                Uložit
              </LoadingButton>
            </Box>
          </Box>
        </DialogActionsStyled>
      </ActionUserDialogStyled>

      <AnoNeDialog
        title="Upozornění"
        isOpen={delConfirmDialogOpn}
        setIsOpen={setDelConfirmDialogOpn}
        onClickAnoButton={handleDeleteConfirm}
        anoButtonTitle="Smazat"
        neButtonTitle="Zavřít"
        content={<Typography>Přejete si uživatele smazat?</Typography>}
      />
    </>
  );
};

export default EditUserDialog;
