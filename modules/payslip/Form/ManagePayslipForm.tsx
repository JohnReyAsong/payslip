import { FC, useEffect, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { FormControl, FormLabel, Input, Stack, HStack, Select, IconButton, Text, Flex, Button } from '@chakra-ui/react'

import { PlusIcon } from '@heroicons/react/solid'
import { useSalaryRecordMutation } from '@hooks/mutations'
import { showToast } from '@utils/toastUtils'
import {
  useUsersQuery,
  useSalaryRecordsQuery,
  useDeductionsQuery,
  useBonusesQuery,
  useReimbursementsQuery,
  useDepartmentsQuery,
  useDesignationsQuery,
} from '@hooks/queries'

interface ManagePayslipFormProps {
  onClose(): void
  selectedSalaryRecord?: any
  isCreate: boolean
}

interface CustomSalaryRecord {
  employeeId: string
  department: string
  address: string
  designation: string
  accountNumber: string
  bankName: string
  earnings?: { id: string; amount: number }[]
  deductions?: { id: string; amount: number }[]
  reimbursements?: { id: string; amount: number }[]
  depositDate: Date
  payrollDate: Date
  startDate: Date
  endDate: Date
  grossIncome: number
}

const ManagePayslipForm: FC<ManagePayslipFormProps> = ({ onClose, selectedSalaryRecord, isCreate }) => {
  const { users } = useUsersQuery()
  const { bonuses: earningsMapping } = useBonusesQuery()
  const { deductions: deductionsMapping } = useDeductionsQuery()
  const { reimbursements: reimbursementsMapping } = useReimbursementsQuery()
  const { designations } = useDesignationsQuery()
  const { departments } = useDepartmentsQuery()
  const { refetchSalaryRecords } = useSalaryRecordsQuery()
  const [basicSalary, setBasicSalary] = useState<number>()
  const { handleSubmit, register, formState, reset, setValue, control, watch } = useForm<CustomSalaryRecord>({
    defaultValues: {
      employeeId: '',
      department: '',
      address: '',
      designation: '',
      accountNumber: '',
      bankName: '',
      grossIncome: 0,
      earnings: [{ id: '', amount: 0 }],
      deductions: [{ id: '', amount: 0 }],
      reimbursements: [{ id: '', amount: 0 }],
    },
  })

  const watchEarnings = watch('earnings')
  const watchDeductions = watch('deductions')
  const watchReimbursements = watch('reimbursements')

  const totalEarnings = watchEarnings
    ?.map((earning) => parseInt(earning.amount as unknown as string))
    .reduce((prev, curr) => prev + curr, 0)

  const totalDeductions = watchDeductions
    ?.map((deduction) => parseInt(deduction.amount as unknown as string))
    .reduce((prev, curr) => prev + curr, 0)

  const totalReimbursements = watchReimbursements
    ?.map((reimbursement) => parseInt(reimbursement.amount as unknown as string))
    .reduce((prev, curr) => prev + curr, 0)

  const netIncome = (totalEarnings || 0) + (totalReimbursements || 0) + (basicSalary || 0) - (totalDeductions || 0)

  const { fields: earningsFields, append: earningsAppend } = useFieldArray({
    control,
    name: 'earnings',
  })

  const { fields: deductionsFields, append: deductionsAppend } = useFieldArray({
    control,
    name: 'deductions',
  })

  const { fields: reimbursementsFields, append: reimbursementsAppend } = useFieldArray({
    control,
    name: 'reimbursements',
  })

  const { createSalaryRecordAction, updateSalaryRecordAction } = useSalaryRecordMutation()
  const { isSubmitting } = formState
  const onSubmit = async (values: CustomSalaryRecord) => {
    const parseEarnings = values.earnings?.map((earning) => {
      const obj = {
        id: earning.id,
        amount: parseInt(earning.amount as unknown as string),
      }
      return obj
    })

    const parseDeductions = values.deductions?.map((deduction) => {
      const obj = {
        id: deduction.id,
        amount: parseInt(deduction.amount as unknown as string),
      }
      return obj
    })

    const parseReimbursements = values.reimbursements?.map((reimbursements) => {
      const obj = {
        id: reimbursements.id,
        amount: parseInt(reimbursements.amount as unknown as string),
      }
      return obj
    })

    if (isCreate) {
      const { data } = await createSalaryRecordAction({
        input: {
          employee: values.employeeId,
          netPay: netIncome,
          grossPay: values.grossIncome,
          payrollDate: values.payrollDate,
          payPeriod: {
            startDate: values.startDate as unknown as string,
            endDate: values.endDate as unknown as string,
          },
          depositDate: values.depositDate,
          reimbursements: parseReimbursements,
          bonus: parseEarnings,
          deductions: parseDeductions,
        },
      })
      if (data?.createSalaryRecord) {
        await refetchSalaryRecords()
        showToast('Created successfully!', 'success')
        onClose()
      }
    } else {
      const { data } = await updateSalaryRecordAction({
        id: selectedSalaryRecord.id,
        input: {
          employee: values.employeeId,
          netPay: netIncome,
          grossPay: values.grossIncome,
          payrollDate: values.payrollDate,
          payPeriod: {
            startDate: values.startDate as unknown as string,
            endDate: values.endDate as unknown as string,
          },

          depositDate: values.depositDate,
          reimbursements: parseReimbursements,
          bonus: parseEarnings,
          deductions: parseDeductions,
        },
      })
      if (data?.updateSalaryRecord) {
        await refetchSalaryRecords()
        showToast('Updated successfully!', 'success')
        onClose()
      }
    }
  }

  const onSelectEmployee = (id: string) => {
    const employee = users?.edges.find((user) => user?.id === id)
    setValue('department', employee?.department || '')
    setValue('designation', employee?.designation || '')
    setValue('address', employee?.address || '')
    setValue('accountNumber', employee?.accountNumber || '')
    setValue('bankName', employee?.bankName || '')
    setValue('grossIncome', employee?.baseSalary || 0)
    setBasicSalary(employee?.baseSalary || 0)
  }

  useEffect(() => {
    if (selectedSalaryRecord?.id) {
      reset({
        employeeId: selectedSalaryRecord.employee.id,
        startDate: selectedSalaryRecord.payPeriod.startDate,
        endDate: selectedSalaryRecord.payPeriod.endDate,
        payrollDate: selectedSalaryRecord.payrollDate,
        depositDate: selectedSalaryRecord.depositDate,
        designation: selectedSalaryRecord.employee.designation,
        address: selectedSalaryRecord.employee.address,
        department: selectedSalaryRecord.employee.department,
        accountNumber: selectedSalaryRecord.employee.accountNumber,
        bankName: selectedSalaryRecord.employee.bankName,
        earnings: selectedSalaryRecord.bonus.length ? selectedSalaryRecord.bonus : [{ id: '', amount: 0 }],
        deductions: selectedSalaryRecord.deductions.length ? selectedSalaryRecord.deductions : [{ id: '', amount: 0 }],
        reimbursements: selectedSalaryRecord.reimbursements.length
          ? selectedSalaryRecord.reimbursements
          : [{ id: '', amount: 0 }],
      })
    }
    setBasicSalary(selectedSalaryRecord?.employee.baseSalary)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSalaryRecord, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <Text
          fontSize="18px"
          color="gray.800"
          fontWeight="semibold"
          borderBottom="2px solid"
          pb="2"
          borderColor="gray.100"
        >
          Employer Details
        </Text>

        {/* <FormControl>
          <FormLabel size="xs" color="gray.700">
            Employer
          </FormLabel>
          <Input id="email" type="text" size="sm" value="High Output Ventures" />
        </FormControl>
        <FormControl>
          <FormLabel color="gray.700">Address</FormLabel>
          <Input id="email" type="text" size="sm" value="Number 44-02 Raffles Place Singapore 048616" />
        </FormControl> */}

        <FormControl isRequired>
          <FormLabel color="gray.700">Pay Period</FormLabel>
          <HStack>
            <Input id="email" type="date" size="sm" {...register('startDate')} />
            <Input id="email" type="date" size="sm" {...register('endDate')} />
          </HStack>
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="gray.700">Payroll Date</FormLabel>
          <Input id="email" type="date" size="sm" {...register('payrollDate')} />
        </FormControl>
      </Stack>

      <Stack mt={10}>
        <Text
          fontSize="18px"
          color="gray.800"
          fontWeight="semibold"
          borderBottom="2px solid"
          pb="2"
          borderColor="gray.200"
        >
          Employee Details
        </Text>
        <FormControl isRequired>
          <FormLabel size="xs" color="gray.700">
            Employee
          </FormLabel>
          <Select
            placeholder="Select Employee"
            size="sm"
            {...register('employeeId')}
            onChange={(e) => onSelectEmployee(e.target.value)}
          >
            {users?.edges.map((user) => (
              <>
                <option value={user?.id}>
                  {user?.firstname} {user?.lastname}
                </option>
              </>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Address</FormLabel>
          <Input id="email" type="text" size="sm" {...register('address')} isDisabled />
        </FormControl>

        <FormControl>
          <FormLabel>Department</FormLabel>
          <Select id="email" type="text" size="sm" {...register('department')} isDisabled>
            {departments?.edges.map((department) => (
              <>
                <option value={department?.name}>{department?.name}</option>
              </>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Designation</FormLabel>
          <Select id="email" type="text" size="sm" {...register('designation')} isDisabled>
            {designations?.edges.map((designation) => (
              <>
                <option value={designation?.id}>{designation?.name}</option>
              </>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Earnings</FormLabel>

          {earningsFields.map(({ id }, idx) => {
            return (
              <HStack key={id} mb="3">
                <Select placeholder="Select" size="sm" id={`earnings.${idx}.id`} {...register(`earnings.${idx}.id`)}>
                  {earningsMapping?.edges.map((earning) => (
                    <>
                      <option value={earning?.id}>{earning?.name}</option>
                    </>
                  ))}
                </Select>
                <Input type="number" size="sm" id={`earnings.${idx}.amount`} {...register(`earnings.${idx}.amount`)} />
                <IconButton
                  aria-label="add field"
                  icon={<PlusIcon height="12px" />}
                  variant="outline"
                  fontSize="5px"
                  size="sm"
                  onClick={() => earningsAppend({ id: '', amount: 0 })}
                />
              </HStack>
            )
          })}

          <Flex justify="space-between" borderTop="1px solid" borderColor="gray.200" mt="3" pr="10">
            <Text fontWeight="semibold" fontSize="sm" textAlign="end" pr="10" pt="2">
              Total Earnings:
            </Text>
            <Text fontWeight="semibold" fontSize="sm" textAlign="end" pt="2">
              {(totalEarnings || 0) + (basicSalary || 0)}
            </Text>
          </Flex>
        </FormControl>

        <FormControl pt={4}>
          <FormLabel>Deductions</FormLabel>
          {deductionsFields.map(({ id }, idx) => {
            return (
              <HStack key={id} mb="3">
                <Select
                  placeholder="Select"
                  size="sm"
                  id={`deductions.${idx}.id`}
                  {...register(`deductions.${idx}.id`)}
                >
                  {deductionsMapping?.edges.map((deduction) => (
                    <>
                      <option value={deduction?.id}>{deduction?.name}</option>
                    </>
                  ))}
                </Select>
                <Input
                  type="number"
                  size="sm"
                  id={`deductions.${idx}.amount`}
                  {...register(`deductions.${idx}.amount`)}
                />
                <IconButton
                  aria-label="add field"
                  icon={<PlusIcon height="12px" />}
                  variant="outline"
                  fontSize="5px"
                  size="sm"
                  onClick={() => deductionsAppend({ id: '', amount: 0 })}
                />
              </HStack>
            )
          })}
          <Flex justify="space-between" borderTop="1px solid" borderColor="gray.200" mt="3" pr="10">
            <Text fontWeight="semibold" fontSize="sm" textAlign="end" pr="10" pt="2">
              Total Deductions:
            </Text>
            <Text fontWeight="semibold" fontSize="sm" textAlign="end" pt="2">
              {totalDeductions}
            </Text>
          </Flex>
        </FormControl>

        <FormControl pt={4}>
          <FormLabel>Reimbursements</FormLabel>
          {reimbursementsFields.map(({ id }, idx) => {
            return (
              <HStack key={id} mb="3">
                <Select
                  placeholder="Select"
                  size="sm"
                  id={`reimbursements.${idx}.id`}
                  {...register(`reimbursements.${idx}.id`)}
                >
                  {reimbursementsMapping?.edges.map((reimbursement) => (
                    <>
                      <option value={reimbursement?.id}>{reimbursement?.name}</option>
                    </>
                  ))}
                </Select>
                <Input
                  type="number"
                  size="sm"
                  id={`reimbursements.${idx}.amount`}
                  {...register(`reimbursements.${idx}.amount`)}
                />
                <IconButton
                  aria-label="add field"
                  icon={<PlusIcon height="12px" />}
                  variant="outline"
                  fontSize="5px"
                  size="sm"
                  onClick={() => reimbursementsAppend({ id: '', amount: 0 })}
                />
              </HStack>
            )
          })}
          <Flex justify="space-between" borderTop="1px solid" borderColor="gray.200" mt="3" pr="10" pb="2">
            <Text fontWeight="semibold" fontSize="sm" textAlign="end" pr="10" pt="2">
              Total Reimbursements:
            </Text>
            <Text fontWeight="semibold" fontSize="sm" textAlign="end" pt="2">
              {totalReimbursements}
            </Text>
          </Flex>
        </FormControl>

        <Flex
          justify="space-between"
          borderTop="3px solid"
          borderBottom="6px double"
          borderColor="gray.200"
          bg="gray.100"
          mt="10"
          pr="10"
          pb="2"
        >
          <Text fontWeight="bold" fontSize="sm" textAlign="end" pr="10" pt="2" pl="2">
            NET INCOME
          </Text>
          <Text fontWeight="bold" fontSize="sm" textAlign="end" pt="2">
            {netIncome}
          </Text>
        </Flex>
      </Stack>

      <Stack mt="10">
        <Text
          fontSize="18px"
          color="gray.800"
          fontWeight="semibold"
          borderBottom="2px solid"
          pb="2"
          borderColor="gray.100"
        >
          Payment Information
        </Text>

        <FormControl isRequired>
          <FormLabel size="xs" color="gray.700">
            Deposite Date
          </FormLabel>
          <Input id="email" type="date" size="sm" {...register('depositDate')} />
        </FormControl>
        <FormControl>
          <FormLabel size="xs" color="gray.700">
            Account Number
          </FormLabel>
          <Input id="email" type="text" size="sm" {...register('accountNumber')} isDisabled />
        </FormControl>
        <FormControl>
          <FormLabel size="xs" color="gray.700">
            Bank Name
          </FormLabel>
          <Input id="email" type="text" size="sm" {...register('bankName')} isDisabled />
        </FormControl>
      </Stack>

      <Flex mt="6" justifyContent="end">
        <Button variant="outline" mr="4" onClick={onClose}>
          Cancel
        </Button>
        <Button colorScheme="blue" type="submit" isLoading={isSubmitting}>
          Save Changes
        </Button>
      </Flex>
    </form>
  )
}

export default ManagePayslipForm
