import { FC } from 'react'
import { Box, Text, Flex, SimpleGrid, Heading } from '@chakra-ui/react'

interface HovPayslipFormProps {
  values?: any
}

const HovPayslipForm: FC<HovPayslipFormProps> = ({ values }) => {
  const totalEarnings = values?.earnings
    ?.map((earning: { amount: number }) => parseInt(earning.amount as unknown as string))
    .reduce((prev: number, curr: number) => prev + curr, 0)

  const totalDeductions = values?.deductions
    ?.map((deduction: { amount: number }) => parseInt(deduction.amount as unknown as string))
    .reduce((prev: number, curr: number) => prev + curr, 0)

  const totalReimbursements = values?.reimbursements
    ?.map((reimbursement: { amount: number }) => parseInt(reimbursement.amount as unknown as string))
    .reduce((prev: number, curr: number) => prev + curr, 0)

  return (
    <Box p="10" pt="5" width="60vw">
      <Heading as="h4" mb="5">
        SALARY SLIP
      </Heading>
      <Box>
        <SimpleGrid columns={2}>
          <Flex>
            <Text fontWeight="bold" mr={1}>
              Employer:
            </Text>
            <Text>High Output Ventures</Text>
          </Flex>
          <Flex>
            <Text mr={1} fontWeight="bold">
              Pay Period:
            </Text>
            <Text>
              {values?.payPeriod?.startDate} to {values?.payPeriod?.endDate}
            </Text>
          </Flex>
        </SimpleGrid>

        <SimpleGrid columns={2}>
          <Flex>
            <Text fontWeight="bold" mr={1}>
              Address:
            </Text>
            <Text>Number 44-02 Raffles Place Singapore 048616</Text>
          </Flex>
          <Flex>
            <Text mr={1} fontWeight="bold">
              Payroll Date:
            </Text>
            <Text>{values?.payrollDate}</Text>
          </Flex>
        </SimpleGrid>
      </Box>

      <Box mt={4}>
        <SimpleGrid columns={2}>
          <Flex>
            <Text fontWeight="bold" mr={1}>
              Employee:
            </Text>
            <Text>{values?.employee?.name}</Text>
          </Flex>
          <Flex>
            <Text mr={1} fontWeight="bold">
              Designation
            </Text>
            <Text> {values?.employee?.designation}</Text>
          </Flex>
        </SimpleGrid>

        <SimpleGrid columns={2}>
          <Flex>
            <Text fontWeight="bold" mr={1}>
              Address:
            </Text>
            <Text>{values?.employee?.address}</Text>
          </Flex>
          <Flex>
            <Text mr={1} fontWeight="bold">
              Department:
            </Text>
            <Text>{values?.employee?.department}</Text>
          </Flex>
        </SimpleGrid>
      </Box>

      <Box>
        <Box mt={5} fontWeight="bold" bg="gray.100">
          <Text pos="relative" bottom="8px">
            EARNINGS
          </Text>
        </Box>

        <SimpleGrid columns={2} mt="2">
          <Text mr={1}>Salary:</Text>
          <Text>{values?.grossPay}</Text>
        </SimpleGrid>

        {values?.earnings.map((e: any) => (
          <SimpleGrid columns={2} key={e?.id}>
            <Text mr={1}>{e?.name}:</Text>
            <Text>{e?.amount}</Text>
          </SimpleGrid>
        ))}

        <SimpleGrid columns={2} mt="10" borderTop="1px solid" borderTopColor="gray.300">
          <Text fontWeight="bold" mr={1}>
            Total earnings:
          </Text>
          <Text>{totalEarnings + values?.grossPay}</Text>
        </SimpleGrid>
      </Box>

      <Box>
        <Flex mt={5} fontWeight="bold" bg="gray.100">
          <Text pos="relative" bottom="8px">
            DEDUCTIONS
          </Text>
        </Flex>
        {values?.deductions.map((d: any) => (
          <SimpleGrid columns={2} key={d?.id} mt="2">
            <Text mr={1}>{d?.name}:</Text>
            <Text>{d?.amount}</Text>
          </SimpleGrid>
        ))}

        <SimpleGrid columns={2} mt="10" borderTop="1px solid" borderTopColor="gray.300">
          <Text fontWeight="bold" mr={1}>
            Total deductions:
          </Text>
          <Text>{totalDeductions}</Text>
        </SimpleGrid>
      </Box>

      <Box>
        <Flex mt={5} fontWeight="bold" bg="gray.100">
          <Text pos="relative" bottom="8px">
            REIMBURSEMENTS
          </Text>
        </Flex>
        {values?.reimbursements.map((d: any) => (
          <SimpleGrid columns={2} key={d?.id} mt="2">
            <Text mr={1}>{d?.name}:</Text>
            <Text>{d?.amount}</Text>
          </SimpleGrid>
        ))}

        <SimpleGrid columns={2} mt="10" borderTop="1px solid" borderTopColor="gray.300">
          <Text fontWeight="bold" mr={1}>
            Total reimbursements:
          </Text>
          <Text>{totalReimbursements}</Text>
        </SimpleGrid>
      </Box>

      <Box mt={8}>
        <SimpleGrid columns={2} mt="2" bg="gray.100" fontWeight="bold">
          <Text pos="relative" bottom="8px">
            NET INCOME:
          </Text>
          <Text pos="relative" bottom="8px">
            {values?.netPay}
          </Text>
        </SimpleGrid>
      </Box>

      <Box mt={5}>
        <Flex>
          <Text fontWeight="bold" mr={1} mb={2}>
            PAYMENT INFORMATION
          </Text>
        </Flex>
        <Flex>
          <Text fontWeight="bold" mr={1}>
            Deposit Date:
          </Text>
          <Text>{values?.depositDate}</Text>
        </Flex>
        <Flex>
          <Text fontWeight="bold" mr={1}>
            Account #:
          </Text>
          <Text>{values?.employee?.accountNumber}</Text>
        </Flex>
        <Flex>
          <Text fontWeight="bold" mr={1}>
            Bank Name
          </Text>
          <Text>{values?.employee?.bankName}</Text>
        </Flex>
      </Box>
    </Box>
  )
}

export default HovPayslipForm
