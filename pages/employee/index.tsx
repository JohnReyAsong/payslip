import { FC } from 'react'
import Employee from '@modules/employee/Employee'
import Layout from '@components/Layout'

const EmployeePage: FC = () => (
  <>
    <Layout title="Employee">
      <Employee />
    </Layout>
  </>
)

export default EmployeePage
