import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpService } from '../../service/http.service'; 
import { Member } from '../../models/member';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public memberList: Member[] = [];
  private httpOptions = {
    params: new HttpParams(),
    responseType: 'json'
  };


  constructor(
    public httprequest : HttpService,
    //public httpclient : HttpClient
    ) { }

  ngOnInit(): void {
    this.getMemberList();
  }

  public getMemberList(){
    var _params : HttpParams = new HttpParams();
    this.httpOptions.params = _params.append('id', environment.tenantName);
    this.httprequest.getRequest('/list', this.httpOptions).subscribe(result => {
      console.log(result);
      for (var i = 0, len = result['body'].length; i < len; ++i) {
        this.memberList = result['body'];
      };
     }),error => {
       console.log(error);
     }
  }

  public updateMemberStatus(){
    var _params : HttpParams = new HttpParams();
    var updateData = {
      id: environment.tenantName,
      member: "",
      comment: "",
      status: ""
    }
    this.httprequest.postRequest('/member', updateData, this.httpOptions).subscribe(result => {
      console.log(result);
     }),error => {
       console.log(error);
     }
  }


}
