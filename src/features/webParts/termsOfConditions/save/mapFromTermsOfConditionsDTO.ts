import ConditionsDTO from "shared/DTOs/ConditionsDTO";
import ConditionsModel from "shared/models/ConditionsModel";

export const mapFromTermsOfConditionsDTO = (
  conditionsDTO?: ConditionsDTO | null
) => {
  const result: Partial<ConditionsModel> = {
    TermsOfConditionsLabel: conditionsDTO?.Label ?? "",
    TermsOfConditionsText: conditionsDTO?.Text ?? "",
    _conditionsLoaded: true,
  };

  return result;
};
