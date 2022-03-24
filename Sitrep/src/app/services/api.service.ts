import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Case } from 'src/models/sitrepCase';
import { Cases } from 'src/models/Cases';

@Injectable({
  providedIn: 'root'
})

//In the service we register all api methods
export class ApiService {

  constructor(private http: HttpClient) { }

  //Method for API request performed by using HATEOAS links 
  commonRequest(method: string, url: string, bodyData?){
    return this.http.request(method, url, {body: bodyData});
  }

  //Method to PATCH something to api endpoint
  //url and patchOperations as parameter
  //Content-Type set to application/json-patch+json
  patchRequest(url: string, patchOperations){
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type':  'application/json-patch+json' }) };
    return this.http.patch(url, patchOperations, httpOptions);
  }

  //Method to GET all cases from api endpoint /api/Cases
  //filter as parameter. OrderBy, Fields, PageNumber and PageSize is static
  getCases(filter: string): Observable<Cases> {
    let _params = new HttpParams()
    .set('Filter', filter)
    .set('OrderBy', 'CreatedAt asc')
    .set('Fields', 'CaseId,Title,Location,Description,PriorityName,StatusName,CreatedAt,ImageCount,LogCount,StatusId,PriorityId')
    .set('PageNumber', 1)
    .set('PageSize', 20);
    return this.http.get<Cases>(environment.apiURL + '/api/Cases', { params: _params });
  }

  //Method to GET one cases from api endpoint /api/Cases/{id}
  //caseId as parameter
  getCase(caseId){
    return this.http.get<Case>(environment.apiURL + '/api/Cases/' + caseId);
  }

  //Method to POST a cases to api endpoint /api/Cases
  //a case as parameter, that is set as the body
  postCase(body: Case) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type':  'application/json' }) };
    return this.http.post<Case>(environment.apiURL + '/api/Cases', body, httpOptions);
  }

  //Method to POST a log message to api endpoint /api/cases/{id}/Logs
  //caseId and logmessage as parameter
  postLogMessage(caseId, logMessage: string){
    return this.http.post(environment.apiURL + '/api/cases/' + caseId + '/Logs', {message: logMessage});
  }


  //Method to GET one cases from api endpoint /api/Images/{id}
  //imageId as parameter
  //responseType set to blob
  getImage(imageId) {
    return this.http.get(environment.apiURL + '/api/Images/' + imageId, {responseType: 'blob'});
  }

  //Method to POST a image to api endpoint /api/Images/Case/{id} or /api/Images
  //image appended as file to a formdata as parameter
  //caseId as parameter, if set image is postet to a case 
  postImage(imageForm: FormData, caseId?){
    if (caseId) {
      return this.http.post(environment.apiURL + '/api/Images/Case/' + caseId, imageForm);
    } else {
      return this.http.post(environment.apiURL + '/api/Images', imageForm);
    }
  }

  //Method to DELETE a image from api endpoint /api/Images/{id}
  deleteImage(imageId){
    return this.http.delete(environment.apiURL + '/api/Images/' + imageId);
  }

}
