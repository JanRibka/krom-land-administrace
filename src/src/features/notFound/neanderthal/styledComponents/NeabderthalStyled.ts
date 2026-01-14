import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const NeanderthalStyled = styled(Box)(
  ({ theme }) => `
  width: 100%;
  display: flex;
  justify-content: center;

  svg {
    width: 412px;
    height: 214px;

    ${theme.breakpoints.down("md")} {
      width: 288px;
      height: 139px;
  
      #neanderthal-size {
        transform: matrix(0.7, 0, 0, 0.7, 0, 0);
      }
    }
  }

  #stone {
    animation: stone 1.5s infinite linear;
    transform-origin: 50% 98%;
  }

  @keyframes stone {
    0% {
        transform: translate3d(0px, 0px, 0px);
    }
    20% {
        transform: translate3d(0px, 10px, 10px);
    }
    40% {
        transform: translate3d(10px, 10px, 0px);
    }
    60% {
        transform: translate3d(-10px, 0px, 0px);
    }
    80% {
        transform: translate3d(10px, 10px, 10px);
    }
    100% {
        transform: translate3d(0px, 0px, 0px);
    }
  }
`
);

export default NeanderthalStyled;
