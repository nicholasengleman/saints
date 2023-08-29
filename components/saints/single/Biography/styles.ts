import styled from 'styled-components'
import { device } from '../../../../styles/devices'
import { colors } from '../../../../styles/colors'

export const Bio = styled.div<{ $readMore?: Boolean }>`
  color: #0e0e0e;
  margin-bottom: 60px;
  border-radius: 10px;
  position: relative;
  transition: height 0.2s ease-in-out;
  height: auto;

  h2 {
    color: #808080;
    font-weight: 500;
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
  }

  .summary {
    font-weight: 500;
    font-size: 14px;
    font-style: italic;
    line-height: 1.4;
    color: #000;
    margin-bottom: 20px;
    color: #525252;
    padding-bottom: 20px;
    border-bottom: 1px solid lightblue;
  }

  .text {
    height: calc(100% - 100px);
    overflow: hidden;

    h3,
    h2 {
      color: #222;
      font-weight: 500;
      font-size: 1.2rem;
      margin-top: 2rem;
      padding-left: 1rem;
      padding-bottom: 0.5rem;
      border-left: 1px solid #ddd;

      &:first-child {
        margin-top: 0;
      }
    }

    .ac-horizontal-separator {
      margin-top: 2rem;
    }

    p,
    ul {
      font-size: 0.9375rem;
      line-height: 1.6;
      color: #222;
      font-family: sans-serif;
      padding-bottom: 1rem;
      border-left: 1px solid #ddd;
      padding-left: 1rem;

      &:has(+ h3),
      &:last-child {
        padding-bottom: 0;
      }
    }

    ul {
      padding-left: 2rem;
      margin-bottom: 0;
      margin-top: 0;

      li {
        list-style-type: none; /* Remove default bullets */
        position: relative;
        padding-left: 20px; /* Space for the custom bullet */
        line-height: 1.3;
        margin-bottom: 0.5rem;
        font-size: 14px;

        &::before {
          content: ''; /* Bullet character */
          position: absolute;
          left: 0;
          top: 7px;
          height: 7px;
          width: 7px;
          border-radius: 50%;
          background: #ccebd9; /* Change this to your desired color */
        }
      }
    }
  }
`
