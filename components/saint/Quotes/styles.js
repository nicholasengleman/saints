import styled from 'styled-components'

export const Quote = styled.div`
  flex: 1;
  border-radius: 5px;
  padding: 25px;
  background-color: #cceff6;
  margin-right: 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;

  .c-text {
    color: #353535;
    font-size: 15px;
    line-height: 1.5;
    font-weight: 600;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-align: left;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 30px;

    .c-topics {
      .topic {
        font-size: 12px;
        text-transform: uppercase;
        font-weight: 600;
        color: #4b5658;
      }
    }

    .quoteNumber {
      font-size: 12px;
      color: #4b5658;
    }
  }
`

export const SlideContainer = styled.div``