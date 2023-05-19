import { Dayjs } from 'dayjs';
import { MuiTelInputInfo } from 'mui-tel-input/dist/index.types';
import { ChangeEvent, FormEvent, forwardRef, Ref } from 'react';
import { useSelector } from 'react-redux';
import { selectCommon } from 'shared/infrastructure/store/common/commonSlice';
import { nameof } from 'shared/nameof';

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import DialogContentFormModel from '../models/DialogContentFormModel';
import DialogContentStyled from './styledComponents/DilogContentFormStyled';

interface IProps {
  formData: DialogContentFormModel;
  handleTextFieldOnChange: (
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
  handleFormOnSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const DialogContentForm = forwardRef(
  (props: IProps, ref: Ref<HTMLFormElement>) => {
    // Store
    const common = useSelector(selectCommon);

    // Constants
    const theme = useTheme();
    const smDwn = useMediaQuery(theme.breakpoints.down("sm"));
    const rowDirection = smDwn ? "column" : "row";
    const childArrivesMyselveId = common.TablesOfKeys.ChildArrives.find(
      (f) => f.Key === "MYSELVE"
    )?.Id;

    return (
      <DialogContentStyled>
        <form ref={ref} onSubmit={props.handleFormOnSubmit}>
          <Stack spacing={2} direction='column'>
            <>
              <TextField
                label='E-mail'
                required
                fullWidth
                variant='outlined'
                type='email'
                autoComplete='off'
                name={nameof<DialogContentFormModel>("user_email")}
                value={props.formData.user_email}
                onChange={props.handleTextFieldOnChange}
                inputProps={{
                  maxLength: 50,
                }}
              />
            </>
            <>
              <Typography variant='h6' className='label'>
                Informace o dítěti
              </Typography>
              <Stack spacing={2} direction={rowDirection}>
                <TextField
                  label='Jméno'
                  required
                  fullWidth
                  variant='outlined'
                  type='text'
                  autoComplete='off'
                  name={nameof<DialogContentFormModel>("child_name")}
                  value={props.formData.child_name}
                  onChange={props.handleTextFieldOnChange}
                  inputProps={{
                    maxLength: 50,
                  }}
                />
                <TextField
                  label='Příjmení'
                  required
                  fullWidth
                  variant='outlined'
                  type='text'
                  autoComplete='off'
                  name={nameof<DialogContentFormModel>("child_last_name")}
                  value={props.formData.child_last_name}
                  onChange={props.handleTextFieldOnChange}
                  inputProps={{
                    maxLength: 50,
                  }}
                />
              </Stack>
            </>
            <>
              <TextField
                label='Datum narození'
                placeholder='dd.mm.rrrr'
                required
                fullWidth
                variant='outlined'
                type='text'
                autoComplete='off'
                name={nameof<DialogContentFormModel>("child_birthday")}
                value={props.formData.child_birthday}
                onChange={props.handleTextFieldOnChange}
                inputProps={{
                  maxLength: 10,
                }}
              />
            </>
            <>
              <Typography variant='h6' className='label'>
                Informace o prvním zákonném zástupci
              </Typography>
              <Stack spacing={2} direction={rowDirection}>
                <TextField
                  label='Jméno'
                  required
                  fullWidth
                  variant='outlined'
                  type='text'
                  autoComplete='off'
                  name={nameof<DialogContentFormModel>(
                    "first_representative_name"
                  )}
                  value={props.formData.first_representative_name}
                  onChange={props.handleTextFieldOnChange}
                  inputProps={{
                    maxLength: 50,
                  }}
                />
                <TextField
                  label='Příjmení'
                  required
                  fullWidth
                  variant='outlined'
                  type='text'
                  autoComplete='off'
                  name={nameof<DialogContentFormModel>(
                    "first_representative_last_name"
                  )}
                  value={props.formData.first_representative_last_name}
                  onChange={props.handleTextFieldOnChange}
                  inputProps={{
                    maxLength: 50,
                  }}
                />
              </Stack>
              <TextField
                label='Telefon'
                required
                fullWidth
                variant='outlined'
                type='tel'
                autoComplete='off'
                placeholder='xxx xxx xxx'
                name={nameof<DialogContentFormModel>(
                  "first_representative_phone_number"
                )}
                value={props.formData.first_representative_phone_number}
                onChange={props.handleTextFieldOnChange}
                inputProps={{
                  maxLength: 25,
                }}
              />
            </>
            <>
              <Typography variant='h6' className='label'>
                Informace o druhém zákonném zástupci
              </Typography>
              <Stack spacing={2} direction={rowDirection}>
                <TextField
                  label='Jméno'
                  fullWidth
                  variant='outlined'
                  type='text'
                  autoComplete='off'
                  name={nameof<DialogContentFormModel>(
                    "second_representative_name"
                  )}
                  value={props.formData.second_representative_name}
                  onChange={props.handleTextFieldOnChange}
                  inputProps={{
                    maxLength: 50,
                  }}
                />
                <TextField
                  label='Příjmení'
                  fullWidth
                  variant='outlined'
                  type='text'
                  autoComplete='off'
                  name={nameof<DialogContentFormModel>(
                    "second_representative_last_name"
                  )}
                  value={props.formData.second_representative_last_name}
                  onChange={props.handleTextFieldOnChange}
                  inputProps={{
                    maxLength: 50,
                  }}
                />
              </Stack>
              <TextField
                label='Telefon'
                fullWidth
                variant='outlined'
                type='tel'
                autoComplete='off'
                // placeholder='xxx xxx xxx'
                name={nameof<DialogContentFormModel>(
                  "second_representative_phone_number"
                )}
                value={props.formData.second_representative_phone_number}
                onChange={props.handleTextFieldOnChange}
                inputProps={{
                  maxLength: 25,
                }}
              />
            </>
            <>
              <Typography variant='h6' className='label'>
                Adresní informace
              </Typography>
              <Stack spacing={2} direction={rowDirection}>
                <TextField
                  label='Jmeno'
                  fullWidth
                  required
                  variant='outlined'
                  type='text'
                  autoComplete='off'
                  name={nameof<DialogContentFormModel>("address_name")}
                  value={props.formData.address_name}
                  onChange={props.handleTextFieldOnChange}
                  inputProps={{
                    maxLength: 50,
                  }}
                />
                <TextField
                  label='Příjmení'
                  fullWidth
                  required
                  variant='outlined'
                  type='text'
                  autoComplete='off'
                  name={nameof<DialogContentFormModel>("address_last_name")}
                  value={props.formData.address_last_name}
                  onChange={props.handleTextFieldOnChange}
                  inputProps={{
                    maxLength: 50,
                  }}
                />
              </Stack>
              <TextField
                label='Ulice a č. p.'
                fullWidth
                required
                variant='outlined'
                type='text'
                autoComplete='off'
                name={nameof<DialogContentFormModel>("address_street_cp")}
                value={props.formData.address_street_cp}
                onChange={props.handleTextFieldOnChange}
                inputProps={{
                  maxLength: 50,
                }}
              />
              <Stack spacing={2} direction={rowDirection}>
                <TextField
                  label='Město'
                  fullWidth
                  required
                  variant='outlined'
                  type='text'
                  autoComplete='off'
                  name={nameof<DialogContentFormModel>("address_city")}
                  value={props.formData.address_city}
                  onChange={props.handleTextFieldOnChange}
                  inputProps={{
                    maxLength: 50,
                  }}
                />
                <TextField
                  label='PSČ'
                  fullWidth
                  required
                  variant='outlined'
                  type='text'
                  autoComplete='off'
                  name={nameof<DialogContentFormModel>("address_psc")}
                  value={props.formData.address_psc}
                  onChange={props.handleTextFieldOnChange}
                  inputProps={{
                    maxLength: 10,
                  }}
                />
              </Stack>
            </>
            <>
              <Typography variant='h6' className='label'>
                Ostatní
              </Typography>
              <TextField
                label='Zdravotní omezení dítěte'
                placeholder='(Užívané léky, alergie, omezení po úraze, diety) Prosíme uveďte opravdu všechna omezení. Pokud nemá Vaše dítě žádné zdravotní omezení, nepište nic.'
                fullWidth
                variant='outlined'
                type='text'
                multiline
                rows={4}
                autoComplete='off'
                name={nameof<DialogContentFormModel>("other_hendicap")}
                value={props.formData.other_hendicap}
                onChange={props.handleTextFieldOnChange}
                inputProps={{
                  maxLength: 500,
                }}
              />
              <FormControl required>
                <FormLabel>
                  Souhlasíte s focením Vašeho dítěte při akcích a poté
                  zveřejnění na sociálních sítích? (instagram, facebook)
                </FormLabel>
                <RadioGroup
                  row
                  name={nameof<DialogContentFormModel>("other_photos")}
                  value={String(props.formData.other_photos)}
                  onChange={props.handleOnChangeRadio}
                >
                  <FormControlLabel
                    value={String(true)}
                    control={<Radio required />}
                    label='Ano'
                  />
                  <FormControlLabel
                    value={String(false)}
                    control={<Radio required />}
                    label='Ne'
                  />
                </RadioGroup>
              </FormControl>

              <FormControl required>
                <FormLabel>Jak bude dítě z akce odcházet?</FormLabel>
                <RadioGroup
                  row
                  aria-required
                  name={nameof<DialogContentFormModel>(
                    "other_how_children_arrives"
                  )}
                  value={props.formData.other_how_children_arrives}
                  onChange={props.handleOnChangeRadio}
                >
                  {common.TablesOfKeys.ChildArrives.map((item, index) => (
                    <FormControlLabel
                      key={"achildArrives_" + index}
                      value={item.Id}
                      control={<Radio required disabled={!item.Enabled} />}
                      label={item.Name}
                    />
                  ))}
                </RadioGroup>
              </FormControl>

              {props.formData.other_how_children_arrives ===
                childArrivesMyselveId && (
                <TextField
                  label='Osoby, které si můžou díte vyzvednout'
                  placeholder='Pokud jste zvolili vyzvednutí dítěte, prosím napište osoby, které si můžou dítě vyzvednout a k nim i vztah k dítěti. '
                  fullWidth
                  required
                  variant='outlined'
                  type='text'
                  multiline
                  rows={4}
                  autoComplete='off'
                  name={nameof<DialogContentFormModel>("other_pickup_person")}
                  value={props.formData.other_pickup_person}
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
                  name={nameof<DialogContentFormModel>("other_pay_method")}
                  value={props.formData.other_pay_method}
                  onChange={props.handleOnChangeRadio}
                >
                  {common.TablesOfKeys.PaymentMethodts.map((item, index) => (
                    <FormControlLabel
                      key={"paymentMethod_" + index}
                      value={item.Id}
                      control={<Radio required disabled={!item.Enabled} />}
                      label={item.Name}
                    />
                  ))}
                </RadioGroup>
              </FormControl>

              <TextField
                label='Chcete nám něco sdělit?'
                placeholder='Tato kolonka slouží i k infu, že je dítě mladší než 5 let. Uveďte prosím jméno staršího sourozence.'
                fullWidth
                variant='outlined'
                type='text'
                multiline
                rows={4}
                autoComplete='off'
                name={nameof<DialogContentFormModel>("other_other_info")}
                value={props.formData.other_other_info}
                onChange={props.handleTextFieldOnChange}
                inputProps={{
                  maxLength: 500,
                }}
              />
            </>
          </Stack>
          <Button
            type='submit'
            className='registration-submit-button'
            sx={{ display: "none" }}
          >
            submit
          </Button>
          {/* Hiddens */}
          <input
            type='hidden'
            name={nameof<DialogContentFormModel>("action_name")}
            value={props.formData.action_name}
          />
          <input
            type='hidden'
            name={nameof<DialogContentFormModel>("action_id")}
            value={props.formData.action_id}
          />
          <input
            type='hidden'
            name={nameof<DialogContentFormModel>("action_price")}
            value={props.formData.action_price}
          />
          <input
            type='hidden'
            name={nameof<DialogContentFormModel>("action_date")}
            value={props.formData.action_date}
          />
          <input
            type='hidden'
            name={nameof<DialogContentFormModel>("action_place")}
            value={props.formData.action_place}
          />
        </form>
      </DialogContentStyled>
    );
  }
);

export default DialogContentForm;
