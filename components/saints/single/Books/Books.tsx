import Image from 'next/image'
import { Title, Flex } from '@mantine/core'
import * as S from './styles'

type BookProps = {
  title: string
  author: {
    name: string
  }
  link: string
  pages?: string
  book_cover: {
    id: string
  }
}

const Book = ({
  title,
  author,
  link,
  pages,
  book_cover,
}: BookProps) => {
  return (
    <S.Book href={link}>
        {book_cover?.id ? (
          <Image
            src={`https://saints-cms.onrender.com/assets/${book_cover?.id}?fit=inside&height=170&width=140`}
            height="170"
            width="140"
            alt=""
            unoptimized={true}
          />
        ) : (
          <div
            className="placeholder"
            style={{
              height: '170px',
              width: '140px',
              minWidth: '140px',
              borderRadius: '5px',
              background: 'lightgray',
            }}
          ></div>
        )}
      <div
        className="book-info"
      >
        <div className="book-name">{title}</div>
        <div className="book-author">{author.name}</div>
        <div className="book-link">Buy On Amazon</div>
      </div>
    </S.Book>
  )
}

type BooksProps = {
  books: BookProps[]
}

const Books = ({ books }: BooksProps) => (
  <>
    <Title
      order={3}
      mb={10}
    >
      Books
    </Title>

    <Flex
      gap="md"
      wrap="wrap"
      justify="space-between"
      mb="50px"
    >
      {books?.map((book, i) => (
        <Book
          key={i}
          title={book?.title}
          author={book?.author}
          link={book?.link}
          book_cover={book?.book_cover}
        />
      ))}
    </Flex>
  </>
)

export default Books
