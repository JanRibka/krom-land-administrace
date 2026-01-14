export default interface IRequestExecCondition {
  apply: boolean;
  condition: () => boolean;
}
