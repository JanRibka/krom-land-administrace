import { Dayjs } from "dayjs";
import RegistrationEditModel from "features/dashboard/models/RegistrationEditModel";
import RegistrationModel from "features/dashboard/models/RegistrationModel";
import { mapFromRegistrationEditDTO } from "features/dashboard/save/mapFromRegistrationEditDTO";
import { MuiTelInputInfo } from "mui-tel-input";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import AppLoader from "shared/components/loader/AppLoader";
import AppNotification from "shared/components/notification/AppNotification";
import { useRequest } from "shared/dataAccess/useRequest";
import JsonResulObjectDataDTO from "shared/DTOs/JsonResulObjectDataDTO";
import RegistrationDTO from "shared/DTOs/RegistrationDTO";
import RegistrationEditDTO from "shared/DTOs/RegistrationEditDTO";
import { nameof } from "shared/nameof";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
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

const EditRegistrationDialog = (props: IProps) => {
  // State
  const [registrationLoaded, setRegistrationLoaded] = useState<boolean>(false);

  const [registrationEdit, setRegistrationEdit] =
    useState<RegistrationEditModel>(new RegistrationEditModel());

  // References
  const refForm = useRef<HTMLFormElement>(null);

  // Constants
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

    // setFormData({ ...formData, [name]: value });
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

    // if (newDate !== null && !!newDate?.getDate()) {
    //   const resultDate = `${newDate.getDate()}.${
    //     newDate.getMonth() + 1
    //   }.${newDate.getUTCFullYear()}`;

    //   setFormData({ ...formData, [name]: resultDate });
    // } else if (!!!newDate) {
    //   setFormData({ ...formData, [name]: "" });
    // }
  };

  const handleOnChangeTelInput = (
    value: string,
    info: MuiTelInputInfo,
    name: string
  ) => {
    // setFormData({ ...formData, [name]: value });
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

  const handleOnChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    let value: string = e.target.value;
    // let data: Partial<DialogContentFormModel> = {};

    // if (
    //   name === nameof<DialogContentFormModel>("other_how_children_arrives") &&
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

    // setFormData({ ...formData, ...data });
  };

  const handleFormOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.reset();
    // handleOnAfterFormSubmit(formData);
  };

  // const handleOnAfterFormSubmit = async (formData: DialogContentFormModel) => {
  //   // if (registering) return;
  //   // setRegistering(true);
  //   // const result = await _actionsService.create(formData);
  //   // if (result) {
  //   //   setTimeout(() => {
  //   //     const newFormDat: DialogContentFormModel = {
  //   //       ...new DialogContentFormModel(),
  //   //       action_id: props.id,
  //   //       action_name: props.actionName,
  //   //       action_price: props.actionPrice,
  //   //       action_date: props.actionDate,
  //   //       action_place: props.actionPlace,
  //   //     };
  //   //     setFormData(newFormDat);
  //   //     props.setOpen(false);
  //   //     setRegistering(false);
  //   //   }, 2000);
  //   // } else {
  //   //   setRegistering(false);
  //   // }
  // };

  const handleCloseDialogOnClick = () => {
    props.setOpen(false);
    setRegistrationLoaded(false);
  };

  return (
    <ActionRegistrationDialogStyled
      open={props.open}
      onClose={() => {
        handleCloseDialogOnClick();
      }}
    >
      <Box className='title-wrapper'>
        <DialogTitle>
          Editace registrace
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
          registrationEdit={registrationEdit}
          handleTextFieldOnChange={handleTextFieldOnChange}
          handleOnChangeDatePipcker={handleOnChangeDatePicker}
          handleOnChangeTelInput={handleOnChangeTelInput}
          handleFormOnSubmit={handleFormOnSubmit}
          handleOnChangeRadio={handleOnChangeRadio}
        />

        {/* Loader */}
        {isLoading && (
          <Box className='loader-wrapper'>
            <Box>
              <AppLoader />
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActionsStyled>
        <Typography>
          Potvrzením registrace souhlasíte s{" "}
          <Box component='a'>obchodními podmínkami</Box>.
        </Typography>
        <Box className='buttons-wrapper'>
          <Button
            onClick={() => {
              handleCloseDialogOnClick();
            }}
          >
            Zvařít
          </Button>
          <Button
            variant='contained'
            onClick={handleOnClickSave}
            startIcon={<CheckIcon />}
          >
            Uložit
          </Button>
        </Box>
      </DialogActionsStyled>
    </ActionRegistrationDialogStyled>
  );
};

export default EditRegistrationDialog;
