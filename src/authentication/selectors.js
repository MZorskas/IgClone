// token
export const token = (state) => state.authentication.token;

// login
export const isLoginLoading = (state) => state.authentication.login.loading;
export const isStorageLoading = (state) =>
  state.authentication.login.storageLoading;
export const getLoginError = (state) => state.authentication.login.error;

// changePassword
export const getChangePasswordError = (state) =>
  state.authentication.changePassword.error;
export const isChangePasswordLoading = (state) =>
  state.authentication.changePassword.loading;
export const isChangePasswordSuccessful = (state) =>
  state.authentication.changePassword.success;

// editInfo
export const getEditInfoError = (state) => state.authentication.editInfo.error;
export const isEditInfoLoading = (state) =>
  state.authentication.editInfo.loading;
export const isEditInfoSuccessful = (state) =>
  state.authentication.editInfo.success;

// logout
export const isLogoutLoading = (state) => state.authentication.logout.loading;
export const getLogoutError = (state) => state.authentication.logout.error;

// register
export const isRegisterLoading = (state) =>
  state.authentication.register.loading;
export const getRegisterError = (state) => state.authentication.register.error;

export const getActiveUser = (state) => state.authentication.activeUser;
export const isAuthorized = (state) => state.authentication.activeUser.token;
export const getActiveUserId = (state) => state.authentication.activeUser._id;
export const getUserAvatar = (state) =>
  state.authentication.activeUser.profilePicture;

// addPhoneNumber
export const isAddPhoneNumberLoading = (state) =>
  state.authentication.addPhoneNumber.loading;
export const getAddPhoneNumberError = (state) =>
  state.authentication.addPhoneNumber.error;

// addEmail
export const isAddEmailLoading = (state) =>
  state.authentication.addEmail.loading;
export const getAddEmailError = (state) => state.authentication.addEmail.error;
