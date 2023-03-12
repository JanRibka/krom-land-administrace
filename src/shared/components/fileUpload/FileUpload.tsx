import { MouseEvent } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';

import FileUploadStyled from './styledComponents/FIleUploadStyled';

interface IProps {
  FileName: string;
  Name: string;
  Label: string;
  Disabled?: boolean;
  HideLabel?: boolean;
  ExtendedItem?: boolean;
  ShortenItem?: boolean;
  Valid?: boolean;
  ErrorText?: string;
  RenameFile?: boolean;
  NewFileName?: string;
  SupportedExtensions: Array<string>;
  MaxFileSize: number;
  // DocEntityEnum: DocEntityEnum;
  OnAfterFileUpload?: (fileName: string, name: string) => void;
  OnFileDelete?: (e: MouseEvent<HTMLDivElement>, name: string) => void;
}

const FileUpload = (props: IProps) => {
  return (
    <FileUploadStyled>
      {!!props.Name ? (
        <div
        // style={{
        //   display: "flex",
        //   alignItems: "center",
        //   justifyContent: "flex-end",
        // }}
        >
          <span>{props.FileName}</span>
          <div
            // style={{ cursor: "pointer", margin: "5px", pointerEvents: "all" }}
            onClick={(e) => props.OnFileDelete?.(e, props.Name)}
            data-filetype={props.Name + "FileName"}
            data-filedescription={props.Name}
          >
            <DeleteIcon />
          </div>
        </div>
      ) : (
        <>
          <label
            className='file-upload-label'
            htmlFor={props.Name + "_fileInputId"}
          >
            Nahrát
          </label>
          <input
            type='file'
            id={props.Name + "_fileInputId"}
            className='file-upload-input'
          />
        </>
      )}
    </FileUploadStyled>
  );
};

export default FileUpload;

// import React, { ChangeEvent, MouseEvent } from 'react';

// import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

// import FormControl from '@material-ui/core/FormControl';

// import FormHelperText from '@material-ui/core/FormHelperText';

// import FormLabel from '@material-ui/core/FormLabel';

// import DeleteIcon from '@material-ui/icons/Delete';

// import ErrorBoundary from '../../error-boundary';

// import ValidateFileTypeReturnModel from '../../Data/ZaznamyCZ/Models/ValidateFileTypeReturnModel';

// import ValidateFileSizeReturnModel from '../../Data/ZaznamyCZ/Models/ValidateFileSizeReturnModel';

// import { DocEntityEnum } from '../../Data/Shared/Enums/DocEntityEnum';

// import { ZaznamyCZRepository } from '../../Repositories/ZaznamyCZRepository';

// declare var crm;

// interface IProps {

//       FileName: string;

//       Name: string;

//       Label: string;

//       Disabled?: boolean;

//       HideLabel?: boolean;

//       ExtendedItem?: boolean;

//       ShortenItem?: boolean;

//       Valid?: boolean;

//       ErrorText?: string;

//       RenameFile?: boolean;

//       NewFileName?: string;

//       SupportedExtensions: Array<string>;

//       MaxFileSize: number;

//       DocEntityEnum: DocEntityEnum;

//       OnAfterFileUpload?: (fileName: string, name: string) => void;

//       OnFileDelete?: (e: MouseEvent<HTMLDivElement>, name: string) => void;

// }

// const FileImport: React.FC<IProps> = (props) => {

//       const _zaznamyCZRepo = new ZaznamyCZRepository();

//       const _classes = useStyles(props);

//       const formLabelClassName = props.HideLabel ? " hide-label" : props.ExtendedItem ? " extended-item" : props.ShortenItem ? " shorten-item" : "";

//       const formComponentWrapper = formLabelClassName;

//       /**

//       * Vrátí příponu souboru, nebo undefined

//       * @param pFileName

//       */

//       const GetFileTypeExtension = (pFileName: string) => {

//             if (!pFileName) return undefined;

//             const re: RegExp = /(?:\.([^.]+))?$/;

//             return re.exec(pFileName.toLowerCase())[1];

//       }

//       /**

//       * Validace typu souboru

//       * @param pFileName

//       */

//       const ValidateFileType = (pFileName: string): ValidateFileTypeReturnModel => {

//             let result: ValidateFileTypeReturnModel = new ValidateFileTypeReturnModel();

//             const ext: string = GetFileTypeExtension(pFileName);

//             result.Result = props.SupportedExtensions.includes(ext);

//             result.Extension = ext;

//             return result;

//       }

//       /**

//       * Kontrola na velikost souboru

//       * @param pFile

//       */

//       const CheckFileSize = (pFile: File): ValidateFileSizeReturnModel => {

//             let result: ValidateFileSizeReturnModel = new ValidateFileSizeReturnModel();

//             const filesize: number = parseInt(((pFile.size / 1024) / 1024).toFixed(4)); // MB

//             if (pFile.name != "item" && typeof pFile.name != "undefined" && pFile.size < 1024) {

//                   result.SizeLimRchd = true;

//                   result.Message = "Vybraný soubor je prázdný!";

//             }

//             else if (pFile.name != "item" && typeof pFile.name != "undefined" && filesize > props.MaxFileSize) {

//                   result.SizeLimRchd = true;

//                   result.Message = `Velikost souboru překročila limit ${props.MaxFileSize} MB`;

//             }

//             return result;

//       }

//       /**

//       * Akce pro nahrání souboru do cache

//       * @param pE

//       */

//       const OnFileUploadHandler = async (pE: ChangeEvent<HTMLInputElement>) => {

//             let file: File = pE.target.files[0];

//             let fileName: string = file.name;

//             if (props.RenameFile) {

//                   const extension: string = GetFileTypeExtension(fileName);

//                   fileName = props.NewFileName + "." + extension;

//             }

//             // Kontrola na typ souboru

//             const validate = ValidateFileType(fileName);

//             if (!validate.Result) {

//                   pE.target.value = '';

//                   crm.notify("danger", `Přípona ${validate.Extension} není podporována`);

//                   return false;

//             }

//             // kontrola na velikost souboru, musi byt > 50B a < props.MaxFIleSize MB

//             const result: ValidateFileSizeReturnModel = CheckFileSize(file);

//             if (result.SizeLimRchd) {

//                   pE.target.value = '';

//                   crm.notify("danger", result.Message);

//                   return false;

//             }

//             const data: FormData = new FormData();

//             data.append(props.Name, file);

//             const uploadResult: Response = await _zaznamyCZRepo.SaveFilesToCache(data, props.DocEntityEnum, props.Name, null, props.RenameFile ? fileName : "");

//             if (uploadResult.ok) {

//                   uploadResult.text().then(result => {

//                         if (result === '""') {

//                               // Zápis do contextu

//                               props.OnAfterFileUpload(fileName, props.Name);

//                               crm.notify("success", "Soubor úspěšně nahrán");

//                         }

//                         else if (result.length > 0) {

//                               crm.notify("danger", result);

//                         }

//                         else {

//                               crm.notify("danger", "Soubor se nepodařilo nahrát");

//                         }

//                   });

//             }

//             else {

//                   crm.notify("danger", "Soubor se nepodařilo nahrát");

//             }

//       }

//       return (

//             <ErrorBoundary>

//                   <FormControl

//                         component='div'

//                         className={_classes.formControl}

//                   >

//                         <FormLabel

//                               id={name + "_LblId"}

//                               disabled={props.Disabled}

//                               component="div"

//                               className={_classes.formLabel + formLabelClassName}

//                         >

//                               {props.HideLabel ? undefined : props.Label}

//                         </FormLabel>

//                         <div className={_classes.formComponentWrapper + formComponentWrapper}>
//                               {!!props.FileName ?
//                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
//                                          <span>{props.FileName}</span>
//                                          <div style={{ cursor: "pointer", margin: "5px", pointerEvents: "all" }} onClick={(e) => props.OnFileDelete(e, props.Name)} data-filetype={props.Name + "FileName"} data-filedescription={props.Name}>
//                                                <DeleteIcon />
//                                          </div>
//                                    </div>
//                                    :
//                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>

//                                          <label

//                                                className="k-button"

//                                                style={{ width: "150px", pointerEvents: "all" }}

//                                                htmlFor={props.Name + "InputId"}

//                                          >

//                                                Nahrát

//                                                      </label>

//                                          <input

//                                                type="file"

//                                                id={props.Name + "InputId"}

//                                                name={props.Name + "FileName"}

//                                                className={_classes.importFileButton}

//                                                onChange={OnFileUploadHandler}

//                                                style={{ opacity: "0", position: "absolute", pointerEvents: "none", width: "1px", height: "1px" }}

//                                          />

//                                    </div>

//                               }

//                               {props.Valid === false &&

//                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", pointerEvents: "all" }}>

//                                          <FormHelperText error>

//                                                 <span style={{ display: "flex", alignItems: "center" }}><span>{props.ErrorText}</span></span>

//                                          </FormHelperText>

//                                    </div>

//                               }

//                         </div>

//                   </FormControl>

//             </ErrorBoundary>

//       );

// }

// const useStyles = makeStyles((theme: Theme) =>

//     createStyles({

//             formControl: {

//                   display: "flex",

//                   flexDirection: "row",

//                   alignItems: "center",

//                   marginTop: "5px",

//                   width: "100%"

//             },

//             formLabel: {

//             fontWeight: 700,

//             color: theme.palette.grey[800],

//             "&.hide-label": {

//                 display: "none"

//             },

//             "&.extended-item": {

//                 width: "14.4%"

//             },

//             "&.shorten-item": {

//                 width: "30%"

//             },

//             "&:not(.hide-label):not(.extended-item):not(.shorten-item)": {

//                 width: "30%"

//             },

//             },

//             formComponentWrapper: {

//                   "&.hide-label": {

//                         width: "100%"

//                   },

//                   "&.extended-item": {

//                         width: "85.6%"

//                   },

//                   "&.shorten-item": {

//                         width: "30%"

//                   },

//                   "&:not(.hide-label):not(.extended-item):not(.shorten-item)": {

//                         width: "70%"

//                   },

//             },

//             importFileButton: {

//             }

//       }), { index: 1 }

// );

// export default FileImport;
