import gql from 'graphql-tag'

export const SALARY_RECORDS = gql`
  query SalaryRecords {
    salaryRecords {
      totalCount
      edges {
        id
        employee {
          id
          firstname
          lastname
          address
          emailAddress
          role
          department
          baseSalary
          accountNumber
          bankName
        }
        payrollDate
        payPeriod {
          startDate
          endDate
        }
        netPay
        grossPay
        deductions {
          id
          name
          amount
        }
        reimbursements {
          id
          name
          amount
        }
        bonus {
          id
          name
          amount
        }
        depositDate
      }
    }
  }
`
