import { Validation } from "../adapters/interfaces/validation";
import { DateValidatorAdapter } from "../adapters/presentations/api/dateValidatorAdapter";
import { DateValidation } from "../adapters/validation/dateValidation";
import { RequiredFieldsValidation } from "../adapters/validation/requiredFieldsValidation";
import { ValidationComposite } from "../adapters/validation/validationCompose";

export const AddTaskValidationCompositeFactory = (): ValidationComposite => {
  const validations: Validation[] = [];

  for (const field of ["title", "description", "date"]) {
    validations.push(new RequiredFieldsValidation(field));
  }
  validations.push(new DateValidation("date", new DateValidatorAdapter()));

  return new ValidationComposite(validations);
};
