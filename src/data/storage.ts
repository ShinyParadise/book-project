export function saveToken(token: string) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function removeToken() {
  localStorage.removeItem("token");
}

export function removeUserId() {
  localStorage.removeItem("user_id");
}

export function saveUserId(id: string) {
  localStorage.setItem("user_id", id);
}

export function getUserId() {
  return localStorage.getItem("user_id");
}
