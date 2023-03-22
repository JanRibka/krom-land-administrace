import { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import AppCheckbox from 'shared/components/checkbox/AppCheckbox';
import FileUpload from 'shared/components/fileUpload/FileUpload';
import AppSelect from 'shared/components/select/AppSelect';
import IAppSelectMenuItem from 'shared/components/select/IAppSelectMenuItem';
import AppTextEditor from 'shared/components/textEditor/AppTextEditor';
import AppTextField from 'shared/components/textField/AppTextField';
import ErrorBoundary from 'shared/infrastructure/ErrorBoundary';
import { useWebPartsSlice } from 'shared/infrastructure/store/webParts/useWebPartsSlice';
import { selectActions } from 'shared/infrastructure/store/webParts/webPartsSlice';
import ImageModel from 'shared/models/ImageModel';
import { nameof } from 'shared/nameof';

import { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';

import ActionDetailModel from '../../models/ActionDetailModel';

interface IProps {
  index: number;
}

const Action = (props: IProps) => {
  // Store
  const actions = useSelector(selectActions);
  const actionDetails = actions.ActionDetails;

  // Constants
  const { handleActionUpdate } = useWebPartsSlice();
  const orderData: IAppSelectMenuItem[] = [
    { value: 1, label: "1", name: "", kod: "", isDisabled: false },
    { value: 2, label: "2", name: "", kod: "", isDisabled: false },
    { value: 3, label: "3", name: "", kod: "", isDisabled: false },
  ];

  // Other
  const handleTextFieldOnBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    const name: string = e.target.name;
    const value: string = e.target.value;

    handleActionUpdate({ [name]: value }, props.index);
  };

  const handleTextEditorOnChange = (value: string, name: string) => {
    handleActionUpdate({ [name]: value }, props.index);
  };

  const handleOnChangeAppSelect = (e: SelectChangeEvent<string>) => {
    const name = e.target.name;
    const value = parseInt(e.target.value);

    handleActionUpdate({ [name]: value }, props.index);
  };

  const handleOnChangeCheckboxIsPriceRemark = (
    e: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const name = e.target.name;

    let data: Partial<ActionDetailModel> = {
      [name]: checked,
    };

    if (!checked) {
      data = {
        ...data,
        PriceRemark: "",
      };
    }

    handleActionUpdate(data, props.index);
  };

  return (
    <ErrorBoundary>
      <Stack spacing={2} direction='column'>
        <AppTextField
          name={nameof<ActionDetailModel>("MonthName")}
          label='Měsíc'
          value={actionDetails[props.index]?.MonthName ?? ""}
          variant='outlined'
          fullWidth
          required
          autoComplete='off'
          onBlur={handleTextFieldOnBlur}
        />
        <AppTextField
          name={nameof<ActionDetailModel>("ActionName")}
          label='Název akce'
          value={actionDetails[props.index]?.ActionName ?? ""}
          variant='outlined'
          fullWidth
          required
          autoComplete='off'
          onBlur={handleTextFieldOnBlur}
        />
        <AppTextEditor
          name={nameof<ActionDetailModel>("ActionDescritption")}
          value={actionDetails[props.index]?.ActionDescritption ?? ""}
          placeholder='Popis akce'
          required
          onChange={handleTextEditorOnChange}
        />
        <AppTextField
          name={nameof<ActionDetailModel>("VideoLink")}
          label='Odkaz na video (Pouze TikTok)'
          value={actionDetails[props.index]?.VideoLink ?? ""}
          variant='outlined'
          fullWidth
          autoComplete='off'
          onBlur={handleTextFieldOnBlur}
        />
        <AppTextField
          name={nameof<ActionDetailModel>("Price")}
          label='Cena'
          value={actionDetails[props.index]?.Price ?? ""}
          variant='outlined'
          fullWidth
          autoComplete='off'
          onBlur={handleTextFieldOnBlur}
        />
        <AppCheckbox
          name={nameof<ActionDetailModel>("IsPriceRemark")}
          label='Zda poznámka k ceně'
          checked={actionDetails[props.index]?.IsPriceRemark ?? false}
          onChange={handleOnChangeCheckboxIsPriceRemark}
        />
        {actionDetails[props.index]?.IsPriceRemark && (
          <AppTextField
            name={nameof<ActionDetailModel>("PriceRemark")}
            label='Poznámka k ceně'
            value={actionDetails[props.index]?.PriceRemark ?? ""}
            variant='outlined'
            fullWidth
            autoComplete='off'
            onBlur={handleTextFieldOnBlur}
          />
        )}
        <AppTextField
          name={nameof<ActionDetailModel>("Place")}
          label='Místo'
          value={actionDetails[props.index]?.Place ?? ""}
          variant='outlined'
          fullWidth
          autoComplete='off'
          onBlur={handleTextFieldOnBlur}
        />
        <AppTextField
          name={nameof<ActionDetailModel>("Date")}
          label='Datum'
          value={actionDetails[props.index]?.Date ?? ""}
          variant='outlined'
          fullWidth
          autoComplete='off'
          onBlur={handleTextFieldOnBlur}
        />
        <AppSelect
          data={orderData}
          name={nameof<ActionDetailModel>("ActionOrder")}
          label='Pořadí'
          required
          selectedItem={
            actionDetails[props.index]?.ActionOrder?.toString() ?? ""
          }
          onChangeSelect={handleOnChangeAppSelect}
        />
        <FileUpload
          image={new ImageModel()}
          name=''
          label=''
          supportedExtensions={["png", "jpg", "jpeg"]}
          newImageAlt=''
          maxFileSize={1}
          onAfterFileUpload={() => {}}
          onFileSave={() => {}}
        />
      </Stack>
    </ErrorBoundary>
  );
};

export default Action;
