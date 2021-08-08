import { Observable, Subject } from "rxjs";

export class DataEditorResult {

  private _save: Subject<any> = new Subject<any>();
  private _close: Subject<void> = new Subject<void>();

  constructor(public data: any){}

  public get save$() : Observable<any> {
    return this._save.asObservable();
  }

  public get close$() : Observable<void> {
    return this._close.asObservable()
  }

  public save(data: any) : void {
    this._save.next(data);
  }

  public close() : void {
    this._close.next();
  }
}
