import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i) => {
    const delay = 1 + i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: 'spring', duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
};

export const Svg1 = () => {
  const Svg1Inview = useInView({ threshold: 0.3, triggerOnce: true });
  const Svg1Control = useAnimation();

  useEffect(() => {
    if (Svg1Inview.inView) {
      Svg1Control.start('visible');
    }
  }, [Svg1Inview.inView]);
  return (
    <motion.svg
      id="svg-dipi_svg_animator_1"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x={0}
      y={0}
      viewBox="0 0 841.9 841.9"
      style={{
        fill: 'none!important',
        enableBackground: 'new 0 0 841.9 841.9',
      }}
      xmlSpace="preserve"
      initial="hidden"
      animate={Svg1Control}
      ref={Svg1Inview.ref}
      className="will-change-transform"
    >
      {/* <style jsx={true}>
        {`
          .dipi_svg_animator_1 .st0 {
            fill: none;
            stroke: #000000;
            stroke-width: 1.0312;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-miterlimit: 10;
          }
          .dipi_svg_animator_1 .st1 {
            fill: none;
            stroke: #000000;
            stroke-width: 0.774;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-miterlimit: 10;
          }
        `}
      </style> */}
      <g>
        <g>
          <g>
            <motion.path
              fill="none"
              strokeWidth="10"
              stroke="#FFFFFF"
              className="st0 will-change-transform"
              d="M448.2,353.9c47.3,44.4,73.4,103.9,73.4,173.6c0,134.4-109.6,243.3-244.7,243.3S32.1,662,32.1,527.6
          s109.6-243.3,244.7-243.3c47.3,0,91.4,13.3,128.8,36.4"
              style={{
                // strokeDasharray: '1480, 1482',
                strokeDashoffset: 0,
              }}
              variants={draw}
              custom={1}
            ></motion.path>
            <motion.path
              fill="none"
              strokeWidth="10"
              stroke="#FFFFFF"
              className="st0 will-change-transform"
              d="M385.8,688.3c-31.1,20.9-68.6,33.1-109,33.1c-107.7,0-194.9-86.8-194.9-193.8s87.3-193.8,194.9-193.8
          c33.6,0,59.4,5.4,87,20.3"
              style={{
                // strokeDasharray: '817, 819',
                strokeDashoffset: 0,
              }}
              variants={draw}
              custom={1}
            ></motion.path>
            <motion.path
              fill="none"
              strokeWidth="10"
              stroke="#FFFFFF"
              className="st0 will-change-transform"
              d="M408.5,384.7c42.4,35.5,63.3,83.5,63.3,142.9c0,66.9-34.1,125.9-85.9,160.7"
              style={{
                // strokeDasharray: '352, 354',
                strokeDashoffset: 0,
              }}
              variants={draw}
              custom={1}
            ></motion.path>
            <motion.path
              fill="none"
              strokeWidth="10"
              stroke="#FFFFFF"
              className="st0 will-change-transform"
              d="M277.5,282.8L320.9,208.1L234.1,208.1Z"
              style={{
                // strokeDasharray: '260, 262',
                strokeDashoffset: 0,
              }}
              variants={draw}
              custom={1}
            ></motion.path>
          </g>
          <g>
            <motion.path
              fill="none"
              strokeWidth="10"
              stroke="#FFFFFF"
              className="st0 will-change-transform"
              d="M378.3,688.5c-95.6-95-95.6-249.1,0-344.1s250.5-95,346.1,0s95.6,249.1,0,344.1
          c-80.8,80.3-204.1,92.8-298,37.2"
              style={{
                // strokeDasharray: '1473, 1475',
                strokeDashoffset: 0,
              }}
              variants={draw}
              custom={1}
            ></motion.path>
            <motion.path
              fill="none"
              strokeWidth="10"
              stroke="#FFFFFF"
              className="st0 will-change-transform"
              d="M426.4,725.7"
              style={{
                // strokeDasharray: '0, 2',
                strokeDashoffset: 0,
              }}
              variants={draw}
              custom={1}
            ></motion.path>
            <motion.path
              fill="none"
              strokeWidth="10"
              stroke="#FFFFFF"
              className="st0 will-change-transform"
              d="M419.7,659.4c-2.1-1.9-4.2-3.9-6.2-5.9c-76.1-75.7-76.1-198.4,0-274.1c76.1-75.7,199.6-75.7,275.7,0
          c76.1,75.7,76.1,198.4,0,274.1c-61.9,61.5-154.9,73-228.5,34.6"
              style={{
                // strokeDasharray: '1172, 1174',
                strokeDashoffset: 0,
              }}
              variants={draw}
              custom={1}
            ></motion.path>
            <motion.path
              fill="none"
              strokeWidth="10"
              stroke="#FFFFFF"
              className="st0 will-change-transform"
              d="M726,343.8L809.8,321.5L748.4,260.5Z"
              style={{
                // strokeDasharray: '260, 262',
                strokeDashoffset: 0,
              }}
              variants={draw}
              custom={1}
            ></motion.path>
          </g>
        </g>
        <g>
          <g>
            <motion.path
              fill="none"
              strokeWidth="10"
              stroke="#FFFFFF"
              className="st1 will-change-transform"
              d="M495.8,282.9c5.5-5.5,9.9-12.1,12.9-19.4L568.1,118"
              // style={{ strokeDasharray: '181, 183', strokeDashoffset: 0 }}
              variants={draw}
              custom={2}
            ></motion.path>
            <motion.path
              fill="none"
              strokeWidth="10"
              stroke="#FFFFFF"
              className="st1 will-change-transform"
              d="M514.7,254.9c0,0,34.1-63.8,109.7-43.6C624.4,211.4,582.2,274.1,514.7,254.9z"
              style={{
                // strokeDasharray: '254, 256',
                strokeDashoffset: 0,
              }}
              variants={draw}
              custom={2}
            ></motion.path>
            <motion.path
              fill="none"
              strokeWidth="10"
              stroke="#FFFFFF"
              className="st1 will-change-transform"
              d="M565.3,123.8c0,0,29.9-65.8,106.7-50.5C671.9,73.3,633.9,138.7,565.3,123.8z"
              style={{
                // strokeDasharray: '254, 256',
                strokeDashoffset: 0,
              }}
              variants={draw}
              custom={2}
            ></motion.path>
            <motion.path
              fill="none"
              strokeWidth="10"
              stroke="#FFFFFF"
              className="st1 will-change-transform"
              d="M528.3,201.6c0,0-68.6-23.8-59.9-101.2C468.4,100.4,537.2,132.4,528.3,201.6z"
              style={{
                // strokeDasharray: '253, 255',
                strokeDashoffset: 0,
              }}
              variants={draw}
              custom={2}
            ></motion.path>
          </g>
        </g>
        <g>
          <g>
            <motion.path
              fill="none"
              strokeWidth="10"
              stroke="#FFFFFF"
              className="st1"
              d="M264.1,709.3c-0.4-7.8-2.3-15.5-5.7-22.6l-67.8-141.8"
              // style={{ strokeDasharray: '181, 183', strokeDashoffset: 0 }}
              variants={draw}
              custom={3}
            ></motion.path>
            <motion.path
              fill="none"
              strokeWidth="10"
              stroke="#FFFFFF"
              className="st1 will-change-transform"
              d="M256.1,676.4c0,0-24.3-68.2,41.5-110.5C297.6,565.9,315.7,639.4,256.1,676.4z"
              style={{
                // strokeDasharray: '254, 256',
                strokeDashoffset: 0,
              }}
              variants={draw}
              custom={3}
            ></motion.path>
            <motion.path
              fill="none"
              strokeWidth="10"
              stroke="#FFFFFF"
              className="st1 will-change-transform"
              d="M193,550.8c0,0-28.6-66.4,34.4-112.9C227.4,437.9,250.1,510.1,193,550.8z"
              style={{
                // strokeDasharray: '254, 256',
                strokeDashoffset: 0,
              }}
              variants={draw}
              custom={3}
            ></motion.path>
            <motion.path
              fill="none"
              strokeWidth="10"
              stroke="#FFFFFF"
              className="st1 will-change-transform"
              d="M225.8,630.5c0,0-63.8,34.7-115.2-23.7C110.5,606.8,180.5,577.4,225.8,630.5z"
              style={{
                // strokeDasharray: '253, 255',
                strokeDashoffset: 0,
              }}
              variants={draw}
              custom={3}
            ></motion.path>
          </g>
        </g>
      </g>
    </motion.svg>
  );
};

export const Svg2 = () => {
  const Svg2Inview = useInView({ threshold: 0.1, triggerOnce: true });
  const Svg2Control = useAnimation();

  useEffect(() => {
    if (Svg2Inview.inView) {
      Svg2Control.start('visible');
    }
  }, [Svg2Inview.inView]);
  return (
    <motion.svg
      id="svg-dipi_svg_animator_0"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 841.9 841.9"
      style={{
        fill: 'none!important',
        enableBackground: 'new 0 0 841.9 841.9',
      }}
      xmlSpace="preserve"
      initial="hidden"
      animate={Svg2Control}
      ref={Svg2Inview.ref}
      className="will-change-transform"
    >
      <style
        type="text/css"
        dangerouslySetInnerHTML={{
          __html:
            '.dipi_svg_animator_0 .st0{fill:none;stroke:#000000;stroke-width:1.0312;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}\n',
        }}
      />
      <g>
        <motion.path
          fill="none"
          strokeWidth={10}
          stroke="#FFFFFF"
          className="st0 will-change-transform"
          d="M241.1,270.5L124.8,460.2L469.3,780L343.7,460.2Z"
          variants={draw}
          custom={1}
        />
        <motion.path
          fill="none"
          strokeWidth={10}
          stroke="#FFFFFF"
          className="st0 will-change-transform"
          d="M124.8,460.2L343.7,460.2L469.3,270.5L594.9,460.2L813.8,460.2"
          variants={draw}
          custom={1}
        />
        <motion.path
          fill="none"
          strokeWidth={10}
          stroke="#FFFFFF"
          className="st0 will-change-transform"
          d="M697.5,270.5L813.8,460.2L469.3,780L594.9,460.2Z"
          variants={draw}
          custom={1}
        />
        <motion.path
          className="st0 will-change-transform"
          strokeWidth={10}
          stroke="#FFFFFF"
          d="M241.1,270.5L697.5,270.5"
          variants={draw}
          custom={1}
        />
        <motion.path
          className="st0 will-change-transform"
          strokeWidth={10}
          stroke="#FFFFFF"
          d="M594.9,460.2L343.7,460.2"
          variants={draw}
          custom={1}
        />
        <motion.path
          className="st0 will-change-transform"
          strokeWidth={10}
          stroke="#FFFFFF"
          d="M469.3,61.9L469.3,186.9"
          variants={draw}
          custom={1}
        />
        <motion.path
          className="st0 will-change-transform"
          strokeWidth={10}
          stroke="#FFFFFF"
          d="M237.7,139.5L319.3,234.3"
          variants={draw}
          custom={1}
        />
        <motion.path
          className="st0 will-change-transform"
          strokeWidth={10}
          stroke="#FFFFFF"
          d="M697.5,139.5L616,234.3"
          variants={draw}
          custom={1}
        />
        <motion.path
          fill="none"
          strokeWidth={10}
          stroke="#FFFFFF"
          className="st0 will-change-transform"
          d="M102.6,348.8A12.5,12.5 0,1,1 127.6,348.8A12.5,12.5 0,1,1 102.6,348.8"
          variants={draw}
          custom={1}
        />
        <motion.path
          fill="none"
          strokeWidth={10}
          stroke="#FFFFFF"
          className="st0 will-change-transform"
          d="M62.6,403.2A10.6,10.6 0,1,1 83.8,403.2A10.6,10.6 0,1,1 62.6,403.2"
          variants={draw}
          custom={1}
        />
        <motion.path
          fill="none"
          strokeWidth={10}
          stroke="#FFFFFF"
          className="st0 will-change-transform"
          d="M28.1,457.7A12,12 0,1,1 52.1,457.7A12,12 0,1,1 28.1,457.7"
          variants={draw}
          custom={1}
        />
        <motion.path
          fill="none"
          strokeWidth={10}
          stroke="#FFFFFF"
          className="st0 will-change-transform"
          d="M95.3,512.5A12,12 0,1,1 119.3,512.5A12,12 0,1,1 95.3,512.5"
          variants={draw}
          custom={1}
        />
        <motion.path
          fill="none"
          strokeWidth={10}
          stroke="#FFFFFF"
          className="st0 will-change-transform"
          d="M55,561A12.2,12.2 0,1,1 79.4,561A12.2,12.2 0,1,1 55,561"
          variants={draw}
          custom={1}
        />
        <motion.path
          fill="none"
          strokeWidth={10}
          stroke="#FFFFFF"
          className="st0 will-change-transform"
          d="M136,570.5A14,14 0,1,1 164,570.5A14,14 0,1,1 136,570.5"
          variants={draw}
          custom={1}
        />
      </g>
    </motion.svg>
  );
};
