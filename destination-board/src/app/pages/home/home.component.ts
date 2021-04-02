import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpService } from '../../service/http.service'; 
import { Member } from '../../models/member';
import { environment } from 'src/environments/environment';
import { EditDialogComponent } from '../../components/edit-dialog/edit-dialog.component'
import {MatDialog} from '@angular/material/dialog';

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
  public displayedColumns: string[] = ['name', 'status', 'comment', 'action'];

  constructor(
    public httprequest : HttpService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.getMemberList();
  }

  public getMemberList(){
    var _params : HttpParams = new HttpParams();
    this.httpOptions.params = _params.append('id', environment.tenantName);
    this.httprequest.getRequest('/list', this.httpOptions).subscribe(result => {
      for (var i = 0, len = result['body'].length; i < len; ++i) {
        this.memberList = result['body'];
      };
     }),error => {
       console.log(error);
     }
  }

  public updateMemberStatus(data:Member){
    var updateData = {
      id: environment.tenantName,
      member: data.id,
      comment: data.comment,
      status: data.status
    }
    this.httprequest.postRequest('/member', updateData).subscribe(result => {
      console.log(result);
      this.ngOnInit()
     }),error => {
       console.log(error);
     }
  }

  public onRowClicked(data){
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '450px',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        data = result;
        this.updateMemberStatus(data);
      }
    });

  }
}