import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone } from '@angular/core'; 
import { UI } from './UI';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private ui: UI
  ) {}

  handleError(error: any) { 
    if (error instanceof HttpErrorResponse){
      this.ui.showToast('error',error.message);
    } 
    // TODO: Log the error to the server in real app
    console.error('Error from global error handler', error.message);
  }
}
 