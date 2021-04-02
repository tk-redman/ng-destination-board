import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Member } from '../../models/member';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {
  public dialogData: Member;
  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Member) {
      this.dialogData = new Member(data.id, data.name, data.status, data.comment);
    }

  ngOnInit(): void {
    this.dialogData.status = this.dialogData.status;
  }

  changeStatus(event){
    if(event.checked){
      this.dialogData.status = 1;
    }else{
      this.dialogData.status = 0;
    }
  }

  changeComment(event){
    this.dialogData.comment = event.target.value;
  }

  cancelDialog(): void {
    this.dialogRef.close();
  }

}
