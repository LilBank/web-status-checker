import InlineDivisorIcon from "../../../assets/icons/inline-divisor.svg?react";

const InputDivisor = ({ baseClassName }) => {
  return (
    <div className={`${baseClassName}__input-divisor`}>
      <InlineDivisorIcon />
      <p>OR</p>
      <InlineDivisorIcon />
    </div>
  );
};

export default InputDivisor;
