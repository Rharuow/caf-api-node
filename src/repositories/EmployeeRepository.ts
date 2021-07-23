import { EntityRepository, Repository } from "typeorm";
import { Employee } from "../entities/Employee";

@EntityRepository(Employee)
export class EmployeeRepository extends Repository<Employee> {}
