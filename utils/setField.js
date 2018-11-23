const setField = (props = {}, name, value) => {
  const field = (props.fields || []).find((field = {}) => field.name === name) || {};
  field.value = value;
};

module.exports = setField;
