import React, { useEffect, useState } from 'react'
import * as S from './styles'

type MainRefType = React.RefObject<HTMLElement>

const TableOfContentsText: React.FC<{
  mainRef: MainRefType
}> = ({ mainRef }) => {
  const [elements, setElements] = useState<HTMLElement[]>(
    [],
  )
  const [activeHeading, setActiveHeading] = useState('')

  useEffect(() => {
    const nodeList =
      mainRef.current?.querySelectorAll<HTMLElement>(
        'h2',
      ) || []
    const elementsArray = Array.from(nodeList)
    setElements(elementsArray)

    nodeList?.forEach((h2, index) => {
      h2.id = `heading-${index}`
    })
  }, [mainRef])

  useEffect(() => {
    const options = {
      rootMargin: '0px 0px -60% 0px',
      threshold: 1.0,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveHeading(entry.target.id)
        }
      })
    }, options)

    elements.forEach((element) => observer.observe(element))

    return () => {
      elements.forEach((element) =>
        observer.unobserve(element),
      )
    }
  }, [elements])

  return (
    <S.TableOfContents>
      <ul className="sticky">
        {elements?.map((element, i) => (
          <li
            key={i}
            className={
              activeHeading === `heading-${i}`
                ? 'active'
                : ''
            }
          >
            <a href={`#heading-${i}`}>
              {i + 1}. {element.innerText}
            </a>
          </li>
        ))}
      </ul>
    </S.TableOfContents>
  )
}

export default TableOfContentsText