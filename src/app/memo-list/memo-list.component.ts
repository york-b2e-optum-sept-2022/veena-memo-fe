import { Component, OnInit } from '@angular/core';
import {IMemo} from "../interface/IMemo";
import {MemoService} from "../memo.service";

@Component({
  selector: 'app-memo-list',
  templateUrl: './memo-list.component.html',
  styleUrls: ['./memo-list.component.css']
})
export class MemoListComponent implements OnInit {

  public memoList: IMemo[] = [];

  constructor(private memoService: MemoService) {
    this.memoService.$memoList.subscribe(
      memoList => {
        this.memoList = memoList
        console.log(this.memoList)
      }
    );
  }
  ngOnInit(): void {
  }

}
