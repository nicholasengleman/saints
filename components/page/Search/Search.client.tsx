'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/pro-duotone-svg-icons'
import Fuse from 'fuse.js'
import { Saint } from '../../saint/SaintSummary/interfaces'
import { useOnClickOutside } from 'usehooks-ts'
import styles from './styles.module.scss'

const SearchClient = ({ searchData }) => {
  const ref = useRef(null)
  const [searchInput, setSearchInput] = useState('')
  const [searchOptions, setSearchOptions] = useState<
    Saint[]
  >([])

  const handleClickOutside = () => {
    setSearchInput('')
  }

  useEffect(() => {
    const strippedSearch = searchInput
      .replace(/\b(st\.?|saint|elder)\b/gi, '')
      .replace(/[.,//]/g, '')
      .trim()
      .toLowerCase()

    const fuse = new Fuse(searchData, {
      keys: ['name'],
      threshold: 0.3, // Increase threshold for more leniency
      shouldSort: true,
      location: 0, // Start at the beginning of the string
      distance: 100, // Increase distance to cover more character
    })

    if (strippedSearch.length > 1) {
      const results = fuse.search(strippedSearch)
      setSearchOptions(
        results.map((result) => result.item as Saint),
      )
    } else {
      setSearchOptions([])
    }
  }, [searchInput, searchData])

  useOnClickOutside(ref, handleClickOutside)

  if (!searchData) {
    return null
  }

  return (
    <div
      ref={ref}
      className={styles.search}
    >
      <div className={styles.searchContainer}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            className={styles.input}
            placeholder="Search For Saints"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
        <div className={styles.dropdownContent}>
          {searchOptions.map((option, i) => (
            <Link
              key={i}
              className={styles.result}
              href={`/saints/${option.slug}`}
              onClick={() => setSearchInput('')}
            >
              <div className={styles.profile}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_DIRECTUS_ASSETS}/assets/${option.profile_image?.id}?key=search`}
                  width={50}
                  height={50}
                  alt=""
                />
              </div>
              <div className={styles.info}>
                <div className={styles.name}>
                  {option.name}
                </div>
                <div className={styles.dates}>
                  {option.birth_year} - {option.death_year}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchClient
