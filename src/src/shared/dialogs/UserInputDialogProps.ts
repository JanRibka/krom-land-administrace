export default interface UserInputDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading?: boolean;
  anoButtonTitle?: string;
  anoButtonDisable?: boolean;
  onClickAnoButton: () => void;
  onClickNeButton?: () => void;
}
