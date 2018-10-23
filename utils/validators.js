const validateUser = (user) => {
  if (typeof user !== 'string') {
    throw new TypeError(`User must be of type "string" but its type "${typeof user}"`);
  }

  if (user.length < 3) {
    throw new RangeError(`User must be at lease 3 chars long but it has a length of ${user.length}`);
  }
};

const validatePassword = (password) => {
  if (typeof password !== 'string') {
    throw new TypeError(`Password must be of type "string" but its type "${typeof password}"`);
  }

  if (password.length < 3) {
    throw new RangeError(`Password must be at lease 3 chars long but it has a length of ${password.length}`);
  }
};

const validateAction = (action) => {
  const validActions = ['sign-in', 'sign-out'];

  if (!validActions.includes(action)) {
    throw new RangeError(`Action must be one of "${validActions.join('", "')}" but it is "${action}"`);
  }
};

module.exports = {
  validateUser,
  validatePassword,
  validateAction,
};
