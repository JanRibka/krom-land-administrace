import ImageService from "features/ImageService";
import { ChangeEvent } from "react";
import ImageModel from "shared/models/ImageModel";
import { v4 as uuidv4 } from "uuid";

import DeleteIcon from "@mui/icons-material/Delete";
import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";
import { LoadingButton } from "@mui/lab";
import Box from "@mui/material/Box";

import AppNotification from "../notification/AppNotification";
import ValidateFileSizeReturnModel from "./models/ValidateFileSizeReturnModel ";
import ValidateFileTypeReturnModel from "./models/ValidateFileTypeReturnModel ";
import ImageUploadStyled from "./styledComponents/ImageUploadStyled";

interface IProps {
  image: ImageModel;
  name: string;
  label: string;
  disabled?: boolean;
  newImageAlt: string;
  supportedExtensions: Array<string>;
  maxFileSize: number;
  onAfterFileUpload: (
    fileName: string,
    name: string,
    alt: string,
    destination: string
  ) => void;
  onAfterFileDelete?: (name: string) => void;
  onFileSave: (name: string) => void;
}

const ImageUpload = (props: IProps) => {
  // Constants
  const _imageService = new ImageService();
  const guid = uuidv4();

  // Other
  const getFileType = (extensions: string[]) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const png: string = "image/png";
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const jpg: string = "image/jpeg";
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const jpeg: string = "image/jpeg";
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const svg: string = "image/svg+xml";
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const webp: string = "image/webp";
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const pdf: string = "application/pdf";
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const xls: string = "application/vnd.ms-excel";
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const xlsx: string =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const doc: string = "application/msword";
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const docx: string =
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    let result = "";

    extensions.forEach((extension, index) => {
      // eslint-disable-next-line no-eval
      if (index === 0) result += eval(extension);
      // eslint-disable-next-line no-eval
      else return (result += ", " + eval(extension));
    });

    return result;
  };

  /**
   * Vrátí příponu souboru, nebo undefined
   * @param pFileName
   */
  const getFileTypeExtension = (pFileName: string) => {
    if (!pFileName) return undefined;

    const re: RegExp = /(?:\.([^.]+))?$/;

    return re.exec(pFileName.toLowerCase())?.[1] ?? "";
  };

  /**
   * Validace typu souboru
   * @param pFileName
   */

  const validateFileType = (fileName: string): ValidateFileTypeReturnModel => {
    let result: ValidateFileTypeReturnModel = new ValidateFileTypeReturnModel();
    const ext: string = getFileTypeExtension(fileName) ?? "";

    result.Result = props.supportedExtensions.includes(ext ?? "");
    result.Extension = ext;

    return result;
  };

  /**
   * Kontrola na velikost souboru
   * @param pFile
   */

  const checkFileSize = (pFile: File): ValidateFileSizeReturnModel => {
    let result: ValidateFileSizeReturnModel = new ValidateFileSizeReturnModel();
    const filesize: number = parseFloat((pFile.size / 1024 / 1024).toFixed(4)); // MB

    if (
      pFile.name !== "item" &&
      typeof pFile.name != "undefined" &&
      pFile.size < 1024
    ) {
      result.SizeLimRchd = true;

      result.Message = "Vybraný soubor je prázdný!";
    } else if (
      pFile.name !== "item" &&
      typeof pFile.name != "undefined" &&
      filesize > props.maxFileSize
    ) {
      result.SizeLimRchd = true;
      result.Message = `Velikost souboru překročila limit ${props.maxFileSize} MB`;
    }

    return result;
  };

  /**
   *  Akce pro nahrání souboru na server
   * @param e
   */
  const onFileUploadHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    let file: File | undefined = e.target.files?.[0];

    if (file) {
      let fileName: string = file.name;
      const extension: string = getFileTypeExtension(fileName) ?? "";
      fileName = Math.random().toString(36).substring(2, 12);
      fileName += "." + extension;

      // Kontrola na typ souboru
      const validate = validateFileType(fileName);

      if (!validate.Result) {
        e.target.value = "";
        AppNotification(
          "Chyba",
          `Přípona ${validate.Extension} není podporována`,
          "danger"
        );

        return false;
      }

      // kontrola na velikost souboru, musi byt > 50B a < props.MaxFIleSize MB
      const result: ValidateFileSizeReturnModel = checkFileSize(file);

      if (result.SizeLimRchd) {
        e.target.value = "";
        AppNotification("Chyba", result.Message, "danger");

        return false;
      }

      const formData: FormData = new FormData();

      formData.append("file", file);
      formData.append("fileName", fileName);

      await _imageService.uploadImage(formData);

      props.onAfterFileUpload(
        fileName,
        props.name,
        props.newImageAlt,
        "/upload/"
      );
    }
  };

  const onFileDeleteHandler = async () => {
    const dirPath = props.image.Path.includes("/admin")
      ? process.env.REACT_APP_ADMIN_UPLOAD_PATH ?? ""
      : process.env.REACT_APP_IMAGES_PATH ?? "";

    await _imageService.imageDelete(props.image.Name, dirPath);

    props.onAfterFileDelete?.(props.name);
  };

  const onFileSave = () => {
    props.onFileSave(props.name);
  };
  // TODO: Jde nahr8t soubor v2t39 nez 1MB
  return (
    <ImageUploadStyled>
      <Box
        component='img'
        src={props.image.Path}
        alt='Obrázek nenahrán'
        loading='lazy'
      />
      <Box className='buttons-wrapper'>
        <Box component='span'>{props.label}</Box>
        <Box className='buttons-inner-wrapper'>
          {!!props.image.Name ? (
            <Box>
              <LoadingButton
                startIcon={<DeleteIcon />}
                onClick={onFileDeleteHandler}
                color='secondary'
                variant='contained'
              >
                Smazat
              </LoadingButton>
            </Box>
          ) : (
            <>
              <label className='file-upload-label' htmlFor={guid}>
                Nahrát
              </label>
              <input
                type='file'
                accept={getFileType(props.supportedExtensions)}
                id={guid}
                className='file-upload-input'
                onChange={onFileUploadHandler}
              />
            </>
          )}
          {!!props.image.Path.includes("/admin") && (
            <LoadingButton
              startIcon={<SaveAltOutlinedIcon />}
              onClick={onFileSave}
              color='secondary'
              variant='contained'
            >
              Uložit
            </LoadingButton>
          )}
        </Box>
      </Box>
    </ImageUploadStyled>
  );
};

export default ImageUpload;
