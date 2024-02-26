import SectionStyled from "features/styledComponents/SectionStyled";
import { useSelector } from "react-redux";
import SectionSubTitle from "shared/components/sectionSubTitle/SectionSubTitle";
import SectionTitle from "shared/components/sectionTitle/SectionTitle";
import IAppSelectMenuItem from "shared/components/select/IAppSelectMenuItem";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";
import { useWebPartsSlice } from "shared/infrastructure/store/webParts/useWebPartsSlice";
import { selectWebParts } from "shared/infrastructure/store/webParts/webPartsSlice";

import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Action from "./action/Action";
import ButtonWrapperStyled from "./styledComponents/ButtonWrapperStyled";

interface IProps {
  disable: boolean;
}

const ActionDetails = (props: IProps) => {
  // Store
  const webParts = useSelector(selectWebParts);

  // Constants
  const { handleActionsActionDetailAdd } = useWebPartsSlice();
  const orderData: IAppSelectMenuItem[] = [];

  webParts.Actions.ActionDetails.forEach((item) => {
    if (!item.Delete) {
      const value: number = orderData.length + 1;

      orderData.push({
        value: value,
        label: value.toString(),
        name: "",
        kod: "",
        isDisabled: false,
      });
    }
  });

  // Other

  const renderActions = () => {
    let auxIndex = 0;
    let result: JSX.Element[] = [];

    webParts.Actions.ActionDetails.forEach((item, index) => {
      if (!item.Delete) {
        if (auxIndex > 0) {
          result.push(
            <Box
              key={`actionSection_${index}`}
              className="sub-section-separator"
            >
              <SectionSubTitle title={`Akce ${auxIndex + 1}`} />
              <Action
                index={index}
                disable={props.disable}
                orderData={orderData}
              />
            </Box>
          );
        } else {
          result.push(
            <Box key={`actionSection_${index}`}>
              <SectionSubTitle title={`Akce ${auxIndex + 1}`} />
              <Action
                index={index}
                disable={props.disable}
                orderData={orderData}
              />
            </Box>
          );
        }

        auxIndex += 1;
      }
    });

    return result;
  };

  const handleAddActionOnClick = () => {
    handleActionsActionDetailAdd();
  };

  return (
    <ErrorBoundary>
      <SectionStyled component="section">
        <SectionTitle title="Akce" />
        {renderActions()}
        <ButtonWrapperStyled>
          <Button
            onClick={handleAddActionOnClick}
            color="secondary"
            variant="contained"
            disabled={props.disable}
            startIcon={<AddIcon />}
          >
            Přidat akci
          </Button>
        </ButtonWrapperStyled>
      </SectionStyled>
    </ErrorBoundary>
  );
};

export default ActionDetails;
