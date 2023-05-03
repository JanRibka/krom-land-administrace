import ConditionsDTO from 'shared/DTOs/ConditionsDTO';
import ConditionsModel from 'shared/models/ConditionsModel';

export const mapToTermsOfConditionsDTO = (conditions: ConditionsModel) => {
  const result: ConditionsDTO = {
    Id: conditions.IdConditions,
    Label: conditions.TermsOfConditionsLabel,
    Text: conditions.TermsOfConditionsText,
  };

  return result;
};
