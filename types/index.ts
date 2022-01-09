import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Binary: any;
  DateTime: any;
  EmailAddress: any;
  JSON: any;
};

export type AuthenticateInput = {
  emailAddress: Scalars['EmailAddress'];
  password: Scalars['String'];
};

export type AuthenticateResponse = {
  __typename?: 'AuthenticateResponse';
  token: Scalars['String'];
};

export type Bonus = {
  __typename?: 'Bonus';
  amount: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  deleted?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type BonusConnection = {
  __typename?: 'BonusConnection';
  edges: Array<Maybe<Bonus>>;
  totalCount: Scalars['Int'];
};

export type BonusConnectionsEdge = {
  __typename?: 'BonusConnectionsEdge';
  cursor: Scalars['Binary'];
  node: Bonus;
};

export type BonusInput = {
  amount: Scalars['Float'];
  id: Scalars['ID'];
};

export type CreateBonusInput = {
  name: Scalars['String'];
};

export type CreateDeductionInput = {
  name: Scalars['String'];
};

export type CreateDepartmentInput = {
  name: Scalars['String'];
};

export type CreateReimbursementInput = {
  name: Scalars['String'];
};

export type CreateSalaryRecordInput = {
  bonus?: Maybe<Array<Maybe<BonusInput>>>;
  deductions?: Maybe<Array<Maybe<DeductionsInput>>>;
  depositDate?: Maybe<Scalars['DateTime']>;
  employee: Scalars['ID'];
  grossPay: Scalars['Float'];
  netPay: Scalars['Float'];
  payPeriod: DateTimePeriodInput;
  payrollDate: Scalars['DateTime'];
  reimbursements?: Maybe<Array<Maybe<ReimbursementsInput>>>;
};

export type CreateUserInput = {
  accountNumber: Scalars['String'];
  address: Scalars['String'];
  bankName: Scalars['String'];
  baseSalary: Scalars['Float'];
  department: Scalars['String'];
  emailAddress: Scalars['EmailAddress'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  password: Scalars['String'];
  role: UserRole;
};

export type DateTimePeriod = {
  __typename?: 'DateTimePeriod';
  endDate: Scalars['String'];
  startDate: Scalars['String'];
};

export type DateTimePeriodInput = {
  endDate: Scalars['String'];
  startDate: Scalars['String'];
};

export type Deduction = {
  __typename?: 'Deduction';
  createdAt: Scalars['DateTime'];
  deleted?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type DeductionConnectionsEdge = {
  __typename?: 'DeductionConnectionsEdge';
  cursor: Scalars['Binary'];
  node: Deduction;
};

export type Deductions = {
  __typename?: 'Deductions';
  amount: Scalars['Float'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type DeductionsInput = {
  amount: Scalars['Float'];
  id: Scalars['ID'];
};

export type DeductiontConnection = {
  __typename?: 'DeductiontConnection';
  edges: Array<Maybe<Deduction>>;
  totalCount: Scalars['Int'];
};

export type Department = {
  __typename?: 'Department';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type DepartmentConnection = {
  __typename?: 'DepartmentConnection';
  edges: Array<Maybe<Department>>;
  totalCount: Scalars['Int'];
};

export type DepartmentConnectionsEdge = {
  __typename?: 'DepartmentConnectionsEdge';
  cursor: Scalars['Binary'];
  node: Department;
};

export type GenerateEmail = {
  emailAddress: Scalars['EmailAddress'];
};

export type Mutation = {
  __typename?: 'Mutation';
  authenticate: AuthenticateResponse;
  createBonus: Scalars['ID'];
  createDeduction: Scalars['ID'];
  createDepartment: Scalars['ID'];
  createReimbursement: Scalars['ID'];
  createSalaryRecord: Scalars['ID'];
  createUser: Scalars['ID'];
  deleteBonus: Scalars['Boolean'];
  deleteDeduction: Scalars['Boolean'];
  deleteReimbursement: Scalars['Boolean'];
  deleteSalaryRecord: Scalars['Boolean'];
  sendEmail: Scalars['Boolean'];
  updateBonus: Scalars['Boolean'];
  updateDeduction: Scalars['Boolean'];
  updateDepartment: Scalars['Boolean'];
  updateMe?: Maybe<Scalars['Boolean']>;
  updateReimbursement: Scalars['Boolean'];
  updateSalaryRecord: Scalars['Boolean'];
  updateUser: Scalars['Boolean'];
};


export type MutationAuthenticateArgs = {
  input: AuthenticateInput;
};


export type MutationCreateBonusArgs = {
  input: CreateBonusInput;
};


export type MutationCreateDeductionArgs = {
  input: CreateDeductionInput;
};


export type MutationCreateDepartmentArgs = {
  input: CreateDepartmentInput;
};


export type MutationCreateReimbursementArgs = {
  input: CreateReimbursementInput;
};


export type MutationCreateSalaryRecordArgs = {
  input: CreateSalaryRecordInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteBonusArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteDeductionArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteReimbursementArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteSalaryRecordArgs = {
  id: Scalars['ID'];
};


export type MutationSendEmailArgs = {
  input?: Maybe<GenerateEmail>;
};


export type MutationUpdateBonusArgs = {
  id: Scalars['ID'];
  input: UpdateBonusInput;
};


export type MutationUpdateDeductionArgs = {
  id: Scalars['ID'];
  input: UpdateDeductionInput;
};


export type MutationUpdateDepartmentArgs = {
  id: Scalars['ID'];
  input: UpdateDepartmentInput;
};


export type MutationUpdateMeArgs = {
  input: UpdateMeInput;
};


export type MutationUpdateReimbursementArgs = {
  id: Scalars['ID'];
  input: UpdateReimbursementInput;
};


export type MutationUpdateSalaryRecordArgs = {
  id: Scalars['ID'];
  input: UpdateSalaryRecordInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  input: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  bonus?: Maybe<Bonus>;
  bonuses?: Maybe<BonusConnection>;
  deduction?: Maybe<Deduction>;
  deductions?: Maybe<DeductiontConnection>;
  department?: Maybe<Department>;
  departments?: Maybe<DepartmentConnection>;
  me?: Maybe<User>;
  reimbursement?: Maybe<Reimbursement>;
  reimbursements?: Maybe<ReimbursementConnection>;
  salaryRecord?: Maybe<SalaryRecord>;
  salaryRecords?: Maybe<SalaryRecordConnection>;
  users?: Maybe<UserConnection>;
};


export type QueryBonusArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryBonusesArgs = {
  filter?: Maybe<StringQueryOperatorInput>;
  first?: Maybe<Scalars['Int']>;
};


export type QueryDeductionArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryDeductionsArgs = {
  filter?: Maybe<StringQueryOperatorInput>;
  first?: Maybe<Scalars['Int']>;
};


export type QueryDepartmentArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryDepartmentsArgs = {
  filter?: Maybe<StringQueryOperatorInput>;
  first?: Maybe<Scalars['Int']>;
};


export type QueryReimbursementArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryReimbursementsArgs = {
  filter?: Maybe<StringQueryOperatorInput>;
  first?: Maybe<Scalars['Int']>;
};


export type QuerySalaryRecordArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QuerySalaryRecordsArgs = {
  filter?: Maybe<StringQueryOperatorInput>;
  first?: Maybe<Scalars['Int']>;
};


export type QueryUsersArgs = {
  filter?: Maybe<StringQueryOperatorInput>;
  first?: Maybe<Scalars['Int']>;
};

export type Reimbursement = {
  __typename?: 'Reimbursement';
  createdAt: Scalars['DateTime'];
  deleted?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ReimbursementConnection = {
  __typename?: 'ReimbursementConnection';
  edges: Array<Maybe<Reimbursement>>;
  totalCount: Scalars['Int'];
};

export type ReimbursementConnectionsEdge = {
  __typename?: 'ReimbursementConnectionsEdge';
  cursor: Scalars['Binary'];
  node: Reimbursement;
};

export type Reimbursements = {
  __typename?: 'Reimbursements';
  amount: Scalars['Float'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type ReimbursementsInput = {
  amount: Scalars['Float'];
  id: Scalars['ID'];
};

export type SalaryRecord = {
  __typename?: 'SalaryRecord';
  bonus?: Maybe<Array<Maybe<Bonus>>>;
  createdAt: Scalars['DateTime'];
  deductions?: Maybe<Array<Maybe<Deductions>>>;
  depositDate?: Maybe<Scalars['DateTime']>;
  employee: User;
  grossPay: Scalars['Float'];
  id: Scalars['ID'];
  netPay: Scalars['Float'];
  payPeriod: DateTimePeriod;
  payrollDate: Scalars['DateTime'];
  reimbursements?: Maybe<Array<Maybe<Reimbursements>>>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type SalaryRecordConnection = {
  __typename?: 'SalaryRecordConnection';
  edges: Array<Maybe<SalaryRecord>>;
  totalCount: Scalars['Int'];
};

export type SalaryRecordConnectionsEdge = {
  __typename?: 'SalaryRecordConnectionsEdge';
  cursor: Scalars['Binary'];
  node: SalaryRecord;
};

export type StringQueryOperatorInput = {
  contains?: Maybe<Scalars['String']>;
  eq?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  ne?: Maybe<Scalars['String']>;
  nin?: Maybe<Array<Scalars['String']>>;
  startsWith?: Maybe<Scalars['String']>;
};

export type UpdateBonusInput = {
  name: Scalars['String'];
};

export type UpdateDeductionInput = {
  name: Scalars['String'];
};

export type UpdateDepartmentInput = {
  name: Scalars['String'];
};

export type UpdateMeInput = {
  accountNumber?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  bankName?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  newPassword?: Maybe<Scalars['String']>;
  oldPassword?: Maybe<Scalars['String']>;
};

export type UpdateReimbursementInput = {
  name: Scalars['String'];
};

export type UpdateSalaryRecordInput = {
  bonus?: Maybe<Array<Maybe<BonusInput>>>;
  deductions?: Maybe<Array<Maybe<DeductionsInput>>>;
  depositDate?: Maybe<Scalars['DateTime']>;
  employee?: Maybe<Scalars['ID']>;
  grossPay?: Maybe<Scalars['Float']>;
  netPay?: Maybe<Scalars['Float']>;
  payPeriod?: Maybe<DateTimePeriodInput>;
  payrollDate?: Maybe<Scalars['DateTime']>;
  reimbursements?: Maybe<Array<Maybe<ReimbursementsInput>>>;
};

export type UpdateUserInput = {
  accountNumber?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  bankName?: Maybe<Scalars['String']>;
  baseSalary?: Maybe<Scalars['Float']>;
  department?: Maybe<Scalars['String']>;
  emailAddress?: Maybe<Scalars['EmailAddress']>;
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  role?: Maybe<UserRole>;
};

export type User = {
  __typename?: 'User';
  accountNumber: Scalars['String'];
  address: Scalars['String'];
  bankName: Scalars['String'];
  baseSalary: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  department: Scalars['String'];
  emailAddress: Scalars['EmailAddress'];
  firstname: Scalars['String'];
  id: Scalars['ID'];
  lastname: Scalars['String'];
  password: Scalars['String'];
  role: UserRole;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UserConnection = {
  __typename?: 'UserConnection';
  edges: Array<Maybe<User>>;
  totalCount: Scalars['Int'];
};

export type UserConnectionsEdge = {
  __typename?: 'UserConnectionsEdge';
  cursor: Scalars['Binary'];
  node: User;
};

export enum UserRole {
  Hr = 'HR',
  Member = 'MEMBER'
}
