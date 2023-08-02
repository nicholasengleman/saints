import styled from 'styled-components'
import { colors } from '../../../styles/colors'

export const SaintSummary = styled.div`
  width: 300px;
  background: white;
  border: 1px solid lavender;
  border-radius: 20px;
  position: relative;
  background-color: ${colors.mint};
  box-shadow: -5px 4px 24px -5px rgba(0, 0, 0, 0.74);

  .image {
    width: 100%;
    position: relative;
    height: 300px;
    z-index: 2;

    img {
      object-fit: cover;
      object-position: 50% 10%;
      border-radius: 20px;
    }
  }

  .bioContainer {
    position: relative;
    z-index: 1;
    width: 90%;
    padding: 1rem 1rem 0.5rem 1rem;
    border-radius: 10px;
    width: 100%;

    .summary {
      color: #1a4760;
      margin-top: 10px;
      margin-bottom: 10px;
      display: -webkit-box;
      -webkit-line-clamp: 8;
      -webkit-box-orient: vertical;
      overflow: hidden;
      font-size: 14px;
    }
  }
`

export const Tags = styled.div`
  display: flex;
  gap: 7px;
  margin-bottom: 10px;

  .tag {
    padding: 3px 15px;
    background-color: #ccebd9;
    font-size: 10px;
    font-weight: 500;
    border-radius: 5px;
    color: #54846d;
    letter-spacing: 1.1px;
    font-weight: 600;
  }
`

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 5px 10px 5px;

  .footer-button {
    background: none;
    border: none;

    svg {
      vertical-align: baseline;
    }
  }

  .dates {
    font-size: 10px;
    color: #676666c2;
    text-align: right;
  }
`

export const Count = styled.span`
  color: #676666c2;
  font-size: 16px;
  font-weight: 600;
  margin-left: 7px;
`
