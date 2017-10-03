import { Subject } from 'rxjs/Subject';
import * as _ from 'underscore';

import { Panel } from '../_models/panel.model';

export class PanelService {
  private panels: Array<Panel> = [];
  panelOpened = new Subject<string>();
  panelClosed = new Subject<string>();
  isPanelClosed = new Subject();
  isPanelOpened = new Subject();
  isPanelsChanged = new Subject();

  add(panel: Panel) {
    // add panel to array of active panels
    this.panels.push(panel);
    this.isPanelsChanged.next(this.panels.slice());
  }

  remove(id: string) {
    // remove panel from array of active panels
    const panelToRemove = _.findWhere(this.panels, { id: id });
    this.panels = _.without(this.panels, panelToRemove);
    this.isPanelsChanged.next(this.panels.slice());
  }
}
