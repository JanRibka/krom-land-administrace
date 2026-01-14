import { Dayjs } from "dayjs";
import DashboardService from "features/dashboard/DashboardService";
import RegistrationEditModel from "features/dashboard/models/RegistrationEditModel";
import RegistrationModel from "features/dashboard/models/RegistrationModel";
import { mapFromRegistrationEditDTO } from "features/dashboard/save/mapFromRegistrationEditDTO";
import { MuiTelInputInfo } from "mui-tel-input";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useRef,
  useState,
} from "react";
import AppLoader from "shared/components/loader/AppLoader";
import AppNotification from "shared/components/notification/AppNotification";
import { useRequest } from "shared/dataAccess/useRequest";
import AnoNeDialog from "shared/dialogs/AnoNeDialog";
import JsonResulObjectDataDTO from "shared/DTOs/JsonResulObjectDataDTO";
import RegistrationEditDTO from "shared/DTOs/RegistrationEditDTO";
import { useDashboardSlice } from "shared/infrastructure/store/dashboard/useDashboardSlice";
import { nameof } from "shared/nameof";

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
import ActionRegistrationDialogStyled from "./styledComponents/ActionRegistrationDialogStyled";
import DialogActionsStyled from "./styledComponents/DialogActionsStyled";

interface IProps {
  open: boolean;
  id: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const EditRegistrationDialog = (props: IProps) => {
  // References
  const refForm = useRef<HTMLFormElement>(null);

  // State
  const [deleting, setDeleting] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);
  const [delConfirmDialogOpn, setDelConfirmDialogOpn] =
    useState<boolean>(false);
  const [registrationLoaded, setRegistrationLoaded] = useState<boolean>(false);
  const [registrationEdit, setRegistrationEdit] =
    useState<RegistrationEditModel>(new RegistrationEditModel());

  // Constants
  const _dashboardService = new DashboardService();
  const { handleDashboardUpdate } = useDashboardSlice();
  const childArrivesMyselveId =
    registrationEdit.SelectsData.ChildArrivesData.find(
      (f) => f.Key === "MYSELVE"
    )?.Id;

  // Other

  /**
   * Get data
   */
  const { isLoading } = useRequest<JsonResulObjectDataDTO<RegistrationEditDTO>>(
    {
      baseUrl: process.env.REACT_APP_API_BASE_URL ?? "",
      url: (process.env.REACT_APP_API_URL ?? "") + "DashboardController.php",
      params: new URLSearchParams({
        function: "getRegistrationForEdit",
        id: props.id.toString(),
      }),
    },
    {
      Success: false,
      ErrMsg: "",
      Data: new RegistrationEditDTO(),
    },
    [props.open],
    {
      apply: true,
      condition: () => registrationLoaded === false && props.open,
    },
    (data) => {
      const dataType = typeof data;

      if (dataType === "string") {
        AppNotification("Chyba", String(data), "danger");
      } else {
        if (data.Success) {
          setRegistrationEdit(mapFromRegistrationEditDTO(data?.Data));
          setRegistrationLoaded(true);
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

    const data: RegistrationEditModel = {
      ...registrationEdit,
      Registration: {
        ...registrationEdit.Registration,
        [name]: value,
      },
    };

    setRegistrationEdit(data);
  };

  const handleNumericFieldOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name: string = e.target.name;
    const value: number = parseInt(e.target.value);

    const data: RegistrationEditModel = {
      ...registrationEdit,
      Registration: {
        ...registrationEdit.Registration,
        [name]: value,
      },
    };

    setRegistrationEdit(data);
  };

  const handleOnChangeDatePicker = (
    date: Dayjs | null,
    keyboardInputValue: string | undefined,
    name: string
  ) => {
    let newDate = date?.toDate();
    // Aby se nevytvarel rok po zadani prvniho cisla napr 0002
    if (keyboardInputValue !== undefined) {
      const splitKeyboardInputValue = keyboardInputValue?.split(".");

      if (
        splitKeyboardInputValue?.length === 3 &&
        splitKeyboardInputValue[2] !== undefined &&
        splitKeyboardInputValue[2]?.length < 4
      ) {
        return;
      }
    }

    if (newDate !== null && !!newDate?.getDate()) {
      const resultDate = `${newDate.getDate()}.${
        newDate.getMonth() + 1
      }.${newDate.getUTCFullYear()}`;

      setRegistrationEdit({
        ...registrationEdit,
        Registration: { ...registrationEdit.Registration, [name]: resultDate },
      });
    } else if (!!!newDate) {
      setRegistrationEdit({
        ...registrationEdit,
        Registration: { ...registrationEdit.Registration, [name]: "" },
      });
    }
  };

  const handleOnChangeTelInput = (
    value: string,
    info: MuiTelInputInfo,
    name: string
  ) => {
    const data: RegistrationEditModel = {
      ...registrationEdit,
      Registration: {
        ...registrationEdit.Registration,
        [name]: value,
      },
    };

    setRegistrationEdit(data);
  };

  const handleOnChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    let value: string = e.target.value;
    let data: Partial<RegistrationModel> = {};

    if (
      name === nameof<RegistrationModel>("other_how_children_arrives") &&
      JSON.parse(value) === childArrivesMyselveId
    ) {
      data = {
        [name]: JSON.parse(value),
        other_pickup_person: "",
      };
    } else {
      data = {
        [name]: JSON.parse(value),
      };
    }

    setRegistrationEdit({
      ...registrationEdit,
      Registration: { ...registrationEdit.Registration, ...data },
    });
  };

  const handleOnChangeSelect = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;

    setRegistrationEdit({
      ...registrationEdit,
      Registration: { ...registrationEdit.Registration, [name]: value },
    });
  };

  const handleOnClickDelete = () => {
    setDelConfirmDialogOpn(true);
  };

  const handleDeleteConfirm = async () => {
    if (deleting) return;

    setDelConfirmDialogOpn(false);
    setDeleting(true);

    const response = await _dashboardService.registrationDelete(props.id);

    if (response) {
      setRegistrationLoaded(false);
      setDeleting(false);
      handleDashboardUpdate({ _registrationsLoaded: false });
      props.setOpen(false);
    } else {
      setDeleting(false);
    }
  };

  const handleOnClickSave = () => {
    const submitButton = document.getElementsByClassName(
      "registration-submit-button"
    );

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

    const result = await _dashboardService.registrationUpdate(
      registrationEdit.Registration
    );
    if (result) {
      setRegistrationEdit(new RegistrationEditModel());
      setUpdating(false);
      setRegistrationLoaded(false);
      handleDashboardUpdate({ _registrationsLoaded: false });
      props.setOpen(false);
    } else {
      setUpdating(false);
    }
  };

  const handleCloseDialogOnClick = () => {
    setRegistrationLoaded(false);
    props.setOpen(false);
  };

  return (
    <>
      <ActionRegistrationDialogStyled
        open={props.open}
        onClose={() => {
          handleCloseDialogOnClick();
        }}
      >
        <Box className="title-wrapper">
          <DialogTitle>
            Editace registrace
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
            registrationEdit={registrationEdit}
            handleTextFieldOnChange={handleTextFieldOnChange}
            handleNumericFieldOnChange={handleNumericFieldOnChange}
            handleOnChangeDatePipcker={handleOnChangeDatePicker}
            handleOnChangeTelInput={handleOnChangeTelInput}
            handleFormOnSubmit={handleFormOnSubmit}
            handleOnChangeRadio={handleOnChangeRadio}
            handleSelectOnChange={handleOnChangeSelect}
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
      </ActionRegistrationDialogStyled>

      <AnoNeDialog
        title="Upozornění"
        isOpen={delConfirmDialogOpn}
        setIsOpen={setDelConfirmDialogOpn}
        onClickAnoButton={handleDeleteConfirm}
        anoButtonTitle="Smazat"
        neButtonTitle="Zavřít"
        content={
          <Typography>Přejete si smazat vybranou registraci?</Typography>
        }
      />
    </>
  );
};

export default EditRegistrationDialog;
