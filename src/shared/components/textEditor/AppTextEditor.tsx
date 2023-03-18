import "react-quill/dist/quill.snow.css";

import ReactQuill from "react-quill";

import AppTextEditorStyled from "./styledComponents/AppTextEditorStyled";

interface IProps {
  value: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  onChange: (value: string, name: string) => void;
}

const AppTextEditor = (props: IProps) => {
  // Constants
  const placeholder = props.required
    ? props.placeholder + " *"
    : props.placeholder;

  return (
    <AppTextEditorStyled>
      <ReactQuill
        theme='snow'
        value={props.value}
        placeholder={placeholder}
        onChange={() => props.onChange(props.value, props.name)}
      />
    </AppTextEditorStyled>
  );
};

export default AppTextEditor;
