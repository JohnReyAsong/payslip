import { FC, useEffect, useState } from 'react'
import { FormControl, FormLabel, Input, Stack, HStack, Text, Flex, Button, Select } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

import { Designation, UserRole } from 'types'
import { useUsersQuery, useDepartmentsQuery, useDesignationsQuery } from '@hooks/queries'
import useUserMutation from '@hooks/mutations/useUserMutation'
import { CustomUser } from '../Employee'
import { showToast } from '@utils/toastUtils'

interface ManageEmployeeFormProps {
  onClose(): void
  selectedEmployee?: CustomUser
  isCreate: boolean
}

const ROLE_TYPES = [
  {
    label: 'HR',
    value: UserRole.Hr,
  },
  {
    label: 'Member',
    value: UserRole.Member,
  },
]

const ManageEmployeeForm: FC<ManageEmployeeFormProps> = ({ onClose, selectedEmployee, isCreate }) => {
  console.log(selectedEmployee)
  const { handleSubmit, register, formState, reset } = useForm()
  const { createUserAction, updateUserAction } = useUserMutation()
  const { refetchUsers } = useUsersQuery()
  const [filteredDesignations, setFilteredDesignations] = useState<Designation[]>()
  const { departments } = useDepartmentsQuery()
  const { designations } = useDesignationsQuery()
  const { isSubmitting } = formState

  const onSelectDepartment = (name: string) => {
    const filterDesignations = designations?.edges.filter((designation) => designation?.department.name === name)
    console.log('filterDesignations', filterDesignations)
    setFilteredDesignations(filterDesignations as Designation[])
  }

  const onSubmit = async (value: CustomUser) => {
    if (isCreate) {
      const { data } = await createUserAction({
        input: {
          firstname: value.firstname,
          lastname: value.lastname,
          address: value.address,
          designation: value.designation,
          emailAddress: value.emailAddress,
          password: value.password,
          role: value.role,
          department: value.department,
          baseSalary: parseFloat(value.baseSalary as unknown as string),
          accountNumber: value.accountNumber,
          bankName: value.bankName,
        },
      })
      if (data?.createUser) {
        showToast('Created successfully!', 'success')
        onClose()
        refetchUsers()
      }
    } else {
      const { data } = await updateUserAction({
        id: value.id,
        input: {
          firstname: value.firstname,
          lastname: value.lastname,
          emailAddress: selectedEmployee?.emailAddress,
          designation: value.designation,
          password: value.password,
          role: value.role,
          department: value.department,
          baseSalary: parseFloat(value.baseSalary as unknown as string),
          accountNumber: value.accountNumber,
          bankName: value.bankName,
        },
      })
      if (data?.updateUser) {
        showToast('Updated successfully!', 'success')
        onClose()
        refetchUsers()
      }
    }
  }

  useEffect(() => {
    if (selectedEmployee) {
      reset({
        id: selectedEmployee?.id || '',
        firstname: selectedEmployee?.firstname || '',
        lastname: selectedEmployee?.lastname || '',
        address: selectedEmployee?.address || '',
        designation: selectedEmployee.designation || '',
        emailAddress: selectedEmployee?.emailAddress || '',
        password: selectedEmployee?.password || '',
        role: selectedEmployee?.role || UserRole.Member,
        department: selectedEmployee?.department || '',
        baseSalary: selectedEmployee?.baseSalary || 0,
        accountNumber: selectedEmployee?.accountNumber || '',
        bankName: selectedEmployee?.bankName || '',
      })
      onSelectDepartment(selectedEmployee?.department)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEmployee, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
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
        <HStack>
          <FormControl isRequired>
            <FormLabel size="xs" color="gray.700">
              First Name
            </FormLabel>
            <Input id="email" type="text" size="sm" {...register('firstname')} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel size="xs" color="gray.700">
              Last Name
            </FormLabel>
            <Input id="email" type="text" size="sm" {...register('lastname')} />
          </FormControl>
        </HStack>
        <FormControl isRequired>
          <FormLabel size="xs" color="gray.700">
            Address
          </FormLabel>
          <Input id="email" type="text" size="sm" {...register('address')} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel size="xs" color="gray.700">
            Role
          </FormLabel>
          <Select id="email" type="text" size="sm" {...register('role')}>
            {ROLE_TYPES.map((role) => (
              <>
                <option value={role.value}>{role.label}</option>
              </>
            ))}
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel size="xs" color="gray.700">
            Department
          </FormLabel>
          <Select
            id="email"
            type="text"
            size="sm"
            {...register('department')}
            onChange={(e) => onSelectDepartment(e.target.value)}
          >
            {departments?.edges.map((department) => (
              <>
                <option value={department?.name}>{department?.name}</option>
              </>
            ))}
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel size="xs" color="gray.700">
            Designation
          </FormLabel>
          <Select id="email" type="text" size="sm" {...register('designation')}>
            {filteredDesignations?.map((designation) => (
              <>
                <option value={designation?.id}>{designation?.name}</option>
              </>
            ))}
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel size="xs" color="gray.700">
            Base Salary
          </FormLabel>
          <Input id="email" type="number" step="0.01" size="sm" {...register('baseSalary')} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel size="xs" color="gray.700">
            Bank Name
          </FormLabel>
          <Input id="email" type="text" size="sm" {...register('bankName')} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel size="xs" color="gray.700">
            Account Number
          </FormLabel>
          <Input id="email" type="text" size="sm" {...register('accountNumber')} />
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
          Account Details
        </Text>
        <FormControl isRequired>
          <FormLabel size="xs" color="gray.700">
            Email Address
          </FormLabel>
          <Input id="email" type="text" size="sm" {...register('emailAddress')} />
        </FormControl>
        <FormControl {...(isCreate && { isRequired: true })}>
          <FormLabel size="xs" color="gray.700">
            Password
          </FormLabel>
          <Input id="email" type="text" size="sm" {...register('password')} />
        </FormControl>
      </Stack>

      <Flex mt="6" justifyContent="end">
        <Button variant="outline" mr="4" onClick={onClose}>
          Cancel
        </Button>
        <Button colorScheme="blue" isLoading={isSubmitting} type="submit">
          Save Changes
        </Button>
      </Flex>
    </form>
  )
}

export default ManageEmployeeForm
