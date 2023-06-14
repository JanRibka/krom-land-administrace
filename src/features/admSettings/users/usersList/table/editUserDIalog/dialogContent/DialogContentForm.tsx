import UserEditModel from "features/admSettings/models/UserEditModel";
import UserModel from "features/admSettings/models/UserModel";
import { ChangeEvent, FormEvent, forwardRef, Ref } from "react";
import { useSelector } from "react-redux";
import { toAppDateFormat } from "shared/helpers/dateTimeHelpers";
import { selectAuthentication } from "shared/infrastructure/store/authentication/authenticationSlice";
import { nameof } from "shared/nameof";

import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";

import DialogContentStyled from "./styledComponents/DilogContentFormStyled";

interface IProps {
  userEdit: UserEditModel;
  handleTextFieldOnChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleOnChangeSelect: (e: SelectChangeEvent<number>) => void;
  handleFormOnSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const DialogContentForm = forwardRef(
  (props: IProps, ref: Ref<HTMLFormElement>) => {
    // Store
    const authentication = useSelector(selectAuthentication);

    // Constants
    const theme = useTheme();
    const smDwn = useMediaQuery(theme.breakpoints.down("sm"));
    const rowDirection = smDwn ? "column" : "row";

    return (
      <DialogContentStyled>
        <form ref={ref} onSubmit={props.handleFormOnSubmit}>
          <Stack spacing={2} direction='column'>
            <>
              <Stack spacing={2} direction={rowDirection}>
                <TextField
                  label='Uživatelské jméno'
                  required
                  fullWidth
                  variant='outlined'
                  type='email'
                  autoComplete='off'
                  name={nameof<UserModel>("UserName")}
                  value={props.userEdit.User.UserName}
                  onChange={props.handleTextFieldOnChange}
                  inputProps={{
                    maxLength: 50,
                  }}
                />
                <TextField
                  label='Datum vytvoření'
                  fullWidth
                  variant='outlined'
                  type='string'
                  autoComplete='off'
                  disabled
                  name={nameof<UserModel>("DateCreated")}
                  value={toAppDateFormat(props.userEdit.User.DateCreated)}
                  onChange={props.handleTextFieldOnChange}
                  inputProps={{
                    maxLength: 50,
                  }}
                />
              </Stack>
            </>
            <>
              <Stack spacing={2} direction={rowDirection}>
                <TextField
                  label='Poslední přihlášení'
                  fullWidth
                  variant='outlined'
                  type='string'
                  autoComplete='off'
                  disabled
                  name={nameof<UserModel>("LastLogin")}
                  value={toAppDateFormat(props.userEdit.User.LastLogin)}
                  onChange={props.handleTextFieldOnChange}
                  inputProps={{
                    maxLength: 50,
                  }}
                />
                <TextField
                  label='Poslední pokus o přihlášení'
                  fullWidth
                  variant='outlined'
                  type='string'
                  autoComplete='off'
                  disabled
                  name={nameof<UserModel>("LastLoginAttempt")}
                  value={toAppDateFormat(props.userEdit.User.LastLoginAttempt)}
                  onChange={props.handleTextFieldOnChange}
                  inputProps={{
                    maxLength: 50,
                  }}
                />
              </Stack>
            </>
            <>
              <FormControl required>
                <InputLabel id='user-role-label'>Role</InputLabel>
                <Select
                  labelId='user-role-label'
                  id='user-role'
                  name={nameof<UserModel>("UserRoleValue")}
                  value={props.userEdit.User.UserRoleValue}
                  label='Role'
                  disabled={authentication.UserId === props.userEdit.User.Id}
                  onChange={props.handleOnChangeSelect}
                >
                  {props.userEdit.DropDownsData.RoleListData.map(
                    (item, index) => (
                      <MenuItem
                        value={item.Value}
                        key={"user-role-key-" + index}
                      >
                        {item.Name}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </>
          </Stack>
          <Button
            type='submit'
            className='registration-submit-button'
            sx={{ display: "none" }}
          >
            submit
          </Button>
        </form>
      </DialogContentStyled>
    );
  }
);

export default DialogContentForm;
