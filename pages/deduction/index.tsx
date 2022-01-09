import { FC } from 'react'
import Deduction from '@modules/deduction/Deduction'
import Layout from '@components/Layout'

const DeductionPage: FC = () => (
  <>
    <Layout title="Deduction">
      <Deduction />
    </Layout>
  </>
)

export default DeductionPage
