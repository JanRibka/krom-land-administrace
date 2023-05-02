import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

interface IProps {
  order: "first" | "second" | "third";
}

const ShadowStyled = styled(Box, {
  // Configure which props should be forwarded on DOM
  shouldForwardProp: (prop) => prop !== "order" && prop !== "sx",
  name: "CircleStyled",
  slot: "Root",
})<IProps>(
  ({ theme }) => `
    width: 20px;
    height: 4px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 62px;
    transform-origin: 50%;
    z-index: -1;
    filter: blur(1px);
    animation: shadow 0.5s alternate infinite ease;

    @keyframes shadow {
      0% {
        transform: scaleX(1.5);
      }
      40% {
        transform: scaleX(1);
        opacity: 0.7;
      }
      100% {
        transform: scaleX(0.2);
        opacity: 0.4;
      }
    }
`
);

export default ShadowStyled;
