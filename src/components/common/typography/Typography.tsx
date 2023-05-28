import React from 'react';
import { type TypographyVariantType, type TypographyTextAlignType } from '../../../types';
import styles from './typography.module.css';

interface TypographyProps {
  variant: TypographyVariantType;
  className?: string;
  textAlign?: TypographyTextAlignType;
  children: string | React.JSX.Element | React.JSX.Element[] | string[]
}

const Typography: React.FC<TypographyProps> = ({
  variant,
  children,
  className = '',
  textAlign = 'left'
}) => {
  const commonStyle = {
    textAlign
  };
  switch (variant) {
    case 'h1': return <h1 style={commonStyle} className={`${className} ${styles.h1} ${styles.heading}`}>{children}</h1>;
    case 'h2': return <h2 style={commonStyle} className={`${className} ${styles.h2} ${styles.heading}`}>{children}</h2>;
    case 'h3': return <h3 style={commonStyle} className={`${className} ${styles.h3} ${styles.heading}`}>{children}</h3>;
    case 'h4': return <h4 style={commonStyle} className={`${className} ${styles.h4} ${styles.heading}`}>{children}</h4>;
    case 'h5': return <h5 style={commonStyle} className={`${className} ${styles.h5} ${styles.heading}`}>{children}</h5>;
    case 'h6': return <h6 style={commonStyle} className={`${className} ${styles.h6} ${styles.heading}`}>{children}</h6>;
    case 'p1': return <p style={commonStyle} className={`${className} ${styles.p1} ${styles.paragraph}`}>{children}</p>;
    case 'p2': return <p style={commonStyle} className={`${className} ${styles.p2} ${styles.paragraph}`}>{children}</p>;
    case 'p3': return <p style={commonStyle} className={`${className} ${styles.p3} ${styles.paragraph}`}>{children}</p>;
    default: return <p style={commonStyle} className={className}>{children}</p>;
  }
};

export default Typography;
