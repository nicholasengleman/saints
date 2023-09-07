import * as S from './styles'
import Link from 'next/link'

const Footer = () => (
  <S.Footer>
    <div className="links">
      <div className="col">
        <div className="slogan">the online iconostasis</div>
        <div className="title">Salt of the Earth</div>
      </div>
      <div className="row">
        <Link href="/saints">Saints</Link>
        <Link href="/books">Books</Link>
        <Link href="/sayings">Teachings</Link>
        <Link href="/prayers">Prayers</Link>
        <Link href="/miracles">Miracles</Link>
        <Link href="/teachings">About</Link>
        <Link href="/teachings">FAQ</Link>
      </div>
    </div>
  </S.Footer>
)

export default Footer
