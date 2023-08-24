import styled from 'styled-components'
import { colors, variables } from '../../../styles/colors'
import { device } from '../../../styles/devices'

export const Filter = styled.div`
  border-bottom: 1px solid #e2e2e2;
  width: 100%;
  font-size: 1.2rem;
  color: ${variables.headlineColor};
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 30px;

  @media ${device.tablet} {
    flex-direction: row;
  }

  .title {
    margin-bottom: 0.5rem;

    @media ${device.tablet} {
      margin-bottom: 0;
    }
  }

  .genres {
    display: flex;
    gap: 2rem;
    font-size: 1rem;
    font-weight: 400;

    .genre {
      padding-bottom: 1rem;
      cursor: pointer;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: calc((100% - 25px) / 2);
        height: 3px;
        width: 25px;
        background-color: ${colors.violet};
        opacity: 0;
      }

      &.selected::after {
        opacity: 1;
      }

      &:hover::after {
        opacity: 0.5;
      }
    }
  }
`