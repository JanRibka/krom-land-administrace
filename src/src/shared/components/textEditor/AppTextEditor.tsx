import "react-quill/dist/quill.snow.css";

import ReactQuill from "react-quill";

import AppTextEditorStyled from "./styledComponents/AppTextEditorStyled";

interface IProps {
  value: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  disable: boolean;
  onChange: (value: string, name: string) => void;
}

const AppTextEditor = (props: IProps) => {
  // Constants
  const placeholder = props.required
    ? props.placeholder + " *"
    : props.placeholder;

  const handleOnChange = (value: string) => {
    props.onChange(value, props.name);
  };
  return (
    <AppTextEditorStyled>
      <ReactQuill
        theme='snow'
        value={props.value}
        placeholder={placeholder}
        readOnly={props.disable}
        onChange={handleOnChange}
      />
    </AppTextEditorStyled>
  );
};

export default AppTextEditor;
