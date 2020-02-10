// tslint:disable-next-line: max-line-length
import {
  Component,
  ViewChild,
  OnInit,
  AfterViewInit,
  Input,
  ViewEncapsulation,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from "@angular/core";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { PageEvent } from "@angular/material/paginator";
import { SelectionModel } from "@angular/cdk/collections";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: "Hydrogen", weight: 1.0079, symbol: "H" },
  { position: 2, name: "Helium", weight: 4.0026, symbol: "He" },
  { position: 3, name: "Lithium", weight: 6.941, symbol: "Li" },
  { position: 4, name: "Beryllium", weight: 9.0122, symbol: "Be" },
  { position: 5, name: "Boron", weight: 10.811, symbol: "B" },
  { position: 6, name: "Carbon", weight: 12.0107, symbol: "C" },
  { position: 7, name: "Nitrogen", weight: 14.0067, symbol: "N" },
  { position: 8, name: "Oxygen", weight: 15.9994, symbol: "O" },
  { position: 9, name: "Fluorine", weight: 18.9984, symbol: "F" },
  { position: 10, name: "Neon", weight: 20.1797, symbol: "Ne" }
];

@Component({
  // selector: 'app-root',
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, AfterViewInit, OnChanges {
  displayedColumns: string[] = [
    "select",
    "position",
    "name",
    "weight",
    "symbol",
    "actions"
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  selection = new SelectionModel<PeriodicElement>(true, []);

  @Output() selectionEmitter = new EventEmitter();
  @Output() deleteEmitter = new EventEmitter();

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @Input() inputfilter: string = "";
  selectedRow: any;

  constructor() {}

  /**
   * Called before ngOnInit() and whenever one or more data-bound input properties change.
   * @param changes //current and previous property values.
   */
  ngOnChanges(changes: SimpleChanges) {
    if ("inputfilter" in changes) {
      this.dataSource.filter = this.inputfilter.trim().toLowerCase();
      console.log("filtratooo");
    }
  }

  ngOnInit() {
    //qui bisogna recuperare il data source da un servizio con:
    //this.dataSource.data = this.servicw.getThing();

    // this.dataService.getPolicies().subscribe((result)=>{
    //   this.dataSource  =  result.body;
    // })

    console.log("ngOnInit called!");
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit called!");
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filter = this.inputfilter.trim().toLowerCase();

    //MODIFICATO QUI
    this.dataSource.data = this.dataSource.filteredData;
  }

  onRowClicked(row) {
    this.selectedRow = row;
  }

  applyFilter(filterValue: string) {
    this.selection.clear(); //deseleziono eventuale righe selezionate dall'utente
    console.log("applyFilter called!");
    this.dataSource.filter = filterValue.trim().toLowerCase();

    //this.dataSource.data =this.dataSource.filteredData;
  }

  /**
   *   Funzione chiamta ognivolta una colonna viene ordinata (asc/desc)
   */
  sortData(event) {
    console.log(event);
  }

  // ***********Selezione di righe della tabella **************************************

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.filteredData.length;
    //console.log(numSelected + "===" + numRows);
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.filteredData.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${
      this.selection.isSelected(row) ? "deselect" : "select"
    } row ${row.position + 1}`;
  }

  //quando si clicca il bottone Elimina tutti
  call() {
    //console.log(this.selection.selected);
    this.selectionEmitter.emit(this.selectedRowsById());
  }

  //quando si clicca il bottone 'Elimina selezionati'
  onSelectedRows() {
    this.selectionEmitter.emit(this.selectedRowsById());
  }

  selectedRowsById() {
    let idSelected: number[] = [];

    this.selection.selected.forEach(item => {
      console.log(item.position);
      idSelected.push(item.position);
    });

    return idSelected;
  }

  // *********************************************************

  /**
   * Cancellare record dalla tabella
   * Un evento viene lanciato con l'id del record da cancellare
   * @param id id del record della tabella da eliminare
   */
  onDeleteRow(id) {
    console.log("deletee" + id);
    this.deleteEmitter.emit(id);
  }
}
