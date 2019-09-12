const deleteField = (props = {}, name) => {
  props.fields = (props.fields || []).filter((field = {}) => field.name !== name);
};

module.exports = deleteField;
