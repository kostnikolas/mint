import axios from 'axios';

const REVIEW_ITEMS_URL = 'http://localhost:8000/reviews/';


const LOGOUT_URL = 'http://localhost:8000/api-auth/logout/';

const USER_INFO_URL = 'http://localhost:8000/accounts/';

const USER_SIGNUP_URL = 'http://localhost:8000/accounts/signup/';
const USER_SIGNIN_URL = 'http://localhost:8000/accounts/signin/';

const apiService = axios.create({
  withCredentials: true,
  xsrfHeaderName: 'X-CSRFToken',
  xsrfCookieName: 'csrftoken',
});

/**
 * Getting reviews items
 * @param {string} searchText the text to search
 */
export async function getReviewItems(searchText, filter) {
  let url = searchText === '' ? REVIEW_ITEMS_URL : `${REVIEW_ITEMS_URL}?search=${searchText}`;
  url = filter === '' ? url : `${url}&evaluation=${filter}`;
  const response = await apiService.get(url);
  return response.data;
}

/**
 * Login user
 * @param {string} username username (login)
 * @param {string} password user password
 */
export async function loginUser(username, password) {
  try {
    await apiService.post(USER_SIGNIN_URL, {
      username, password,
    });
    return { success: true };
  } catch (error) {
    return { error };
  }
}

/**
 * Get detail for review
 * @param {number} id review id
 */
export async function loadReviewDetail(id) {
  const url = ` ${REVIEW_ITEMS_URL}${id}/`;
  try {
    const response = await apiService.get(url);
    return response.data;
  } catch {
    return null;
  }
}

/**
 * Update review
 * @param {number} id review id
 * @param {string} blogger blogger name
 * @param {number} evaluation blogger evaluation
 */
export async function updateReview(id, blogger, evaluation) {
  const url = ` ${REVIEW_ITEMS_URL}${id}/`;

  try {
    const response = await apiService.put(url, { blogger, evaluation });
    return { success: response.data };
  } catch (err) {
    return { error: err };
  }
}

/**
 * Create review
 * @param {string} blogger blogger name
 * @param {number} evaluation blogger evaluation
 */
export async function createReview(blogger, evaluation) {
  try {
    const response = await apiService.post(REVIEW_ITEMS_URL, { blogger, evaluation });
    return { success: response.data };
  } catch (err) {
    return { error: err };
  }
}

/**
 * Getting user info.
 * @returns [null] if the user is not authorized
 * @returns [object] if the user is authorized
 */
export async function getUserInfo() {
  try {
    const response = await apiService.get(USER_INFO_URL);
    return response.data;
  } catch {
    return null;
  }
}

/**
 * Logout user
 */
export async function logoutUser() {
  try {
    const response = await apiService.get(LOGOUT_URL);
    return response.data;
  } catch {
    return null;
  }
}

/**
 * Signup user
 * @param {string} username User name
 * @param {string} email E-mail
 * @param {string} password Password
 * @param {string} firstName First name
 * @param {string} lastName Last name
 */
export async function signupUser(username, email, password, firstName, lastName) {
  try {
    const response = await apiService.post(USER_SIGNUP_URL, {
      username, email, password, first_name: firstName, last_name: lastName,
    });
    return { success: response.data };
  } catch (error) {
    return { error };
  }
}
