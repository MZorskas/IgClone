import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';

const STYLES = [
  'btn--blue--solid',
  'btn--light--solid',
  'btn--white--solid',
  'btn--white--outline',
  'btn--white--solid--required',
];

const SIZES = ['btn--small', 'btn--medium', 'btn--large'];

function Button({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  form,
  to,
  required,
  modal,
  danger,
  id,
  marginRight,
}) {
  const Tag = to ? Link : 'button';
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
  const notAllowed = required ? 'btn--required' : '';
  const modalButton = modal ? 'btn--modal' : '';
  const dangerButton = danger ? 'btn--danger' : '';
  const marginRightButton = marginRight ? 'btn--margin--right' : '';

  return (
    <Tag
      className={`btn ${checkButtonStyle} ${checkButtonSize} ${notAllowed} ${modalButton} ${dangerButton} ${marginRightButton}`}
      onClick={onClick}
      type={type}
      to={to}
      form={form}
    >
      {children}
    </Tag>
  );
}

// function Button({ center, contactType, children }) {
//   const classes = center ? `ContactBlock center` : 'ContactBlock';
//   return (
//     <div className={classes}>
//       <div className="Black-box">{contactType}</div>
//       {children}
//     </div>
//   );
// }

export default Button;
