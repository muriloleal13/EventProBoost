import axios from 'axios';

export function GetPlace(query: string) {
  return axios.get(`https://api.teleport.org/api/cities/?search=${query}`);
}

export function GetPlaceData(id: string) {
  return axios.get(`https://api.teleport.org/api/cities/geonameid=${id}`);
}

export function GetPlaceImage(id: string) {
  return axios.get(`https://api.teleport.org/api/cities/geonameid=${id}`);
}
