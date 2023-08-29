import Image from 'next/image'
import Title from '../../../global/Title/Title'
import ImageGlobal from '../../../global/ImageGlobal/ImageGlobal'
import * as S from './styles'

type BookProps = {
  title: string
  author: string
  store_link: string
  pages?: number
  description: string
  book_cover: string
}

const Book = ({
  title,
  author,
  store_link,
  pages,
  book_cover,
  description,
}: BookProps) => {
  return (
    <S.Book>
      <div
        className="image"
        dangerouslySetInnerHTML={{
          __html: book_cover,
        }}
      ></div>
      <div className="book-info">
        <div className="book-name">{title}</div>
        <div className="book-author">{author}</div>
        <div className="book-description">
          {description}
        </div>
      </div>
    </S.Book>
  )
}

type BooksProps = {
  books: BookProps[]
}

const Books = ({ books }: BooksProps) => {
  if (books?.length) {
    return (
      <S.Books>
        <div className='container'>
          <Title>Books</Title>
          <div className="books-container">
            {books?.map((book, i) => (
              <Book
                key={i}
                {...book}
              />
            ))}
          </div>
        </div>
      </S.Books>
    )
  }

  return null
}

export default Books
