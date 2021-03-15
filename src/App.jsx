import React, { useContext } from "react";
import { useSpring, animated } from "react-spring";
import { ThemeContext } from "./lib/provider/ThemeProvider";
import "./App.css";

const defaultProperties = {
  light: {
    circle: {
      r: 9
    },
    mask: {
      cx: 12,
      cy: 4
    },
    svg: {
      transform: "rotate(40deg)"
    },
    lines: {
      opacity: 0
    }
  },
  dark: {
    circle: {
      r: 5
    },
    mask: {
      cx: 30,
      cy: 4
    },
    svg: {
      transform: "rotate(90deg)"
    },
    lines: {
      opacity: 1
    }
  },
  springConfig: { mass: 4, tension: 250, friction: 35 }
};

const App = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { circle, svg, mask, lines } = defaultProperties[theme];

  const [svgProps, setSvgProps] = useSpring(() => ({
    ...svg,
    config: defaultProperties.springConfig
  }));
  const [maskedCircleProps, setMaskedCircleProps] = useSpring(() => ({
    ...mask,
    config: defaultProperties.springConfig
  }));
  const [centerCircleProps, setCenterCircleProps] = useSpring(() => ({
    ...circle,
    config: defaultProperties.springConfig
  }));
  const [linesProps, setLinesProps] = useSpring(() => ({
    ...lines,
    config: defaultProperties.springConfig
  }));

  setSvgProps(svg);
  setSvgProps(svg);
  setMaskedCircleProps(mask);
  setCenterCircleProps(circle);
  setLinesProps(lines);

  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="App" data-theme={theme} onClick={handleThemeToggle}>
      <animated.svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
        style={{ cursor: "pointer", ...svgProps }}
      >
        <mask id="myMask2">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <animated.circle
            style={{ ...maskedCircleProps }}
            r="9"
            fill="black"
          />
        </mask>

        <animated.circle
          cx="12"
          cy="12"
          style={{ ...centerCircleProps }}
          fill="black"
          mask="url(#myMask2)"
        />
        <animated.g stroke="currentColor" style={{ ...linesProps }}>
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </animated.g>
      </animated.svg>
    </div>
  );
};

export default App;
