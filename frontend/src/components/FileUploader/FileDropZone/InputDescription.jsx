const InputDescription = ({ baseClassName }) => {
  return (
    <p className={`${baseClassName}__input-description`}>
      Drag your .csv file here to start uploading.
    </p>
  );
};

export default InputDescription;
