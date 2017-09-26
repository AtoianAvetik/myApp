import {
  ComponentFactory, ComponentFactoryResolver, ComponentRef, Directive, ElementRef, Input, OnInit, ViewContainerRef
} from '@angular/core';
import { LoaderComponent } from '../components/loader/loader.component';
import { Loader } from '../_models/loader.model';

@Directive({
  selector: '[loader]'
})
export class LoaderDirective implements OnInit{
  @Input('loader') id: string;
  container: ViewContainerRef;
  componentRef: ComponentRef<Loader>;

  constructor(private resolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef,
              private elRef: ElementRef) {}

  ngOnInit() {
    if (!this.id) {
      console.error('loader must have an id');
      return;
    }

    const factory: ComponentFactory<Loader> = this.resolver.resolveComponentFactory(LoaderComponent);
    this.viewContainerRef.clear();

    this.componentRef = this.viewContainerRef.createComponent(factory);
    this.componentRef.instance.id = this.id;

    this.elRef.nativeElement.appendChild(this.componentRef.location.nativeElement);
  }
}
