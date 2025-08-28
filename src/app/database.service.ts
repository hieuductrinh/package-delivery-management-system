import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
  withCredentials: true
};
const URL_BACKEND = "http://localhost:8080/api/v1";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }

  getDrivers() {
    return this.http.get(URL_BACKEND + "/drivers", { withCredentials: true });
  }

  addDriver(data: Object) {
    return this.http.post(URL_BACKEND + "/drivers/add", data, { observe: 'response', withCredentials: true });
  }

  deleteDriver(_id: String) {
    return this.http.delete(URL_BACKEND + "/drivers/delete" + `?_id=${_id}`, { ...httpOptions, withCredentials: true });
  }

  updateDriver(data: Object) {
    return this.http.put(URL_BACKEND + "/drivers/update", data, { observe: 'response', withCredentials: true });
  }

  getPackages() {
    return this.http.get(URL_BACKEND + "/packages", { withCredentials: true });
  }

  addPackage(data: Object) {
    return this.http.post(URL_BACKEND + "/packages/add", data, { observe: 'response', withCredentials: true });
  }

  deletePackage(_id: String) {
    return this.http.delete(URL_BACKEND + "/packages/delete" + `/${_id}`, { ...httpOptions, withCredentials: true });
  }

  updatePackage(data: Object) {
    return this.http.put(URL_BACKEND + "/packages/update", data, { observe: 'response', withCredentials: true });
  }

  getStats() {
    return this.http.get(URL_BACKEND + "/users/stats", { withCredentials: true });
  }

  login(credential: Object) {
    return this.http.post(URL_BACKEND + "/users/login", credential, { ...httpOptions, withCredentials: true });
  }

  signup(credential: Object) {
    return this.http.post(URL_BACKEND + "/users/signup", credential, { ...httpOptions, withCredentials: true });
  }

  signout() {
    return this.http.get(URL_BACKEND + "/users/signout", { ...httpOptions, withCredentials: true });
  }

  loginCheck() {
    return this.http.get(URL_BACKEND + "/users/login/check", { withCredentials: true });
  }
}
