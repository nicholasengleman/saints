import styled from 'styled-components'
import { colors } from '../../../styles/colors'
import { device } from '../../../styles/devices'

export const TableOfContents = styled.div`
  position: relative;
  height: calc(100% - 700px);
  margin-top: 50px;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    position: sticky;
    top: 200px;

    li {
      line-height: 1.5;
      font-size: 15px;
      font-weight: 400;
      margin-bottom: 10px;

      &:hover {
        a {
          color: #222;
          border-bottom: 1px solid ${colors.gold};
        }
      }

      &.active {
        a {
          color: #222;
          border-bottom: 1px solid ${colors.gold};
        }
      }

      a {
        transition: all 0.1s ease-in-out;
        color: #999;
        padding-bottom: 2px;
      }
    }
  }
`