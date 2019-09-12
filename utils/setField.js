const setField = (props = {}, name, value) => {
  const field = (props.fields || []).find((field = {}) => field.name === name);

  if (field) {
    field.value = value;
  } else {
    (props.fields || []).push({
      name,
      value,
    });
  }
};

module.exports = setField;
