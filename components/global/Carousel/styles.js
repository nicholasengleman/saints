import styled from 'styled-components'
import { device } from '../../../styles/devices'

export const carousel = styled.div`
  .embla {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .embla__container {
    display: flex;
  }

  .embla__viewport {
    width: 100%;
    overflow: hidden;
    position: relative;
  }

  .embla__next,
  .embla__prev {
    position: relative; /* Needed to position the pseudo-element correctly */
    width: 28px;
    min-width: 28px;
    min-height: 28px;
    height: 28px;
    background: none;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.2s ease-in-out,
      box-shadow 0.2s ease-in-out;
    z-index: 2; /* Position the button above the pseudo-element */
    display: none;

    @media ${device.tablet} {
      display: block;
    }

    &.disabled {
      opacity: 0;
      pointer-events: none;
    }

    &:hover,
    &:active {
      transform: scale(1.04);
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      box-shadow: -1px 2px 22px 14px rgba(0, 0, 0, 0.1);
      z-index: -1;
      opacity: 0; /* Initially hidden */
      transition: opacity 0.2s ease-in-out; /* Smooth transition of shadow */
    }

    &:hover::before,
    &:active::before {
      opacity: 1; /* Show the shadow on hover and active states */
    }
  }
`