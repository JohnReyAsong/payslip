export const excelForm = (values: any) => {
  const earnings = values?.earnings.map((e: any) => {
    return [`${e?.name}:  ${e?.amount}`]
  })

  const totalEarnings = values?.earnings
    ?.map((earning: { amount: number }) => parseInt(earning.amount as unknown as string))
    .reduce((prev: number, curr: number) => prev + curr, 0)

  const totalDeductions = values?.deductions
    ?.map((deduction: { amount: number }) => parseInt(deduction.amount as unknown as string))
    .reduce((prev: number, curr: number) => prev + curr, 0)

  const totalReimbursements = values?.reimbursements
    ?.map((reimbursement: { amount: number }) => parseInt(reimbursement.amount as unknown as string))
    .reduce((prev: number, curr: number) => prev + curr, 0)

  return [
    ['SALARY SLIP'],
    [''],
    [''],
    [
      'Employer:',
      'High Output Ventures',
      '',
      'Pay Period',
      values?.payPeriod?.startDate,
      'to',
      values?.payPeriod?.endDate,
    ],
    ['Address:', 'Number 44-02 Raffles Place Singapore 048616', '', 'Payroll Date:', values?.payrollDate],
    [''],
    ['Employee:', values?.employee?.name, '', 'Designation:', values?.employee?.designation],
    ['Address:', values?.employee?.address, '', 'Payroll Date:', values?.employee?.department],
    [''],
    ['EARNINGS'],
    [''],
    [`Salary: ${values?.grossPay}`],
    earnings,
    [''],
    ['Total earnings:', totalEarnings + values?.grossPay],
    [''],
    ['DEDUCTIONS'],
    [''],
    [''],
    ['Total deductions:', totalDeductions],
    [''],
    ['REIMBURSEMENT'],
    [''],
    [''],
    ['Total reimbursements:', totalReimbursements],
    [''],
    ['NET INCOME:', values?.netPay],
    [''],
    ['PAYMENT INFORMATION'],
    [''],
    ['Deposit Date:', values?.depositDate],
    ['Account #:', values?.employee?.accountNumber],
    ['Bank Name:', values?.employee?.bankName],
  ]
}
