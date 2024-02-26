import ImageService from "features/ImageService";
import { ChangeEvent } from "react";
import { useSelector } from "react-redux";
import AppCheckbox from "shared/components/checkbox/AppCheckbox";
import ImageUpload from "shared/components/imageUpload/ImageUpload";
import AppSelect from "shared/components/select/AppSelect";
import IAppSelectMenuItem from "shared/components/select/IAppSelectMenuItem";
import AppTextEditor from "shared/components/textEditor/AppTextEditor";
import AppTextField from "shared/components/textField/AppTextField";
import { ImageLocationEnum } from "shared/enums/ImageLocationEnum";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";
import { useWebPartsSlice } from "shared/infrastructure/store/webParts/useWebPartsSlice";
import { selectActions } from "shared/infrastructure/store/webParts/webPartsSlice";
import ImageModel from "shared/models/ImageModel";
import { nameof } from "shared/nameof";
import ActionImageType from "shared/types/ActionImageType";

import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";

import ActionDetailModel from "../../models/ActionDetailModel";

interface IProps {
  index: number;
  disable: boolean;
  orderData: IAppSelectMenuItem[];
}

const Action = (props: IProps) => {
  // Store
  const actions = useSelector(selectActions);
  const actionDetails = actions.ActionDetails;

  // Constants
  const _imageService = new ImageService();
  const { handleActionUpdate } = useWebPartsSlice();

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

  const handleOnChangeCheckbox = (
    e: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const name = e.target.name;

    handleActionUpdate({ [name]: checked }, props.index);
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

  const handleOnAfterFileUpload = (
    fileName: string,
    name: string,
    alt: string,
    destination: string
  ) => {
    const image = new ImageModel({
      Path: (process.env.PUBLIC_URL ?? "") + destination + fileName,
      Alt: alt,
      Name: fileName,
    });

    handleActionUpdate({ [name]: image }, props.index);
  };

  const handleOnAfterFileDelete = (name: string) => {
    handleActionUpdate(
      { [name as ActionImageType]: new ImageModel() },
      props.index
    );
  };

  const handleOnFileSave = async (name: string) => {
    let image: ImageModel = actionDetails[props.index][
      name as ActionImageType
    ] as ImageModel;

    image = {
      ...image,
      Path: (process.env.REACT_APP_WEB_PUBLIC_IMG_URL ?? "") + image.Name,
    };

    await _imageService.imageSave(
      image,
      name,
      ImageLocationEnum.ACTION_DETAILS,
      actionDetails[props.index].Id
    );

    handleActionUpdate({ [name as ActionImageType]: image }, props.index);
  };

  const handleDeleteActionOnClick = () => {
    handleActionUpdate({ Delete: true }, props.index);
  };

  return (
    <ErrorBoundary>
      <Stack spacing={2} direction="column">
        <AppTextField
          name={nameof<ActionDetailModel>("MonthName")}
          label="Měsíc"
          value={actionDetails[props.index]?.MonthName ?? ""}
          variant="outlined"
          fullWidth
          required
          disabled={props.disable}
          autoComplete="off"
          onBlur={handleTextFieldOnBlur}
        />
        <AppTextField
          name={nameof<ActionDetailModel>("ActionName")}
          label="Název akce"
          value={actionDetails[props.index]?.ActionName ?? ""}
          variant="outlined"
          fullWidth
          required
          disabled={props.disable}
          autoComplete="off"
          onBlur={handleTextFieldOnBlur}
        />
        <AppTextEditor
          name={nameof<ActionDetailModel>("ActionDescritption")}
          value={actionDetails[props.index]?.ActionDescritption ?? ""}
          placeholder="Popis akce"
          required
          disable={props.disable}
          onChange={handleTextEditorOnChange}
        />
        <AppTextField
          name={nameof<ActionDetailModel>("VideoLink")}
          label="Odkaz na video (Pouze Youtube)"
          value={actionDetails[props.index]?.VideoLink ?? ""}
          variant="outlined"
          fullWidth
          disabled={props.disable}
          autoComplete="off"
          onBlur={handleTextFieldOnBlur}
        />
        <AppTextField
          name={nameof<ActionDetailModel>("Price")}
          label="Cena"
          value={actionDetails[props.index]?.Price ?? ""}
          variant="outlined"
          fullWidth
          disabled={props.disable}
          autoComplete="off"
          onBlur={handleTextFieldOnBlur}
        />
        <AppCheckbox
          name={nameof<ActionDetailModel>("CapacityFull")}
          label="Kapacita naplněna"
          checked={actionDetails[props.index]?.CapacityFull ?? false}
          disabled={props.disable}
          onChange={handleOnChangeCheckbox}
        />
        <AppCheckbox
          name={nameof<ActionDetailModel>("IsPriceRemark")}
          label="Zda poznámka k ceně"
          checked={actionDetails[props.index]?.IsPriceRemark ?? false}
          disabled={props.disable}
          onChange={handleOnChangeCheckboxIsPriceRemark}
        />
        {actionDetails[props.index]?.IsPriceRemark && (
          <AppTextField
            name={nameof<ActionDetailModel>("PriceRemark")}
            label="Poznámka k ceně"
            value={actionDetails[props.index]?.PriceRemark ?? ""}
            variant="outlined"
            fullWidth
            disabled={props.disable}
            autoComplete="off"
            onBlur={handleTextFieldOnBlur}
          />
        )}
        <AppTextField
          name={nameof<ActionDetailModel>("Place")}
          label="Místo"
          value={actionDetails[props.index]?.Place ?? ""}
          variant="outlined"
          fullWidth
          disabled={props.disable}
          autoComplete="off"
          onBlur={handleTextFieldOnBlur}
        />
        <AppTextField
          name={nameof<ActionDetailModel>("Date")}
          label="Datum"
          value={actionDetails[props.index]?.Date ?? ""}
          variant="outlined"
          fullWidth
          disabled={props.disable}
          autoComplete="off"
          onBlur={handleTextFieldOnBlur}
        />
        <AppSelect
          data={props.orderData}
          name={nameof<ActionDetailModel>("ActionOrder")}
          label="Pořadí"
          required
          disabled={props.disable}
          selectedItem={
            actionDetails[props.index]?.ActionOrder?.toString() ?? ""
          }
          onChangeSelect={handleOnChangeAppSelect}
        />
        <ImageUpload
          image={actionDetails[props.index]?.Image ?? new ImageModel()}
          name={nameof<ActionDetailModel>("Image")}
          label="Ideální rozlišení obrázku 1000 x 1000px. Max. velikost 1MB"
          supportedExtensions={["png", "jpg", "jpeg", "webp"]}
          newImageAlt={"Obrázek akce KROM Land " + props.index}
          maxFileSize={1}
          location={ImageLocationEnum.ACTION_DETAILS}
          id={actionDetails[props.index]?.Id ?? null}
          disable={props.disable}
          onAfterFileUpload={handleOnAfterFileUpload}
          onAfterFileDelete={handleOnAfterFileDelete}
          onFileSave={handleOnFileSave}
        />

        <Button
          color="secondary"
          variant="outlined"
          disabled={props.disable}
          startIcon={<DeleteIcon />}
          onClick={handleDeleteActionOnClick}
        >
          Odebrat akci
        </Button>
      </Stack>
    </ErrorBoundary>
  );
};

export default Action;
