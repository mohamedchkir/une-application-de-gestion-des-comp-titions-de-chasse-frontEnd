import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {StandardApiResponse} from "../../../models/standard-api-response";
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {MemberService} from "../../../services/member/member.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import {MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'app-dialog-member',
  templateUrl: './bottom-sheet-member.component.html',
  styleUrl: './bottom-sheet-member.component.css'
})
export class BottomSheetMemberComponent {
  memberForm!: FormGroup;
  errorResponse?: StandardApiResponse;
  constructor(private _bottomSheetRef: MatDialogRef<BottomSheetMemberComponent>,
              private _memberService: MemberService,
              private _fb: FormBuilder,
              private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.memberForm = this._fb.group({
      num: [''],
      name: [''],
      familyName: [''],
      nationality: [''],
      identityNumber: [''],
      identityDocument: [''],
    });
  }

  saveMember(){
    console.log(this.memberForm.value)
    this._memberService.saveMember(this.memberForm.value).subscribe(
      data => {
        this._bottomSheetRef.close();
        this.showSuccessSnackBar('Member added successfully!');

      },
      error => this.errorResponse = error.error
    )
  }
  private showSuccessSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Adjust the duration as needed
      panelClass: ['snackbar-success'], // Optional CSS class for styling
    });

  }
}
