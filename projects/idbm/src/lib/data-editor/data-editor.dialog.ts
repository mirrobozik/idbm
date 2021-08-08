import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector, NgZone } from '@angular/core';
import { take } from 'rxjs/operators';
import { DataEditorResult } from './data-editor-result';
import { DataEditorComponent } from './data-editor.component';


@Injectable({
  providedIn: 'root'
})
export class DataEditorDialog {

  private currentDialog?: OverlayRef;

  constructor(
    private overlay: Overlay,
    private injector: Injector,
    private ngZone: NgZone
  ) { }

  public open(data: any): Promise<void> | null {
    if (this.currentDialog) {
      return null;
    }
    return new Promise((resolve, reject) => {
      this.currentDialog = this.createOverlay();
      const result = new DataEditorResult(data);

      const portalInjector = Injector.create({
        providers: [{ provide: DataEditorResult, useValue: result }],
      });
      const portal = new ComponentPortal(DataEditorComponent, null, portalInjector);
      this.currentDialog.attach(portal);

      // update the position once the popup has rendered.
      this.ngZone.onStable.asObservable().pipe(take(1)).subscribe(() => {
        this.currentDialog?.updatePosition();
      });

      result.close$.pipe(take(1)).subscribe(() => {
        this.currentDialog?.dispose();
        this.currentDialog = undefined;
        reject();
      });
      result.save$.pipe(take(1)).subscribe((newData) => {
        this.currentDialog?.dispose();
        this.currentDialog = undefined;
        resolve(newData);
      });
    });
  }

  private createOverlay(): OverlayRef {
    const overlayConfig = new OverlayConfig({
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      hasBackdrop: true,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      panelClass: 'pdi-popup',
      disposeOnNavigation: true
    });

    const overlayRef = this.overlay.create(overlayConfig);
    overlayRef.overlayElement.setAttribute('role', 'dialog');
    return overlayRef;
  }

}
