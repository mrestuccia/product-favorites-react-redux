import axios from 'axios';

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const SET_FAVORITE_SUCCESS = 'SET_FAVORITE_SUCCESS';
const UNSET_FAVORITE_SUCESS = 'UNSET_FAVORITE_SUCCESS';

const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  user
});


const me = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    } else {
      return axios.get(`/api/session/${token}`)
        .then(response => response.data)
        .then(user => {
          loadFavorites(user.id);
          dispatch(loginSuccess(user));
        });
    }
  };
}

const login = (credentials) => {
  return (dispatch) => {
    return axios.post('/api/session', credentials)
      .then(response => response.data)
      .then(data => {
        localStorage.setItem('token', data.token)
        return axios.get(`/api/session/${data.token}`);
      })
      .then(response => response.data)
      .then(user => dispatch(loginSuccess(user)));
  };
};


const setFavoriteSuccess = (user) => ({
  type: SET_FAVORITE_SUCCESS,
  user: user
});


const setFavorite = (user, product) => {
  return (dispatch) => {
    return axios.put('/api/users/' + user.id, product)
      .then(response => dispatch(setFavoriteSuccess(response.data)));
  };
};

const unsetFavorite = () => (
  {
    type: UNSET_FAVORITE_SUCESS
  }
);




const authReducer = (state = {}, action) => {
  let clonedUser = {};
  switch (action.type) {
    case LOGIN_SUCCESS:
      state = Object.assign({}, state, { user: action.user });
      break;
    case SET_FAVORITE_SUCCESS:
      clonedUser = state.user;
      clonedUser.bestId = action.user.bestId;
      state = Object.assign({}, state, { user: clonedUser });
      break;
    case UNSET_FAVORITE_SUCESS:
      clonedUser = state.user;
      clonedUser.bestId = null;
      state = Object.assign({}, state, { user: clonedUser });
      break;
  }
  return state;
};





export {
  login,
  me,
  setFavorite,
  unsetFavorite
};

export default authReducer;
