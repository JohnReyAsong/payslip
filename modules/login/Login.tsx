import { FC } from 'react'
import { FormControl, FormLabel, Input, Box, Button, Heading, Flex } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

import useLoginMutation from '@hooks/mutations/useLoginMutation'
import { AuthenticateInput } from 'types'
import { showToast } from '@utils/toastUtils'
import { login } from '@utils/authUtils'

const LoginModule: FC = () => {
  const { handleSubmit, register, formState } = useForm()
  const { isSubmitting } = formState
  const { loginAction } = useLoginMutation()
  const onLogin = async (values: AuthenticateInput) => {
    const { data } = await loginAction({
      input: {
        emailAddress: values.emailAddress,
        password: values.password,
      },
    })
    if (data?.authenticate) {
      const { token } = data.authenticate
      await showToast('Login successfully!', 'success')
      login(token, '/')
    }
  }

  return (
    <form onSubmit={handleSubmit(onLogin)}>
      <Flex alignItems="center" justifyContent="center" height="100vh">
        <Box width="400px" height="300px">
          <Heading as="h1" mb={10}>
            Payslip System
          </Heading>
          <FormControl isRequired mb={4}>
            <FormLabel size="xs" color="gray.700">
              Email Address
            </FormLabel>
            <Input
              id="email"
              type="text"
              size="sm"
              placeholder="Enter your email address"
              {...register('emailAddress')}
            />
          </FormControl>
          <FormControl isRequired mb={4}>
            <FormLabel size="xs" color="gray.700">
              Password
            </FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              size="sm"
              {...register('password')}
            />
          </FormControl>
          <Button colorScheme="blue" isLoading={isSubmitting} type="submit" width="full">
            Login
          </Button>
        </Box>
      </Flex>
    </form>
  )
}

export default LoginModule
