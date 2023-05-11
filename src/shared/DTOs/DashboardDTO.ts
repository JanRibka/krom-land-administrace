import RegistrationModel from "features/dashboard/models/RegistrationModel";

export default class DashboardDTO {
  FilterDateFrom: Date | null = null;
  FilterDateTo: Date | null = null;
  Registrations: RegistrationModel[] | null = null;

  public constructor(init?: Partial<DashboardDTO>) {
    Object.assign(this, init);
  }
}
