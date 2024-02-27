import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {StandardApiResponse} from "../../../models/standard-api-response";
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {MemberService} from "../../../services/member/member.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-update-user-bottom-sheets',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './update-user-bottom-sheets.component.html',
  styleUrl: './update-user-bottom-sheets.component.css'
})
export class UpdateUserBottomSheetsComponent {
  memberForm!: FormGroup;
  errorResponse?: StandardApiResponse;

  roles: any[] = [
    'MANAGER',
    'JURY',
    'ADHERENT'
  ];

  constructor(private _bottomSheetRef: MatBottomSheetRef<UpdateUserBottomSheetsComponent>,
              private _memberService: MemberService,
              private _fb: FormBuilder,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: { user: any }) {
  }

  ngOnInit(): void {
    this.memberForm = this._fb.group({
      num: [this.data.user.num],
      role: [this.roles.at(2)],
    });
  }

  updateMember() {
    this._memberService.updateMember(this.memberForm.value).subscribe(
      data => {
        this._bottomSheetRef.dismiss();
      },
      error => this.errorResponse = error.error
    )
  }

}
