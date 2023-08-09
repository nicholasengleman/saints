import Navigation from '../Navigation/Navigation'
import * as S from './styles'

type Props = {
  children: React.ReactNode
}

const Page = ({ children }: Props) => (
  <S.Page>
    <Navigation />
    <S.Body>{children}</S.Body>
  </S.Page>
)

export default Page
