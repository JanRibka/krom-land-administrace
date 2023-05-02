import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

interface IProps {
  order: "first" | "second" | "third";
}

const CircleStyled = styled(Box, {
  // Configure which props should be forwarded on DOM
  shouldForwardProp: (prop) => prop !== "order" && prop !== "sx",
  name: "CircleStyled",
  slot: "Root",
})<IProps>(
  ({ theme }) => `
    width: 20px;
    height: 20px;
    position: absolute;
    border-radius: 50%;
    background-color: #000;
    transform-origin: 50%;
    animation: circle 0.5s alternate infinite ease;

    @keyframes circle {
        0% {
            top: 60px;
            height: 5px;
            border-radius: 50px 50px 25px 25px;
            transform: scaleX(1.7);
        }
        40% {
            height: 20px;
            border-radius: 50%;
            transform: scaleX(1);
        }
            100% {
            top: 0%;
        }
    }
`
);

export default CircleStyled;
