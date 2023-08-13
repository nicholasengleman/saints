import styled from 'styled-components'

export const RelatedPerson = styled.div`
  a {
    text-decoration: none;
    display: flex;
  }

  img,
  .placeholder {
    margin-right: 10px;
    border-radius: 5px;
  }

  .person-info {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .name {
      font-size: 16px;
      font-weight: 700;
      line-height: 1.1;
      color: #1d1e1c;
    }

    .dates {
      font-size: 12px;
      color: #1d1e1c;
      font-weight: 700;
      margin-bottom: 10px;
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;

      .tag {
        padding: 2px 12px;
        background-color: #ccebd9;
        font-size: 9px;
        font-weight: 500;
        border-radius: 2px;
        color: #54846d;
        font-weight: 500;
        min-width: fit-content;
      }
    }
  }
`

export const RelatedPeople = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 40px;
`
