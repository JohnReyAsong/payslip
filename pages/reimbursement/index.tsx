import { FC } from 'react'
import Reimbursement from '@modules/reimbursement/Reimbursement'
import Layout from '@components/Layout'

const ReimbursementPage: FC = () => (
  <>
    <Layout title="Reimbursement">
      <Reimbursement />
    </Layout>
  </>
)

export default ReimbursementPage
