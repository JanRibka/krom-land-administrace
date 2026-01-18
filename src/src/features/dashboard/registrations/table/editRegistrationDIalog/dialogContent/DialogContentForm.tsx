import { Dayjs } from "dayjs";
import RegistrationEditModel from "features/dashboard/models/RegistrationEditModel";
import RegistrationModel from "features/dashboard/models/RegistrationModel";
import { MuiTelInputInfo } from "mui-tel-input/dist/index.types";
import { ChangeEvent, FormEvent, forwardRef, Ref } from "react";
import { nameof } from "shared/nameof";

import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

import DialogContentStyled from "./styledComponents/DilogContentFormStyled";

interface IProps {
  registrationEdit: RegistrationEditModel;
  handleTextFieldOnChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleNumericFieldOnChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleOnChangeDatePipcker: (
    value: Dayjs | null,
    keyboardInputValue: string | undefined,
    name: string
  ) => void;
  handleOnChangeTelInput: (
    value: string,
    info: MuiTelInputInfo,
    name: string
  ) => void;
  handleOnChangeRadio: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSelectOnChange: (e: SelectChangeEvent<string>) => void;
  handleFormOnSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const DialogContentForm = forwardRef(
  (props: IProps, ref: Ref<HTMLFormElement>) => {
    // Constants
    const theme = useTheme();
    const smDwn = useMediaQuery(theme.breakpoints.down("sm"));
    const rowDirection = smDwn ? "column" : "row";
    const childArrivesMyselveId =
      props.registrationEdit.SelectsData.ChildArrivesData.find(
        (f) => f.Key === "MYSELVE"
      )?.Id;

    return (
      <DialogContentStyled>
        <form ref={ref} onSubmit={props.handleFormOnSubmit}>
          <Stack spacing={2} direction="column">
            <>
              <TextField
                label="Název akce"
                required
                fullWidth
                variant="outlined"
                type="string"
                autoComplete="off"
                name={nameof<RegistrationModel>("action_name")}
                value={props.registrationEdit.Registration.action_name}
                onChange={props.handleTextFieldOnChange}
                inputProps={{
                  maxLength: 100,
                }}
              />
            </>
            <>
              <TextField
                label="E-mail"
                required
                fullWidth
                variant="outlined"
                type="email"
                autoComplete="off"
                name={nameof<RegistrationModel>("user_email")}
                value={props.registrationEdit.Registration.user_email}
                onChange={props.handleTextFieldOnChange}
                inputProps={{
                  maxLength: 50,
                }}
              />
            </>
            <>
              <Typography variant="h6" className="label">
                Informace o dítěti
              </Typography>
              <Stack spacing={2} direction={rowDirection}>
                <TextField
                  label="Jméno"
                  required
                  fullWidth
                  variant="outlined"
                  type="text"
                  autoComplete="off"
                  name={nameof<RegistrationModel>("child_name")}
                  value={props.registrationEdit.Registration.child_name}
                  onChange={props.handleTextFieldOnChange}
                  inputProps={{
                    maxLength: 50,
                  }}
                />
                <TextField
                  label="Příjmení"
                  required
                  fullWidth
                  variant="outlined"
                  type="text"
                  autoComplete="off"
                  name={nameof<RegistrationModel>("child_last_name")}
                  value={props.registrationEdit.Registration.child_last_name}
                  onChange={props.handleTextFieldOnChange}
                  inputProps={{
                    maxLength: 50,
                  }}
                />
              </Stack>
            </>
            <>
              <TextField
                label="Datum narození"
                placeholder="dd.mm.rrrr"
                required
                fullWidth
                variant="outlined"
                type="text"
                autoComplete="off"
                name={nameof<RegistrationModel>("child_birthday")}
                value={props.registrationEdit.Registration.child_birthday}
                onChange={props.handleTextFieldOnChange}
                inputProps={{
                  maxLength: 10,
                }}
              />
            </>
            <>
              <Typography variant="h6" className="label">
                Informace o prvním zákonném zástupci
              </Typography>
              <Stack spacing={2} direction={rowDirection}>
                <TextField
                  label="Jméno"
                  required
                  fullWidth
                  variant="outlined"
                  type="text"
                  autoComplete="off"
                  name={nameof<RegistrationModel>("first_representative_name")}
                  value={
                    props.registrationEdit.Registration
                      .first_representative_name
                  }
                  onChange={props.handleTextFieldOnChange}
                  inputProps={{
                    maxLength: 50,
                  }}
                />
                <TextField
                  label="Příjmení"
                  required
                  fullWidth
                  variant="outlined"
                  type="text"
                  autoComplete="off"
                  name={nameof<RegistrationModel>(
                    "first_representative_last_name"
                  )}
                  value={
                    props.registrationEdit.Registration
                      .first_representative_last_name
                  }
                  onChange={props.handleTextFieldOnChange}
                  inputProps={{
                    maxLength: 50,
                  }}
                />
              </Stack>
              <TextField
                label="Telefon"
                required
                fullWidth
                variant="outlined"
                type="tel"
                autoComplete="off"
                placeholder="xxx xxx xxx"
                name={nameof<RegistrationModel>(
                  "first_representative_phone_number"
                )}
                value={
                  props.registrationEdit.Registration
                    .first_representative_phone_number
                }
                onChange={props.handleTextFieldOnChange}
                inputProps={{
                  maxLength: 25,
                }}
              />
            </>
            <>
              <Typography variant="h6" className="label">
                Informace o druhém zákonném zástupci
              </Typography>
              <Stack spacing={2} direction={rowDirection}>
                <TextField
                  label="Jméno"
                  fullWidth
                  variant="outlined"
                  type="text"
                  autoComplete="off"
                  name={nameof<RegistrationModel>("second_representative_name")}
                  value={
                    props.registrationEdit.Registration
                      .second_representative_name
                  }
                  onChange={props.handleTextFieldOnChange}
                  inputProps={{
                    maxLength: 50,
                  }}
                />
                <TextField
                  label="Příjmení"
                  fullWidth
                  variant="outlined"
                  type="text"
                  autoComplete="off"
                  name={nameof<RegistrationModel>(
                    "second_representative_last_name"
                  )}
                  value={
                    props.registrationEdit.Registration
                      .second_representative_last_name
                  }
                  onChange={props.handleTextFieldOnChange}
                  inputProps={{
                    maxLength: 50,
                  }}
                />
              </Stack>
              <TextField
                label="Telefon"
                fullWidth
                variant="outlined"
                type="tel"
                autoComplete="off"
                // placeholder='xxx xxx xxx'
                name={nameof<RegistrationModel>(
                  "second_representative_phone_number"
                )}
                value={
                  props.registrationEdit.Registration
                    .second_representative_phone_number
                }
                onChange={props.handleTextFieldOnChange}
                inputProps={{
                  maxLength: 25,
                }}
              />
            </>
            <>
              <Typography variant="h6" className="label">
                Adresní informace
              </Typography>
              <Stack spacing={2} direction={rowDirection}>
                <TextField
                  label="Jmeno"
                  fullWidth
                  required
                  variant="outlined"
                  type="text"
                  autoComplete="off"
                  name={nameof<RegistrationModel>("address_name")}
                  value={props.registrationEdit.Registration.address_name}
                  onChange={props.handleTextFieldOnChange}
                  inputProps={{
                    maxLength: 50,
                  }}
                />
                <TextField
                  label="Příjmení"
                  fullWidth
                  required
                  variant="outlined"
                  type="text"
                  autoComplete="off"
                  name={nameof<RegistrationModel>("address_last_name")}
                  value={props.registrationEdit.Registration.address_last_name}
                  onChange={props.handleTextFieldOnChange}
                  inputProps={{
                    maxLength: 50,
                  }}
                />
              </Stack>
              <TextField
                label="Ulice a č. p."
                fullWidth
                required
                variant="outlined"
                type="text"
                autoComplete="off"
                name={nameof<RegistrationModel>("address_street_cp")}
                value={props.registrationEdit.Registration.address_street_cp}
                onChange={props.handleTextFieldOnChange}
                inputProps={{
                  maxLength: 50,
                }}
              />
              <Stack spacing={2} direction={rowDirection}>
                <TextField
                  label="Město"
                  fullWidth
                  required
                  variant="outlined"
                  type="text"
                  autoComplete="off"
                  name={nameof<RegistrationModel>("address_city")}
                  value={props.registrationEdit.Registration.address_city}
                  onChange={props.handleTextFieldOnChange}
                  inputProps={{
                    maxLength: 50,
                  }}
                />
                <TextField
                  label="PSČ"
                  fullWidth
                  required
                  variant="outlined"
                  type="text"
                  autoComplete="off"
                  name={nameof<RegistrationModel>("address_psc")}
                  value={props.registrationEdit.Registration.address_psc}
                  onChange={props.handleTextFieldOnChange}
                  inputProps={{
                    maxLength: 10,
                  }}
                />
              </Stack>
            </>
            <>
              <Typography variant="h6" className="label">
                Ostatní
              </Typography>
              <TextField
                label="Zdravotní omezení dítěte"
                placeholder="(Užívané léky, alergie, omezení po úraze, diety) Prosíme uveďte opravdu všechna omezení. Pokud nemá Vaše dítě žádné zdravotní omezení, nepište nic."
                fullWidth
                variant="outlined"
                type="text"
                multiline
                rows={4}
                autoComplete="off"
                name={nameof<RegistrationModel>("other_hendicap")}
                value={props.registrationEdit.Registration.other_hendicap}
                onChange={props.handleTextFieldOnChange}
                inputProps={{
                  maxLength: 500,
                }}
              />

              <FormControl>
                <InputLabel id="t-shirt-size-select-label">
                  Velikost trička
                </InputLabel>
                <Select
                  labelId="t-shirt-size-select-label"
                  name={nameof<RegistrationModel>("other_t_shirt_size")}
                  value={props.registrationEdit.Registration.other_t_shirt_size}
                  label="Velikost trička"
                  onChange={props.handleSelectOnChange}
                >
                  {props.registrationEdit.SelectsData.TShirtSizes?.map(
                    (item, index) => (
                      <MenuItem key={"tShirtSize_" + index} value={item.Key}>
                        {item.Name}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>

              <FormControl required>
                <FormLabel>
                  Souhlasíte s focením Vašeho dítěte při akcích a poté
                  zveřejnění na sociálních sítích? (instagram, facebook)
                </FormLabel>
                <RadioGroup
                  row
                  name={nameof<RegistrationModel>("other_photos")}
                  value={String(
                    props.registrationEdit.Registration.other_photos
                  )}
                  onChange={props.handleOnChangeRadio}
                >
                  <FormControlLabel
                    value={String(true)}
                    control={<Radio required />}
                    label="Ano"
                  />
                  <FormControlLabel
                    value={String(false)}
                    control={<Radio required />}
                    label="Ne"
                  />
                </RadioGroup>
              </FormControl>

              <FormControl required>
                <FormLabel>Jak bude dítě z akce odcházet?</FormLabel>
                <RadioGroup
                  row
                  aria-required
                  name={nameof<RegistrationModel>("other_how_children_arrives")}
                  value={
                    props.registrationEdit.Registration
                      .other_how_children_arrives
                  }
                  onChange={props.handleOnChangeRadio}
                >
                  {props.registrationEdit.SelectsData.ChildArrivesData.map(
                    (item, index) => (
                      <FormControlLabel
                        key={"achildArrives_" + index}
                        value={item.Id}
                        control={<Radio required disabled={!item.Enabled} />}
                        label={item.Name}
                      />
                    )
                  )}
                </RadioGroup>
              </FormControl>

              {props.registrationEdit.Registration
                .other_how_children_arrives === childArrivesMyselveId && (
                <TextField
                  label="Osoby, které si můžou díte vyzvednout"
                  placeholder="Pokud jste zvolili vyzvednutí dítěte, prosím napište osoby, které si můžou dítě vyzvednout a k nim i vztah k dítěti. "
                  fullWidth
                  required
                  variant="outlined"
                  type="text"
                  multiline
                  rows={4}
                  autoComplete="off"
                  name={nameof<RegistrationModel>("other_pickup_person")}
                  value={
                    props.registrationEdit.Registration.other_pickup_person
                  }
                  onChange={props.handleTextFieldOnChange}
                  inputProps={{
                    maxLength: 500,
                  }}
                />
              )}

              <FormControl required>
                <FormLabel>Jak budete platit?</FormLabel>
                <RadioGroup
                  row
                  aria-required
                  name={nameof<RegistrationModel>("other_pay_method")}
                  value={props.registrationEdit.Registration.other_pay_method}
                  onChange={props.handleOnChangeRadio}
                >
                  {props.registrationEdit.SelectsData.PaymentMethodsData.map(
                    (item, index) => (
                      <FormControlLabel
                        key={"paymentMethod_" + index}
                        value={item.Id}
                        control={<Radio required disabled={!item.Enabled} />}
                        label={item.Name}
                      />
                    )
                  )}
                </RadioGroup>
              </FormControl>

              <TextField
                label="Chcete nám něco sdělit?"
                placeholder="Tato kolonka slouží i k infu, že je dítě mladší než 5 let. Uveďte prosím jméno staršího sourozence."
                fullWidth
                variant="outlined"
                type="text"
                multiline
                rows={4}
                autoComplete="off"
                name={nameof<RegistrationModel>("other_other_info")}
                value={props.registrationEdit.Registration.other_other_info}
                onChange={props.handleTextFieldOnChange}
                inputProps={{
                  maxLength: 500,
                }}
              />
            </>
            <>
              <Stack spacing={2} direction={rowDirection}>
                <TextField
                  label="Datum registrace"
                  fullWidth
                  required
                  variant="outlined"
                  type="text"
                  autoComplete="off"
                  disabled
                  name={nameof<RegistrationModel>("registration_date")}
                  value={
                    props.registrationEdit.Registration.registration_date
                      ? new Date(
                          props.registrationEdit.Registration.registration_date
                        ).toLocaleDateString()
                      : ""
                  }
                  onChange={props.handleTextFieldOnChange}
                  inputProps={{
                    maxLength: 50,
                  }}
                />
                <TextField
                  label="Cena"
                  fullWidth
                  required
                  variant="outlined"
                  type="number"
                  autoComplete="off"
                  name={nameof<RegistrationModel>("action_price")}
                  value={props.registrationEdit.Registration.action_price}
                  onChange={props.handleNumericFieldOnChange}
                  inputProps={{
                    maxLength: 10,
                  }}
                />
              </Stack>
            </>
            <>
              <TextField
                label="Číslo objednávky"
                fullWidth
                required
                variant="outlined"
                type="text"
                autoComplete="off"
                disabled
                name={nameof<RegistrationModel>("variable_symbol_name")}
                value={props.registrationEdit.Registration.variable_symbol_name}
                onChange={props.handleTextFieldOnChange}
                inputProps={{
                  maxLength: 50,
                }}
              />
            </>
            <>
              <FormControl required>
                <FormLabel>Stav registrace</FormLabel>
                <RadioGroup
                  row
                  aria-required
                  name={nameof<RegistrationModel>("state")}
                  value={props.registrationEdit.Registration.state}
                  onChange={props.handleOnChangeRadio}
                >
                  {props.registrationEdit.SelectsData.RegistrationStateData.map(
                    (item, index) => (
                      <FormControlLabel
                        key={"paymentMethod_" + index}
                        value={item.Id}
                        control={<Radio required disabled={!item.Enabled} />}
                        label={item.Name}
                      />
                    )
                  )}
                </RadioGroup>
              </FormControl>
            </>
          </Stack>
          <Button
            type="submit"
            className="registration-submit-button"
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
