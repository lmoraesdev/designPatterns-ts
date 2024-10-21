import { AddTaskController } from "../adapters/controllers/task/addTask";
import { LogErrorControllerDecorator } from "../adapters/decorators/logErrorControllerDecorator";
import { DateValidatorAdapter } from "../adapters/presentations/api/dateValidatorAdapter";
import { DbAddTask } from "../dataSources/db/dbAddTask";
import { LogErrorMongoRepository } from "../dataSources/db/repository/logMongoRepository";
import { TaskMongoRepository } from "../dataSources/db/repository/taskMongoRepository";
import { addTaskValidationCompositeFactory } from "./addTaskValidationCompositeFactory";

export const taskControllerFactory = () => {
  const dateValidatorAdapter = new DateValidatorAdapter();
  const taskMongoRepository = new TaskMongoRepository();
  const dbAddTask = new DbAddTask(taskMongoRepository);
  const taskController = new AddTaskController(
    dbAddTask,
    addTaskValidationCompositeFactory()
  );
  const logErrorMongoRepository = new LogErrorMongoRepository();
  return new LogErrorControllerDecorator(
    taskController,
    logErrorMongoRepository
  );
};
