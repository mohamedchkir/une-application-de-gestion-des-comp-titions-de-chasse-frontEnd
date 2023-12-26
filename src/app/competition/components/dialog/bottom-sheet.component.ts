import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CompetitionService} from "../../../services/competition/competition.service";
import {StandardApiResponse} from "../../../models/standard-api-response";
import { MatSnackBar } from "@angular/material/snack-bar";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './bottom-sheet.component.html',
  styleUrl: './dialog.component.css'
})

export class BottomSheetComponent implements OnInit {
  @Output() competitionAdded = new EventEmitter<void>();
  competitionForm!: FormGroup;
  errorResponse?: StandardApiResponse;

  constructor(private _bottomSheetRef: MatDialogRef<BottomSheetComponent>,
              private competitionService: CompetitionService,
              private _fb: FormBuilder,
              private snackBar: MatSnackBar)
  {}

  ngOnInit(): void {
    this.competitionForm = this._fb.group({
      date: [''],
      startTime: [''],
      endTime: [''],
      location: [''],
      amount: [''],
    });
  }

  saveCompetition(){
    console.log(this.competitionForm.value)
    this.competitionService.saveCompetition(this.competitionForm.value).subscribe(
      data => {
        this._bottomSheetRef.close();
        this.showSuccessSnackBar('Competition added successfully!');
        this.competitionService.competitionAdded.emit();
      },
      error => this.errorResponse = error.error
    )
  }

  private showSuccessSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['snackbar-success'],
    });

  }
}
