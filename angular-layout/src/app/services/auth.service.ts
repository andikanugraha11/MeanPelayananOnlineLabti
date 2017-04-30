import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  authToken : any;
  user : any;

  constructor(private http:Http) { }

  //Auth user
  authenticateUser(user){
    let headers = new Headers();
    return this.http.post('http://localhost:8081/users/auth',user,{headers:headers})
    .map(res=>res.json());
    //hapus localhost on production
  }

  //Store token on chace
  storeUserData(token,user){
  	localStorage.setItem('id_token', token);
  	localStorage.setItem('user', JSON.stringify(user));
  	this.authToken = token;
  	this.user = user;
  }
  getProfile(){
  	let headers = new Headers();
  	this.loadToken();
  	headers.append('Authorization', this.authToken);
  	return this.http.get('http://localhost:8081/users/profile',{headers: headers})
  	.map(res => res.json());
  }
  loadToken(){
  	const token = localStorage.getItem('id_token');
  	this.authToken = token;
  }
  // loadUserFromStorage(){
  //   const user = localStorage.getItem('user');
  // }
    loggedIn(){
    return tokenNotExpired();
  }

  logout(){
  	this.authToken 	= null;
  	this.user 		= null;
  	localStorage.clear();
  }
  //cekPraktikan
  getPraktikanByNpmAndKelas(praktikan){
    let headers = new Headers();
    return this.http.post('http://localhost:8081/praktikan/getPraktikanByNpmAndKelas',praktikan,{headers:headers})
    .map(res=>res.json());
  }
  
  //userRegister
  userRegister(user){
    let headers = new Headers();
    return this.http.post('http://localhost:8081/users/add',user,{headers:headers})
    .map(res=>res.json());
  }

  // Get All Praktikan
  getAllPraktikan(){
    let headers = new Headers();
    return this.http.get('http://localhost:8081/praktikan/getAllPraktikan', {headers : headers})
    .map(res=>res.json());
  }

  getPraktikanById(id){
    let headers = new Headers();
    return this.http.get('http://localhost:8081/praktikan/getPraktikanById/'+id ,{headers:headers})
    .map(res=> res.json());
  }

  //GET All PJ
  getAllPJ(){
    let headers = new Headers();
    this.loadToken();
  	headers.append('Authorization', this.authToken);
    return this.http.get('http://localhost:8081/users/getAllPj', {headers:headers})
    .map(res=>res.json());
  }

  // Get All Petugas
  getAllPetugas(){
    let headers = new Headers();
    return this.http.get('http://localhost:8081/users/getAllPetugas', {headers : headers})
    .map(res=>res.json());
  }

  //Add Praktikan
  addPraktikan(praktikan){
    let headers = new Headers();
    return this.http.post('http://localhost:8081/praktikan/add',praktikan,{headers:headers})
    .map(res=>res.json());
  }

  //setPasswordToNpm 
  setPasswordToNpm(data){
    let headers = new Headers();
    return this.http.post('http://localhost:8081/users/setPasswordToNpm',data,{headers:headers})
    .map(res=>res.json());
  }
  //Remove Praktikan
  removePraktikan(id){
    let headers = new Headers();
    return this.http.delete('http://localhost:8081/praktikan/removePraktikan/'+id ,{headers:headers})
    .map(res=> res.json());
  }

  //Remove PJ
  removePJ(id){
    let headers = new Headers();
    return this.http.delete('http://localhost:8081/users/removePJ/'+id ,{headers:headers})
    .map(res=> res.json());
  }

    //Remove PJ
  removePetugas(id){
    let headers = new Headers();
    return this.http.delete('http://localhost:8081/users/removePetugas/'+id ,{headers:headers})
    .map(res=> res.json());
  }

  //Add Penanggung Jawab
    addPj(pj){
    let headers = new Headers();
    return this.http.post('http://localhost:8081/users/add/pj',pj,{headers:headers})
    .map(res=>res.json());
  }

  //Add petugas
  addPetugas(petugas){
    let headers = new Headers();
    return this.http.post('http://localhost:8081/users/add/petugas',petugas,{headers:headers})
    .map(res=>res.json());
  }

  addPraktikumTk1(praktikum){
    let headers = new Headers();
    return this.http.post('http://localhost:8081/praktikum/add/tingkat1',praktikum,{headers:headers})
    .map(res=>res.json());
  }

  addPraktikumTk2(praktikum){
    let headers = new Headers();
    return this.http.post('http://localhost:8081/praktikum/add/tingkat2',praktikum,{headers:headers})
    .map(res=>res.json());
  }

  addPraktikumTk3(praktikum){
    let headers = new Headers();
    return this.http.post('http://localhost:8081/praktikum/add/tingkat3',praktikum,{headers:headers})
    .map(res=>res.json());
  }

  addPraktikumTk4(praktikum){
    let headers = new Headers();
    return this.http.post('http://localhost:8081/praktikum/add/tingkat4',praktikum,{headers:headers})
    .map(res=>res.json());
  }


  getAllPraktikumTk1(){
    let headers = new Headers();
    return this.http.get('http://localhost:8081/praktikum/getPraktikum/tk1', {headers : headers})
    .map(res=>res.json());
  }

  getAllPraktikumTk2(){
    let headers = new Headers();
    return this.http.get('http://localhost:8081/praktikum/getPraktikum/tk2', {headers : headers})
    .map(res=>res.json());
  }

  getAllPraktikumTk3(){
    let headers = new Headers();
    return this.http.get('http://localhost:8081/praktikum/getPraktikum/tk3', {headers : headers})
    .map(res=>res.json());
  }

  getAllPraktikumTk4(){
    let headers = new Headers();
    return this.http.get('http://localhost:8081/praktikum/getPraktikum/tk4', {headers : headers})
    .map(res=>res.json());
  }

  getPraktikumById(id){
    let headers = new Headers();
    return this.http.get('http://localhost:8081/praktikum/getPraktikumById/'+id, {headers : headers})
    .map(res=>res.json());
  }

  getPjDetail(id){
    let headers = new Headers();
    return this.http.get('http://localhost:8081/praktikum/getPraktikumByPj/'+id, {headers : headers})
    .map(res=>res.json());
  }

   getPraktikumDetailById(id){
    let headers = new Headers();
    return this.http.get('http://localhost:8081/praktikum/getPraktikumDetailById/'+id, {headers : headers})
    .map(res=>res.json());
  }

  //count report by praktikan and praktikumId
  getReportPraktikan(praktikanId,praktikumId){
    let headers = new Headers();
    return this.http.get('http://localhost:8081/laporan/getPraktikanReport/'+praktikanId+'/'+praktikumId, {headers : headers})
    .map(res=>res.json());
  }

  //deletePraktikumFromDetail
  deletePraktikanFromPraktikum(data){
    let headers = new Headers();
    return this.http.post('http://localhost:8081/praktikum/pullPraktikan',data,{headers:headers})
    .map(res=>res.json());
  }
  //Remove on create report
  removeReportOnCreate(reportId,praktikanId,detailId){
    let headers = new Headers();
    return this.http.get('http://localhost:8081/laporan/removeReportOnCreate/'+reportId+'/'+praktikanId+'/'+detailId, {headers : headers})
    .map(res=>res.json());
  }
  //Make report
  makeReport(report){
    let headers = new Headers();
    return this.http.post('http://localhost:8081/laporan/add',report,{headers:headers})
    .map(res=>res.json());
  }
  praktikanDoReport(report){
    let headers = new Headers();
    return this.http.post('http://localhost:8081/laporan/praktikanDoReport',report,{headers:headers})
    .map(res=>res.json());
  }
  updatePengulangan(reportId){
    let headers = new Headers();
    return this.http.get('http://localhost:8081/laporan/updatePengulangan/'+reportId, {headers : headers})
    .map(res=>res.json());
  }
  //Report 1 (status = dibuat )
  getReportByPraktikanId(id){
    let headers = new Headers();
    return this.http.get('http://localhost:8081/laporan/getReportByPraktikanId/'+id, {headers : headers})
    .map(res=>res.json());
  }

  getReportCreatedByPjId(id){
    let headers = new Headers();
    return this.http.get('http://localhost:8081/laporan/getReportCreatedByPjId/'+id, {headers : headers})
    .map(res=>res.json());
  }

  getReportCompleteByPjId(id){
    let headers = new Headers();
    return this.http.get('http://localhost:8081/laporan/getReportCompleteByPjId/'+id, {headers : headers})
    .map(res=>res.json());
  }

  //update proses & payment confirmation
  confirmPayment(reportId){
    let headers = new Headers();
    return this.http.get('http://localhost:8081/laporan/confirmPayment/'+reportId, {headers : headers})
    .map(res=>res.json());
  }

  //ReportonProgress
   getReportOnProgressByPraktikanId(id){
    let headers = new Headers();
    return this.http.get('http://localhost:8081/laporan/getReportOnProgressByPraktikanId/'+id, {headers : headers})
    .map(res=>res.json());
  }

  //ReportonProgress
   getReportCompleteByPraktikanId(id){
    let headers = new Headers();
    return this.http.get('http://localhost:8081/laporan/getReportCompleteByPraktikanId/'+id, {headers : headers})
    .map(res=>res.json());
  }

   getReportOnProgressByPjId(id){
    let headers = new Headers();
    return this.http.get('http://localhost:8081/laporan/getReportOnProgressByPjId/'+id, {headers : headers})
    .map(res=>res.json());
  }

  getAllReportOnProgress(){
    let headers = new Headers();
    return this.http.get('http://localhost:8081/laporan/getAllReportOnProgress', {headers : headers})
    .map(res=>res.json());
  }

  getAllReportComplete(){
    let headers = new Headers();
    return this.http.get('http://localhost:8081/laporan/getAllReportComplete', {headers : headers})
    .map(res=>res.json());
  }

  getReportById(id){
    let headers = new Headers();
    return this.http.get('http://localhost:8081/laporan/getReportById/'+id, {headers : headers})
    .map(res=>res.json());
  }

  getDetailPraktikumAvailable(praktikumDate,praktikumCode){
    let headers = new Headers();
    return this.http.get('http://localhost:8081/praktikum/getAvailablePraktikum/'+praktikumDate+'/'+praktikumCode, {headers : headers})
    .map(res=>res.json());
  }
}