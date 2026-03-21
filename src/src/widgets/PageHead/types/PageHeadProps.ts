export interface PageHeadProps {
  disable: boolean;
  nameTitle: string;
  nameDescription: string;
  valueTitle: string;
  valueDescription: string;
  handleTextFieldOnBlur: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => void;
}
