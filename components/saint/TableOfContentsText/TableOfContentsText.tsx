'use client'

import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'

const TableOfContentsText: React.FC<{}> = () => {
  const [elements, setElements] = useState<HTMLElement[]>(
    [],
  )
  const [activeHeading, setActiveHeading] = useState('')

  useEffect(() => {
    const nodeList =
      document?.querySelectorAll<HTMLElement>('#text h2') ||
      []
    const elementsArray = Array.from(nodeList)
    setElements(elementsArray)

    nodeList?.forEach((h2, index) => {
      h2.id = `heading-${index + 1}`
    })
  }, [])

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
    <div className={styles.tableOfContents}>
      <ul className="sticky">
        {elements?.map((element, i) => (
          <li
            key={i}
            className={
              activeHeading === `heading-${i + 1}`
                ? styles.active
                : ''
            }
          >
            <a href={`#heading-${i + 1}`}>
              {i + 1}. {element.innerText}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TableOfContentsText
