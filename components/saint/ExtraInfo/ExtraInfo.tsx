import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendarDays,
  faFamily,
} from '@fortawesome/pro-duotone-svg-icons'
import styles from './styles.module.scss'

const getDate = (dateTime) => {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const date = new Date(dateTime)
  const month = date.getMonth()
  const day = date.getDate()

  return `${monthNames[month]} ${day}`
}

const ExtraInfo = ({
  patron,
  orthodoxFeastDay,
  catholicFeastDay,
}) => {
  return (
    <div className={styles.extraInfo}>
      {(catholicFeastDay || orthodoxFeastDay) && (
        <div className={styles.row}>
          <div className={styles.icon}>
            <FontAwesomeIcon
              icon={faCalendarDays}
              style={{ fontSize: '20px' }}
            />
          </div>

          <div className={styles.data}>
            {catholicFeastDay && (
              <p>
                {orthodoxFeastDay
                  ? `Catholic: ${getDate(catholicFeastDay)}`
                  : `Feast: ${getDate(catholicFeastDay)}`}
              </p>
            )}
            {orthodoxFeastDay && (
              <p>
                {catholicFeastDay
                  ? `Orthodox: ${getDate(orthodoxFeastDay)}`
                  : `Feast: ${getDate(orthodoxFeastDay)}`}
              </p>
            )}
          </div>
        </div>
      )}

      {patron && (
        <div className={styles.row}>
          <div className={styles.icon}>
            <FontAwesomeIcon
              icon={faFamily}
              style={{ fontSize: '20px' }}
            />
          </div>
          <div className={styles.data}>
            <p>Patron: {patron}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ExtraInfo
