import axios from 'axios';

const REVIEW_ITEMS_URL = 'http://localhost:8000/reviews/';
const LOGIN_URL = 'http://localhost:8000/api-auth/login/';

const apiService = axios.create({
  withCredentials: true,
});

export async function getReviewItems(searchText) {
  const url = searchText === '' ? REVIEW_ITEMS_URL : `${REVIEW_ITEMS_URL}?search=${searchText}`;
  const response = await apiService.get(url);
  return response.data;
}

export async function loginUser(username, password) {
  try {
    await apiService.post(LOGIN_URL, {
      username, password,
    });
    return null;
  } catch (error) {
    return error;
  }
}

export async function loadReviewDetail(id) {
  const url = ` ${REVIEW_ITEMS_URL}${id}/`;
  try {
    const response = await apiService.get(url);
    return response.data;
  } catch {
    return null;
  }
}

export async function updateReview(id, blogger, evaluation) {
  const url = ` ${REVIEW_ITEMS_URL}${id}/`;

  try {
    const response = await apiService.post(url, { blogger, evaluation });
    return { success: response.data };
  } catch (err) {
    return { error: err };
  }
}

export async function createReview(blogger, evaluation) {
  try {
    const response = await apiService.post(REVIEW_ITEMS_URL, { blogger, evaluation });
    return { success: response.data };
  } catch (err) {
    return { error: err };
  }
}