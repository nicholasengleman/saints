import { sanitize } from 'isomorphic-dompurify'
import * as S from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBook,
  faChurch,
  faQuoteRight,
} from '@fortawesome/free-solid-svg-icons'
import Name from '../../global/Name/Name'

import { Saint } from './interfaces'
import Slider from '../../global/Slider/Slider'

export default function SaintSummary(props: Saint) {
  const {
    name,
    biography,
    birth_date,
    death_date,
    photos,
    categories,
  } = props

  const getYear = (date: string): number => {
    const newDate = new Date(date)
    return newDate.getFullYear()
  }

  const age = getYear(death_date) - getYear(birth_date)

  return (
    <S.SaintSummary>
      <S.SliderContainer>
        <Slider photos={photos} />
      </S.SliderContainer>
      <S.BioContainer>
        <Name name={name} />
        <S.Tags>
          {categories?.map((category, index) => (
            <div
              key={index}
              className="tag"
            >
              {category}
            </div>
          ))}
        </S.Tags>
        <S.SummaryContainer>
          <S.Summary
            dangerouslySetInnerHTML={{
              __html: sanitize(biography),
            }}
          />
          <S.Dates>
            {getYear(birth_date)}-{getYear(death_date)} AD,{' '}
            {age} years
          </S.Dates>
        </S.SummaryContainer>

        <S.Footer>
          <S.FooterButton>
            <FontAwesomeIcon
              icon={faBook}
              fontSize="12px"
              style={{ color: '#676666c2' }}
            />
            <S.Count>0</S.Count>
          </S.FooterButton>
          <S.FooterButton>
            <FontAwesomeIcon
              icon={faChurch}
              fontSize="12px"
              style={{ color: '#676666c2' }}
            />
            <S.Count>0</S.Count>
          </S.FooterButton>
          <S.FooterButton>
            <FontAwesomeIcon
              icon={faQuoteRight}
              fontSize="12px"
              style={{ color: '#676666c2' }}
            />
            <S.Count>0</S.Count>
          </S.FooterButton>
        </S.Footer>
      </S.BioContainer>
    </S.SaintSummary>
  )
}