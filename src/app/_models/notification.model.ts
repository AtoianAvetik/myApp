import { ComponentRef } from '@angular/core';

export class Notification {
  type: NotificationType;
  title: string;
  icon: string;
  message: string;
  _ref: ComponentRef<Notification>;
}

export enum NotificationType {
  Success,
  Error,
  Info,
  Warning
}
