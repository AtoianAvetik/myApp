import { ComponentRef } from '@angular/core';

export class Notification {
  type: NotificationType;
  message: string;
  timeout: number;
  _ref: ComponentRef<Notification>;
}

export enum NotificationType {
  Success,
  Error,
  Info,
  Warning
}
