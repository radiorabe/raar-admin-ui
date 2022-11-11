export const environment = {
  production: true,
  // authenticationMethod: "password",
  // logoutUrl: undefined,
  // expects a path `/sso` that redirects to the SSO provider
  authenticationMethod: "sso",
  logoutUrl: "$base_url/../sso/redirect?logout=$redirect_url",
};
