import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Saint } from '../../home/summary/interfaces'
import * as S from './styles'

type Props = {
  children: React.ReactNode
  saints?: Saint[]
}

const Page = ({ children, saints }: Props) => (
  <S.Page>
    <Header
      saints={saints}
    />
    <S.Body>{children}</S.Body>
    <Footer />
  </S.Page>
)

export default Page