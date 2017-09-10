import Vue from 'vue';
import axios from 'axios';

export default function (token) {
  return axios.post('/api/users/verify', {
    id_token: token
  })
}
