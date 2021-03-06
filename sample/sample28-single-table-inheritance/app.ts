import 'reflect-metadata';
import { ConnectionOptions, createConnection } from 'typeorm';
import { Employee } from './entity/Employee';
import { Homesitter } from './entity/Homesitter';
import { Student } from './entity/Student';
import { Person } from './entity/Person';

const options: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3966,
  username: 'root',
  password: 'admin',
  database: 'sample',
  dropSchema: false,
  logging: ['query', 'error', 'log'],
  synchronize: true,
  entities: [Person, Employee, Homesitter, Student],
};

createConnection(options).then(
  async (connection) => {
    const employeeRepository = connection.getRepository(Employee);
    const employee = new Employee();
    employee.id = 1;
    employee.firstName = 'umed';
    employee.lastName = 'khudoiberdiev';
    employee.salary = 200000;

    console.log('saving the employee: ');
    await employeeRepository.save(employee);
    console.log('employee has been saved: ', employee);

    console.log('now loading the employee: ');
    const loadedEmployee = await employeeRepository.findOne(1);
    console.log('loaded employee: ', loadedEmployee);

    console.log('-----------------');

    const homesitterRepository = connection.getRepository(Homesitter);
    const homesitter = new Homesitter();
    homesitter.id = 2;
    homesitter.firstName = 'umed';
    homesitter.lastName = 'khudoiberdiev';
    homesitter.numberOfKids = 5;

    console.log('saving the homesitter: ');
    await homesitterRepository.save(homesitter);
    console.log('homesitter has been saved: ', homesitter);

    console.log('now loading the homesitter: ');
    const loadedHomesitter = await homesitterRepository.findOne(2);
    console.log('loaded homesitter: ', loadedHomesitter);

    console.log('-----------------');

    const studentRepository = connection.getRepository(Student);
    const student = new Student();
    student.id = 3;
    student.firstName = 'umed';
    student.lastName = 'khudoiberdiev';
    student.faculty = 'computer science';

    console.log('saving the student: ');
    await studentRepository.save(student);
    console.log('student has been saved: ', student);

    console.log('now loading the student: ');
    const loadedStudent = await studentRepository.findOne(3);
    console.log('loaded student: ', loadedStudent);

    console.log('-----------------');
    const secondEmployee = await employeeRepository.findOne(2);
    console.log('Non exist employee: ', secondEmployee);
    const thirdEmployee = await employeeRepository.findOne(3);
    console.log('Non exist employee: ', thirdEmployee);
    console.log('-----------------');
    const secondHomesitter = await homesitterRepository.findOne(1);
    console.log('Non exist homesitter: ', secondHomesitter);
    const thirdHomesitter = await homesitterRepository.findOne(3);
    console.log('Non exist homesitter: ', thirdHomesitter);
    console.log('-----------------');
    const secondStudent = await studentRepository.findOne(1);
    console.log('Non exist student: ', secondStudent);
    const thirdStudent = await studentRepository.findOne(2);
    console.log('Non exist student: ', thirdStudent);
  },
  (error) => console.log('Error: ', error)
);
/*
query : CREATE TABLE `sample28_person`(
    `id` int NOT NULL,
    `firstName` varchar(255) NOT NULL,
    `lastName` varchar(255) NOT NULL,
    `salary` int NULL,
    `numberOfKids` int NULL,
    `faculty` varchar(255) NULL,
    `type` varchar(255) NOT NULL,
    INDEX `IDX_3ed6cb85728b4f1038a958e895`(`type`),
    PRIMARY KEY(`id`)
) ENGINE = InnoDB
*/
