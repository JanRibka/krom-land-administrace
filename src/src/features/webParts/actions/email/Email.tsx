import SectionStyled from "features/styledComponents/SectionStyled";
import { useSelector } from "react-redux";
import SectionTitle from "shared/components/sectionTitle/SectionTitle";
import AppTextField from "shared/components/textField/AppTextField";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";
import { useWebPartsSlice } from "shared/infrastructure/store/webParts/useWebPartsSlice";
import { selectActions } from "shared/infrastructure/store/webParts/webPartsSlice";
import { nameof } from "shared/nameof";

import ActionsModel from "../models/ActionsModel";

interface IProps {
  disable: boolean;
}

const Email = (props: IProps) => {
  // Contact
  const actions = useSelector(selectActions);
  const { handleActionsUpdate } = useWebPartsSlice();

  // Other
  const handleTextFieldOnBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    const name: string = e.target.name;
    const value: string = e.target.value;

    handleActionsUpdate({ [name]: value });
  };

  return (
    <ErrorBoundary>
      <SectionStyled component='section'>
        <SectionTitle title='Email pro zaslání registračního mailu do KROM Land' />
        <AppTextField
          name={nameof<ActionsModel>("EmailKromLand")}
          label='Email'
          value={actions.EmailKromLand}
          variant='outlined'
          fullWidth
          required
          disabled={props.disable}
          autoComplete='off'
          onBlur={handleTextFieldOnBlur}
        />
      </SectionStyled>
    </ErrorBoundary>
  );
};

export default Email;
