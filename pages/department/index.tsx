import { FC } from 'react'
import Department from '@modules/department/Department'
import Layout from '@components/Layout'

const DepartmentPage: FC = () => (
  <>
    <Layout title="Department">
      <Department />
    </Layout>
  </>
)

export default DepartmentPage
