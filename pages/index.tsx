import { FC } from 'react'
import Payslip from '@modules/payslip/Payslip'
import Layout from '@components/Layout'

const Home: FC = () => (
  <>
    <Layout title="Payslip">
      <Payslip />
    </Layout>
  </>
)

export default Home
