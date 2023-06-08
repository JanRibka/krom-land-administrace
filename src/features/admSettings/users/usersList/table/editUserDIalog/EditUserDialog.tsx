import { Dayjs } from "dayjs";
import UserEditModel from "features/admSettings/models/UserEditModel";
import { mapFromUserEditDTO } from "features/admSettings/save/mapFromUserEditDTO";
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
import UserEditDTO from "shared/DTOs/UserEditDTO";
import { useDashboardSlice } from "shared/infrastructure/store/dashboard/useDashboardSlice";
import { nameof } from "shared/nameof";

import CloseIcon from "@mui/icons-material/Close";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import DialogContentForm from "./dialogContent/DialogContentForm";
import ActionRegistrationDialogStyled from "./styledComponents/ActionRegistrationDialogStyled";
import DialogActionsStyled from "./styledComponents/DialogActionsStyled";

interface IProps {
  open: boolean;
  id: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const EditUserDialog = (props: IProps) => {
  // References
  const refForm = useRef<HTMLFormElement>(null);

  // State
  const [deleting, setDeleting] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);
  const [delConfirmDialogOpn, setDelConfirmDialogOpn] =
    useState<boolean>(false);
  const [userLoaded, setUserLoaded] = useState<boolean>(false);
  const [userEdit, setUserEdit] = useState<UserEditModel>(new UserEditModel());

  // Constants
  const _dashboardService = new DashboardService();
  const { handleDashboardUpdate } = useDashboardSlice();

  // Other

  /**
   * Get data
   */
  const { isLoading } = useRequest<JsonResulObjectDataDTO<UserEditDTO>>(
    {
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
  console.log(userEdit);
  const handleTextFieldOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name: string = e.target.name;
    const value: string = e.target.value;

    // const data: RegistrationEditModel = {
    //   ...registrationEdit,
    //   Registration: {
    //     ...registrationEdit.Registration,
    //     [name]: value,
    //   },
    // };

    // setRegistrationEdit(data);
  };

  const handleNumericFieldOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name: string = e.target.name;
    const value: number = parseInt(e.target.value);

    // const data: RegistrationEditModel = {
    //   ...registrationEdit,
    //   Registration: {
    //     ...registrationEdit.Registration,
    //     [name]: value,
    //   },
    // };

    // setRegistrationEdit(data);
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

      //   setRegistrationEdit({
      //     ...registrationEdit,
      //     Registration: { ...registrationEdit.Registration, [name]: resultDate },
      //   });
      // } else if (!!!newDate) {
      //   setRegistrationEdit({
      //     ...registrationEdit,
      //     Registration: { ...registrationEdit.Registration, [name]: "" },
      //   });
    }
  };

  const handleOnChangeTelInput = (
    value: string,
    info: MuiTelInputInfo,
    name: string
  ) => {
    // const data: RegistrationEditModel = {
    //   ...registrationEdit,
    //   Registration: {
    //     ...registrationEdit.Registration,
    //     [name]: value,
    //   },
    // };
    // setRegistrationEdit(data);
  };

  const handleOnChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    let value: string = e.target.value;
    let data: Partial<RegistrationModel> = {};

    // if (
    //   name === nameof<RegistrationModel>("other_how_children_arrives") &&
    //   JSON.parse(value) === childArrivesMyselveId
    // ) {
    //   data = {
    //     [name]: JSON.parse(value),
    //     other_pickup_person: "",
    //   };
    // } else {
    //   data = {
    //     [name]: JSON.parse(value),
    //   };
    // }

    // setRegistrationEdit({
    //   ...registrationEdit,
    //   Registration: { ...registrationEdit.Registration, ...data },
    // });
  };

  const handleOnClickDelete = () => {
    setDelConfirmDialogOpn(true);
  };

  const handleDeleteConfirm = async () => {
    if (deleting) return;

    setDelConfirmDialogOpn(false);
    setDeleting(true);

    const response = await _dashboardService.registrationDelete(props.id);

    // if (response) {
    //   setRegistrationLoaded(false);
    //   setDeleting(false);
    //   handleDashboardUpdate({ _registrationsLoaded: false });
    //   props.setOpen(false);
    // } else {
    //   setDeleting(false);
    // }
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

    // const result = await _dashboardService.registrationUpdate(
    //   registrationEdit.Registration
    // );
    // if (result) {
    //   setRegistrationEdit(new RegistrationEditModel());
    //   setUpdating(false);
    //   setRegistrationLoaded(false);
    //   handleDashboardUpdate({ _registrationsLoaded: false });
    //   props.setOpen(false);
    // } else {
    //   setUpdating(false);
    // }
  };

  const handleCloseDialogOnClick = () => {
    setUserLoaded(false);
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
        <Box className='title-wrapper'>
          <DialogTitle>
            Editace uživatele
            <IconButton
              aria-label='close'
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
            handleOnChangeDatePipcker={handleOnChangeDatePicker}
            handleOnChangeTelInput={handleOnChangeTelInput}
            handleFormOnSubmit={handleFormOnSubmit}
            handleOnChangeRadio={handleOnChangeRadio}
          />

          {/* Loader */}
          {(isLoading || deleting || updating) && (
            <Box className='loader-wrapper'>
              <Box>
                <AppLoader />
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActionsStyled>
          <Box className='buttons-wrapper'>
            <Box className='left-buttons'>
              <LoadingButton
                variant='contained'
                color='secondary'
                loading={deleting}
                onClick={handleOnClickDelete}
              >
                Smazat
              </LoadingButton>
            </Box>
            <Box className='right-buttons'>
              <Button
                variant='outlined'
                color='secondary'
                onClick={() => {
                  handleCloseDialogOnClick();
                }}
              >
                Zavřít
              </Button>
              <LoadingButton
                variant='contained'
                color='secondary'
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
        title='Upozornění'
        isOpen={delConfirmDialogOpn}
        setIsOpen={setDelConfirmDialogOpn}
        onClickAnoButton={handleDeleteConfirm}
        anoButtonTitle='Smazat'
        neButtonTitle='Zavřít'
        content={<Typography>Přejete si uživatele smazat?</Typography>}
      />
    </>
  );
};

export default EditUserDialog;
