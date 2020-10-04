const message = {
  EMAIL_REQUIRED: "Email is Required",
  PASSWORD_REQUIRED: "Password is Required",
  USER_CREATED: "Registered Successfully",
  EMAIL_PASSWORD_INCORRECT: "Email/Passowrd is incorrect",
  USER_EXISTS: "User Already Exists",
  CREATE_USER_FAILED: "Failed to create user",
  EDIT_USER_FAILED: "Failed to edit user",
  CREATE_EMPLOYEE_FAILED: "Failed to create employee",
  EDIT_EMPLOYEE_FAILED: "Failed to edit employee",
  CREATE_EMPLOYEE_SUCCESS: "Employee has been added successfully",
  EDIT_EMPLOYEE_SUCCESS: "Employee has been edited successfully",
  CLASS_MISSING_YEAR: "Year is mandatory",
  IMPROPER_REQUEST: "Request Parameter are not valid",
  MISSING_ID: "Id is mandatory",
  DELETE_USER_FAILED: "Delete user failed",
  DELETE_EMPLOYEE_FAILED: "Delete employee failed",
  DELETE_EMPLOYEE_SUCCESS: "Employee has been delete successfully",
  DB_ERROR: "Unexpected DB Error"
};

const code = {
  INVALID_PARAMETERS: "01",
  AUTHENTICATION_FAILED: "02",
  PERMISSION_DENIED: "03",
  INVALID_JSON: "04",
  DB_ERROR: "05",
  DATA_SUCCESS: "10"
};

const dbError = () => {
  return {
    code: code.DB_ERROR,
    message: message.DB_ERROR
  };
};

module.exports = {
  message,
  code,
  dbError
};
