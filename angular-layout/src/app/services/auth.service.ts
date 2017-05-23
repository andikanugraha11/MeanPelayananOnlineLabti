import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  authToken: any;
  user: any;

  constructor(private http: Http) { }

  //PUBLIC SERVICE

  //Auth user
  authenticateUser(user) {
    let headers = new Headers();
    return this.http.post('users/auth', user, { headers: headers })
      .map(res => res.json());
    //hapus localhost on production
  }

  //Store token on chace
  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  //cekPraktikan
  getPraktikanByNpmAndKelas(praktikan) {
    let headers = new Headers();
    return this.http.post('praktikan/getPraktikanByNpmAndKelas', praktikan, { headers: headers })
      .map(res => res.json());
  }

  //userRegister
  userRegister(user) {
    let headers = new Headers();
    return this.http.post('users/add', user, { headers: headers })
      .map(res => res.json());
  }

  resendActivation(data) {
    let headers = new Headers();
    return this.http.post('users/resendActivation', data, { headers: headers })
      .map(res => res.json());
  }

  sendKey(data) {
    let headers = new Headers();
    return this.http.post('users/sendKey', data, { headers: headers })
      .map(res => res.json());
  }

  keyCheck(data) {
    let headers = new Headers();
    return this.http.post('users/keyCheck', data, { headers: headers })
      .map(res => res.json());
  }

  resetPasswordByKey(data) {
    let headers = new Headers();
    return this.http.post('users/resetByKey', data, { headers: headers })
      .map(res => res.json());
  }


  //PRIVATE SERVICE

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('users/profile', { headers: headers })
      .map(res => res.json());
  }


  getRole() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('users/role', { headers: headers })
      .map(res => res.json());
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired();
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  // Get All Praktikan
  getAllPraktikan() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('praktikan/getAllPraktikan', { headers: headers })
      .map(res => res.json());
  }

  getAllPraktikanActive() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('praktikan/getAllPraktikanActive', { headers: headers })
      .map(res => res.json());
  }

  getAllPraktikanNotActive() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('praktikan/getAllPraktikanNotActive', { headers: headers })
      .map(res => res.json());
  }

  getPraktikanById(id) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('praktikan/getPraktikanById/' + id, { headers: headers })
      .map(res => res.json());
  }

  getPraktikanByIdPopulate(id) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('praktikan/getPraktikanByIdPopulate/' + id, { headers: headers })
      .map(res => res.json());
  }

  //GET All PJ
  getAllPJ() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('users/getAllPj', { headers: headers })
      .map(res => res.json());
  }

  // Get All Petugas
  getAllPetugas() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('users/getAllPetugas', { headers: headers })
      .map(res => res.json());
  }

  //Add Praktikan
  addPraktikan(praktikan) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.post('praktikan/add', praktikan, { headers: headers })
      .map(res => res.json());
  }

  //Add Praktikan
  uploadPraktikan(file) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.post('praktikan/uploadcsv', file, { headers: headers })
      .map(res => res.json());
  }

  uploadCsv(files) {
    const formData: any = new FormData();
    formData.append("uploads[]", files[0], files[0]['name']);
    return this.http.post('praktikan/uploadcsvfile', formData)
      .map(res => res.json());
  }

  //setPasswordToNpm 
  setPasswordToNpm(data) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.post('users/setPasswordToNpm', data, { headers: headers })
      .map(res => res.json());
  }
  //Remove Praktikan
  removePraktikan(id) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.delete('praktikan/removePraktikan/' + id, { headers: headers })
      .map(res => res.json());
  }

  //Remove PJ
  removePJ(id) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.delete('users/removePJ/' + id, { headers: headers })
      .map(res => res.json());
  }

  //Remove PJ
  removePetugas(id) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.delete('users/removePetugas/' + id, { headers: headers })
      .map(res => res.json());
  }

  //Add Penanggung Jawab
  addPj(pj) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.post('users/add/pj', pj, { headers: headers })
      .map(res => res.json());
  }

  //Add petugas
  addPetugas(petugas) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.post('users/add/petugas', petugas, { headers: headers })
      .map(res => res.json());
  }

  addPraktikumTk1(praktikum) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.post('praktikum/add/tingkat1', praktikum, { headers: headers })
      .map(res => res.json());
  }

  addPraktikumTk2(praktikum) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.post('praktikum/add/tingkat2', praktikum, { headers: headers })
      .map(res => res.json());
  }

  addPraktikumTk3(praktikum) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.post('praktikum/add/tingkat3', praktikum, { headers: headers })
      .map(res => res.json());
  }

  addPraktikumTk4(praktikum) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.post('praktikum/add/tingkat4', praktikum, { headers: headers })
      .map(res => res.json());
  }


  getAllPraktikumTk1() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('praktikum/getPraktikum/tk1', { headers: headers })
      .map(res => res.json());
  }

  getAllPraktikumTk2() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('praktikum/getPraktikum/tk2', { headers: headers })
      .map(res => res.json());
  }

  getAllPraktikumTk3() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('praktikum/getPraktikum/tk3', { headers: headers })
      .map(res => res.json());
  }

  getAllPraktikumTk4() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('praktikum/getPraktikum/tk4', { headers: headers })
      .map(res => res.json());
  }

  getPraktikumById(id) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('praktikum/getPraktikumById/' + id, { headers: headers })
      .map(res => res.json());
  }

  getPjDetail(id) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('praktikum/getPraktikumByPj/' + id, { headers: headers })
      .map(res => res.json());
  }

  getUserByPraktikanId(id) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get(`users/getUserByPraktikanId/${id}`, { headers: headers })
      .map(res => res.json());
  }
  getPraktikumDetailById(id) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('praktikum/getPraktikumDetailById/' + id, { headers: headers })
      .map(res => res.json());
  }

  //count report by praktikan and praktikumId
  getReportPraktikan(praktikanId, praktikumId) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('laporan/getPraktikanReport/' + praktikanId + '/' + praktikumId, { headers: headers })
      .map(res => res.json());
  }

  //deletePraktikumFromDetail
  deletePraktikanFromPraktikum(data) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.post('praktikum/pullPraktikan', data, { headers: headers })
      .map(res => res.json());
  }
  //Remove on create report
  removeReportOnCreate(reportId, praktikanId, detailId) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('laporan/removeReportOnCreate/' + reportId + '/' + praktikanId + '/' + detailId, { headers: headers })
      .map(res => res.json());
  }
  //Make report
  makeReport(report) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.post('laporan/add', report, { headers: headers })
      .map(res => res.json());
  }
  praktikanDoReport(report) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.post('laporan/praktikanDoReport', report, { headers: headers })
      .map(res => res.json());
  }
  updatePengulangan(reportId) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('laporan/updatePengulangan/' + reportId, { headers: headers })
      .map(res => res.json());
  }
  //Report 1 (status = dibuat )
  getReportByPraktikanId(id) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('laporan/getReportByPraktikanId/' + id, { headers: headers })
      .map(res => res.json());
  }

  getReportCreatedByPjId(id) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('laporan/getReportCreatedByPjId/' + id, { headers: headers })
      .map(res => res.json());
  }

  getReportCompleteByPjId(id) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('laporan/getReportCompleteByPjId/' + id, { headers: headers })
      .map(res => res.json());
  }

  //update proses & payment confirmation
  confirmPayment(reportId) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('laporan/confirmPayment/' + reportId, { headers: headers })
      .map(res => res.json());
  }

  //ReportonProgress
  getReportOnProgressByPraktikanId(id) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('laporan/getReportOnProgressByPraktikanId/' + id, { headers: headers })
      .map(res => res.json());
  }

  //ReportonProgress
  getReportCompleteByPraktikanId(id) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('laporan/getReportCompleteByPraktikanId/' + id, { headers: headers })
      .map(res => res.json());
  }

  getReportOnProgressByPjId(id) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('laporan/getReportOnProgressByPjId/' + id, { headers: headers })
      .map(res => res.json());
  }
  getAllReport() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('laporan/getAllReport', { headers: headers })
      .map(res => res.json());
  }
  getAllReportCreated() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('laporan/getAllReportCreated', { headers: headers })
      .map(res => res.json());
  }
  getAllReportOnProgress() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('laporan/getAllReportOnProgress', { headers: headers })
      .map(res => res.json());
  }

  getAllReportComplete() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('laporan/getAllReportComplete', { headers: headers })
      .map(res => res.json());
  }

  getReportById(id) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('laporan/getReportById/' + id, { headers: headers })
      .map(res => res.json());
  }

  getDetailPraktikumAvailable(praktikumDate, praktikumCode) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('praktikum/getAvailablePraktikum/' + praktikumDate + '/' + praktikumCode, { headers: headers })
      .map(res => res.json());
  }

  cekPassword(data) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.post('users/cekPassword', data, { headers: headers })
      .map(res => res.json());
  }

  changePassword(data) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.post('users/changePassword', data, { headers: headers })
      .map(res => res.json());
  }
}