'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faXmark,
} from '@fortawesome/pro-duotone-svg-icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Search from '../Search/Search.server'
import SMButtons from '../SMButtons/SMButtons'
import useBreakpoints from '../../../hooks/useBreakPoints'
import ChurchToggle from '../ChurchToggle/ChurchToggle'
import styles from './styles.module.scss'

const HeaderClient = ({ navData, searchComponent }) => {
  const [mobileMenuIsOpen, setMobileMenuOpen] =
    useState(false)
  const pathname = usePathname()
  const isSaintsPage = pathname.startsWith('/saints/')

  const saintsCount =
    navData?.saints_aggregated?.[0]?.count?.id
  const miraclesCount =
    navData?.miracles_aggregated?.[0]?.count?.id
  const teachingsCount =
    navData?.teachings_aggregated?.[0]?.count?.id
  const booksCount =
    navData?.books_aggregated?.[0]?.count?.id
  const quotesCount =
    navData?.quotes_aggregated?.[0]?.count?.id
  const prayersCount =
    navData?.prayers_aggregated?.[0]?.count?.id

  const { isMobile } = useBreakpoints()

  const handleToggleMenu = (open) => {
    if (open) {
      setMobileMenuOpen(true)
      const body = document.querySelector('body')
      if (body) {
        body.style.overflow = 'hidden'
      }
    } else {
      setMobileMenuOpen(false)
      const body = document.querySelector('body')
      if (body) {
        body.style.overflow = 'unset'
      }
    }
  }

  const handleClick = () => {
    const body = document.querySelector('body')
    if (body) {
      body.style.overflow = 'unset'
    }
  }

  return (
    <div
      className={`${styles.header} ${
        mobileMenuIsOpen ? styles.mobileMenuOpen : ''
      } ${isSaintsPage ? styles.transparent : ''}
}`}
    >
      <div className={styles.row}>
        <div className={`${styles.content}`}>
          {mobileMenuIsOpen && (
            <div className={styles.close}>
              <FontAwesomeIcon
                icon={faXmark}
                size="2xl"
                style={{ color: '#dbdfe6' }}
                onClick={() => handleToggleMenu(false)}
              />
            </div>
          )}
          <div className={styles.colLeft}>
            {searchComponent}
            {/* <SMButtons transparent={isSaintsPage} /> */}
            {isMobile && (
              <FontAwesomeIcon
                icon={faBars}
                size="2xl"
                style={{ color: '#ccad00' }}
                onClick={() => handleToggleMenu(true)}
              />
            )}
          </div>

          <div className={styles.colCenter}></div>

          <div className={styles.colRight}>
            <div className={styles.navigation}>
              <Link
                href="/saints"
                className="nav-link"
                onClick={() => handleClick()}
              >
                Saints
                {saintsCount && (
                  <span className={styles.count}>
                    ({saintsCount})
                  </span>
                )}
              </Link>
              {teachingsCount ? (
                <Link
                  href="/teachings"
                  className="nav-link"
                  onClick={() => handleClick()}
                >
                 
                  Teachings
                  <span className={styles.count}>
                    ({teachingsCount})
                  </span>
                </Link>
              ) : (
                ''
              )}
              {/* <Link
                href="/miracles"
                className="nav-link"
                onClick={() => handleClick()}
              >
                <span className={styles.count}>
                    {miraclesCount}
                  </span>
                Miracles
              </Link> */}
              {quotesCount ? (
                <Link
                  href="/quotes"
                  className="nav-link"
                  onClick={() => handleClick()}
                >
                 
                  Quotes
                  <span className={styles.count}>
                    ({quotesCount})
                  </span>
                </Link>
              ) : (
                ''
              )}
              {prayersCount ? (
                <Link
                  href="/novenas"
                  className="nav-link"
                  onClick={() => handleClick()}
                >
                  Novenas
                  <span className={styles.count}>
                    ({prayersCount})
                  </span>
                </Link>
              ) : (
                ''
              )}
              {/* <Link
                href="/books"
                onClick={() => handleClick()}
              >
                {booksCount && (
                  <span className={styles.count}>
                    {booksCount}
                  </span>
                )}
                Books
              </Link> */}
            </div>
            <div className={styles.misc}>
              <Link
                href="/about"
                onClick={() => handleClick()}
              >
                About
              </Link>
              {/* <Link
                href="/feedback"
                onClick={() => handleClick()}
              >
                Feedback
              </Link> */}
              <Link
                href="/updates"
                onClick={() => handleClick()}
              >
                Recent Updates
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderClient
