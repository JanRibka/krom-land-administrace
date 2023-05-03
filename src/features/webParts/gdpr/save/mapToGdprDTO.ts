import ConditionsDTO from 'shared/DTOs/ConditionsDTO';
import ConditionsModel from 'shared/models/ConditionsModel';

export const mapToGdprDTO = (conditions: ConditionsModel) => {
  const result: ConditionsDTO = {
    Id: conditions.IdGdpr,
    Label: conditions.GdprLabel,
    Text: conditions.GdprText,
  };

  return result;
};
