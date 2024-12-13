import Joi from "joi";

const authSchemaRegister = Joi.object({
  first_name: Joi.string().required().messages({
    "string.empty": "First name is required.",
  }),
  last_name: Joi.string().required().messages({
    "string.empty": "Last name is required.",
  }),
  user_name: Joi.string().required().messages({
    "string.empty": "Username is required.",
  }),
  university: Joi.string().required().messages({
    "string.empty": "University is required.",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email must be valid.",
    "string.empty": "Email is required.",
  }),
  password: Joi.string().min(3).required().messages({
    "string.min": "Password must be at least 3 characters long.",
    "string.empty": "Password is required.",
  }),
  confirm_password: Joi.any()
    .valid(Joi.ref("password")) // Ensure it matches 'password'
    .required()
    .messages({
      "any.only": "Confirm password does not match the password.",
      "string.empty": "Confirm password is required.",
    }),
});


const authSchemaLogin = Joi.object({
  loginIdentifier: Joi.string().required().messages({
    "string.empty": "Username or email is required.",
  }),
  password: Joi.string().min(3).required().messages({
    "string.min": "Password must be at least 3 characters long.",
    "string.empty": "Password is required.",
  }),
});





const authSchemaPayment = Joi.object({
  amount: Joi.string().required().messages({
    "string.empty": "amount is required.",
  }),
  cart: Joi.required().messages({
    "string.empty": "cart items can not be empty.",
  }),
  first_name: Joi.string().required().messages({
    "string.empty": "First name is required.",
  }),

  last_name: Joi.string().required().messages({
    "string.empty": "Last name is required.",
  }),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must contain exactly 10 digits.",
      "string.empty": "Phone number is required.",
    }),

  email: Joi.string()
    .email({ tlds: { allow: false } }) // Allow all TLDs by setting `allow: false`, can be modified to restrict specific TLDs
    .required()
    .messages({
      "string.email": "A valid email address is required.",
      "string.empty": "Email address is required.",
    }),

  address: Joi.string().required().messages({
    "string.empty": "Address is required.",
  }),

  city: Joi.string().required().messages({
    "string.empty": "City is required.",
  }),
});


const authSchemaPaymentDeliver = Joi.object({
  amount: Joi.string().required().messages({
    "string.empty": "amount is required.",
  }),
  cart: Joi.required().messages({
    "string.empty": "cart items can not be empty.",
  }),
  first_name: Joi.string().required().messages({
    "string.empty": "First name is required.",
  }),

  last_name: Joi.string().required().messages({
    "string.empty": "Last name is required.",
  }),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must contain exactly 10 digits.",
      "string.empty": "Phone number is required.",
    }),

  address: Joi.string().required().messages({
    "string.empty": "Address is required.",
  }),

  city: Joi.string().required().messages({
    "string.empty": "City is required.",
  }),
});

const authSchemaEmail = Joi.object({
  fullName: Joi.string()
    .required()
    .messages({
      "string.empty": "Name is required.",
    }),
  
  email: Joi.string()
    .email({ tlds: { allow: false } }) // Allow all TLDs by setting `allow: false`, can be modified to restrict specific TLDs
    .required()
    .messages({
      "string.email": "A valid email address is required.",
      "string.empty": "Email address is required.",
    }),

  message: Joi.string()
    .required()
    .messages({
      "string.empty": "Message is required.",
    }),
});




export { authSchemaRegister, authSchemaLogin, authSchemaPayment, authSchemaPaymentDeliver, authSchemaEmail };