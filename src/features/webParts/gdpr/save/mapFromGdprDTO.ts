import ConditionsDTO from 'shared/DTOs/ConditionsDTO';
import ConditionsModel from 'shared/models/ConditionsModel';

export const mapFromGdprDTO = (conditionsDTO?: ConditionsDTO | null) => {
  const result: Partial<ConditionsModel> = {
    IdGdpr: conditionsDTO?.Id ?? 0,
    GdprLabel: conditionsDTO?.Label ?? "",
    GdprText: conditionsDTO?.Text ?? "",
    _gdprLoaded: true,
  };

  return result;
};
