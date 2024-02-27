import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {MemberElement} from "../../models/member-element";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MemberService} from "../../../services/member/member.service";
import {BottomSheetMemberComponent} from "../dialog-member/bottom-sheet-member.component";
import {BottomSheetRegisterComponent} from "../bottom-sheet-register/bottom-sheet-register.component";
import {MatDialog} from "@angular/material/dialog";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {UpdateUserBottomSheetsComponent} from "../update-user-bottom-sheets/update-user-bottom-sheets.component";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit, OnDestroy {
  private _sub!: Subscription;
  displayedColumns: string[] = ["num", "first Name", "last name", "accession date", "nationality", "identity number", "identity document", "actions"];
  members: MemberElement[] = [];
  dataSource = new MatTableDataSource<MemberElement>(this.members);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _memberService: MemberService,
              private _bottomSheet: MatBottomSheet,
              private _Sheet: MatDialog,
              private _liveAnnouncer: LiveAnnouncer) {
  }

  ngOnInit(): void {
    this._sub = this._memberService.getMembers().subscribe(
      data => {
        this.members = data;
        this.dataSource = new MatTableDataSource<MemberElement>(this.members);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => console.error(error)
    )
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  openMemberBottomSheet(): void {
    this._Sheet.open(BottomSheetMemberComponent);
  }

  openRegisterBottomSheet(): void {
    this._bottomSheet.open(BottomSheetRegisterComponent);
  }

  openUpdateMemberBottomSheet(member: MemberElement): void {
    this._bottomSheet.open(UpdateUserBottomSheetsComponent, {
      data: {user: member}
    });
  }
}
