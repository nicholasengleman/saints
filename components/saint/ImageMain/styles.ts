import styled from 'styled-components'
import { device } from '../../../styles/devices'
import { colors } from '../../../styles/colors'

export const ImageContainer = styled.div`
  .image-global {
    position: relative;

    &:before {
      content: '';
      position: absolute;
      top: -1.5%;
      bottom: 0;
      left: -2.5%;
      right: 0;
      width: 105%;
      height: 105%;
      background-color: #fff;
      z-index: 0;
      border-radius: 14px;
    }

    img {
      object-fit: cover;
      border-radius: 10px;
    }
  }
`