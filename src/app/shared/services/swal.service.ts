import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  infoMessageBox(message: string) {
    Swal.fire({
      icon: 'info',
      heightAuto: false,
      html: '<h5>' + message + '</h5>',
      width: '450px',
    });
  }

  successMessageBox(message: string) {
    Swal.fire({
      icon: 'success',
      heightAuto: false,
      html: '<h5>' + message + '</h5>',
      width: '450px',
    });
  }

  confirmBox(title: string, text: string, onConfirm?: Function, onCancel?: Function) {
    Swal.fire({
      title: title ? title : 'Are you sure?',
      text: text ? text : '',
      icon: 'warning',
      width: '450px',
      heightAuto: false,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result: any) => {
      if (result.value) {
        if (onConfirm) {
          onConfirm();
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        if (onCancel) {
          onCancel();
        }
      }
    });
  }

  errorMessageBox(message: any) {
    Swal.fire({
      icon: 'error',
      heightAuto: false,
      html: '<h5>' + message + '</h5>',
      width: '450px',
    });
  }

}
