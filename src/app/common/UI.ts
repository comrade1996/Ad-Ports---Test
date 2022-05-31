import { Injectable } from '@angular/core';
import { ConfirmBoxEvokeService, ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup'; 
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
  providedIn: 'root',
})
export class UI {
  constructor(private toaster: ToastEvokeService,private confirmBoxEvokeService: ConfirmBoxEvokeService,private ngxService: NgxUiLoaderService) {}
  
  public showConfirm( titleKey: string,messageKey: string) {
    return  this.confirmBoxEvokeService.danger(titleKey, messageKey, 'Confirm', 'Decline');
  }
  public showLoading( ) {
    this.ngxService.start();
  }
  public hideLoading() {
    this.ngxService.stop();
  }
  public async showToast(
    toastType: string, 
    message: string, 
  ) {
    switch (toastType) {
      case 'error':
        this.toaster.danger("Error",message);
        break;
      case 'success':
        this.toaster.success("Success",message);
        break;

      default:
        break;
    }
  }
}
